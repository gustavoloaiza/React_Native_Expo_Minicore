import React from "react";
import { View, FlatList, Button, StyleSheet } from "react-native";
import Users from "../../database/Users";
import Card from "../shared/Card";

function UsuariosLista({ navigation }) {
  //cuando un usuario es precionado manda su id a la vista usuario detalle
  const presion = (id) => {
    navigation.navigate("UsuarioDetalle", id);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card>
            <Button
              style={styles.botones}
              onPress={() => presion(item)}
              title={item.nombre + " " + item.apellido}
            ></Button>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightseagreen",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    paddingVertical: 10,
  },

  botones: {
    padding: 10,
    fontSize: 18,
    height: 44,
    margin: 25,
  },
});

export default UsuariosLista;
