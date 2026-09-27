import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({
    email :{
        type: String,
        required: true
    },
    message:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    phone:{
        type:String
    },
    subject:{
        type: String,
        required: true
    },
},
  {
    timestamps: true,
  }
);

export default mongoose.model("msg", msgSchema);