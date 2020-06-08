import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

const mockCreateUserDto: CreateUserDto = {
  username: '田中太郎',
  email: 'tanaka@example.com',
  password: 'testtest',
};

describe('UserRepository', () => {
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('signUp', () => {
    let save;
    beforeEach(() => {
      // save関数のモック化
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('ユーザー登録が成功', () => {
      save.mockResolvedValue(undefined);
      expect(
        userRepository.createUser(mockCreateUserDto),
      ).resolves.not.toThrow();
    });

    it('ユーザー名が重複していた場合に、ConflictExceptionを投げる', () => {
      save.mockRejectedValue({ code: 'ER_DUP_ENTRY' });
      expect(userRepository.createUser(mockCreateUserDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('ユーザー名が重複していた場合以外のエラー時は、InternalServerErrorExceptionを投げる', () => {
      save.mockRejectedValue({ code: 'hogefuga' });
      expect(userRepository.createUser(mockCreateUserDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
