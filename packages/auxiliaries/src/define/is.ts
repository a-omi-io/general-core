/* eslint-disable max-lines */
declare global {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Navigator {
        standalone: boolean;
    }
}

/**
 * Checks if a value is defined, not null, and not NaN (Not a Number).
 *
 * @param value - The value to check.
 * @returns {boolean} True if the value is defined, not null, and not NaN, false otherwise.
 *
 * @example
 * const maybeNumber = '123';
 * const maybeNull = null;
 * console.log(isDefinedAndNotNull(maybeNumber)); // Output: true
 * console.log(isDefinedAndNotNull(maybeNull)); // Output: false
 * console.log(isDefinedAndNotNull(NaN)); // Output: false
 */
export function isDefinedAndNotNull(value: any) {
    return (
        typeof value !== "undefined" &&
        value !== null &&
        (typeof value !== "number" || !isNaN(value))
    );
}

/**
 * Checks if a given value is non-defined (i.e., `undefined`, `null`, or `NaN` if enabled).
 *
 * @param {any} value - The value to evaluate.
 * @param {boolean} [shouldCheckNaN=true] - Whether to include a check for `NaN` values.
 * @returns {boolean} - Returns `true` if the value is `undefined`, `null`, or `NaN` (when enabled); otherwise `false`.
 */
export const isValueNonDefined = (
    value: any,
    shouldCheckNaN: boolean = true
) => {
    if (value === undefined || value === null) {
        return true;
    }

    if (shouldCheckNaN && typeof value === "number" && isNaN(value)) {
        return true;
    }

    return false;
};

/**
 * Checks if the code is running in a browser environment.
 */
export const isBrowser = () =>
    typeof window !== "undefined" && window.document !== undefined;

/**
 * Checks if the environment is a browser by verifying the availability of the `document` object.
 *
 * @returns {boolean} True if the environment is likely a browser, false otherwise.
 */
export const isDOMSupported = () =>
    !!(
        typeof window !== "undefined" &&
        !!window.document &&
        typeof window.document.createElement === "function"
    );

/**
 * Detects if the current environment is likely a touch device using the client-side media query.
 *
 * @returns {boolean | "unknown"} `true` if the device is likely a touch device, `false` if not a touch device and the environment is a browser,
 *           or `"unknown"` if the environment is not a browser.
 */
export const isTouchDeviceLikely = () =>
    isBrowser()
        ? // Media query check
          window.matchMedia("(pointer: coarse) and (hover: none)").matches ||
          // Touch events check (optional - uncomment if needed)
          // 'ontouchstart' in window ||
          // Navigator API check
          navigator.maxTouchPoints > 0
        : "unknown";

/**
 * Determines whether the current application is running as a Progressive Web App (PWA).
 *
 * @returns {boolean} True if the application is likely a PWA, false otherwise.
 *
 * @example
 * if (isPwa()) {
 *   // Enable PWA-specific features
 * } else {
 *   // Display a prompt to install the PWA
 * }
 */
export const isPwa = () => {
    return !!(
        (
            window.navigator.standalone ||
            window.matchMedia("(display-mode: standalone)").matches
        )
        // eslint-disable-next-line max-lines
    );
};

/**
 * Determines whether the current application is running as a Progressive Web App (PWA).
 * @description isPwa function is more correct
 *
 * @returns {boolean} True if the application is likely a PWA, false otherwise.
 */
export const isProbablyPwa = () => {
    return !!(
        // Check for standalone mode availability (more reliable for detecting PWAs)
        (
            window.matchMedia("(display-mode: standalone)").matches ||
            // Check for legacy 'standalone' property (considered less reliable)
            window.navigator.standalone ||
            // Check for service worker registration (strong indicator of PWA)
            ("serviceWorker" in navigator && navigator.serviceWorker.controller)
        )
    );
};
