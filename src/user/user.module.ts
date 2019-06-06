import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }
