import mongoose, { Document, Schema } from 'mongoose';

interface ICounter extends Document {
    _id: string;
    seq: number;
}

const counterSchema: Schema = new Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

export default mongoose.model<ICounter>('Counter', counterSchema);
