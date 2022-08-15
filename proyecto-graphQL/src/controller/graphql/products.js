import { ProductModelGraphQl } from "../../models/products";



export const ProductQueries = {
    getAllProducts: ProductModelGraphQl.getResolver('findMany'),
    getProductById: ProductModelGraphQl.getResolver('findById'),
}

export const ProductMutations = {
    createProduct: ProductModelGraphQl.getResolver('createOne'),
    updateProduct: ProductModelGraphQl.getResolver('updateById'),
    deleteProduct: ProductModelGraphQl.getResolver('removeById')
}