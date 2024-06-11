import mongoose from 'mongoose';

export const connectToDatabase = () => {
    const dbUri = "mongodb://localhost:27017/photoApi";
    mongoose.connect(dbUri)
        .then(() => console.log('Database connected'))
        .catch((error) => console.error('db error', error));
};
