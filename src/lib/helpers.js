export function toPersianNumbers(num) {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return num.toString().replace(/\d/g, (d) => persianDigits[d]);
}
export function countHalfHours(startTime, endTime) {
    console.log(startTime,"##",endTime);
    
    // Convert HH:MM to total minutes
    function timeToMinutes(time) {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    }

    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    return (endMinutes - startMinutes) / 15;
}
export const API_URL = import.meta.env.VITE_API_URL;