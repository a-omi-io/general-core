export function convertSpacesToThinsp(text: string): string {
    return text.trim().replace(/ /g, "&thinsp;");
}
