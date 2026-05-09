import AuthManagerError from "./AuthManager.error";

/**
 * Error raised when an authenticated principal lacks permission to perform
 * the requested operation. Equivalent in spirit to HTTP 403.
 *
 * @extends AuthManagerError
 */
class ForbiddenError extends AuthManagerError {
    /**
     * Optional name of the missing permission/scope/role.
     */
    public readonly requiredPermission?: string;

    constructor(
        message = "Forbidden",
        requiredPermission?: string,
        cause?: unknown
    ) {
        super(message, cause);
        this.name = "ForbiddenError";
        this.requiredPermission = requiredPermission;
    }

    public toString(): string {
        return this.requiredPermission
            ? `${this.name} [${this.requiredPermission}]: ${this.message}`
            : `${this.name}: ${this.message}`;
    }

    public toJSON() {
        return {
            ...super.toJSON(),
            requiredPermission: this.requiredPermission,
        };
    }
}

export default ForbiddenError;
