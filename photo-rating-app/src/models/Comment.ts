export interface IComment {
    id: number;
    photoId: number;
    text: string;
}

export type NewComment = Omit<IComment, 'id'>;

