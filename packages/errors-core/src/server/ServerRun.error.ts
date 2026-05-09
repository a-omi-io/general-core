import ManagerError from "../Manager.error";

/**
 * Error that occurs when the server encounters an error during runtime.
 * @extends ManagerError
 */
class ServerRunError extends ManagerError {
    /**
     * @param message The error message.
     */
    constructor(message: string, cause?: unknown) {
        super(message, cause);
        this.name = "ServerRunError";
    }

    public toString(): string {
        return `${this.name}: ${this.message}`;
    }
}

export default ServerRunError;
