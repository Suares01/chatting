import { HashService } from '@infra/hash/hash-service';

export class MockedHashService implements HashService {
  public hash = jest.fn();
  public compare = jest.fn();
}
