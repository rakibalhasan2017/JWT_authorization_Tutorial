import jwt from 'jsonwebtoken';
const checklogin = (req, res, next) => {
    const {authorization} = req.headers;
    console.log(authorization);
    
    try {
        const token = authorization.split(' ')[1];
        if(!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        else {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            console.log(decoded);
            const {name} = decoded;
            req.name = name;
            next();
        }
    }   
    catch(error) {
        console.log("token not provided, something is wrong");
        res.status(400).send("something is wrong in authorization")
    } 
}
export default checklogin;