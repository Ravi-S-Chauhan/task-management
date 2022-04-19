import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepositroy } from './users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepositroy])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
