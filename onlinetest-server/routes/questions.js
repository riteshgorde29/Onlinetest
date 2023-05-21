const express=require('express')
const router=express.Router()
const mongodb=require('mongodb')

router.get('/get-que',async(req,res,next)=>{
    try{
    var url="mongodb+srv://u1:p1@8am-nit-cluster.xicucwz.mongodb.net/test"
    var mongoClient= mongodb.MongoClient
    var server=await mongoClient.connect(url)
    var db=server.db('school')
    var collection=db.collection('questions')
    var result=await collection.aggregate([{ $sample: { size: 5} }]).toArray()
    res.send(result)
    }catch(e){
        res.send(e)
    }
})

module.exports=router;