/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/Dto';
import * as argon from 'argon2'
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private configService:ConfigService) { }
    
      
    async login(loginData: LoginDto) {
        const user = await this.prisma.user.findFirst({ where: { email: loginData.email } });
        if (!user) throw new NotFoundException({ message: 'Email or password does not exist' });
        const verifyPassword = await argon.verify(user.password, loginData.password);
        if (!verifyPassword) throw new UnauthorizedException({ message: 'Email or password does not exist' });
        console.log('Successfully logged in ')
    }
    
    async register(data:RegisterDto):Promise<Omit<User, 'password'>> {
         
        const hash = await argon.hash(data.password);

        try {
            const user = await this.prisma.user.create({
            data: {
                email: data.email, 
                password : hash 
            },
            select: {
                email: true,
                id: true,
            
            }
            }); 
            return user
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException({ message: 'Email address already exists' })
                }
            }
        }
       
        
    }
}
