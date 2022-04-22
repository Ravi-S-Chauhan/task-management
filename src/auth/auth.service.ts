import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentails.dto';
import { UsersRepositroy } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepositroy)
    private userRepository: UsersRepositroy,
  ) {}

  async signUp(authCredentailsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentailsDto);
  }

  async signIn(authCredentailsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentailsDto;
    const user = this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, (await user).password))) {
      return 'success';
    } else {
      throw new UnauthorizedException('Please check your login Credentails');
    }
  }
}
