import ManagerError from "../Manager.error";

/**
 * Custom error class for errors related to inability domain URL.
 * @extends ManagerError
 */
class URLDomainError extends ManagerError {
    /**
     * @param message The error message.
     */
    constructor(message: string, cause?: unknown) {
        super(message, cause);
        this.name = "URLDomainError";
    }
}

export default URLDomainError;
