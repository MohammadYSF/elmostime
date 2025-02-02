export function toPersianNumbers(num) {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return num.toString().replace(/\d/g, (d) => persianDigits[d]);
}
export const API_URL = import.meta.env.VITE_API_URL;