import { userStub } from "../test/stubs/user.stubs";

export const UsersService = jest.fn().mockReturnValue({
    getUserById: jest.fn().mockReturnValue(userStub())
})