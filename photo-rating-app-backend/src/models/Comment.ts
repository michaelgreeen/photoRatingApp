import mongoose, { Document, Schema } from 'mongoose';
import Counter from './Counter';

export interface IComment extends Document {
    id: number;
    photoId: number;
    text: string;
}

const commentSchema: Schema = new Schema({
    id: { type: Number, index: true, unique: true },
    photoId: { type: Number, ref: 'Photo', required: true },
    text: { type: String, required: true },
}, {
    timestamps: true
});

commentSchema.pre<IComment>('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findByIdAndUpdate({ _id: 'commentId' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
        this.id = counter.seq;
    }
    next();
});

export default mongoose.model<IComment>('Comment', commentSchema);
