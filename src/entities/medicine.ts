export class Medicine {
    public id: number;

    public userId: number;

    public name: string;

    public periodicity: number;

    public startedAt: Date;

    public units: number;

    constructor(id: number, userId: number, name: string, periodicity: number, startedAt: Date, units: number) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.periodicity = periodicity;
        this.startedAt = startedAt;
        this.units = units;
    }
}
