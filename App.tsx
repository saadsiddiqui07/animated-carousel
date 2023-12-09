import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import data from "./data";
import { useRef } from "react";

interface ItemProps {
  type: string;
  imageUri: any;
  heading: string;
  description: string;
  key: string;
  color: string;
}

const { width, height } = Dimensions.get("window");
const DOT_SIZE = 40;

const Item = ({ imageUri, heading, description, scrollX, index }: any) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });

  return (
    <View style={styles.itemStyle}>
      <Animated.Image
        source={imageUri}
        style={[styles.imageStyle, { transform: [{ scale }] }]}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.heading]}>{heading}</Text>
        <Text style={[styles.description]}>{description}</Text>
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

export default function App() {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
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
});
