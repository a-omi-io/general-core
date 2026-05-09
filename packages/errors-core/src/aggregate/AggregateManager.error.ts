import ManagerError from "../Manager.error";

/**
 * Aggregates multiple errors raised in parallel/batched operations into a
 * single thrown value, similar to ES2021 `AggregateError` but anchored to the
 * {@link ManagerError} hierarchy.
 *
 * @example
 *   const results = await Promise.allSettled(tasks);
 *   const errors = results.flatMap(r => r.status === "rejected" ? [r.reason] : []);
 *   if (errors.length) throw new AggregateManagerError("Batch failed", errors);
 *
 * @extends ManagerError
 */
class AggregateManagerError extends ManagerError {
    /**
     * The list of underlying errors aggregated by this error.
     */
    public readonly errors: ReadonlyArray<unknown>;

    constructor(message: string, errors: Iterable<unknown>, cause?: unknown) {
        super(message, cause);
        this.name = "AggregateManagerError";
        this.errors = Object.freeze(Array.from(errors));
    }

    public toString(): string {
        return `${this.name}: ${this.message} (${this.errors.length} error${
            this.errors.length === 1 ? "" : "s"
        })`;
    }

    public toJSON() {
        const base = super.toJSON();
        const serialize = (value: unknown): unknown => {
            if (value instanceof ManagerError) return value.toJSON();
            if (value instanceof Error) {
                return {
                    name: value.name,
                    message: value.message,
                    stack: value.stack,
                };
            }
            return value;
        };
        return {
            ...base,
            errors: this.errors.map(serialize),
        };
    }
}

export default AggregateManagerError;
