import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import data from "./data";
import { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

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

const { width, height } = Dimensions.get("window");
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;
const DOT_SIZE = 40;
const TICKER_HEIGHT = 40;
const CIRCLE_SIZE = width * 0.6;

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
    outputRange: [width * 0.6, 0, -width * 0.6],
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

const Pagination = () => {
  return (
    <View style={styles.pagination}>
      {data.map((item) => {
        return (
          <View key={item.key} style={styles.paginationDotContainer}>
            <View
              style={[styles.paginationDot, { backgroundColor: item.color }]}
            />
          </View>
        );
      })}
    </View>
  );
};

const Ticker = ({ scrollX }: { scrollX: Animated.Value }) => {
  const inputRange = [-width, 0, width];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT],
  });
  return (
    <View style={styles.tickerContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
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

const BakcgroundCircle = ({ scrollX }: { scrollX: Animated.Value }) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
      {data.map(({ color }, index) => {
        return (
          <View
            key={index}
            style={[styles.circle, { backgroundColor: color }]}
          />
        );
      })}
    </View>
  );
};

export default function App() {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Ticker scrollX={scrollX} />
      <TouchableOpacity style={styles.btnIcon}>
        <Ionicons name="settings-outline" size={30} color={"#000"} />
      </TouchableOpacity>
      {/* <BakcgroundCircle scrollX={scrollX} /> */}
      <Animated.FlatList
        keyExtractor={(data) => data.key}
        data={data}
        renderItem={({ item, index }) => (
          <Item {...item} index={index} scrollX={scrollX} />
        )}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
      <Image
        style={styles.logo}
        source={require("./assets/ue_black_logo.png")}
      />
      <Pagination />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  pagination: {
    position: "absolute",
    right: 20,
    bottom: 60,
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
  logo: {
    opacity: 0.9,
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    resizeMode: "contain",
    position: "absolute",
    left: 10,
    bottom: 10,
    transform: [
      { translateX: -LOGO_WIDTH / 2 },
      { translateY: -LOGO_HEIGHT / 2 },
      // to turn the logo upside down
      { rotateZ: "-90deg" },
      // move on the right of the z axis
      { translateX: LOGO_WIDTH / 2 },
      // move move of the z axis
      { translateY: LOGO_HEIGHT / 2 },
    ],
  },
  btnIcon: {
    position: "absolute",
    right: 20,
    top: 60,
    zIndex: 1,
  },
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
  },
});
