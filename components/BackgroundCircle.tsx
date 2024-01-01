import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import data from "../data";
import { CIRCLE_SIZE, width } from "../contants";
import Animated, {
  Extrapolation,
  SharedTransition,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const customTransition = SharedTransition.custom((values) => {
  "worklet";
  return {
    height: withSpring(values.targetHeight),
    width: withSpring(values.targetWidth),
    originX: withSpring(values.targetOriginX),
    originY: withSpring(values.targetOriginY),
  };
});

const BackgroundCircle = ({ scrollX }: { scrollX: SharedValue<number> }) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
      {data.map((item, index) => {
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
              { backgroundColor: item.color },
              animatedCircleStyle,
            ]}
            sharedTransitionTag="circle"
            sharedTransitionStyle={customTransition}
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
