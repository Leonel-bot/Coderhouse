import { UserModelGraphQl } from "../../models/users";



export const UserQueries = {
    getAllUsers: UserModelGraphQl.getResolver('findMany'),
    getUserById: UserModelGraphQl.getResolver('findById'),
}

export const UserMutations = {
    createUser: UserModelGraphQl.getResolver('createOne'),
    updateUser: UserModelGraphQl.getResolver('updateById'),
    deleteUser: UserModelGraphQl.getResolver('removeById')
}