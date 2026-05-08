function removeTrailingZeros(input: string): string {
    const parts = input.split(".");

    if (parts.length === 2) {
        parts[1] = parts[1]!.replace(/0+$/, "");

        if (parts[1] === "") {
            return parts[0]!;
        }

        return parts.join(".");
    }

    return input;
}

type FormatNumberTypes = "<x,x.x>" | "<x x,x>";

interface IFormatNumberOptions {
    format?: FormatNumberTypes;
}

export function formatNumber(
    input: number | string,
    options: IFormatNumberOptions = {}
): string {
    const numberValue = typeof input === "string" ? parseFloat(input) : input;
    const { format = "<x,x.x>" } = options;

    if (!isNaN(numberValue)) {
        const localedNumber = numberValue.toLocaleString(undefined, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
        });
        const correctedNumber = removeTrailingZeros(localedNumber);

        switch (format) {
            case "<x x,x>": {
                return correctedNumber.replace(/[,.]/g, match =>
                    match === "," ? " " : ","
                );
            }
            default:
                return correctedNumber;
        }
    } else {
        // If not a valid number, return the original input
        return input.toString();
    }
}
