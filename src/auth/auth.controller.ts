import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    // Logic for user registration
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginAuthDto: LoginAuthDto) {
    // Logic for user login
    return this.authService.login(loginAuthDto);
  }
}
