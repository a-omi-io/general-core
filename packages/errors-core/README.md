# @omi-io/errors-core

Typed, JSON-serializable error hierarchy for general-purpose software development. Provides an abstract base class with safe serialization, ready-made domain errors (HTTP, env, data, auth, notification, service worker, third-party), and small utilities for working with `unknown` values caught in `try/catch`.

## Features

- Abstract `ManagerError` base with a clean prototype chain (survives transpilation), V8 stack-trace cleanup, and a JSON-safe `toJSON()` that handles cycles, `BigInt`, `Symbol` and nested errors.
- Static `ManagerError.is(value, Ctor?)` type guard.
- Ready-made domain errors with rich metadata (`statusCode`, `code`, `property`, `variable`, `requiredPermission`, `timeoutMs`, …).
- `AggregateManagerError` for collecting multiple errors (`Promise.allSettled` patterns).
- Utilities for catch blocks: `isManagerError`, `getErrorMessage`, `toError`, `wrapError`, `serializeError`.
- Tree-shakable subpath exports (`@omi-io/errors-core/utils`, `/http`, `/auth`, …).

## Install

```bash
yarn add @omi-io/errors-core
```

## Usage

Import from the root entry:

```ts
import {
  ManagerError,
  ValidationError,
  AggregateManagerError,
  TimeoutError,
  OperationCancelledError,
  isManagerError,
  wrapError,
  serializeError,
} from "@omi-io/errors-core";
```

Or import from focused subpaths for better tree-shaking:

```ts
import { FetchError, HttpManagerError, NetworkError } from "@omi-io/errors-core/http";
import { PropertyRequiredError, FormatError } from "@omi-io/errors-core/data";
import { EnvNotFoundVariableError } from "@omi-io/errors-core/env";
import { UnauthorizedError, ForbiddenError } from "@omi-io/errors-core/auth";
import { TimeoutError } from "@omi-io/errors-core/timeout";
import { OperationCancelledError } from "@omi-io/errors-core/cancellation";
import { AggregateManagerError } from "@omi-io/errors-core/aggregate";
import { isManagerError, getErrorMessage } from "@omi-io/errors-core/utils";
import { FirebaseSubscribeError } from "@omi-io/errors-core/3dpart";
```

## API

### Root

- `ManagerError` (abstract) — base class for every error in the package.
  - `new ManagerError(message, cause?)` — constructor (call from a subclass).
  - `error.name` — set automatically from the constructor name.
  - `error.cause` — the underlying value passed to the constructor.
  - `error.toString()` → `"Name: message"`.
  - `error.toJSON()` → `{ name, message, stack, cause }` with `cause` recursively serialized (cycles become `"[Circular]"`, `BigInt` becomes `"42n"`, etc.).
  - `ManagerError.is(value, Ctor?)` — static type guard.
- `ValidationError` — generic validation failure.
- `ISerializedManagerError` — type of the object returned by `toJSON()`.

### `aggregate`

- `AggregateManagerError(message, errors, cause?)` — collects multiple underlying errors. `errors` is exposed as a frozen `ReadonlyArray<unknown>` and serialized recursively in `toJSON()`.

### `auth`

- `AuthManagerError` (abstract) — base for authentication / authorization errors.
- `UnauthorizedError(message?, cause?)` — missing or invalid credentials (HTTP 401-style).
- `ForbiddenError(message?, requiredPermission?, cause?)` — insufficient permissions (HTTP 403-style). Exposes `requiredPermission`.

### `cancellation`

- `OperationCancelledError(message?, reason?, cause?)` — operation cancelled (e.g. via `AbortSignal`). Exposes `reason`.

### `data`

- `FormatError(message, cause?)` — value does not match the expected format.
- `PropertyRequiredError(property, cause?)` — missing required property; exposes `property` and serializes it in `toJSON()`.

### `env`

- `EnvManagerError` (abstract) — base for environment-related errors.
- `EnvNotFoundVariableError(message, variable, cause?)` — required environment variable is not defined; exposes `variable`.

### `http`

- `HttpManagerError` (abstract) — base for HTTP errors with `statusCode` and `response`.
- `FetchError(message, statusCode, response, cause?)` — request failed with a response.
- `NetworkError(message, { url?, method? }?, cause?)` — transport-level failure before any response is received (DNS / TLS / `ECONNREFUSED` / aborted by network); has no `statusCode`.

