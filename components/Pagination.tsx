import { Animated, StyleSheet, Text, View } from "react-native";
import React from "react";
import { DOT_SIZE, width } from "../contants";
import data from "../data";

const Pagination = ({ scrollX }: { scrollX: Animated.Value }) => {
  const inputRange = [-width, 0, width];
  // move the circle as per the width of the dotsie
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-DOT_SIZE, 0, DOT_SIZE],
  });
  return (
    <View style={styles.pagination}>
      <Animated.View
        style={[
          styles.paginationIndicator,
          {
            position: "absolute",
            transform: [{ translateX: translateX }],
          },
        ]}
      />
      {data.map((item, index) => {
        const inputRange = [
          (index - 0.5) * width,
          index * width,
          (index + 0.5) * width,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [1, 1.2, 1],
          extrapolate: "clamp",
        });
        return (
          <View key={item.key} style={styles.paginationDotContainer}>
            <Animated.View
              style={[
                styles.paginationDot,
                { backgroundColor: item.color, transform: [{ scale }] },
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
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15,
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
