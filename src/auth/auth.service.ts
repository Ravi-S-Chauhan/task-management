import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentails.dto';
import { User } from './user.entity';
import { UsersRepositroy } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepositroy)
    private userRepository: UsersRepositroy,
  ) {}

  async signUp(authCredentailsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentailsDto);
  }
  //
}
