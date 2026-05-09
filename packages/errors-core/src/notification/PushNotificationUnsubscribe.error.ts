import NotificationManagerError from "./NotificationManager.error";

/**
 * Error class for when there's an error unsubscribing from push notifications.
 *
 * @extends NotificationManagerError
 */
class PushNotificationUnsubscribeError extends NotificationManagerError {
    /**
     * @param {string} message - The error message.
     */
    constructor(message: string, cause?: unknown) {
        super(message, cause);
        this.name = "PushNotificationUnsubscribeError";
    }

    public toString(): string {
        return `${this.name}: ${this.message}`;
    }
}

export default PushNotificationUnsubscribeError;
