import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  private _generateVerificationCode() {
    const min = Math.ceil(1000);
    const max = Math.floor(9999);
    return Math.floor(Math.random() * (max - min + 1)) + 1;
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(email: string, password: string): Promise<any> {
    const isUserExist = await this.usersService.findOne(email);

    if (isUserExist) {
      throw new BadRequestException(
        'Пользователь с таким email уже есть в базе',
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.create({
      email,
      password: hashPassword,
    });

    if (!user) {
      throw new BadRequestException();
    }

    const payload = { sub: user.id, email: user.email };

    await this.redisService.set(user.email, this._generateVerificationCode());

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
