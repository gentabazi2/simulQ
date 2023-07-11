import mongoose,{ Document ,Schema} from "mongoose";
import { IDocument } from "./document";


export interface IUser extends Document {
    email:string,
    full_name:string,
    password:string,
    resetCode : string,
    documents: [IDocument],
    sharedWith: [IDocument]
}

const UserSchema = new Schema({
    email: {type:String, required:true, index: true},
    full_name: {type:String, required:true},
    password:{type:String, required:true},
    resetCode : String,
    documents: [{type: mongoose.Schema.Types.ObjectId, ref: "Document"}],
    sharedWith: [{type: mongoose.Schema.Types.ObjectId, ref:"Document"}]
})

export default mongoose.model<IUser>('User',UserSchema,'users');