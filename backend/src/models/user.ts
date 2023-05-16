import mongoose,{ Document ,Schema} from "mongoose";


export interface IUser extends Document {
    email:string,
    full_name:string,
    password:string,
    resetCode : string;
}

const UserSchema = new Schema({
    email: {type:String, required:true},
    full_name: {type:String, required:true},
    password:{type:String, required:true},
    resetCode : String,
})

export default mongoose.model<IUser>('User',UserSchema,'users');