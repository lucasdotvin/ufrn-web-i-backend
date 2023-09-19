import { MedicineService } from "../service/medicineService";
import { Request, Response } from 'express';
import {AuthenticatedRequest} from "../middleware/authMiddleware";
import { Controller } from "./controller";
import {MedicineResource} from "../resources/medicineResource";

export class MedicineController extends Controller{
    private medicineService: MedicineService;

    constructor(medicineService: MedicineService) {
        super();

        this.medicineService = medicineService;
    }

    public async index (request: Request, response: Response) {
        const userId = (request as AuthenticatedRequest).userId;

        try {
            const medicines = await this.medicineService.getByUserId(userId);

            response.json({
                msg: 'Medicines found successfully',
                medicines: medicines.map(MedicineResource.fromMedicine),
            });
        } catch (error: unknown) {
            this.handleError(request, response, error)
        }
    }

    public async create (request: Request, response: Response) {
        const { name, periodicity, startedAt, units } = request.body;
        const userId = (request as AuthenticatedRequest).userId;
    
        try {
            const medicine = await this.medicineService.create(userId, name, periodicity, startedAt, units);
        
            response.json({
                msg: 'Medicine created successfully',
                medicine: MedicineResource.fromMedicine(medicine),
            });
        } catch (error: unknown) {
            this.handleError(request, response, error)
        }
    }
}
