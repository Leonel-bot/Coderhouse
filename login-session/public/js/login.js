const formLogin = document.getElementById('form-login')
const username = document.getElementById('username')
formLogin.addEventListener('submit', (ev) => {
    ev.preventDefault()

    const headers = new Headers()
    headers.append("content-type", "application/json")
    const request = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({username: username.value})
    }
    return fetch("http://localhost:8080/login", request)
        .then(response => window.location.href = '/')
        .catch(err => console.log(err))
    
})