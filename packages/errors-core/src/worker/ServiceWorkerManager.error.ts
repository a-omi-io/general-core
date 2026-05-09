import ManagerError from "../Manager.error";

/**
 * Abstract error class for errors related to service workers.
 *
 * @extends ManagerError
 */
abstract class ServiceWorkerManagerError extends ManagerError {
    /**
     * @param message The error message.
     */
    constructor(message: string, cause?: unknown) {
        super(message, cause);
        this.name = "ServiceWorkerManagerError";
    }
}

export default ServiceWorkerManagerError;
