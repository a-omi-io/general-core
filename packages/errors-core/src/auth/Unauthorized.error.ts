import AuthManagerError from "./AuthManager.error";

/**
 * Error raised when a request is made without valid credentials.
 * Equivalent in spirit to HTTP 401.
 *
 * @extends AuthManagerError
 */
class UnauthorizedError extends AuthManagerError {
    constructor(message = "Unauthorized", cause?: unknown) {
        super(message, cause);
        this.name = "UnauthorizedError";
    }
}

export default UnauthorizedError;
