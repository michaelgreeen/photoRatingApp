import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  FlatList,
  Dimensions,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import * as PhotoService from "../services/PhotoService";
import * as CommentService from "../services/CommentService";
import { CommentScreenProps } from "../../props";
import { IPhoto } from "../models/Photo";
import { IComment, NewComment } from "../models/Comment";

const { height } = Dimensions.get("window");

const CommentScreen: React.FC<CommentScreenProps> = ({ navigation, route }) => {
  const photoId = route.params.photoId;
  const [photoDetails, setPhotoDetails] = useState<IPhoto | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [isAddingComment, setIsAddingComment] = useState(false);

  useEffect(() => {
    if (photoId === undefined) {
      return;
    }
    PhotoService.fetchPhotoById(photoId)
      .then(setPhotoDetails)
      .catch((error) => console.error("Failed to fetch photo details", error));

    CommentService.fetchCommentsByPhotoId(photoId)
      .then(setComments)
      .catch((error) => console.error("Failed to fetch comments", error));
  }, [photoId]);

  const handleAddCommentPress = () => {
    setIsAddingComment(true);
  };

  const handleCommentSubmit = () => {
    if (!newCommentText.trim()) {
      alert("Please enter a comment.");
      return;
    }
    const newComment: NewComment = {
      photoId: photoId,
      text: newCommentText,
    };
    CommentService.addComment(newComment)
      .then((comment) => {
        setComments((prev) => [comment, ...prev]);
        setNewCommentText("");
        setIsAddingComment(false);
        Keyboard.dismiss();
      })
      .catch((error) => {
        console.error("Failed to add comment", error);
        alert("Failed to add comment");
      });
  };

  return (
    <View style={styles.container}>
      {photoDetails && (
        <Image
          source={{ uri: photoDetails.url }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      {isAddingComment && (
        <TextInput
          style={styles.input}
          placeholder="Enter your comment here..."
          value={newCommentText}
          onChangeText={setNewCommentText}
          onSubmitEditing={handleCommentSubmit}
          autoFocus={true}
        />
      )}
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.comment}>{item.text}</Text>
        )}
        ListHeaderComponent={<Text style={styles.header}>Comments</Text>}
        style={styles.commentsList}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddCommentPress}
      >
        <Text style={styles.addButtonText}>Add Comment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    height: height / 2,
  },
  commentsList: {
    flex: 1,
  },
  comment: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CommentScreen;
