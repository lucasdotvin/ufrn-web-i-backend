import {Medicine} from "../entities/medicine";

export class MedicineResource {
    public id: number;

    public name: string;

    public periodicity: number;

    public startedAt: Date;

    public units: number;

    constructor(id: number, name: string, periodicity: number, startedAt: Date, units: number) {
        this.id = id;
        this.name = name;
        this.periodicity = periodicity;
        this.startedAt = startedAt;
        this.units = units;
    }

    public static fromMedicine(medicine: Medicine): MedicineResource {
        return new MedicineResource(medicine.id, medicine.name, medicine.periodicity, medicine.startedAt, medicine.units);
    }
}
