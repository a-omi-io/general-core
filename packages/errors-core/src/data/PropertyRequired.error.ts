import ValidationError from "../Validation.error";

/**
 * Custom error class for missing required properties.
 *
 * @extends ValidationError
 */
class PropertyRequiredError extends ValidationError {
    /**
     * The name of the missing property.
     */
    public readonly property: string;

    /**
     * @param property The name of the missing property.
     */
    constructor(property: string, cause?: unknown) {
        super(`No property: ${property}`, cause);
        this.name = "PropertyRequiredError";
        this.property = property;
    }

    public toString(): string {
        return `${this.name}: ${this.message} (property: ${this.property})`;
    }

    public toJSON() {
        return {
            ...super.toJSON(),
            property: this.property,
        };
    }
}

export default PropertyRequiredError;
