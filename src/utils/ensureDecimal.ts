export const ensureDecimal = (number: number): string => {
    const numberStr = number.toString();
    if (numberStr.includes(".")) {
        return `₹ ${numberStr}`;
    }
    return `₹ ${numberStr}.00`;
};