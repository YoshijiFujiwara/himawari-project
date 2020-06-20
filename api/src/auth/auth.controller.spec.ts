import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { AccessTokenSerializer } from './serializer/access-token.serializer';
import { UserEntity } from './user.entity';

describe('authController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(() => {
    // tslint:disable-next-line:prefer-const
    let jwtService: JwtService;
    // tslint:disable-next-line:prefer-const
    let mailerService: MailerService;
    // tslint:disable-next-line:prefer-const
    let userRepository: UserRepository;

    authService = new AuthService(userRepository, jwtService, mailerService);
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

  describe('signIn', () => {
    it('ログインする', async () => {
      const returnObj: AccessTokenSerializer = {
        accessToken: 'dummyToken',
      };
      jest
        .spyOn(authService, 'signIn')
        .mockImplementation(() => Promise.resolve(returnObj));

      const signInUserDto: SignInUserDto = {
        username: '田中太郎',
        email: 'tanaka@example.com',
        password: 'testtest',
      };
      const result = await authController.signIn(signInUserDto);
      expect(result.accessToken).toBe(returnObj.accessToken);
    });
  });

  // TODO: googleLogin

  // TODO: googleLoginCallback

  describe('me', () => {
    it('ユーザー情報を取得する', () => {
      const mockUser = new UserEntity();
      mockUser.id = 1;
      mockUser.username = 'ひまわり太郎';
      mockUser.email = 'himawari@example.com';

      const result = authController.me(mockUser);
      expect(result.id).toEqual(mockUser.id);
      expect(result.username).toEqual(mockUser.username);
      expect(result.email).toEqual(mockUser.email);
    });
  });
});
