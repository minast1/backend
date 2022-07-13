import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password' | null>> {
    const user = await this.authService.validateUser({ email, password });
    if (!user) {
      throw new UnauthorizedException({
        message: 'Email or password does not exist',
      });
    }
    return user;
  }
}
