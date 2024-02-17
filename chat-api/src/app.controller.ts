import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserEntity } from './users/users.entity';

@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() loginDto: LoginDto, @CurrentUser() user) {
    return this.authService.login(user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return new UserEntity(req.user);
  }
}
