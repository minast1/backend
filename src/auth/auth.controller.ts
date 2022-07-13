/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  RegisterDto } from './dto/Dto';
import { LocalAuthGuard } from './local-auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
         return this.authService.signToken(req.user)
    }
    
    @Post('register')
    async register(@Body() registerData: RegisterDto ) {
        const user = await this.authService.register(registerData);
        return this.authService.signToken(user);
    }
}
