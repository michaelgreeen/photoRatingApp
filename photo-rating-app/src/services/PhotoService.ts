import { API_BASE_URL } from "../config";

const fetchOptions = (method: string, data?: object) => ({
    method,
    headers: {
        'Content-Type': 'application/json'
    },
    body: data ? JSON.stringify(data) : null
});

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Server Error');
    }
    return response.json();
};

export const addPhoto = async (url: string) => {
    const response = await fetch(`${API_BASE_URL}/api/photos`, fetchOptions('POST', { url }));
    return handleResponse(response);
};

export const fetchTopPhotos = async () => {
    const response = await fetch(`${API_BASE_URL}/api/photos/top`, fetchOptions('GET'));
    return handleResponse(response);
};

export const fetchPhotoById = async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/api/photos/${id}`, fetchOptions('GET'));
    return handleResponse(response);
};

export const likePhoto = async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/api/photos/like/${id}`, fetchOptions('POST'));
    return handleResponse(response);
};

export const dislikePhoto = async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/api/photos/dislike/${id}`, fetchOptions('POST'));
    return handleResponse(response);
};

export const fetchAllPhotos = async () => {
    const response = await fetch(`${API_BASE_URL}/api/photos`, fetchOptions('GET'));
    return handleResponse(response);
};
