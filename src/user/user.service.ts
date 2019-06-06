import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../Interfaces/user';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDTO, RegisterDTO } from '../user/user.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from '../Interfaces/Playload';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async findAll(): Promise<User[]> {
        return await this.userModel.find();
    }

    async login(data: LoginDTO) {
        const { username, password } = data;
        const user = await this.userModel
            .findOne({ username })
            .select('username password  created ');
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        if (await bcrypt.compare(password, user.password)) {
            return this.sanitizeUser(user);
        } else {
            throw new HttpException('Passwords do not match', HttpStatus.UNAUTHORIZED);
        }
    }

    async updateProfile(data: LoginDTO, id: string) {
        const { username, password } = data;
        const user = await this.userModel.findOne({ username });
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const hashed = await bcrypt.hash(password, 10);
        data.password = hashed;
        return this.sanitizeUser(await this.userModel.findByIdAndUpdate(id, data));
    }

    async register(data: RegisterDTO) {
        const { username } = data;
        const user = await this.userModel.findOne({ username });
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const createdUser = new this.userModel(data);
        await createdUser.save();
        return this.sanitizeUser(createdUser);
    }

    async findByPayload(payload: Payload) {
        const { username } = payload;
        return await this.userModel.findOne({ username });
    }

    sanitizeUser(user: User) {
        const sanitized = user.toObject();
        delete sanitized['password'];
        return sanitized;
        // return user.depopulate('password');
    }
}
