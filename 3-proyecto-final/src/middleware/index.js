export const authMiddleware = (req, res, next ) => {
    const {passport} = req.session
    if(passport?.user) next()
    else res.json({msj: 'Usuario no autorizado'})
}