import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  Pressable,
  Alert,
} from "react-native";
import Users from "../../database/Users";

function UsuarioDetalle({ navigation, route }) {
  //variable con datos para usuario usa parametros enviados
  const [info, setInfo] = useState({
    id: route.params.id,
    nombre: route.params.nombre,
    apellido: route.params.apellido,
    mail: route.params.mail,
    contrasena: route.params.contrasena,
    telefono: route.params.telefono,
  });

  //cambia el state de usuario
  const cambioTexto = (campo, valor) => {
    setInfo({ ...info, [campo]: valor });
  };

  let verificaSctualizar = () => {
    //comprueba si los campos no estan vacios y permite actualizar
    if (
      (info.nombre === "") |
      (info.apellido === "") |
      (info.mail === "") |
      (info.contrasena === "") |
      (info.telefono === "")
    ) {
      alert("no se puede actualizar ususario verifica la informacion");
    } else {
      let indice = Users.findIndex((user) => user.id == info.id);
      Alert.alert(
        "Actualizar Usuario",
        "Estas seguro de actualizar este usuario",
        [
          { text: "yes", onPress: () => actualizar(indice) },
          { text: "no", onPress: () => console.log("accion cancelada") },
        ]
      );
    }
  };

  //elimina y crea usuario con cambios
  let actualizar = (indice) => {
    Users.splice(indice, 1);
    Users.push(info);
    Alert.alert("Usuario actualizado");
    //navigation.pop();
    navigation.navigate("Inicio");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <TextInput
            defaultValue={info.nombre}
            style={styles.casillas}
            onChangeText={(valor) => cambioTexto("nombre", valor)}
            placeholder="Aqui tu Nombre"
          />
        </View>
        <View>
          <TextInput
            defaultValue={info.apellido}
            style={styles.casillas}
            onChangeText={(valor) => cambioTexto("apellido", valor)}
            placeholder="Aqui tu Apellido"
          />
        </View>
        <View>
          <TextInput
            defaultValue={info.mail}
            style={styles.casillas}
            onChangeText={(valor) => cambioTexto("mail", valor)}
            placeholder="Aqui tu Mail"
          />
        </View>
        <View>
          <TextInput
            defaultValue={info.contrasena}
            style={styles.casillas}
            onChangeText={(valor) => cambioTexto("contrasena", valor)}
            placeholder="Aqui tu Contrasena"
          />
        </View>
        <View>
          <TextInput
            defaultValue={info.telefono}
            style={styles.casillas}
            onChangeText={(valor) => cambioTexto("telefono", valor)}
            placeholder="Aqui tu Telefono"
          />
        </View>

        <View>
          <Pressable style={styles.boton} onPress={() => verificaSctualizar()}>
            <Text style={styles.textoBoton}>Actualizar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightseagreen",
    justifyContent: "center",
    padding: 35,
  },

  casillas: {
    backgroundColor: "aliceblue",
    margin: 15,
    padding: 20,
    borderBottomColor: "chocolate",
    borderBottomWidth: 2,
  },

  boton: {
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "black",
  },

  textoBoton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default UsuarioDetalle;
