import { StyleSheet, Text, View } from "react-native";
import { TICKER_HEIGHT, width } from "../contants";
import data from "../data";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const Ticker = ({ scrollX }: { scrollX: SharedValue<number> }) => {
  const inputRange = [-width, 0, width];

  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(scrollX.value, inputRange, [
            TICKER_HEIGHT,
            0,
            -TICKER_HEIGHT,
          ]),
        },
      ],
    };
  });

  return (
    <View style={styles.tickerContainer}>
      <Animated.View style={[animatedViewStyle]}>
        {data.map(({ type }, index) => {
          return (
            <Text key={index} style={styles.tickerText}>
              {type}
            </Text>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default Ticker;

const styles = StyleSheet.create({
  tickerContainer: {
    position: "absolute",
    top: 60,
    left: 20,
    overflow: "hidden",
    height: TICKER_HEIGHT,
  },
  tickerText: {
    fontSize: TICKER_HEIGHT,
    lineHeight: TICKER_HEIGHT,
    textTransform: "uppercase",
    fontWeight: "800",
  },
});
