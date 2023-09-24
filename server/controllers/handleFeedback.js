const Designer=require('../models/designerSchema');

const handleFeedback=async (req,res)=>
{
    console.log(req.body);
    const desn=await Designer.updateOne({_id:req.body.c_creator},{$push:{feedbacks:req.body}});
    console.log(desn);
    res.status(201).json('Feedback updated');

}

module.exports=handleFeedback;