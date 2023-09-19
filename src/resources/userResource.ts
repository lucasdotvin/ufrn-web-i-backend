import {User} from "../entities/user";

export class UserResource {
    public id: number;

    public email: string;

    public name: string;

    constructor(id: number, email: string, name: string) {
        this.id = id;
        this.email = email;
        this.name = name;
    }

    public static fromUser(user: User): UserResource {
        return new UserResource(user.id, user.email, user.name)
    }
}
