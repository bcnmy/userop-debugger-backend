export function trim(numberString: string, decimalPlaces: number): string {
    const regex = new RegExp(`^-?\\d+(?:\\.\\d{0,${decimalPlaces}})?`);
    const match = numberString.match(regex);
    return match ? match[0] : numberString;
}