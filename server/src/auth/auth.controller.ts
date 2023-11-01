import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Пройти аутентификацию',
  })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('signin')
  signIn(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    return this.authService.signIn(email, password);
  }

  @ApiOperation({
    summary: 'Пройти регистрацию',
  })
  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    return this.authService.signUp(email, password);
  }
}
