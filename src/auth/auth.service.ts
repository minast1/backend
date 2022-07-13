/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/Dto';
import * as argon from 'argon2'
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private configService: ConfigService,
        private jwt: JwtService
    ) { }
    
      
    async validateUser(loginData: LoginDto): Promise<Omit<User, "password" | null>> {
        const user = await this.prisma.user.findFirst({ where: { email: loginData.email } });
        
        if (user) {
              const verifyPassword = await argon.verify(user.password, loginData.password);
            if (verifyPassword) {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { password, ...rest } = user;
                 return rest;
            }
          
        }
        return null  //{ access_token: await this.signToken(user.id, user.email) }
    }
    


    async register(data: RegisterDto): Promise<{id:string, email:string}> {
         
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
              
            return user;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException({ message: 'Email address already exists' })
                }
            }
        }
       
        
    }

    async signToken(user:{email:string, id:string}): Promise<{access_token: string}> {
        const payload = { sub: user.id, email:user.email };
        const token = await this.jwt.signAsync(payload)
          
        return {
            access_token: token
        };
    }

   
}
