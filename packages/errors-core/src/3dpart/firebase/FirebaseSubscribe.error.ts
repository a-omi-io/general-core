import FirebaseAdminManagerError from "./FirebaseAdminManager.error";

/**
 * @extends FirebaseAdminManagerError
 */
class FirebaseSubscribeError extends FirebaseAdminManagerError {
    /**
     * @param message The error message.
     * @param code The Firebase error code.
     */
    constructor(message: string, code: string, cause?: unknown) {
        super(message, code, cause);
        this.name = "FirebaseSubscribeError";
    }
}

export default FirebaseSubscribeError;
