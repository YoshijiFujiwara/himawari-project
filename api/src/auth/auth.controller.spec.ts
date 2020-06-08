import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { JwtService } from '@nestjs/jwt';

describe('authController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(() => {
    // tslint:disable-next-line:prefer-const
    let jwtService: JwtService;
    // tslint:disable-next-line:prefer-const
    let userRepository: UserRepository;

    authService = new AuthService(userRepository, jwtService);
    authController = new AuthController(authService);
  });

  describe('signUp', () => {
    it('ユーザー登録をする', async () => {
      jest
        .spyOn(authService, 'signUp')
        .mockImplementation(() => Promise.resolve(undefined));

      const signUpUserDto: SignUpUserDto = {
        username: '田中太郎',
        email: 'tanaka@example.com',
        password: 'testtest',
      };
      expect(await authController.signUp(signUpUserDto)).toBe(undefined);
    });
  });
});
