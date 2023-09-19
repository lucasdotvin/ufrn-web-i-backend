import { Medicine } from "../entities/medicine";
import {Repository} from "./repository";

export class MedicineRepository extends Repository {
    public async find(id: number): Promise<Medicine|undefined> {
        const medicineData = await this.findWhere(
            "SELECT * FROM medicines WHERE id = ? LIMIT 1",
            [id],
        );

        if (!medicineData) {
            return undefined;
        }

        return this.mapToMedicine(medicineData);
    }

    public async getByUserId(userId: number): Promise<Medicine[]> {
        const medicinesData = await this.getAllWhere(
            "SELECT * FROM medicines WHERE user_id = ?",
            [userId],
        );

        return this.mapToMedicines(medicinesData);
    }

    public async store(userId: number, name: string, periodicity: number, startedAt: Date, units: number): Promise<number> {
        return this.insert(
            "INSERT INTO medicines (user_id, name, periodicity, started_at, units) VALUES (?, ?, ?, ?, ?)",
            [userId, name, periodicity, startedAt, units],
        );
    }

    private mapToMedicine(row: any): Medicine {
        return new Medicine(
            row.id,
            row.user_id,
            row.name,
            row.periodicity,
            new Date(row.started_at),
            row.units,
        );
    }

    private mapToMedicines(rows: Array<any>): Medicine[] {
        return rows.map(this.mapToMedicine)
    }
}
