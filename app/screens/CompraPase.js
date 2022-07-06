import React, { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import Users from "../../database/Users";
import Card from "../shared/Card";

function CompraPase({ navigation }) {
  // envia a compra pase 2 al seleccionar usuario y envia el parametro
  const presion = (id) => {
    navigation.navigate("CompraPase2", id);
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

export default CompraPase;
