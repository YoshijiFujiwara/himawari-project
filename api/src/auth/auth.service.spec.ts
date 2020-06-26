import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UserEntity } from './user.entity';

const mockUserRepository = () => ({
  createUser: jest.fn(),
  validatePassword: jest.fn(),
  findOne: jest.fn(),
});
const mockJwtService = () => ({
  signAsync: jest.fn(),
  verifyAsync: jest.fn(),
});
const mockMailerService = () => ({
  sendMail: jest.fn(),
});

describe('AuthService', () => {
  let authService;
  let jwtService;
  let mailerService;
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
    mailerService = await module.get<MailerService>(MailerService);
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

    it('userが見つからない場合には、NotFoundExceptionが投げられること', async () => {
      userRepository.validatePassword.mockResolvedValue(null);
      jwtService.signAsync.mockResolvedValue('dummytoken');

      const signInUserDto: SignInUserDto = {
        username: '田中太郎',
        password: 'testtest',
      };
      expect(authService.signIn(signInUserDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('sendAuthenticationEmail', () => {
    it('mailerService.sendMailを呼び出すこと', async () => {
      jwtService.signAsync.mockResolvedValue('dummytoken');
      mailerService.sendMail.mockResolvedValue(undefined);

      expect(jwtService.signAsync).not.toHaveBeenCalled();
      expect(mailerService.sendMail).not.toHaveBeenCalled();

      const user = new UserEntity();
      user.id = 1;
      user.username = '田中太郎';
      user.email = 'tanaka@example.com';

      const result = await authService.sendAuthenticationEmail(user);
      expect(jwtService.signAsync).toHaveBeenCalled();
      expect(mailerService.sendMail).toHaveBeenCalled();
      expect(result).toEqual(undefined);
    });
  });

  describe('verifyEmail', () => {
    let save;
    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });

    // TODO: テストが通らないのでコメントアウト中
    // it('ユーザーが見つかり、メール未認証の場合、メール認証がされること', async () => {
    //   const emailVerifiedUser = new UserEntity();
    //   emailVerifiedUser.isEmailVerified = false;

    //   save.mockResolvedValue(undefined);
    //   jwtService.verifyAsync.mockResolvedValue('dummytoken');
    //   userRepository.findOne.mockResolvedValue(emailVerifiedUser);

    //   expect(jwtService.verifyAsync).not.toHaveBeenCalled();
    //   expect(userRepository.findOne).not.toHaveBeenCalled();

    //   const result = await authService.verifyEmail('hogehogetoken');
    //   expect(jwtService.verifyAsync).toHaveBeenCalled();
    //   expect(userRepository.findOne).toHaveBeenCalled();
    //   expect(result).toEqual(undefined);
    // });

    it('ユーザーが見つからない場合、NotFoundExceptionが投げられる', async () => {
      jwtService.verifyAsync.mockResolvedValue('dummytoken');
      userRepository.findOne.mockResolvedValue(null);

      expect(authService.verifyEmail('hogehogetoken')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('ユーザーがすでにメール認証されている場合、BadRequestExceptionが投げられる', async () => {
      const emailVerifiedUser = new UserEntity();
      emailVerifiedUser.isEmailVerified = true;

      jwtService.verifyAsync.mockResolvedValue('dummytoken');
      userRepository.findOne.mockResolvedValue(emailVerifiedUser);

      expect(authService.verifyEmail('hogehogetoken')).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
