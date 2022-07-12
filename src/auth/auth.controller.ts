/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/Dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    
    @Post('login')
    login(@Body() loginData:LoginDto) {
        return this.authService.login(loginData)
    }
    
    @Post('register')
    register(@Body() registerData: RegisterDto ) {
       return this.authService.register(registerData)
    }
}
