import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Alert,
  Button,
} from "react-native";

function Inicio({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text> React Native con frame Expo</Text>
      <Text> Gustavo Loaiza</Text>
      <Text> Ingenieria Web</Text>
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
      <View>
        <Button
          color="orange"
          title="Animacion / informacion"
          onPress={() =>
            Alert.alert("Animacion", "Ir a animacion", [
              { text: "yes", onPress: () => navigation.navigate("animacion") },
              { text: "no", onPress: () => console.log("no") },
            ])
          }
        />

        <Button
          color="orange"
          title="Crear usuario"
          onPress={() => navigation.navigate("UsuarioCrear")}
        />
        <Button
          color="orange"
          title="Ver usuarios"
          onPress={() => navigation.navigate("UsuariosLista")}
        />
        <Button
          color="orange"
          title="Ver pases"
          onPress={() => navigation.navigate("VerPases")}
        />

        <Button
          color="orange"
          title="Asignar pases"
          onPress={() => navigation.navigate("AsignarPases")}
        />

        <Button
          color="orange"
          title="Compra pases"
          onPress={() => navigation.navigate("CompraPase")}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightseagreen",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },

  tinyLogo: {
    width: 50,
    height: 50,
    margin: 25,
  },
});

export default Inicio;
