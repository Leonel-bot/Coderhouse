const socket = io.connect()


const tableBody = document.getElementById('table_body')
const formPorduct = document.getElementById('form_product')
const img = document.getElementById('imagen')
formPorduct.addEventListener('submit', (ev) => {
    ev.preventDefault()
    const data = {
        title: ev.target[0].value,
        price: ev.target[1].value,
        thumbnail: ev.target[2].value
    }
    createProduct(data).then(res => {
        socket.emit('add_product', res)
        addElement(data)
        formPorduct.reset()
    })
})
socket.on('response', (data) => {
    addElement(JSON.parse(data))
})


const createProduct = (body) => {
    const headers = new Headers()
    headers.append("content-type", "application/json")
    const request = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(body)
    }
    return fetch("http://localhost:8080/api/productos", request)
        .then(response => response.json())
        .catch(err => console.log(err))
}

const addElement = (d) => {
    const {title, price, thumbnail } = d
    const tr = document.createElement('tr');
    var el =
        `<td><img src=${thumbnail} alt="" srcset="" width="30px"></td>
        <td>${title}</td>
        <td>${price}</td>
        `
    tr.innerHTML = el;
    tableBody.appendChild(tr);
}