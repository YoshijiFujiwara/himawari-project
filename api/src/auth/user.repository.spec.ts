import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { UserEntity } from './user.entity';

const mockSignUpUserDto: SignUpUserDto = {
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
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('ユーザー登録が成功', () => {
      save.mockResolvedValue(undefined);
      expect(
        userRepository.createUser(mockSignUpUserDto),
      ).resolves.not.toThrow();
    });

    it('ユーザー名が重複していた場合に、ConflictExceptionを投げる', () => {
      save.mockRejectedValue({ code: 'ER_DUP_ENTRY' });
      expect(userRepository.createUser(mockSignUpUserDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('ユーザー名が重複していた場合以外のエラー時は、InternalServerErrorExceptionを投げる', () => {
      save.mockRejectedValue({ code: 'hogefuga' });
      expect(userRepository.createUser(mockSignUpUserDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('createUserBySocialSignin', () => {
    let save;
    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('SNS連携によるユーザー登録が成功', () => {
      save.mockResolvedValue(undefined);
      expect(
        userRepository.createUserBySocialSignin(mockSignUpUserDto),
      ).resolves.not.toThrow();
    });

    it('ユーザー名が重複していた場合以外のエラー時は、InternalServerErrorExceptionを投げる', () => {
      save.mockRejectedValue({ code: 'ER_DUP_ENTRY' });
      expect(
        userRepository.createUserBySocialSignin(mockSignUpUserDto),
      ).rejects.toThrow(ConflictException);
    });
  });
});
