const formLogin = document.getElementById('form-login')
const username = document.getElementById('signup_username')
const password = document.getElementById('signup_password')
formLogin.addEventListener('submit', (ev) => {
    ev.preventDefault()
    const headers = new Headers()
    headers.append("content-type", "application/json")
    const request = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({username: username.value, password: password.value})
    }
    return fetch("http://localhost:8080/signup", request)
    .then(res => {
        console.log(res);
        if(res.ok) window.location.href = '/login'
        else window.location.href = '/signup'
    })
    
})