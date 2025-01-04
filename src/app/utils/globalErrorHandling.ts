import { ErrorRequestHandler } from 'express';


// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // Default error status and message
    let statusCode = err?.statusCode || 500;
    let message = err?.message || 'Something went wrong!';


    type TerrorSourcres = {
        path: string | number,
        message: string
    }[]

    let error: TerrorSourcres = [{
        path: '',
        message: 'Something went wrong!'
    }]

    const NODE_DEV = process.env.NODE_DEV

    // Handle specific error types
    switch (err?.name) {
        case 'ZodError':
            statusCode = 400;
            message = 'Invalid input data based on schema validation.';
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            error = err?.errors?.map((e: any) => ({
                path: e.path,
                message: e.message,
            })) || [];
            break;

        case 'ValidationError':
            statusCode = 422;
            message = 'Validation failed due to incorrect data format or missing fields.';
            error = [{
                path: 'validation',
                message: message,
            }];
            break;

        
        case 'JsonWebTokenError':
            statusCode = 401;
            message = 'You are not authorized';
            break;
    }

    // Send the response
    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        error,
        stack: NODE_DEV === 'development' ? err?.stack : null
    });
};

export default globalErrorHandler;