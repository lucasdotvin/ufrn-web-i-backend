import { hash, compare } from "bcrypt";
import { UserRepository } from "../repository/userRepository";
import { User } from "../entities/user";

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async signUp(name: string, email: string, plainPassword: string): Promise<User> {
        const hashedPassword = await this.hashPassword(plainPassword);
        const userId = await this.userRepository.store(name, email, hashedPassword);

        return new User(userId, name, email, hashedPassword);
    }

    public async checkIfEmailIsAlreadyInUse(email: string): Promise<boolean> {
        const foundUser = await this.userRepository.findByEmail(email);

        return foundUser !== undefined;
    }

    private async hashPassword(plainPassword: string): Promise<string> {
        return await hash(plainPassword, 10);
    }

    public async signIn(email: string, plainPassword: string): Promise<User> {
        const foundUser = await this.userRepository.findByEmail(email);

        if (foundUser === undefined) {
            throw new Error('User not found');
        }

        const isPasswordValid = await this.comparePassword(plainPassword, foundUser.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return foundUser;
    }

    public async find(id: number): Promise<User> {
        const foundUser = await this.userRepository.find(id);

        if (foundUser === undefined) {
            throw new Error('User not found');
        }

        return foundUser;
    }

    private async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await compare(plainPassword, hashedPassword);
    }
}
