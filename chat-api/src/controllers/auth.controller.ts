import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../services';
import { Public } from '../decorators';
import { LoginDto } from '../dto';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.service.login(loginDto);
  }
}
