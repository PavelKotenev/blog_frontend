export class FormatedDate {
    year: string;
    month: string;
    day: string;
    hourMinutes: string;

    constructor(epochMs: number) {
        const date = new Date(epochMs);

        this.day = String(date.getDate());
        this.month = date.toLocaleString("en", { month: "short" }).toUpperCase();
        this.year = String(date.getFullYear());

        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        this.hourMinutes = `${hours}:${minutes}`;
    }
}