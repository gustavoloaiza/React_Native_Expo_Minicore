// dada una fecha la pasa a hora de ecuador // despues vi que con getutc es lo mismo pero ya esta
export default function horasEc(objDate) {
  var miliSeg = objDate.getTime();
  var cambiaMlSeg = 5 * 60 * 60000;
  var nuvaFecha = new Date(miliSeg - cambiaMlSeg);
  return nuvaFecha;
}

//crea fecha aniadiendo o quitando dias
export function creaFecha(dias) {
  let fecha = new Date();
  fecha = horasEc(fecha);
  fecha.setDate(fecha.getDate() - dias);

  return fecha;
}

//pone fecha de expiracion depentiendo el tipo de pase
export function fechaExpiracion(inicio, tipo) {
  let expira = inicio;
  let dias = 0;
  switch (tipo) {
    case "Mensual":
      dias = 30;
      break;
    case "Semestral":
      dias = 180;
      break;
    case "Anual":
      dias = 365;
      break;

    default:
      dias = 1;
      break;
  }

  expira.setDate(expira.getDate() + dias);
  return expira;
}
