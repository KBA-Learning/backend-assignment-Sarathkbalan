import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";



dotenv.config();


const userauth=Router();
const user=new Map()



userauth.post("/signup",async (req,res)=>{
          try{
                   
                 
                    
         const {firstName,lastName,userName,userRole,password}=req.body;
        
         if(user.get(userName)){
          res.status(400).send("user already exist")
          console.log("user already exist");
          
         }
     else{
         
                  
          const newpassword=await bcrypt.hash(password,10)
          user.set(userName,{firstName,lastName,userRole,newpassword})
          console.log(user.get(userName));
          res.status(201).send(user.get(userName))
          
         }


          }
          catch{
               res.status(500).send("internal server  error")
          }
         })


             userauth.post("/login",async(req,res)=>{
               try{
                    console.log("hi");
                    
                    const {userName,password}=req.body
                    const result=user.get(userName)
                    console.log(result);
                    
                    if(!result){
                         res.status(400).send("Enter a valid username ")
                    }else{
                         const valid=await bcrypt.compare(password,result.newpassword)
                         console.log(valid);
               if(valid){
             const token = jwt.sign({userName,userRole:result.userRole} ,process.env.SECRET_KEY,{expiresIn:'1h'});
                              
              console.log(token);
              res.cookie("authToken",token,{ httpOnly:true });
              res.status(200).json({message:"Logged in successfully"});
            }
              else{
  
              res.status(401).send("Unauthorized access");
  
       }
    }
               
                   }
                   catch{
                       res.status(500).send("Internal Server Error")
                   }
               })
               userauth.get("/logout",(req,res)=>{
                    res.clearCookie("authToken");
                    res.status(200).send("sucessfully logged out")
        
                })
                      

              
export default userauth;