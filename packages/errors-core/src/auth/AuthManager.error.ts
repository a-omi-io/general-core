import ManagerError from "../Manager.error";

/**
 * Abstract base class for authentication and authorization errors.
 *
 * @abstract
 * @extends ManagerError
 */
abstract class AuthManagerError extends ManagerError {
    constructor(message: string, cause?: unknown) {
        super(message, cause);
        this.name = "AuthManagerError";
    }
}

export default AuthManagerError;
