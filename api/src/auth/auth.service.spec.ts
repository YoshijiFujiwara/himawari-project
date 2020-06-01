import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describ('signup', () => {
    it('疎通確認', async () => {
      const result = await service.signup();
      expect(result.message).toEqual('これはダミーです。');
    })
  })
});
