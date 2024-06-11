import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";

export type RootStackParamList = {
  Gallery: undefined;
  Menu: undefined;
  LikedPhotos: undefined;
  Comment: { photoId: number };
  AddPhoto: undefined;
};

export interface LikedPhotosProps {
  navigation: NavigationProp<RootStackParamList, "LikedPhotos">;
}

export interface MenuScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

export interface GalleryScreenProps {
  navigation: NavigationProp<RootStackParamList, "Gallery">;
}

export interface AddPhotoScreenProps {
  navigation: NavigationProp<RootStackParamList, "AddPhoto">;
}

type CommentScreenRouteProp = RouteProp<RootStackParamList, "Comment">;

export interface CommentScreenProps {
  navigation: NavigationProp<RootStackParamList, "Comment">;
  route: CommentScreenRouteProp;
}

export { RouteProp };
