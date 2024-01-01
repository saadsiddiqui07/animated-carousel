import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { height, width } from "../contants";
import Animated, {
  SharedTransition,
  withSpring,
} from "react-native-reanimated";

const animation = {
  0: { opacity: 0, translateY: -40 },
  1: { opacity: 1, translateY: 0 },
};
const customTransition = SharedTransition.custom((values) => {
  "worklet";
  return {
    height: withSpring(values.targetHeight),
    width: withSpring(values.targetWidth),
    originX: withSpring(values.targetOriginX),
    originY: withSpring(values.targetOriginY),
  };
});

const Details = ({ navigation, route }: any) => {
  const { item } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}
        style={{ position: "absolute", right: 20, top: 60, zIndex: 1 }}
      >
        <AntDesign name="close" size={28} color={"#000"} />
      </TouchableOpacity>
      <Animated.View
        style={{
          backgroundColor: item.color,
          position: "absolute",
          height: height,
          width: width,
          opacity: 0.25,
        }}
        sharedTransitionTag="circle"
        sharedTransitionStyle={customTransition}
      />
      <Animated.Image
        source={item.imageUri}
        style={[styles.imageStyle]}
        sharedTransitionTag={`image-${item.key}`}
        sharedTransitionStyle={customTransition}
      />
      <View
        style={{ position: "absolute", top: 50, left: 20, overflow: "hidden" }}
      >
        <View style={{ flexDirection: "row", overflow: "hidden" }}>
          {item.type.split("").map((letter: string, index: number) => {
            return (
              <Animatable.Text
                useNativeDriver={true}
                animation={animation}
                delay={300 + index * 50}
                key={index}
                style={{
                  color: "#000",
                  textTransform: "uppercase",
                  fontSize: 40,
                  fontWeight: "800",
                }}
              >
                {letter}
              </Animatable.Text>
            );
          })}
        </View>
        <Animatable.Text
          useNativeDriver={true}
          animation={animation}
          delay={300 + (item.type.split("").length * 50 + 50)}
          style={{
            color: item.color,
            textTransform: "uppercase",
            fontSize: 20,
            fontWeight: "900",
          }}
        >
          {item.colorName}
        </Animatable.Text>
      </View>
      <View>{/* all the details here */}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: width * 0.9,
    height: width * 0.9,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? 90 : 130,
  },
});

// Details.sharedElements = (route: any, otherRoute: any, showing: any) => {
//   const { item } = route.params;
//   return [
//     {
//       id: `item-${item.key}-image`,
//     },
//   ];
// };

export default Details;
