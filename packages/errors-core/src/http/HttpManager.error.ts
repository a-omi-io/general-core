import ManagerError from "../Manager.error";

/**
 * Custom error class for HTTP errors.
 *
 * @abstract
 * @extends ManagerError
 */
abstract class HttpManagerError extends ManagerError {
    /**
     * The HTTP status code returned by the server.
     */
    public readonly statusCode: number;

    /**
     * The response body returned by the server.
     */
    public readonly response: string;

    /**
     * Creates a new instance of HttpError.
     * @param message The error message.
     * @param statusCode The HTTP status code returned by the server.
     * @param response The response body returned by the server.
     */
    constructor(
        message: string,
        statusCode: number,
        response: string,
        cause?: unknown
    ) {
        super(message, cause);
        this.name = "HttpManagerError";
        this.statusCode = statusCode;
        this.response = response;
    }

    /**
     * Returns a string representation of the error.
     * @returns A string representation of the error.
     */
    public toString(): string {
        return `${this.name} (HTTP ${this.statusCode}): ${this.message}`;
    }

    public toJSON() {
        return {
            ...super.toJSON(),
            statusCode: this.statusCode,
            response: this.response,
        };
    }
}

export default HttpManagerError;
