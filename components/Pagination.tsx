import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DOT_SIZE, width } from "../contants";
import data from "../data";
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const Pagination = ({ scrollX }: { scrollX: SharedValue<number> }) => {
  const inputRange = [-width, 0, width];

  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(scrollX.value, inputRange, [
            -DOT_SIZE,
            0,
            DOT_SIZE,
          ]),
        },
      ],
    };
  });

  return (
    <View style={styles.pagination}>
      <Animated.View
        style={[
          styles.paginationIndicator,
          {
            position: "absolute",
          },
          animatedViewStyle,
        ]}
      />
      {data.map((item, index) => {
        const inputRange = [
          (index - 0.5) * width,
          index * width,
          (index + 0.5) * width,
        ];

        const animatedDotStyle = useAnimatedStyle(() => {
          return {
            opacity: interpolate(
              scrollX.value,
              inputRange,
              [1, 1.2, 1],
              Extrapolate.CLAMP
            ),
          };
        });
        return (
          <View key={item.key} style={styles.paginationDotContainer}>
            <Animated.View
              style={[
                styles.paginationDot,
                { backgroundColor: item.color },
                animatedDotStyle,
              ]}
            />
          </View>
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  pagination: {
    position: "absolute",
    right: 20,
    bottom: 40,
    flexDirection: "row",
    height: DOT_SIZE,
  },
  paginationDot: {
    width: DOT_SIZE * 0.4,
    height: DOT_SIZE * 0.4,
    borderRadius: DOT_SIZE * 0.2,
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 1.5,
    borderColor: "lightgray",
  },
});
