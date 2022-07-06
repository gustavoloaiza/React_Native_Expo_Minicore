import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  SafeAreaView,
  Alert,
  Pressable,
  TouchableOpacity,
} from "react-native";

import Users from "../../database/Users";

function UsuarioCrear({ navigation }) {
  //varibale para cambiar cuando se ingrese datos
  const [info, setInfo] = useState({
    //id: Users[Users.length - 1].id + 1,
    id: Math.max(...Users.map((item) => item.id)) + 1,
    nombre: "",
    apellido: "",
    mail: "",
    contrasena: "",
    telefono: "",
  });

  //cambiar el estado y siempre se acutalisa ya que usa usestate
  const cambioTexto = (campo, valor) => {
    setInfo({ ...info, [campo]: valor });
  };

  //crea nuevo usuario
  const creaNuevoUsuario = () => {
    var contador = 0;
    var elementos = ["nombre", "apellido", "mail", "contrasena", "telefono"];

    //comprobar que no este en blanco y envie alerta, caso contrario incrementa contador
    elementos.map((elemento) => {
      if (info[elemento] === "") {
        Alert.alert("Falta ingresar", "campo: " + elemento);
      } else {
        contador += 1;
      }
      console.log(contador);
    });

    //si contador = a 5 crea
    if (contador === 5) {
      Alert.alert("Crear Usuario", "Estas seguro de crear este usuario", [
        { text: "yes", onPress: () => guardaBase() },
        { text: "no", onPress: () => alert("usuario no creado") },
      ]);
    }
  };

  //guarda el usuario creado
  const guardaBase = () => {
    Users.push(info);
    Alert.alert("Usuario creado", cerrar());
  };

  //regresa al inicio
  let cerrar = () => {
    //navigation.navigate("Inicio");
    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <TextInput
            style={styles.casillas}
            onChangeText={(valor) => cambioTexto("nombre", valor)}
            placeholder="Aqui tu Nombre"
          />
        </View>
        <View>
          <TextInput
            style={styles.casillas}
            onChangeText={(valor) => cambioTexto("apellido", valor)}
            placeholder="Aqui tu Apellido"
          />
        </View>
        <View>
          <TextInput
            style={styles.casillas}
            onChangeText={(valor) => cambioTexto("mail", valor)}
            placeholder="Aqui tu Mail"
          />
        </View>
        <View>
          <TextInput
            style={styles.casillas}
            onChangeText={(valor) => cambioTexto("contrasena", valor)}
            placeholder="Aqui tu Contrasena"
          />
        </View>
        <View>
          <TextInput
            style={styles.casillas}
            onChangeText={(valor) => cambioTexto("telefono", valor)}
            placeholder="Aqui tu Telefono"
          />
        </View>

        <View>
          <Pressable style={styles.boton} onPress={() => creaNuevoUsuario()}>
            <Text style={styles.textoBoton}>Registrar</Text>
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
  posibledos: {
    borderRadius: 10,
    backgroundColor: "black",
    marginHorizontal: 4,
    marginVertical: 6,
  },
});

export default UsuarioCrear;
