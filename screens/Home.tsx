import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { LOGO_HEIGHT, LOGO_WIDTH } from "../contants";
import Pagination from "../components/Pagination";
import Item from "../components/Item";
import BackgroundCircle from "../components/BackgroundCircle";
import data from "../data";
import Ticker from "../components/Ticker";
import { SharedElementSceneComponent } from "react-navigation-shared-element";

const HomeScreen: SharedElementSceneComponent<any> = ({ navigation }: any) => {
  const scrollX = useSharedValue(0);

  const scrollXHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Ticker scrollX={scrollX} />
      <TouchableOpacity style={styles.btnIcon}>
        <Ionicons name="settings-outline" size={30} color={"#000"} />
      </TouchableOpacity>
      <BackgroundCircle scrollX={scrollX} />
      <Animated.FlatList
        keyExtractor={(data) => data.key}
        data={data}
        renderItem={({ item, index }) => (
          <Item
            item={item}
            index={index}
            scrollX={scrollX}
            navigation={navigation}
          />
        )}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={scrollXHandler}
        scrollEventThrottle={16}
      />
      <Image
        style={styles.logo}
        source={require("../assets/ue_black_logo.png")}
      />
      <Pagination scrollX={scrollX} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default HomeScreen;
