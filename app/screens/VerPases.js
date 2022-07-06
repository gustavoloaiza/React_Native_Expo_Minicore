import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";

import Users from "../../database/Users";
import Pases from "../../database/Pases";
import EstadoPases from "../../database/EstadoPases";
import Card from "../shared/Card";
import horasEc from "../shared/fechas";

function VerPases(props) {
  // fecha state para cambiarla
  const [hoy, setHoy] = useState(horasEc(new Date()));

  //imprime formato deseado de fecha
  function formatoFecha(fecha) {
    return (
      fecha.getDate() +
      " / " +
      (fecha.getMonth() + 1) +
      " / " +
      fecha.getFullYear()
    );
  }

  //ejecuta calculo de dias transcurridos / pases flatantes / dias restantes
  function calcula(item) {
    calculoDiaTranscurrido(item);
    pasesFaltantes(item);
  }

  //calcula dias transcurridos y restantes
  function calculoDiaTranscurrido(item) {
    var diasPase = Pases.find((pase) => pase.id === item.idPase).dias;

    if (hoy <= item.fechaCompra) {
      item.diasTranscurrido = 0;
      item.diasRestantes = diasPase;
    } else if (hoy >= item.fechaExpira) {
      item.diasTranscurrido = diasPase;
      item.diasRestantes = 0;
    } else {
      var diferencia = item.fechaExpira - hoy;
      item.diasRestantes = Math.round(diferencia / (1000 * 60 * 60 * 24));
      item.diasTranscurrido = -item.diasRestantes + diasPase;
    }
    return item.diasTranscurrido;
  }

  // calcula cuantos pases le falta
  function pasesFaltantes(item) {
    var pasesTotales = Pases.find((pase) => pase.id === item.idPase).pases;
    return pasesTotales - item.pasadas;
  }

  //mira si pase esta vigente
  function vigente(item) {
    var restantes = pasesFaltantes(item);

    if (restantes == 0 || hoy > item.fechaExpira) {
      Alert.alert("Pase no esta vigente");
    } else {
      Alert.alert("Pase vigente");
    }
  }

  //cambia la fecha de hoy
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

        break;

      default:
        break;
    }
    setHoy(prueba);
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}> Fecha de hoy: {formatoFecha(hoy)} </Text>
      <View style={styles.fechas}>
        <View>
          <TouchableOpacity onPress={() => cambioFecha("dia", 1)}>
            <Card>
              <Text>+</Text>
            </Card>
          </TouchableOpacity>
          <Text style={{ fontSize: 30, textAlign: "center", color: "yellow" }}>
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
          <Text style={{ fontSize: 30, textAlign: "center", color: "yellow" }}>
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
          <Text style={{ fontSize: 30, textAlign: "center", color: "yellow" }}>
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

      <FlatList
        data={EstadoPases}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => vigente(item)}>
            <Card>
              <Text>
                {Users.find((usuario) => usuario.id === item.idUser).nombre}{" "}
                {Users.find((usuario) => usuario.id === item.idUser).apellido}
              </Text>
              <Text>
                Tipo de pase:{calcula(item) + " "}
                {Pases.find((pase) => pase.id === item.idPase).tipo}
              </Text>
              <Text>Compra de pase: {formatoFecha(item.fechaCompra)}</Text>
              <Text>Expiracion de pase: {formatoFecha(item.fechaExpira)}</Text>
              <Text
                style={{ color: item.diasRestantes == 0 ? "red" : "black" }}
              >
                Dias transcurridos: {item.diasTranscurrido}
              </Text>
              <Text
                style={{ color: item.diasRestantes == 0 ? "red" : "black" }}
              >
                Dias restantes: {item.diasRestantes}
              </Text>
              <Text
                style={{ color: pasesFaltantes(item) == 0 ? "red" : "black" }}
              >
                Pases ocupados: {item.pasadas}
              </Text>
              <Text
                style={{ color: pasesFaltantes(item) == 0 ? "red" : "black" }}
              >
                Pases restantes: {pasesFaltantes(item)}
              </Text>
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
    paddingVertical: 10,
  },
  fechas: {
    flexDirection: "row",
  },
  campo: {
    backgroundColor: "aliceblue",
    margin: 15,
    padding: 20,
  },
});
export default VerPases;
