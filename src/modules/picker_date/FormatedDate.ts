export class FormatedDate {
    year: string;
    month: string;
    day: string;
    hourMinutes: string;

    constructor(epochMs: number) {
        const date = new Date(epochMs);

        this.day = String(date.getDate());
        this.month = date.toLocaleString("en", { month: "short" });
        this.month = this.month.charAt(0).toUpperCase() + this.month.slice(1);
        this.year = String(date.getFullYear());

        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        this.hourMinutes = `${hours}:${minutes}`;
    }
}
