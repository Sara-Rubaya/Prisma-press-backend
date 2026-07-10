import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"

const cretaToken = (payload : JwtPayload, secret : string, expiresIn : SignOptions) =>{
    const token = jwt.sign(
        payload,
        secret,
        {
        expiresIn
        } as SignOptions );

    return token;

}

const verifyToken = ( token : string, secret : string)=>{
    try {
        const verfiedToken = jwt.verify(token, secret);
        return verfiedToken;
    } catch (error : any) {
        console.log("Token verification failed: ", error);
        throw new Error (error.message);
    }
}

export const jwtUtils = {
    cretaToken,
    verifyToken,
}