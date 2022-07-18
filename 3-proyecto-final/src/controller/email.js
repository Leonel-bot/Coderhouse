import { Config } from "../config"
import { sendEmail } from "../services/email"


export const sendEmailNewRegister = async (user) => {
    const dest =  Config.EMAIL
    const subject = 'Nuevo Registro'
    
    const content = `
    <p>Nombre: ${user.username}</p>
    <p>Email: ${user.email}</p>
    <p>Telefono: ${user.phone}</p>
    <p>Edad: ${user.age}</p>
    <p>Direccion: ${user.address}</p>
    `
    try {
        const response = await sendEmail(dest, subject, content)
        return response
    } catch (error) {
        return false
    }
}


export const sendEmailOrder = async (user, products) => {

    const dest =  Config.EMAIL
    const subject = `Nuevo pedido de ${user.username}`

    const content = `
    <p>Email: ${user.email}</p>
    <p>Telefono: ${user.phone}</p>
    <p>Edad: ${user.age}</p>
    <p>Direccion: ${user.address}</p>

    <p style="text-decoration:underline;">Productos</p>
    <ul style="padding: 0;list-style-type: none;">${products.map(product => (`<li>${product.name} - ${product.price}</li>`))}</ul>`

    try {
        const response = await sendEmail(dest, subject, content)
        return response
    } catch (error) {
        return false
    }



}