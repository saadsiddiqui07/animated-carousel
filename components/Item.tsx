import { StyleSheet, View } from "react-native";
import React from "react";
import { height, width } from "../contants";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface Props {
  type: string;
  imageUri: any;
  heading: string;
  description: string;
  key: string;
  color: string;
}

interface ItemProps extends Props {
  scrollX: SharedValue<number>;
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

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(scrollX.value, inputRange, [0, 1, 0]) }],
    };
  });

  const animatedHeadingStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(scrollX.value, inputRange, [
            width * 0.2,
            0,
            -width * 0.2,
          ]),
        },
      ],
      opacity: interpolate(scrollX.value, inputOpacityRange, [0, 1, 0]),
    };
  });

  const animatedDescriptionStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(scrollX.value, inputRange, [
            width * 0.7,
            0,
            -width * 0.7,
          ]),
        },
      ],
      opacity: interpolate(scrollX.value, inputOpacityRange, [0, 1, 0]),
    };
  });

  return (
    <View style={styles.itemStyle}>
      <Animated.Image
        source={imageUri}
        style={[styles.imageStyle, animatedImageStyle]}
      />
      <View style={styles.textContainer}>
        <Animated.Text style={[styles.heading, animatedHeadingStyle]}>
          {heading}
        </Animated.Text>
        <Animated.Text style={[styles.description, animatedDescriptionStyle]}>
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
