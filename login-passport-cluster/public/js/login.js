const formLogin = document.getElementById('form-login')
const username = document.getElementById('username')
const password = document.getElementById('password')
formLogin.addEventListener('submit', (ev) => {
    ev.preventDefault()
    const headers = new Headers()
    headers.append("content-type", "application/json")
    const request = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({username: username.value, password: password.value})
    }
    return fetch("http://localhost:8080/login", request)
    .then(res => {
        console.log(res);
        if(res.ok) window.location.href = '/'
        else window.location.href = '/login'
    })
    
})