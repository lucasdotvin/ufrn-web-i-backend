import { MedicineRepository } from "../repository/medicineRepository";
import { Medicine } from "../entities/medicine";

export class MedicineService {
    private medicineRepository: MedicineRepository;

    constructor(medicineRepository: MedicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    public async create(userId: number, name: string, periodicity: number, startedAt: Date, units: number): Promise<Medicine> {
        const medicineId = await this.medicineRepository.store(userId, name, periodicity, startedAt, units);

        return new Medicine(medicineId, userId, name, periodicity, startedAt, units);
    }

    public async getByUserId(userId: number): Promise<Medicine[]> {
        return await this.medicineRepository.getByUserId(userId);
    }

    public async find(id: number): Promise<Medicine> {
        const foundMedicine = await this.medicineRepository.find(id);

        if (foundMedicine === undefined) {
            throw new Error('Medicine not found');
        }

        return foundMedicine;
    }
}
