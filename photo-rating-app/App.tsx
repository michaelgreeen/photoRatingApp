import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GalleryScreen from "./src/components/GalleryScreen";
import MenuScreen from "./src/components/MenuScreen";
import LikedPhotosScreen from "./src/components/LikedPhotosScreen";
import CommentScreen from "./src/components/CommentScreen";
import AddPhotoScreen from "./src/components/AddPhotoScreen";
import { RootStackParamList } from "./props";

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{
          headerStyle: { backgroundColor: "#f4511e" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Gallery"
          component={GalleryScreen}
          options={{ title: "Photo Gallery" }}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{ title: "Menu Options" }}
        />
        <Stack.Screen
          name="LikedPhotos"
          component={LikedPhotosScreen}
          options={{ title: "Liked Photos" }}
        />
        <Stack.Screen
          name="Comment"
          component={CommentScreen}
          options={{ title: "Comment" }}
        />
        <Stack.Screen
          name="AddPhoto"
          component={AddPhotoScreen}
          options={{ title: "Add New Photo" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