### `notification`

- `NotificationManagerError` (abstract) — base for push-notification errors.
- `PushNotificationUnsubscribeError(message, cause?)` — failed to unsubscribe from push notifications.

### `server`

- `ServerRunError(message, cause?)` — failure during server runtime.

### `text`

- `InvalidTextError(message, cause?)` — text content does not satisfy expectations.

### `timeout`

- `TimeoutError(message, timeoutMs?, cause?)` — operation exceeded its deadline; exposes `timeoutMs`.

### `url`

- `URLDomainError(message, cause?)` — invalid or unsupported URL domain.

### `utils`

- `isManagerError(value, Ctor?)` — type guard that narrows to `ManagerError` (or a specific subclass).
- `getErrorMessage(value, fallback?)` — best-effort extraction of a human-readable message from any thrown value.
- `toError(value)` — coerces an unknown value into an `Error`, preserving the original as `cause` for non-`Error` values.
- `wrapError(value, ErrorClass, message?)` — wraps an unknown value into the given `ManagerError` subclass; returns the value unchanged if it is already an instance of `ErrorClass`.
- `serializeError(value)` — universal JSON-safe serializer for any thrown value (handles cycles, `BigInt`, `Symbol`, `Function`, plain objects, `Error`, `ManagerError`).
- `SerializedError` / `ISerializedError` — types describing the result of `serializeError`.

### `worker`

- `ServiceWorkerManagerError` (abstract) — base for service-worker errors.
- `ServiceWorkerRegistrationNotFoundError(message, cause?)` — service worker registration is missing.

### `3dpart`

- `ThirdPartyManagerError` (abstract) — base for third-party integration errors. `ThirdPartManagerError` is a deprecated alias.
- `FirebaseAdminManagerError` (abstract) — Firebase Admin errors, exposes `code`.
- `FirebaseSubscribeError(message, code, cause?)` — failed to subscribe in Firebase Messaging.
- `FirebaseUnsubscribeError(message, code, cause?)` — failed to unsubscribe in Firebase Messaging.

## Examples

### Defining your own error

`ManagerError` is abstract — subclass it for any domain error you need:

```ts
import { ManagerError } from "@omi-io/errors-core";

class MyDomainError extends ManagerError {
  constructor(public readonly entityId: string, cause?: unknown) {
    super(`Entity not found: ${entityId}`, cause);
    this.name = "MyDomainError";
  }

  public toJSON() {
    return { ...super.toJSON(), entityId: this.entityId };
  }
}
```

### Catching unknown values safely

```ts
import { getErrorMessage, isManagerError, wrapError } from "@omi-io/errors-core/utils";
import { FetchError } from "@omi-io/errors-core/http";

try {
  await api.call();
} catch (e) {
  if (isManagerError(e, FetchError)) {
    console.warn(`HTTP ${e.statusCode}: ${e.message}`);
    return;
  }
  throw wrapError(e, FetchError, "Unexpected API failure");
}
```

### Aggregating parallel failures

```ts
import { AggregateManagerError } from "@omi-io/errors-core/aggregate";

const results = await Promise.allSettled(tasks);
const errors = results.flatMap(r => (r.status === "rejected" ? [r.reason] : []));
if (errors.length > 0) {
  throw new AggregateManagerError("Batch import failed", errors);
}
```

### Timeouts and cancellation

```ts
import { TimeoutError } from "@omi-io/errors-core/timeout";
import { OperationCancelledError } from "@omi-io/errors-core/cancellation";

const withTimeout = <T>(promise: Promise<T>, ms: number) =>
  Promise.race<T>([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new TimeoutError("Operation timed out", ms)), ms)
    ),
  ]);

const onAbort = (signal: AbortSignal) => {
  signal.addEventListener("abort", () => {
    throw new OperationCancelledError(undefined, signal.reason);
  });
};
```

### JSON-safe logging

```ts
import { serializeError } from "@omi-io/errors-core/utils";

try {
  await job.run();
} catch (e) {
  logger.error(JSON.stringify(serializeError(e)));
  throw e;
}
```

`serializeError` (and `ManagerError#toJSON`) safely handle cyclic causes, `BigInt`, `Symbol` and `Function` values, so `JSON.stringify` will never throw on them.
