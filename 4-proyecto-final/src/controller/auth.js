import createError from "http-errors"


const login = (req, res) => {
    res.json({msg: 'wellcome', user: req.user})
}

const logout = (req, res) => {
     req.session.destroy((error) => {
        if(error) res.json({error : createError(400, error)})
        else res.json({response: 'logout successfully'})
    })
}

export default {
    login,
    logout
}