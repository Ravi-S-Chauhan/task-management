import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentails.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepositroy extends Repository<User> {
  async createUser(authCredentailsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentailsDto;
    const user = this.create({
      username,
      password,
    });
    await this.save(user);
  }
}
