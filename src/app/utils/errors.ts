/**
 * Custom error classes for better error handling
 */

export class ApiError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public originalError?: unknown
    ) {
        super(message);
        this.name = 'ApiError';
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

export class DataTransformationError extends Error {
    constructor(
        message: string,
        public countryData?: unknown
    ) {
        super(message);
        this.name = 'DataTransformationError';
        Object.setPrototypeOf(this, DataTransformationError.prototype);
    }
}

export class ValidationError extends Error {
    constructor(
        message: string,
        public field?: string
    ) {
        super(message);
        this.name = 'ValidationError';
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
