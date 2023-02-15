import jwt from 'jsonwebtoken';

export default function(req,res,next) {
    const token = req.header('auth-token')
    if (!token) res.status(401)
                   .send('Access denied !')
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        next()
    } catch (e) {
        res.status(500)
           .send(e)
    }
}