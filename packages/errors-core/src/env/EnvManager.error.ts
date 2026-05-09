import ManagerError from "../Manager.error";

/**
 * Custom error class for errors related to environment variables.
 *
 * @abstract
 * @extends ManagerError
 */
abstract class EnvManagerError extends ManagerError {
    /**
     * @param message The error message.
     */
    constructor(message: string, cause?: unknown) {
        super(message, cause);
        this.name = "EnvManagerError";
    }
}

export default EnvManagerError;
