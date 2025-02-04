import {Router} from "express";
import authenticate from "../middleware/authenticate.js";

const adminauth=Router();

const Course=new Map()

adminauth.post('/issuecertificate',authenticate,(req,res)=>{
          try{
          
           
          if(req.role == "Admin"){
            
          const{selectCourse,certificateid,CandidateName,selectgrade,issueDate}=req.body;
          if(Course.get(certificateid)){
              res.status(400).json({msg:"Bad Request"})
          }else{
              Course.set(certificateid,
                {selectCourse,
                CandidateName,
                selectgrade,
                issueDate})
              res.status(201).send("certificate added")

          }}else{
                res.status(403).json({msg:"you are not allowed to do this"})
          }
      }
      catch{

        res.status(500).send("internal server error")
      }
      });
      
      

      adminauth.get('/getcourse/',(req,res)=>{
        try
        {
            const name=req.body.certificateid
            console.log(name);

            const Courses=Course.get(name)
            if(Courses){
                
                res.status(200).json({data:Courses})
                console.log(Courses);
                
            }else{
                res.status(404).send("certificateid not found")
                console.log("certificateid not found");
                
            }
            
        }
        catch{
            res.status(500).send("internal server error")
        }
      });
      export default adminauth;
