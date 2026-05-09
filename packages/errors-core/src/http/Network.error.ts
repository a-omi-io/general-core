import ManagerError from "../Manager.error";

/**
 * Error raised for transport-level failures that occur before any HTTP
 * response is received (DNS failure, connection refused, TLS handshake
 * failure, request aborted by network, etc.).
 *
 * Distinct from {@link HttpManagerError}, which represents errors derived
 * from a server response and therefore always has a `statusCode`.
 *
 * @extends ManagerError
 */
class NetworkError extends ManagerError {
    /**
     * The URL the request was targeting, when known.
     */
    public readonly url?: string;

    /**
     * The HTTP method, when known.
     */
    public readonly method?: string;

    constructor(
        message: string,
        options?: { url?: string; method?: string },
        cause?: unknown
    ) {
        super(message, cause);
        this.name = "NetworkError";
        this.url = options?.url;
        this.method = options?.method;
    }

    public toString(): string {
        if (this.method && this.url) {
            return `${this.name} (${this.method} ${this.url}): ${this.message}`;
        }
        if (this.url) return `${this.name} (${this.url}): ${this.message}`;
        return `${this.name}: ${this.message}`;
    }

    public toJSON() {
        return {
            ...super.toJSON(),
            url: this.url,
            method: this.method,
        };
    }
}

export default NetworkError;
