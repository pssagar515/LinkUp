const mongoose=require('mongoose');

const dataSchema=new mongoose.Schema({
    key:String,
    value:Number,
});

module.exports=mongoose.model('Data', dataSchema);