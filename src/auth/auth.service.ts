import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentails.dto';
import { UsersRepositroy } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtpayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepositroy)
    private userRepository: UsersRepositroy,
    private jwtServic: JwtService,
  ) {}

  async signUp(authCredentailsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentailsDto);
  }

  async signIn(
    authCredentailsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentailsDto;
    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: jwtpayload = { username };
      const accessToken: string = await this.jwtServic.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login Credentails');
    }
  }
}
