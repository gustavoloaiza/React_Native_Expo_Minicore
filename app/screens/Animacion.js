import * as React from "react";
import {
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image,
  Text,
  View,
  StyleSheet,
} from "react-native";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
const { width } = Dimensions.get("window");

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

const DURATION = 1000;
const TEXT_DURATION = 800;

const titulos = [
  {
    titulouno: "Universidad",
    titulo2: "UDLA",
  },
  {
    titulouno: "Clase",
    titulo2: "Ingenieria web",
  },
  {
    titulouno: "Profesor",
    titulo2: "Juan Jose Leon",
  },
  {
    titulouno: "Alumno",
    titulo2: "Gustavo Loaiza",
  },
  {
    titulouno: "Proyecto",
    titulo2: "MiniCore",
  },
  {
    titulouno: "Creditos animacino",
    titulo2: "Catalin Miron",
  },
];

const Circle = ({ onPress, index, animatedValue, animatedValue2 }) => {
  const { initialBgColor, nextBgColor, bgColor } = colors[index];
  const inputRange = [0, 0.001, 0.5, 0.501, 1];
  const backgroundColor = animatedValue2.interpolate({
    inputRange,
    outputRange: [
      initialBgColor,
      initialBgColor,
      initialBgColor,
      bgColor,
      bgColor,
    ],
  });
  const dotBgColor = animatedValue2.interpolate({
    inputRange: [0, 0.001, 0.5, 0.501, 0.9, 1],
    outputRange: [
      bgColor,
      bgColor,
      bgColor,
      initialBgColor,
      initialBgColor,
      nextBgColor,
    ],
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.container,
        { backgroundColor },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: dotBgColor,
            transform: [
              { perspective: 200 },
              {
                rotateY: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0deg", "-90deg", "-180deg"],
                }),
              },

              {
                scale: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 6, 1],
                }),
              },

              {
                translateX: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 0.5, 0],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={onPress}>
          <Animated.View
            style={[
              styles.button,
              {
                transform: [
                  {
                    scale: animatedValue.interpolate({
                      inputRange: [0, 0.05, 0.5, 1],
                      outputRange: [1, 0, 0, 1],
                      // extrapolate: "clamp"
                    }),
                  },
                  {
                    rotateY: animatedValue.interpolate({
                      inputRange: [0, 0.5, 0.9, 1],
                      outputRange: ["0deg", "180deg", "180deg", "180deg"],
                    }),
                  },
                ],
                opacity: animatedValue.interpolate({
                  inputRange: [0, 0.05, 0.9, 1],
                  outputRange: [1, 0, 0, 1],
                }),
              },
            ]}
          >
            <AnimatedAntDesign name="arrowright" size={28} color={"white"} />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

/* 
initialBgColor -> Big background of the element
bgColor -> initial circle bg color that will be the next slide initial BG Color
nextBgColor -> next circle bg color after we fully transition the circle and this will be small again
prev bgColor === next initialBgColor
prev nextBgColor === next bgColor
*/

const colors = [
  {
    initialBgColor: "goldenrod",
    bgColor: "#222",
    nextBgColor: "#222",
  },
  {
    initialBgColor: "goldenrod",
    bgColor: "#222",
    nextBgColor: "yellowgreen",
  },
  {
    initialBgColor: "#222",
    bgColor: "yellowgreen",
    nextBgColor: "midnightblue",
  },
  {
    initialBgColor: "yellowgreen",
    bgColor: "midnightblue",
    nextBgColor: "turquoise",
  },
  {
    initialBgColor: "midnightblue",
    bgColor: "turquoise",
    nextBgColor: "goldenrod",
  },
  {
    initialBgColor: "turquoise",
    bgColor: "goldenrod",
    nextBgColor: "#222",
  },
];

export default function Animacion() {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const animatedValue2 = React.useRef(new Animated.Value(0)).current;
  const sliderAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const inputRange = [...Array(titulos.length).keys()];
  const [index, setIndex] = React.useState(0);

  const animate = (i) =>
    Animated.parallel([
      Animated.timing(sliderAnimatedValue, {
        toValue: i,
        duration: TEXT_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue2, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: false,
      }),
    ]);

  const onPress = () => {
    animatedValue.setValue(0);
    animatedValue2.setValue(0);
    animate((index + 1) % colors.length).start();
    setIndex((index + 1) % colors.length);
  };

  return (
    <View style={{ flex: 1, justifyContent: "flex-start", paddingTop: 100 }}>
      <StatusBar hidden />
      <Circle
        index={index}
        onPress={onPress}
        titulos={titulos}
        animatedValue={animatedValue}
        animatedValue2={animatedValue2}
      />
      <Animated.View
        style={{
          flexDirection: "row",
          transform: [
            {
              translateX: sliderAnimatedValue.interpolate({
                inputRange,
                outputRange: titulos.map((_, i) => -i * width * 2),
              }),
            },
          ],
          opacity: sliderAnimatedValue.interpolate({
            inputRange: [...Array(titulos.length * 2 + 1).keys()].map(
              (i) => i / 2
            ),
            outputRange: [...Array(titulos.length * 2 + 1).keys()].map((i) =>
              i % 2 === 0 ? 1 : 0
            ),
          }),
        }}
      >
        {titulos
          .slice(0, colors.length)
          .map(({ titulouno: titulo, titulo2: titulo2 }, i) => {
            return (
              <View style={{ paddingRight: width, width: width * 2 }} key={i}>
                <Text
                  style={[styles.paragraph, { color: colors[i].nextBgColor }]}
                >
                  {titulo}
                </Text>
                <Text
                  style={[
                    styles.paragraph,
                    {
                      color: colors[i].nextBgColor,
                      fontSize: 40,
                    },
                  ]}
                >
                  {titulo2}
                </Text>
                <View style={styles.contenedorIcono}>
                  <Image
                    style={styles.tinyLogo}
                    source={{
                      uri: "https://reactnative.dev/img/tiny_logo.png",
                    }}
                  />

                  <Image
                    style={styles.tinyLogo}
                    source={require("../../assets/expo.png")}
                  />
                </View>
              </View>
            );
          })}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    paddingBottom: 50,
  },
  paragraph: {
    margin: 12,
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Menlo",
    color: "white",
  },
  button: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    backgroundColor: "turquoise",
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  tinyLogo: {
    width: 70,
    height: 70,
    margin: 25,
  },
  contenedorIcono: {
    flexDirection: "row",
    margin: 80,
  },
});
