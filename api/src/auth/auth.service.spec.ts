import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('sign_up', () => {
    it('疎通確認', async () => {
      // const result = await service.signUp(createUserDto: CreateUserDto);
      // expect(result.message).toEqual('これはダミーです。');
    });
  });
});
