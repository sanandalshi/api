let express=require('express');

let route=express.Router();



route.get('/',(req,res)=>{
res.json({"title":"this is the title!","name":"sanand"});
});


route.post('/post',(req,res)=>{
    const title=req.body.title;
    const content=req.body.content;

res.status(201).json({message:"the req has handles successfully!",
    post:{id:new Date().toISOString,title:title,content:content}
});
    });






module.exports=route;
