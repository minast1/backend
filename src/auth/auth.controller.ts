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
        return req.user// return this.authService.validateUser(loginData)
    }
    
    @Post('register')
    register(@Body() registerData: RegisterDto ) {
       return this.authService.register(registerData)
    }
}
