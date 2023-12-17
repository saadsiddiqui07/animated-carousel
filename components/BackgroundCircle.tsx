import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import data from "../data";
import { CIRCLE_SIZE, width } from "../contants";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const BackgroundCircle = ({ scrollX }: { scrollX: SharedValue<number> }) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
      {data.map(({ color }, index) => {
        const inputRange = [
          (index - 0.5) * width,
          index * width,
          (index + 0.5) * width,
        ];

        const animatedCircleStyle = useAnimatedStyle(() => {
          return {
            transform: [
              {
                scale: interpolate(
                  scrollX.value,
                  inputRange,
                  [0, 1, 0],
                  Extrapolation.CLAMP
                ),
              },
            ],
            opacity: interpolate(scrollX.value, inputRange, [0, 0.3, 0]),
          };
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.circle,
              { backgroundColor: color },
              animatedCircleStyle,
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
