import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { SignUpUserDto } from './dto/sign-up-user.dto';

const mockUserRepository = () => ({
  createUser: jest.fn(),
});

describe('AuthService', () => {
  let authService;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    authService = await module.get<AuthService>(AuthService);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('signUp', () => {
    it('userRepositoryを通して、ユーザーを新規作成できる', async () => {
      userRepository.createUser.mockResolvedValue(undefined);

      expect(userRepository.createUser).not.toHaveBeenCalled();
      const signUpUserDto: SignUpUserDto = {
        username: '田中太郎',
        email: 'tanaka@example.com',
        password: 'testtest',
      };
      const result = await authService.signUp(signUpUserDto);
      expect(userRepository.createUser(signUpUserDto)).toHaveBeenCalled();
      expect(result).toEqual(undefined);
    });
  });
});