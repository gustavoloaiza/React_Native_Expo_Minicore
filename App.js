import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//importar paginas
import Inicio from "./app/screens/Inicio";
import UsuarioCrear from "./app/screens/UsuarioCrear";
import UsuarioDetalle from "./app/screens/UsuarioDetalle";
import UsuariosLista from "./app/screens/UsuariosLista";
import VerPases from "./app/screens/VerPases";
import AsignarPases from "./app/screens/AsignarPases";
import CompraPase from "./app/screens/CompraPase";
import CompraPase2 from "./app/screens/CompraPase2";
import Animacion from "./app/screens/Animacion";

// creacion de stack para navegacion
const Stack = createNativeStackNavigator();

//funcion crea navegacion de paginas, rutas
function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ff8c00",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Inicio"
        options={{ title: "Home" }}
        component={Inicio}
      />
      <Stack.Screen
        name="UsuarioCrear"
        options={{ title: "Crear Usuario" }}
        component={UsuarioCrear}
      />
      <Stack.Screen
        name="UsuarioDetalle"
        options={{ title: "Detalle de usuario" }}
        component={UsuarioDetalle}
      />
      <Stack.Screen
        name="UsuariosLista"
        options={{ title: "Lista de ususarios" }}
        component={UsuariosLista}
      />
      <Stack.Screen
        name="VerPases"
        options={{ title: "Ver pases" }}
        component={VerPases}
      />
      <Stack.Screen
        name="AsignarPases"
        options={{ title: "Asignar pases" }}
        component={AsignarPases}
      />
      <Stack.Screen
        name="CompraPase"
        options={{ title: "Compra pase: usuarios" }}
        component={CompraPase}
      />
      <Stack.Screen
        name="CompraPase2"
        options={{ title: "Compra pase: compra" }}
        component={CompraPase2}
      />
      <Stack.Screen
        name="animacion"
        options={{ title: "animacion" }}
        component={Animacion}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
