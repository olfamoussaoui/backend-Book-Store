import { Controller, Post, Get, Body, UseGuards, Put, Param } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../Interfaces/user';
import { LoginDTO, RegisterDTO } from '../user/user.dto';
import { Payload } from '../Interfaces/Playload';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class UserController {

    constructor(private readonly userService: UserService, private readonly authService: AuthService, private readonly jwtService: JwtService) { }
    @UseGuards(AuthGuard('jwt'))
    @Get('api/users')
    findAllUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Post('login')
    async login(@Body() data: LoginDTO): Promise< any | { status: number }> {
        const user = await this.userService.login(data);
        const payload: Payload = {
            username: user.username,
            email: user.email,
        };
        const token = this.jwtService.sign(payload);
        return { user, token };
    }

    @Post('register')
    async register(@Body() data: RegisterDTO) {
        const user = await this.userService.register(data);
        const payload: Payload = {
            username: user.username,
            email: user.email,
        };
        const token = await this.authService.signPayload(payload);
        return { user, token };
    }

    @Put('/update/:id')
    async update(@Body() data: LoginDTO, @Param('id') id) {
        return this.userService.updateProfile(data, id);
    }
}
