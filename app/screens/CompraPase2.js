import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import Users from "../../database/Users";
import Pases from "../../database/Pases";
import EstadoPases from "../../database/EstadoPases";
import Card from "../shared/Card";
import horasEc from "../shared/fechas";
import fechaExpiracion from "../shared/fechas";

function CompraPase2({ navigation, route }) {
  //variables para ver dia de compra y que tipo de pase // para que actualizae cada cambio
  const [hoy, setHoy] = useState(horasEc(new Date()));
  const [tipoPase, setTipoPase] = useState("");

  //imprime fecha en formato deseado
  function formatoFecha(fecha) {
    return (
      fecha.getDate() +
      " / " +
      (fecha.getMonth() + 1) +
      " / " +
      fecha.getFullYear()
    );
  }

  //cambia fecha de compra
  function cambioFecha(tipo, val) {
    var prueba = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

    switch (tipo) {
      case "dia":
        prueba.setDate(hoy.getDate() + val);
        break;
      case "mes":
        prueba.setMonth(hoy.getMonth() + val);

        break;
      case "anio":
        prueba.setFullYear(hoy.getFullYear() + val);

        break;

      case "actual":
        prueba = new Date(horasEc(new Date()));
        console.log(prueba);
        break;

      default:
        break;
    }
    setHoy(prueba);
  }

  //cambia el tipo de pase
  function cambioPase(valor) {
    setTipoPase(valor);
  }

  //guarda estado de pase
  function guarda() {
    //si no selecciona tipo de pase no hace nada
    if (tipoPase != "") {
      var comprados = [];
      var comprobados = 0;
      let expirara = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
      expirara.setDate(expirara.getDate() + tipoPase.dias);

      console.log("-------------nuevo------------");

      //saca todos los estados de pase del usuario
      EstadoPases.forEach((item) => {
        if (item.idUser == route.params.id) {
          comprados.push(item);
        }
      });

      //si tiene algun tipo de pase verifica si esta activo // deja comprar o no
      if (comprados.length > 0) {
        comprados.forEach((item) => {
          //verifica si esta fuera de fecha de estado pases o si no tiene pases -> suma comprobados

          if (
            expirara <= item.fechaCompra ||
            hoy >= item.fechaExpira ||
            item.pasadas === Pases.find((pase) => pase.id === item.idPase).pases
          ) {
            comprobados += 1;
          }
        });
      }
      // si ningun estado pase activo esta en rango del nuevo guarda
      if (comprados.length == comprobados) {
        let nuevoPase = {
          id: Math.max(...EstadoPases.map((item) => item.id)) + 1,
          idUser: route.params.id,
          idPase: tipoPase.id,
          fechaCompra: hoy,
          fechaExpira: expirara,
          diasTranscurrido: 0,
          diasRestantes: tipoPase.dias,
          pasadas: 0,
        };
        EstadoPases.push(nuevoPase);
        Alert.alert("Compraste el pase con exito");
        navigation.navigate("Inicio");
      } else {
        Alert.alert("Advertencia", "ya posee un pase en esta fecha");
      }
    } else {
      Alert.alert("No seleccionaste el tipo de pase");
    }
  }

  return (
    <View style={styles.container}>
      <Card>
        <Text>
          {Users.find((usuario) => usuario.id === route.params.id).nombre}{" "}
          {Users.find((usuario) => usuario.id === route.params.id).apellido}{" "}
        </Text>
        <Text>
          {Users.find((usuario) => usuario.id === route.params.id).mail}{" "}
        </Text>
        <Text>
          {Users.find((usuario) => usuario.id === route.params.id).telefono}
        </Text>
      </Card>

      <TouchableOpacity onPress={() => guarda()}>
        <View style={styles.posibledos}>
          <Text
            style={{
              marginHorizontal: 30,
              marginVertical: 20,
              color: "red",
            }}
          >
            Guardar
          </Text>
        </View>
      </TouchableOpacity>

      <Text style={{ fontSize: 25, textAlign: "center", color: "yellow" }}>
        {" "}
        Fecha : {formatoFecha(hoy)}{" "}
      </Text>
      <View style={styles.fechas}>
        <View>
          <TouchableOpacity onPress={() => cambioFecha("dia", 1)}>
            <Card>
              <Text>+</Text>
            </Card>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, textAlign: "center", color: "yellow" }}>
            Dia
          </Text>
          <TouchableOpacity onPress={() => cambioFecha("dia", -1)}>
            <Card>
              <Text>-</Text>
            </Card>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => cambioFecha("mes", 1)}>
            <Card>
              <Text>+</Text>
            </Card>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, textAlign: "center", color: "yellow" }}>
            Mes
          </Text>
          <TouchableOpacity onPress={() => cambioFecha("mes", -1)}>
            <Card>
              <Text>-</Text>
            </Card>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => cambioFecha("anio", 1)}>
            <Card>
              <Text>+</Text>
            </Card>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, textAlign: "center", color: "yellow" }}>
            Anio
          </Text>

          <TouchableOpacity onPress={() => cambioFecha("anio", -1)}>
            <Card>
              <Text>-</Text>
            </Card>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => cambioFecha("actual", 0)}>
        <Card>
          <Text>Fecha actual</Text>
        </Card>
      </TouchableOpacity>

      <Text style={{ fontSize: 25, textAlign: "center", color: "yellow" }}>
        Tipo de pase
      </Text>

      <View>
        <FlatList
          horizontal
          data={Pases}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => cambioPase(item)}>
              <View
                style={[
                  item.id == tipoPase.id
                    ? styles.posibledos
                    : styles.posibleuno,
                ]}
              >
                <Text
                  style={{
                    marginHorizontal: 30,
                    marginVertical: 20,
                    color: "red",
                  }}
                >
                  {item.tipo}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightseagreen",
    alignItems: "center",
    paddingVertical: 10,
  },
  fechas: {
    flexDirection: "row",
  },

  posibleuno: {
    borderRadius: 10,
    backgroundColor: "honeydew",
    marginHorizontal: 4,
    marginVertical: 6,
  },

  posibledos: {
    borderRadius: 10,
    backgroundColor: "black",
    marginHorizontal: 4,
    marginVertical: 6,
  },
});

export default CompraPase2;
