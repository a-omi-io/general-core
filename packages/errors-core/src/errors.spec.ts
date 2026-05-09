import { ManagerError, ValidationError } from "./index";
import {
    AggregateManagerError,
    OperationCancelledError,
    TimeoutError,
} from "./index";
import {
    getErrorMessage,
    isManagerError,
    serializeError,
    toError,
    wrapError,
} from "./utils";
import { FormatError, PropertyRequiredError } from "./data";
import { EnvManagerError, EnvNotFoundVariableError } from "./env";
import { FetchError, HttpManagerError, NetworkError } from "./http";
import {
    NotificationManagerError,
    PushNotificationUnsubscribeError,
} from "./notification";
import { ServerRunError } from "./server";
import { InvalidTextError } from "./text";
import { URLDomainError } from "./url";
import {
    ServiceWorkerManagerError,
    ServiceWorkerRegistrationNotFoundError,
} from "./worker";
import {
    FirebaseAdminManagerError,
    FirebaseSubscribeError,
    FirebaseUnsubscribeError,
} from "./3dpart/firebase";
import { ThirdPartyManagerError, ThirdPartManagerError } from "./3dpart";
import { AuthManagerError, ForbiddenError, UnauthorizedError } from "./auth";

class TestManagerError extends ManagerError {}

class TestEnvManagerError extends EnvManagerError {}

class TestHttpManagerError extends HttpManagerError {}

class TestNotificationManagerError extends NotificationManagerError {}

class TestServiceWorkerManagerError extends ServiceWorkerManagerError {}

class TestThirdPartyManagerError extends ThirdPartyManagerError {}

class TestFirebaseAdminManagerError extends FirebaseAdminManagerError {}

class TestAuthManagerError extends AuthManagerError {}

const serializedError = (error: Error) => ({
    name: error.name,
    message: error.message,
    stack: error.stack,
    cause: undefined,
});

