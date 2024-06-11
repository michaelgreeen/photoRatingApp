import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { MenuScreenProps } from "../../props";
import styles from "../styles/styles";

const MenuScreen: React.FC<MenuScreenProps> = ({ navigation }) => {
  return (
    <View style={[styles.buttonContainer, { flexDirection: "column" }]}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LikedPhotos")}
        >
          <Text style={styles.buttonText}>Liked Photos</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Gallery")}
        >
          <Text style={styles.buttonText}>Gallery</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddPhoto")}
        >
          <Text style={styles.buttonText}>Add Photos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuScreen;
