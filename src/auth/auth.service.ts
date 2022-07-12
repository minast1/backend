/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    login() {
        return {message: 'Logged in successfully'}
    }
    
    register() {
        return {message: 'Successfully signed up'}
    }
}
