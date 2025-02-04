import {Router} from "express";
import authenticate from "../middleware/authenticate.js";
import adminCheck from "../middleware/admincheck.js";


const adminauth=Router();

const Book=new Map()

adminauth.post('/addbook',authenticate,adminCheck,(req,res)=>{
          try{
          
           
          if(req.role == "Admin"){
            
          const{Bookname,SalePrice, MRP, Weight}=req.body;
          if(Book.get(Bookname)){
              res.status(400).json({msg:"Bad Request"})
          }else{
              Book.set(Bookname,
                {SalePrice,
                 MRP,
                 Weight
               })
              res.status(201).send(Book.get(Bookname))

          }}else{
                res.status(403).json({msg:"you are not allowed to do this"})
          }
      }
      catch{

        res.status(500).send("internal server error")
      }
      });
      
      

      adminauth.get('/getdetails',(req,res)=>{
        try
        {
            const name=req.body.Bookname
            console.log(name);

            const Books=Book.get(name)
            if(Books){
                
                res.status(200).json({data:Books})
                console.log(Books);
                
            }else{
                res.status(404).send("bookdetails  not found")
                console.log("bookdetails  not found");
                
            }
            
        }
        catch{
            res.status(500).send("internal server error")
        }
      });
      export default adminauth;
