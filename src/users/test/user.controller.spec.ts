import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";
import { User } from "src/schemas/User.schema";
import { userStub } from "./stubs/user.stubs";
import { HttpException } from "@nestjs/common";

jest.mock("../users.service")

describe('UsersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [UsersController],
            providers: [UsersService, {
                provide: UsersService,
                useValue: {
                    getUserById: jest.fn().mockReturnValue(userStub())
                },
            }]
        }).compile();

        usersController = moduleRef.get<UsersController>(UsersController);
        usersService = moduleRef.get<UsersService>(UsersService);
        jest.clearAllMocks();
    })

    describe('getUser', () => {
        describe("when getUser is called", () => {
            let user: User;

            beforeEach(async () => {
                user = await usersController.getUserById(userStub().userId);
            })

            test("then it should call usersService", () => {
                expect(usersService.getUserById).toBeCalledWith(userStub().userId);
            })

            test('should throw HttpException with 404 status code if invalid ID is provided', async () => {
                const userId = '1';
            
                await expect(usersController.getUserById(userId)).rejects.toThrow(HttpException);
            });
          
            test('should throw HttpException with 404 status code if user not found', async () => {
                const userId = '660fcf0d537c5b43a4e36f71';

                jest.spyOn(usersService, 'getUserById').mockResolvedValue(undefined);
            
                await expect(usersController.getUserById(userId)).rejects.toThrow(HttpException);
            });

            test('then is should return a user', () => {
                expect(user).toEqual(userStub())
            })
        })
    })
})