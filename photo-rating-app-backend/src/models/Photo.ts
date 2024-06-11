import mongoose, { Document, Schema } from 'mongoose';
import Counter from './Counter';

interface IPhoto extends Document {
    id: number;
    url: string;
    score: number;
}

const photoSchema: Schema = new Schema({
    id: { type: Number, index: true, unique: true },
    url: { type: String, required: true, unique: true },
    score: { type: Number, default: 0 }
});

photoSchema.pre<IPhoto>('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findByIdAndUpdate({ _id: 'photoId' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
        this.id = counter.seq;
    }
    next();
});

export default mongoose.model<IPhoto>('Photo', photoSchema);
