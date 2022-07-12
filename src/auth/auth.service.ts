/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
      
    login() {
        
        return 'Logged in successfully'
    }
    
    register():string {
        return 'Successfully signed up'
    }
}
