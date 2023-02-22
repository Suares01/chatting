import { JwtService } from '@infra/jwt/jwt-service';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { IsPublic } from '../decorators/is-public.decorator';
import { AuthRequestDto } from '../dtos/auth-request.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';

@Controller()
export class AuthenticationController {
  constructor(private readonly jwtService: JwtService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Request() req: AuthRequestDto) {
    const { id, email, username } = req.user;

    const accessToken = this.jwtService.access({ email, username }, id);

    const refreshToken = this.jwtService.refresh(id);

    return { accessToken, refreshToken };
  }

  @IsPublic()
  @UseGuards(RefreshTokenGuard)
  @Get('refreshtoken')
  refreshToken(@Request() req: AuthRequestDto) {
    const { id, email, username } = req.user;

    const accessToken = this.jwtService.access({ email, username }, id);

    return { accessToken };
  }
}
