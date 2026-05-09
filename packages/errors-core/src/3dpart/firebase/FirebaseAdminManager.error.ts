import ThirdPartyManagerError from "../ThirdPartManager.error";

/**
 * Custom error class for Firebase Admin errors.
 *
 * @abstract
 * @extends ThirdPartyManagerError
 */
abstract class FirebaseAdminManagerError extends ThirdPartyManagerError {
    /**
     * The Firebase error code.
     */
    public readonly code: string;

    /**
     * Creates a new instance of FirebaseAdminManagerError.
     * @param message The error message.
     * @param code The Firebase error code.
     */
    constructor(message: string, code: string, cause?: unknown) {
        super(message, cause);
        this.name = "FirebaseAdminManagerError";
        this.code = code;
    }

    public toString(): string {
        return `${this.name} (${this.code}): ${this.message}`;
    }

    public toJSON() {
        return {
            ...super.toJSON(),
            code: this.code,
        };
    }
}

export default FirebaseAdminManagerError;
