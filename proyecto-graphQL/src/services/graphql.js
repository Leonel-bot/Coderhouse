import { buildSchema } from 'graphql';
import { SchemaComposer } from "graphql-compose"
import ProductController from "../controller/product"

import { ProductQueries, ProductMutations } from '../controller/graphql/products';
import { UserQueries, UserMutations } from '../controller/graphql/user';


const schemaComposer =  new SchemaComposer()

schemaComposer.Query.addFields({
    ...ProductQueries,
    ...UserQueries
})

schemaComposer.Mutation.addFields({
    ...ProductMutations,
    ...UserMutations
})


export const graphqlSchema = schemaComposer.buildSchema()

/* export const graphqlSchema = buildSchema(`
    type Query {
        getProducts: [Product],
        getProductById(id: String!): Product
    },

    type Product {
        _id:  String
        name:  String
        description:  String
        code:  String
        price: Int
        stock: Int
        image:  String
        createdAt:  String
        updatedAt:  String
    }
`);


export const graphqlRoot = {
    getProducts: ProductController.get,
    getProductById: ProductController.get
} 
*/