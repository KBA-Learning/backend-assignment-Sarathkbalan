import jwt from "jsonwebtoken";
import dotenv from "dotenv"
 
dotenv.config();
const authenticate=(req,res,next)=>{
    const cookie=req.headers.cookie;
    
    if(!cookie){
        console.log("please login")
        res.status(401).send('please login to continue')
    }
    else{

    console.log(cookie);
    const[name,token]=cookie.trim().split('=');
    console.log(name);
    console.log(token);
    if(name=='authToken'){
       const verfied=jwt.verify(token,process.env.SECRET_KEY)
    //    check if login member try to make change by admin verify
        console.log(verfied);
        req.user=verfied.userName
        req.role=verfied.userRole
        
        
        next(); //  back to the route


    }
    else{
        res.status(401).send('error')
        // res is sent one time is error and go to user we only sent response one time only

    }
}
}
export default authenticate;