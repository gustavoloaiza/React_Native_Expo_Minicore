import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Card from "../shared/Card";
import Users from "../../database/Users";
import Pases from "../../database/Pases";
import EstadoPases from "../../database/EstadoPases";

function AsignarPases(props) {
  //solo para que se carge al cambiar valor
  const [porcia, cambiaPorci] = useState(1);

  //calcula los pases faltantes
  function pasesFaltantes(item) {
    var pasesTotales = Pases.find((pase) => pase.id === item.idPase).pases;
    return pasesTotales - item.pasadas;
  }

  //aumenta los pases usados
  function cambioPases(item) {
    var maximo = Pases.find((pase) => pase.id === item.idPase).pases;
    if (item.pasadas < maximo) {
      item.pasadas += 1;
      cambiaPorci(porcia + 1);
    } else {
      Alert.alert("Se ocuparon todos los pases");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Al seleccionar un item aumenta cantidad pasada
      </Text>
      <FlatList
        data={EstadoPases}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => cambioPases(item)}>
            <Card>
              <Text>
                {Users.find((usuario) => usuario.id === item.idUser).nombre}{" "}
                {Users.find((usuario) => usuario.id === item.idUser).apellido}
              </Text>
              <Text>
                Tipo de pase:{" "}
                {Pases.find((pase) => pase.id === item.idPase).tipo}
              </Text>
              <Text>Pases ocupados: {item.pasadas}</Text>
              <Text>Pases restantes: {pasesFaltantes(item)}</Text>
            </Card>
          </TouchableOpacity>
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
    paddingVertical: 20,
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default AsignarPases;
