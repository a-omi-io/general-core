import ServiceWorkerManagerError from "./ServiceWorkerManager.error";

/**
 * Error class for when a service worker registration is not found.
 *
 * @extends ServiceWorkerManagerError
 */
class ServiceWorkerRegistrationNotFoundError extends ServiceWorkerManagerError {
    /**
     * Creates an instance of ServiceWorkerRegistrationNotFound.
     *
     * @param {string} message - The error message.
     */
    constructor(message: string, cause?: unknown) {
        super(message, cause);
        this.name = "ServiceWorkerRegistrationNotFoundError";
    }

    /**
     * Returns a string representation of the error.
     *
     * @returns {string} The string representation of the error.
     */
    public toString(): string {
        return `${this.name}: ${this.message}`;
    }
}

export default ServiceWorkerRegistrationNotFoundError;
