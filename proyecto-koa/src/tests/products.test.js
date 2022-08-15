import ProductApi from "../api/product"
import supertest from "supertest";
import Server from "../services/server"
import { ProductModel } from "../models/products"
import MongoDBClient from '../services/mongo';
import Chai from "chai"


const { expect } = Chai



describe('Productos', () => {

    let request = null
    let idProduct = null

    before(async () => {
        console.log('Before test');
        request = supertest(Server)
        await MongoDBClient.connect();
        await ProductModel.deleteMany()
    })

    after(async () => {
        console.log('Aftereach test');
        await MongoDBClient.disconnect()
        Server.close();
    })


    it('deberia traer un array vacio si pido los productos con la db vacia', async () => {
        const { body } = await request.get('/api/product');
        expect(body).to.have.property('response').with.lengthOf(0);
    })

    it('deberia traer un array vacio si pido un producto con la db vacia', async () => {
        const { body } = await request.get('/api/product/62e4291834437dc0401ae209');
        expect(body).to.have.property('response').with.equal(null);
    })

    it('tiene que dar error si no le paso el body completo de un producto', async () => {

        const { body } = await request.post('/api/product')
        const { error } = body

        expect(error._message).equal('Product validation failed')
        expect(error.status).equal(400)
    })


    it('crear objeto correctamente', async () => {

        const body = {
            name: "Producto nuevo",
            description: "Descripcion",
            code: "ABC-123",
            price: 3000,
            stock: 10,
            image: "https://picsum.photos/200"
        }

        const { _body, status } = await request.post('/api/product').send(body);

        expect(status).equal(200)
        expect(_body).to.have.property('response')
        expect(_body.response._id).to.be.a('string');

        idProduct = _body.response._id
    })


    it('recupero un producto por su id', async () => {
        const { body, status } = await request.get(`/api/product/${idProduct}`)

        expect(status).equal(200)
        expect(body).to.have.property('response')
        expect(body.response._id).to.be.a('string');

    })

    it('debe fallar si le paso mal el id de un producto', async () => {
        const { body } = await request.delete(`/api/product/121212`)

        expect(body).to.have.property('error')
        expect(body.error.name).equal('CastError')
    })

    it('debe actualizar un producto', async () => {
        const data = {
            name: "Producto nuevo actualizado",
            description: "Descripcion",
        }
        const {body, status} = await request.put(`/api/product/${idProduct}`).send(data)
        
        expect(status).equal(200)
        expect(body).to.have.property('response')
        expect(body.response.name).equal(data.name)
        expect(body.response.description).equal(data.description)
    })


    it('borrar un producto correctamente', async () => {
        const { body } = await request.delete(`/api/product/${idProduct}`)
        expect(body).equal(true)
    })

})