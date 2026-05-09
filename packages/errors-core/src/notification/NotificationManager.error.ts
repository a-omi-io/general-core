import ManagerError from "../Manager.error";

/**
 * Abstract error class for push notification errors.
 *
 * @abstract
 * @extends ManagerError
 */
abstract class NotificationManagerError extends ManagerError {
    /**
     * @param {string} message - The error message.
     */
    constructor(message: string, cause?: unknown) {
        super(message, cause);
        this.name = "NotificationManagerError";
    }
}

export default NotificationManagerError;
