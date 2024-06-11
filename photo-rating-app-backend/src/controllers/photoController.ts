import { Request, Response } from 'express';
import Photo from '../models/Photo';

export const addPhoto = async (req: Request, res: Response): Promise<void> => {
    const { url } = req.body;
    const exists = await Photo.findOne({ url });
    if (exists) {
        res.status(409).send('Photo already exists');
        return;
    }
    const photo = new Photo({ url });
    await photo.save();
    res.status(201).json({ message: 'Created successfully' });
};

export const deletePhotoById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    console.log(id);
    try {
        const result = await Photo.findOneAndDelete({ id: parseInt(id) });
        if (!result) {
            res.status(404).send('Photo not found');
            return;
        }
        res.status(200).send({ message: 'Photo deleted successfully' });
    } catch (error) {
        console.error(`Error deleting photo with ID ${id}:`, error);
        res.status(500).send('Server error');
    }
};


export const fetchPhotoById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const photo = await Photo.findOne({ id: parseInt(id) });
    if (!photo) {
        res.status(404).send('Photo not found');
        return;
    }
    res.status(200).send(photo);
};

export const increasePhotoScore = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        console.log(`Increase Photo Score with id: ${id}`)
        const photo = await Photo.findOneAndUpdate(
            { id: parseInt(id) },
            { $inc: { score: 1 } },
            { new: true }
        );
        if (!photo) {
            res.status(404).send('Photo not found');
            return;
        }
        res.status(200).send(photo);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

export const decreasePhotoScore = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        console.log(`Decrease Photo Score with id: ${id}`)
        const photo = await Photo.findOneAndUpdate(
            { id: parseInt(id) },
            { $inc: { score: -1 } },
            { new: true }
        );
        if (!photo) {
            res.status(404).send('Photo not found');
            return;
        }
        res.status(200).send(photo);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

export const getTopPhotos = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('Getting top photos');
        const photos = await Photo.find({})
            .sort({ score: -1 })
            .limit(10);
        res.status(200).send(photos);
    } catch (error) {
        console.error('Failed to fetch top photos:', error);
        res.status(500).send('Server error');
    }
};

export const getAllPhotos = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('Getting all photos')
        const photos = await Photo.find({});
        res.status(200).send(photos);
    } catch (error) {
        res.status(500).send('Server error');
    }
};
