import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './../services/auth.service';
import { User } from './../../users/entities/user.entity';
interface CustomRequest extends Request {
  user?:User
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: CustomRequest) {
    const user = req.user
    return this.authService.generateJWT(user);
  }
}
