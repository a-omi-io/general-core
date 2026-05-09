import HttpManagerError from "./HttpManager.error";

/**
 * Custom error class for fetch errors.
 * @extends HttpManagerError
 */
class FetchError extends HttpManagerError {
    /**
     * Creates a new instance of FetchError.
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
        super(message, statusCode, response, cause);
        this.name = "FetchError";
    }
}

export default FetchError;
