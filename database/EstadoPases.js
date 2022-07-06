import React from "react";
import { horasEc, creaFecha, fechaExpiracion } from "../app/shared/fechas";

const EstadoPases = [
  {
    id: 1,
    idUser: 1,
    idPase: 1,
    fechaCompra: creaFecha(60),
    fechaExpira: fechaExpiracion(creaFecha(60), "Mensual"),
    diasTranscurrido: 30,
    diasRestantes: 0,
    pasadas: 80,
  },
  {
    id: 2,
    idUser: 2,
    idPase: 2,
    fechaCompra: creaFecha(30),
    fechaExpira: fechaExpiracion(creaFecha(30), "Semestral"),
    diasTranscurrido: 30,
    diasRestantes: 150,
    pasadas: 560,
  },
  {
    id: 3,
    idUser: 3,
    idPase: 3,
    fechaCompra: creaFecha(200),
    fechaExpira: fechaExpiracion(creaFecha(200), "Anual"),
    diasTranscurrido: 200,
    diasRestantes: 165,
    pasadas: 0,
  },
  {
    id: 4,
    idUser: 4,
    idPase: 1,
    fechaCompra: creaFecha(20),
    fechaExpira: fechaExpiracion(creaFecha(20), "Mensual"),
    diasTranscurrido: 20,
    diasRestantes: 10,
    pasadas: 0,
  },
  {
    id: 5,
    idUser: 5,
    idPase: 2,
    fechaCompra: creaFecha(80),
    fechaExpira: fechaExpiracion(creaFecha(80), "Semestral"),
    diasTranscurrido: 800,
    diasRestantes: 100,
    pasadas: 0,
  },
  {
    id: 6,
    idUser: 1,
    idPase: 1,
    fechaCompra: creaFecha(15),
    fechaExpira: fechaExpiracion(creaFecha(15), "Mensual"),
    diasTranscurrido: 15,
    diasRestantes: 15,
    pasadas: 85,
  },
];

export default EstadoPases;