describe("errors package", () => {
    describe("base errors", () => {
        it("creates ManagerError with name, message, cause and json payload", () => {
            const cause = new Error("root");
            const error = new TestManagerError("message", cause);

            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(ManagerError);
            expect(error.name).toBe("TestManagerError");
            expect(error.message).toBe("message");
            expect(error.cause).toBe(cause);
            expect(error.toString()).toBe("TestManagerError: message");
            expect(error.toJSON()).toEqual({
                cause: serializedError(cause),
                message: "message",
                name: "TestManagerError",
                stack: error.stack,
            });
        });

        it("safely serializes cyclic causes in toJSON", () => {
            const cause: Record<string, unknown> = { a: 1 };
            cause.self = cause;
            const error = new TestManagerError("cyclic", cause);

            expect(() => JSON.stringify(error.toJSON())).not.toThrow();
            const json = error.toJSON();
            expect(json.cause).toEqual({ a: 1, self: "[Circular]" });
        });

        it("serializes BigInt and Symbol causes safely", () => {
            const error = new TestManagerError("big", { value: BigInt(42) });
            const json = error.toJSON();
            expect(json.cause).toEqual({ value: "42n" });
        });

        it("provides a static is() type guard", () => {
            const error = new TestManagerError("x");
            expect(ManagerError.is(error)).toBe(true);
            expect(ManagerError.is(error, TestManagerError)).toBe(true);
            expect(ManagerError.is(error, FetchError)).toBe(false);
            expect(ManagerError.is(new Error("plain"))).toBe(false);
            expect(ManagerError.is("string")).toBe(false);
        });

        it("creates ValidationError", () => {
            const cause = new Error("validation");
            const error = new ValidationError("Invalid payload", cause);

            expect(error).toBeInstanceOf(ManagerError);
            expect(error).toBeInstanceOf(ValidationError);
            expect(error.name).toBe("ValidationError");
            expect(error.message).toBe("Invalid payload");
            expect(error.cause).toBe(cause);
            expect(error.toString()).toBe("ValidationError: Invalid payload");
        });
    });

    describe("data errors", () => {
        it("creates FormatError", () => {
            const cause = new Error("format");
            const error = new FormatError("Wrong format", cause);

            expect(error).toBeInstanceOf(ManagerError);
            expect(error.name).toBe("FormatError");
            expect(error.cause).toBe(cause);
            expect(error.toString()).toBe("FormatError: Wrong format");
        });

        it("creates PropertyRequiredError with public property and metadata serialization", () => {
            const cause = new Error("property");
            const error = new PropertyRequiredError("email", cause);

            expect(error).toBeInstanceOf(ValidationError);
            expect(error.name).toBe("PropertyRequiredError");
            expect(error.property).toBe("email");
            expect(error.toString()).toBe(
                "PropertyRequiredError: No property: email (property: email)"
            );
            expect(error.toJSON()).toEqual({
                cause: serializedError(cause),
                message: "No property: email",
                name: "PropertyRequiredError",
                property: "email",
                stack: error.stack,
            });
        });
    });

    describe("env errors", () => {
        it("creates EnvManagerError subclass", () => {
            const cause = new Error("env");
            const error = new TestEnvManagerError("Missing environment", cause);

            expect(error).toBeInstanceOf(ManagerError);
            expect(error.name).toBe("EnvManagerError");
            expect(error.cause).toBe(cause);
            expect(error.toString()).toBe(
                "EnvManagerError: Missing environment"
            );
        });

        it("creates EnvNotFoundVariableError with public variable metadata", () => {
            const cause = new Error("var");
            const error = new EnvNotFoundVariableError(
                "is required",
                "API_KEY",
                cause
            );

            expect(error).toBeInstanceOf(EnvManagerError);
            expect(error.name).toBe("EnvNotFoundVariableError");
            expect(error.variable).toBe("API_KEY");
            expect(error.toString()).toBe(
                "EnvNotFoundVariableError: [API_KEY] is required"
            );
            expect(error.toJSON()).toEqual({
                cause: serializedError(cause),
                message: "is required",
                name: "EnvNotFoundVariableError",
                stack: error.stack,
                variable: "API_KEY",
            });
        });
    });

    describe("http errors", () => {
        it("creates HttpManagerError subclass with metadata serialization", () => {
            const cause = new Error("http");
            const error = new TestHttpManagerError(
                "HTTP failure",
                500,
                "response",
                cause
            );

            expect(error).toBeInstanceOf(ManagerError);
            expect(error.name).toBe("HttpManagerError");
            expect(error.statusCode).toBe(500);
            expect(error.response).toBe("response");
            expect(error.cause).toBe(cause);
            expect(error.toString()).toBe(
                "HttpManagerError (HTTP 500): HTTP failure"
            );
            expect(error.toJSON()).toEqual({
                cause: serializedError(cause),
                message: "HTTP failure",
                name: "HttpManagerError",
                response: "response",
                stack: error.stack,
                statusCode: 500,
            });
        });

        it("creates FetchError", () => {
            const cause = new Error("fetch");
            const error = new FetchError(
                "Failed fetch",
                404,
                "Not found",
                cause
            );

            expect(error).toBeInstanceOf(HttpManagerError);
            expect(error.name).toBe("FetchError");
            expect(error.statusCode).toBe(404);
            expect(error.response).toBe("Not found");
            expect(error.cause).toBe(cause);
            expect(error.toString()).toBe(
                "FetchError (HTTP 404): Failed fetch"
            );
        });

        it("creates NetworkError with optional url/method metadata", () => {
            const cause = new Error("ECONNREFUSED");
            const error = new NetworkError(
                "Connection refused",
                { url: "https://api.example.com/v1/users", method: "POST" },
                cause
            );

            expect(error).toBeInstanceOf(ManagerError);
            expect(error.name).toBe("NetworkError");
            expect(error.url).toBe("https://api.example.com/v1/users");
            expect(error.method).toBe("POST");
            expect(error.toString()).toBe(
                "NetworkError (POST https://api.example.com/v1/users): Connection refused"
            );
            expect(error.toJSON()).toEqual({
                cause: serializedError(cause),
                message: "Connection refused",
                method: "POST",
                name: "NetworkError",
                stack: error.stack,
                url: "https://api.example.com/v1/users",
            });
        });

        it("creates NetworkError without metadata", () => {
            const error = new NetworkError("Offline");
            expect(error.toString()).toBe("NetworkError: Offline");
            expect(error.url).toBeUndefined();
            expect(error.method).toBeUndefined();
        });
    });

    describe("notification errors", () => {
        it("creates NotificationManagerError subclass", () => {
            const cause = new Error("notification");
            const error = new TestNotificationManagerError(
                "Notification failed",
                cause
            );

            expect(error).toBeInstanceOf(ManagerError);
            expect(error.name).toBe("NotificationManagerError");
            expect(error.cause).toBe(cause);
            expect(error.toString()).toBe(
                "NotificationManagerError: Notification failed"
            );
        });

        it("creates PushNotificationUnsubscribeError", () => {
            const cause = new Error("unsubscribe");
            const error = new PushNotificationUnsubscribeError(
                "Cannot unsubscribe",
                cause
            );

            expect(error).toBeInstanceOf(NotificationManagerError);
            expect(error.name).toBe("PushNotificationUnsubscribeError");
            expect(error.cause).toBe(cause);
            expect(error.toString()).toBe(
                "PushNotificationUnsubscribeError: Cannot unsubscribe"
            );
        });
    });

    describe("server, text and url errors", () => {
        it("creates ServerRunError", () => {
            const cause = new Error("runtime");
            const error = new ServerRunError("Server crashed", cause);

            expect(error).toBeInstanceOf(ManagerError);
            expect(error.name).toBe("ServerRunError");
            expect(error.cause).toBe(cause);
            expect(error.toString()).toBe("ServerRunError: Server crashed");
        });

        it("creates InvalidTextError", () => {
            const cause = new Error("text");
            const error = new InvalidTextError("Invalid text content", cause);

            expect(error).toBeInstanceOf(ManagerError);
            expect(error.name).toBe("InvalidTextError");
            expect(error.cause).toBe(cause);
            expect(error.toString()).toBe(
                "InvalidTextError: Invalid text content"
            );
        });

        it("creates URLDomainError", () => {
            const cause = new Error("url");
            const error = new URLDomainError("Invalid domain", cause);

            expect(error).toBeInstanceOf(ManagerError);
            expect(error.name).toBe("URLDomainError");
            expect(error.cause).toBe(cause);
            expect(error.toString()).toBe("URLDomainError: Invalid domain");
        });
    });

    describe("worker errors", () => {
        it("creates ServiceWorkerManagerError subclass", () => {
            const cause = new Error("worker manager");
            const error = new TestServiceWorkerManagerError(
                "Worker issue",
                cause
            );

            expect(error).toBeInstanceOf(ManagerError);
            expect(error.name).toBe("ServiceWorkerManagerError");
            expect(error.cause).toBe(cause);
            expect(error.toString()).toBe(
                "ServiceWorkerManagerError: Worker issue"
            );
        });

        it("creates ServiceWorkerRegistrationNotFoundError", () => {
            const cause = new Error("registration");
            const error = new ServiceWorkerRegistrationNotFoundError(
                "Registration not found",
                cause
            );

            expect(error).toBeInstanceOf(ServiceWorkerManagerError);
            expect(error.name).toBe("ServiceWorkerRegistrationNotFoundError");
            expect(error.cause).toBe(cause);
            expect(error.toString()).toBe(
                "ServiceWorkerRegistrationNotFoundError: Registration not found"
            );
        });
    });

    describe("third-party and firebase errors", () => {
        it("supports third-party naming and alias export", () => {
            const cause = new Error("third-party");
            const error = new TestThirdPartyManagerError(
                "Third-party failed",
                cause
            );

            expect(error).toBeInstanceOf(ManagerError);
            expect(error).toBeInstanceOf(ThirdPartyManagerError);
            expect(error.name).toBe("ThirdPartyManagerError");
            expect(error.cause).toBe(cause);
            expect(ThirdPartManagerError).toBe(ThirdPartyManagerError);
        });

        it("creates FirebaseAdminManagerError subclass with code metadata", () => {
            const cause = new Error("firebase");
            const error = new TestFirebaseAdminManagerError(
                "Firebase base",
                "auth/invalid-credential",
                cause
            );

            expect(error).toBeInstanceOf(ThirdPartyManagerError);
            expect(error.name).toBe("FirebaseAdminManagerError");
            expect(error.code).toBe("auth/invalid-credential");
            expect(error.cause).toBe(cause);
            expect(error.toString()).toBe(
                "FirebaseAdminManagerError (auth/invalid-credential): Firebase base"
            );
            expect(error.toJSON()).toEqual({
                cause: serializedError(cause),
                code: "auth/invalid-credential",
                message: "Firebase base",
                name: "FirebaseAdminManagerError",
                stack: error.stack,
            });
        });

        it("creates FirebaseSubscribeError and FirebaseUnsubscribeError", () => {
            const subscribeCause = new Error("subscribe");
            const unsubscribeCause = new Error("unsubscribe");
            const subscribeError = new FirebaseSubscribeError(
                "Cannot subscribe",
                "messaging/internal-error",
                subscribeCause
            );
            const unsubscribeError = new FirebaseUnsubscribeError(
                "Cannot unsubscribe",
                "messaging/internal-error",
                unsubscribeCause
            );

            expect(subscribeError).toBeInstanceOf(FirebaseAdminManagerError);
            expect(subscribeError.name).toBe("FirebaseSubscribeError");
            expect(subscribeError.code).toBe("messaging/internal-error");
            expect(subscribeError.cause).toBe(subscribeCause);
            expect(subscribeError.toString()).toBe(
                "FirebaseSubscribeError (messaging/internal-error): Cannot subscribe"
            );

            expect(unsubscribeError).toBeInstanceOf(FirebaseAdminManagerError);
            expect(unsubscribeError.name).toBe("FirebaseUnsubscribeError");
            expect(unsubscribeError.code).toBe("messaging/internal-error");
            expect(unsubscribeError.cause).toBe(unsubscribeCause);
            expect(unsubscribeError.toString()).toBe(
                "FirebaseUnsubscribeError (messaging/internal-error): Cannot unsubscribe"
            );
        });
    });

    describe("auth errors", () => {
        it("creates AuthManagerError subclass", () => {
            const error = new TestAuthManagerError("Auth failed");
            expect(error).toBeInstanceOf(ManagerError);
            expect(error.name).toBe("AuthManagerError");
            expect(error.toString()).toBe("AuthManagerError: Auth failed");
        });

        it("creates UnauthorizedError with default message", () => {
            const error = new UnauthorizedError();
            expect(error).toBeInstanceOf(AuthManagerError);
            expect(error.name).toBe("UnauthorizedError");
            expect(error.message).toBe("Unauthorized");
        });

        it("creates ForbiddenError with optional permission", () => {
            const error = new ForbiddenError("No access", "admin:write");
            expect(error).toBeInstanceOf(AuthManagerError);
            expect(error.name).toBe("ForbiddenError");
            expect(error.requiredPermission).toBe("admin:write");
            expect(error.toString()).toBe(
                "ForbiddenError [admin:write]: No access"
            );
            expect(error.toJSON()).toMatchObject({
                name: "ForbiddenError",
                message: "No access",
                requiredPermission: "admin:write",
            });
        });

        it("ForbiddenError without permission falls back to default toString", () => {
            const error = new ForbiddenError();
            expect(error.toString()).toBe("ForbiddenError: Forbidden");
        });
    });

    describe("aggregate errors", () => {
        it("aggregates multiple errors with metadata", () => {
            const a = new ValidationError("a");
            const b = new Error("b");
            const error = new AggregateManagerError("Batch failed", [a, b]);

            expect(error).toBeInstanceOf(ManagerError);
            expect(error.name).toBe("AggregateManagerError");
            expect(error.errors).toHaveLength(2);
            expect(error.errors[0]).toBe(a);
            expect(error.errors[1]).toBe(b);
            expect(error.toString()).toBe(
                "AggregateManagerError: Batch failed (2 errors)"
            );
            expect(Object.isFrozen(error.errors)).toBe(true);
        });

        it("uses singular form for single error", () => {
            const error = new AggregateManagerError("One failed", [
                new Error("only"),
            ]);
            expect(error.toString()).toBe(
                "AggregateManagerError: One failed (1 error)"
            );
        });

        it("serializes nested errors in toJSON", () => {
            const inner = new ValidationError("v");
            const error = new AggregateManagerError("agg", [inner]);
            const json = error.toJSON() as { errors: Array<unknown> };
            expect(json.errors).toHaveLength(1);
            expect(json.errors[0]).toMatchObject({
                name: "ValidationError",
                message: "v",
            });
        });
    });

    describe("timeout errors", () => {
        it("creates TimeoutError with duration", () => {
            const error = new TimeoutError("Slow op", 5000);
            expect(error).toBeInstanceOf(ManagerError);
            expect(error.name).toBe("TimeoutError");
            expect(error.timeoutMs).toBe(5000);
            expect(error.toString()).toBe("TimeoutError (5000ms): Slow op");
            expect(error.toJSON()).toMatchObject({
                name: "TimeoutError",
                timeoutMs: 5000,
            });
        });

        it("renders without duration", () => {
            const error = new TimeoutError("Slow op");
            expect(error.toString()).toBe("TimeoutError: Slow op");
        });
    });

    describe("cancellation errors", () => {
        it("creates OperationCancelledError with default message and reason", () => {
            const error = new OperationCancelledError(undefined, "user");
            expect(error).toBeInstanceOf(ManagerError);
            expect(error.name).toBe("OperationCancelledError");
            expect(error.message).toBe("Operation cancelled");
            expect(error.reason).toBe("user");
            expect(error.toJSON()).toMatchObject({
                name: "OperationCancelledError",
                reason: "user",
            });
        });
    });

    describe("utils", () => {
        it("isManagerError narrows to ManagerError and subclasses", () => {
            const a = new TestManagerError("a");
            expect(isManagerError(a)).toBe(true);
            expect(isManagerError(a, TestManagerError)).toBe(true);
            expect(isManagerError(a, FetchError)).toBe(false);
            expect(isManagerError(new Error("x"))).toBe(false);
            expect(isManagerError(undefined)).toBe(false);
        });

        it("getErrorMessage extracts messages from various values", () => {
            expect(getErrorMessage(new Error("e"))).toBe("e");
            expect(getErrorMessage("string")).toBe("string");
            expect(getErrorMessage({ message: "obj msg" })).toBe("obj msg");
            expect(getErrorMessage({ no: "msg" })).toBe('{"no":"msg"}');
            expect(getErrorMessage(null)).toBe("Unknown error");
            expect(getErrorMessage(undefined, "fallback")).toBe("fallback");
        });

        it("toError coerces unknown values to Error and preserves cause", () => {
            const fromError = toError(new Error("a"));
            expect(fromError).toBeInstanceOf(Error);
            expect(fromError.message).toBe("a");

            const fromString = toError("oops");
            expect(fromString).toBeInstanceOf(Error);
            expect(fromString.message).toBe("oops");
            expect((fromString as { cause?: unknown }).cause).toBe("oops");

            const fromObj = toError({ message: "objmsg" });
            expect(fromObj.message).toBe("objmsg");
            expect((fromObj as { cause?: unknown }).cause).toEqual({
                message: "objmsg",
            });
        });

        it("wrapError wraps unknown into ManagerError subclass", () => {
            const wrapped = wrapError(new Error("orig"), TestManagerError);
            expect(wrapped).toBeInstanceOf(TestManagerError);
            expect(wrapped.message).toBe("orig");
            expect(wrapped.cause).toBeInstanceOf(Error);

            const customMsg = wrapError("raw", TestManagerError, "custom");
            expect(customMsg.message).toBe("custom");
            expect(customMsg.cause).toBe("raw");
        });

        it("wrapError returns same instance if already correct type", () => {
            const original = new TestManagerError("same");
            const wrapped = wrapError(original, TestManagerError);
            expect(wrapped).toBe(original);
        });

        it("serializeError handles Errors, plain objects and primitives", () => {
            const me = new TestManagerError("a");
            const meJson = serializeError(me);
            expect(meJson).toMatchObject({
                name: "TestManagerError",
                message: "a",
            });

            const plain = serializeError(new Error("plain"));
            expect(plain).toMatchObject({ name: "Error", message: "plain" });

            const nonErr = serializeError("string");
            expect(nonErr).toMatchObject({ name: "NonError" });
        });

        it("serializeError handles cycles", () => {
            const cyclic: Record<string, unknown> = { a: 1 };
            cyclic.self = cyclic;
            expect(() => serializeError(cyclic)).not.toThrow();
        });
    });
});
