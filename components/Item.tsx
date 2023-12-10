import { Animated, StyleSheet, Text, View } from "react-native";
import React from "react";
import { height, width } from "../contants";

interface Props {
  type: string;
  imageUri: any;
  heading: string;
  description: string;
  key: string;
  color: string;
}

interface ItemProps extends Props {
  scrollX: Animated.Value;
  index: number;
}

const Item = ({
  imageUri,
  heading,
  description,
  scrollX,
  index,
}: ItemProps) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const inputOpacityRange = [
    (index - 0.3) * width,
    index * width,
    (index + 0.3) * width,
  ];
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });

  const translateXHeading = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.2, 0, -width * 0.2],
  });

  const translateXDescription = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.7, 0, -width * 0.7],
  });

  const opacity = scrollX.interpolate({
    inputRange: inputOpacityRange,
    outputRange: [0, 1, 0],
  });
  return (
    <View style={styles.itemStyle}>
      <Animated.Image
        source={imageUri}
        style={[styles.imageStyle, { transform: [{ scale }] }]}
      />
      <View style={styles.textContainer}>
        <Animated.Text
          style={[
            styles.heading,

            { opacity, transform: [{ translateX: translateXHeading }] },
          ]}
        >
          {heading}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.description,
            { opacity, transform: [{ translateX: translateXDescription }] },
          ]}
        >
          {description}
        </Animated.Text>
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  itemStyle: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: width * 0.75,
    height: width * 0.75,
    resizeMode: "contain",
    flex: 1,
  },
  textContainer: {
    alignItems: "flex-start",
    alignSelf: "flex-end",
    flex: 0.5,
  },
  heading: {
    color: "#444",
    textTransform: "uppercase",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 5,
  },
  description: {
    color: "lightgray",
    fontWeight: "600",
    textAlign: "left",
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16.5,
  },
});
