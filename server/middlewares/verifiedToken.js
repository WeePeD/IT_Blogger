import jwt from 'jsonwebtoken';

export default function(req,res,next) {
    const token = req.header('auth-token')
    try {
        if (!token) res.status(401)
                       .send('Access denied !')

        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log('This is the verified section  '+verified)
        next()
    } catch (e) {
        res.status(500)
           .send(e)
    }
}