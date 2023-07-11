import mongoose, { Document, Schema} from "mongoose";


export interface IData extends Document{
    
}

export interface IDocument extends Document {
    user: mongoose.Schema.Types.ObjectId,
    name:string,
    data: {
        version: string;
        document_data: any;
        date_created: string;
        date_modified: string}[],
    current_version: string,
    collaborators: [mongoose.Schema.Types.ObjectId],
}

const Data = {
    version: {type: String},
    document_data: {type: Schema.Types.Mixed},
    date_created: {type: String},
    date_modified: {type: String},
    _id: false
}

const DocumentSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name:{type: String, default:""},
    data: [Data],
    current_version: {type: String},
    collaborators: [mongoose.Schema.Types.ObjectId],
})

export default mongoose.model<IDocument>('Document', DocumentSchema,"documents")