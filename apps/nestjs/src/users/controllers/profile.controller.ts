import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
  ExecutionContext,
  Request
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('profile')
export class ProfileController {
  constructor(private usersService: UsersService) {}

  @Get('')
  get(@Request() req) {
    const user = req.user
    return this.usersService.findOne(user.sub)
  }



  @Put('')
  update(
    @Request() req,
    @Body() payload: UpdateUserDto,
  ) {
    const user = req.user

    return this.usersService.update(user.sub, payload);
  }

  @Delete('')
  remove(@Request() req) {
    const user = req.user

    return this.usersService.remove(user.sub);
  }
}
