import { EchoController } from "../../../../backoffice/adapter/in/EchoController";
import { Test, TestingModule } from "@nestjs/testing";
import { EchoService } from "../../../../backoffice/application/service/EchoService";
import { NotFoundException } from "@nestjs/common";

class MockEchoPort {
  async getEcho() {
    return 'Hello, world!';
  }
}
class MockGetEchoUseCase{
  async printEcho(){
    return 'Hello, world!';
  }
}

describe('EchoController', () => {
  let controller: EchoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EchoController],
      providers: [
        EchoService,
        {
          provide: 'EchoPort',
          useClass: MockEchoPort,
        },
        {
          provide: 'GetEchoUseCase',
          useClass: MockGetEchoUseCase,
        }
      ],
    }).compile();

    controller = module.get<EchoController>(EchoController);
  });

  it('should return the echo', async () => {
    const result = await controller.getEcho();
    expect(result).toEqual('Hello, world!');
  });
});

describe('EchoService', () => {
  let service: EchoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EchoService,
        {
          provide: 'EchoPort',
          useClass: MockEchoPort,
        },
      ],
    }).compile();

    service = module.get<EchoService>(EchoService);
  });

  it('should return the echo', async () => {
    const result = await service.printEcho();
    expect(result).toEqual('Hello, world!');
  });

  it('should throw NotFoundException when echo is not found', async () => {
    jest.spyOn(MockEchoPort.prototype, 'getEcho').mockImplementationOnce(async () => null);
    await expect(service.printEcho()).rejects.toThrowError(NotFoundException);
  });
});
