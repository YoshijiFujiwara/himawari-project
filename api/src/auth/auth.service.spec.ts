import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { SignInUserDto } from './dto/sign-in-user.dto';

const mockUserRepository = () => ({
  createUser: jest.fn(),
  validatePassword: jest.fn(),
});
const mockJwtService = () => ({
  signAsync: jest.fn(),
});
const mockMailerService = () => ({});

describe('AuthService', () => {
  let authService;
  let jwtService;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: JwtService, useFactory: mockJwtService },
        { provide: MailerService, useFactory: mockMailerService },
      ],
    }).compile();

    authService = await module.get<AuthService>(AuthService);
    jwtService = await module.get<JwtService>(JwtService);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('signUp', () => {
    it('userRepositoryを通して、ユーザーを新規作成できる', async () => {
      userRepository.createUser.mockResolvedValue(undefined);
      jest
        .spyOn(authService, 'sendAuthenticationEmail')
        .mockImplementation(() => Promise.resolve(undefined));

      expect(userRepository.createUser).not.toHaveBeenCalled();
      const signUpUserDto: SignUpUserDto = {
        username: '田中太郎',
        email: 'tanaka@example.com',
        password: 'testtest',
      };
      const result = await authService.signUp(signUpUserDto);
      expect(userRepository.createUser).toHaveBeenCalled();
      expect(result).toEqual(undefined);
    });
  });

  describe('signIn', () => {
    it('userRepositoryを通して、ユーザーがログインし、トークンを返却できること', async () => {
      userRepository.validatePassword.mockResolvedValue('田中太郎');
      jwtService.signAsync.mockResolvedValue('dummytoken');

      expect(userRepository.validatePassword).not.toHaveBeenCalled();
      expect(jwtService.signAsync).not.toHaveBeenCalled();

      const signInUserDto: SignInUserDto = {
        username: '田中太郎',
        password: 'testtest',
      };
      const result = await authService.signIn(signInUserDto);
      expect(userRepository.validatePassword).toHaveBeenCalled();
      expect(jwtService.signAsync).toHaveBeenCalled();
      expect(result).toEqual({
        accessToken: 'dummytoken',
      });
    });
  });
});
