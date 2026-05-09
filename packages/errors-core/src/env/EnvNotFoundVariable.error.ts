import EnvManagerError from "./EnvManager.error";

/**
 * Custom error class for when an expected environment variable is not found.
 * @extends EnvManagerError
 */
class EnvNotFoundVariableError extends EnvManagerError {
    /**
     * The name of the missing environment variable.
     */
    public readonly variable: string;

    /**
     * @param message The error message.
     * @param variable The name of the missing environment variable.
     */
    constructor(message: string, variable: string, cause?: unknown) {
        super(message, cause);
        this.name = "EnvNotFoundVariableError";
        this.variable = variable;
    }

    public toString(): string {
        return `${this.name}: [${this.variable}] ${this.message}`;
    }

    public toJSON() {
        return {
            ...super.toJSON(),
            variable: this.variable,
        };
    }
}

export default EnvNotFoundVariableError;
