import { Injectable, UnauthorizedException } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from '../dto/auth.dto';
import { ERROR_PASSWORD, USER_NOT_FOUND } from './consts';
import { AuthModel } from 'src/models/auth.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel)  private readonly authModel: typeof AuthModel,
    private readonly jwtService: JwtService,
  ) {}
  // не совсем относится к авторизации, но эта история нужна мне только для авторизации, так что оставил, лучше выносить в отдельный user.service
  async createUser(dto: AuthDto) {
    const salt = await genSalt(15);
    const newUser = new this.authModel({
      email: dto.login,
      password_hash: await hash(dto.password, salt),
    });
    return newUser.save();
  }

  async findUser(email: string) {
    return this.authModel.findOne({ where: { email } });
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<AuthModel, 'email'>> {
    const user = await this.findUser(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND);
    }
    const isCorrectPassword = await compare(password, user.password_hash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(ERROR_PASSWORD);
    }
    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
