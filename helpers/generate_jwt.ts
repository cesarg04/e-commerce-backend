import jwt from 'jsonwebtoken'

export const generate_jwt  = (uid: string) => {

    return new Promise((resolve, reject) => {
        const payload = { uid }
        const secret_privary_key: string = process.env.SECRETORPRIVATEKEY || ''
        jwt.sign(payload, secret_privary_key, {
            expiresIn: '1h'
        }, (err, token) => {
            
            if (err) {
                console.log(err);
                reject( 'Generate the token is dificult' )
            }else{
                resolve(token)
            }
        })

    })


}