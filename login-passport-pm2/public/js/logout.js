
const btnLogout = document.getElementById('logout')
btnLogout.addEventListener('click', ev => {
    const headers = new Headers()
    headers.append("content-type", "application/json")
    const request = {
        headers: headers,
        method: 'POST'
    }
    return fetch("http://localhost:8080/logout", request)
        .then(response => window.location.href = '/login')
        .catch(err => console.log(err))
})