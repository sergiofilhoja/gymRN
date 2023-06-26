import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "react-native";

// Components
import { Loading } from "@components/Loading";

// Configs
import { THEME } from "./src/theme";

// Pages
import { Routes } from "@routes/index";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle={"light-content"}
        translucent
        backgroundColor={"transparent"}
      />

      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}
