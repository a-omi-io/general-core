import ManagerError from "../Manager.error";

/**
 * Represents an error specific to third-party operations.
 * @abstract
 * @extends ManagerError
 */
abstract class ThirdPartyManagerError extends ManagerError {
    constructor(message: string, cause?: unknown) {
        super(message, cause);
        this.name = "ThirdPartyManagerError";
    }
}

export default ThirdPartyManagerError;
