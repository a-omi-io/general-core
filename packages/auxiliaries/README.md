# @omi-io/auxiliaries

Utility helpers for array checks, object collection helpers, memoization, text formatting, math, and small async/runtime utilities.

## Install

```bash
yarn add @omi-io/auxiliaries
```

## Usage

Import from the root entry:

```ts
import {
  clamp,
  memoizeArgs,
  pickExcept,
  throttle,
  formatNumber,
} from "@omi-io/auxiliaries";
```

Or import from focused subpaths:

```ts
import { isLastIndexOfArray } from "@omi-io/auxiliaries/check";
import { pickExcept } from "@omi-io/auxiliaries/collection";
import { clamp, measureExecutionTime } from "@omi-io/auxiliaries/measure";
import { delay, throttle, debounce } from "@omi-io/auxiliaries/serve";
```

## API

### check

- `isLastIndexOfArray(array, index, throws?)` - Checks whether `index` is the last index in `array`.

### collection

- `pickExcept(object, excludes)` - Returns a shallow copy of an object excluding selected keys.

### define

- `isDefinedAndNotNull(value)` - True for values that are not `undefined`, `null`, or `NaN`.
- `isValueNonDefined(value, shouldCheckNaN?)` - Helper for undefined/null/NaN checks.
- `isBrowser()` - Detects browser runtime.
- `isDOMSupported()` - Detects DOM support.
- `isTouchDeviceLikely()` - Heuristic touch-device detection (browser-only).
- `isPwa()` - Checks if app is running in standalone display mode.
- `isProbablyPwa()` - Broader PWA heuristic including service worker checks.

### log

- `echo(...args)` - Alias for `console.log`.

### measure

- `measureExecutionTime(fn, ...args)` - Runs a function and logs elapsed execution time.
- `clamp(value, a, b)` - Restricts `value` to the `[min(a,b), max(a,b)]` range.

### memoize

- `memoizeArgs(fn)` - Memoizes by serialized argument list.
- `memoizeSimpleTypeArg(fn)` - Memoizes a single-argument function by argument identity.

### serve

- `delay(milliseconds, result?)` - Promise-based delay utility.
- `throttle(fn, ms)` - Throttles function calls to at most once per interval.
- `debounce(fn, ms)` - Invokes `fn` after `ms` ms have passed since the last call (trailing debounce).

### text

- `capitalizeFirstLetter(text, restLowercase?)` - Capitalizes first character.
- `convertSpacesToThinsp(text)` - Converts regular spaces to `&thinsp;`.
- `formatNumber(input, { format? })` - Formats numbers using `<x,x.x>` or `<x x,x>` pattern.

### math

- `toUnsigned32BitInteger(value)` - Converts value to unsigned 32-bit integer.
- `quantizeToDecimals(value, options?)` - Quantizes to a fixed number of decimal places. `options.mode` is `"round"` | `"floor"` | `"ceil"` (default `"round"`); `options.decimals` defaults to `0`.
- `roundToDecimalPlaces(value, decimalPlaces)` - Rounds to a specific decimal precision (same as `quantizeToDecimals` with `mode: "round"`).
- `wrapPeriodic(value, period)` - Maps `value` into the half-open interval `[0, period)` (e.g. angles). Throws `RangeError` if `period` is not finite or not `> 0`.

## Example

```ts
import {
  clamp,
  memoizeArgs,
  pickExcept,
  quantizeToDecimals,
  roundToDecimalPlaces,
  wrapPeriodic,
} from "@omi-io/auxiliaries";

const safe = clamp(42, 0, 10); // 10
const rounded = roundToDecimalPlaces(3.14159, 2); // 3.14
const floored = quantizeToDecimals(1.236, { mode: "floor", decimals: 2 }); // 1.23
const angle = wrapPeriodic(-10, 360); // 350
const publicUser = pickExcept({ id: 1, email: "a@b.com", password: "x" }, ["password"]);

const slowSum = (a: number, b: number) => a + b;
const cachedSum = memoizeArgs(slowSum);
cachedSum(1, 2); // computed
cachedSum(1, 2); // cached
```
