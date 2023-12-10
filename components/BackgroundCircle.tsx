import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import data from "../data";
import { CIRCLE_SIZE, width } from "../contants";

const BackgroundCircle = ({ scrollX }: { scrollX: Animated.Value }) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
      {data.map(({ color }, index) => {
        const inputRange = [
          (index - 0.5) * width,
          index * width,
          (index + 0.5) * width,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 0.3, 0],
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles.circle,
              { backgroundColor: color, transform: [{ scale }], opacity },
            ]}
          />
        );
      })}
    </View>
  );
};

export default BackgroundCircle;

const styles = StyleSheet.create({
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: "absolute",
    alignSelf: "center",
    top: Platform.OS === "ios" ? "25%" : "15%",
  },
});
