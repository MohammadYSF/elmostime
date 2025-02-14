import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

export function toPersianNumbers(num) {
    if (num == undefined || num == null) return "";
    if (num.toString().trim().length == 0) return "";
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return num.toString().replace(/\d/g, (d) => persianDigits[d]);
}
export function countHalfHours(startTime, endTime) {
    console.log(startTime, "##", endTime);

    // Convert HH:MM to total minutes
    function timeToMinutes(time) {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    }

    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    return (endMinutes - startMinutes) / 15;
}
const instance = axios.create();
export const api = setupCache(instance);

export const API_URL = import.meta.env.VITE_API_URL;