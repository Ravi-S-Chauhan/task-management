import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentails.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signIn(
    @Body() authCredentailsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentailsDto);
  }

  @Post('/signup')
  createUser(@Body() authCredentailsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentailsDto);
  }
}
