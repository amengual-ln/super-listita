import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ListaProductos from "./components/ListaProductos";
import InputNuevoProducto from "./components/InputNuevoProducto";

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer for a long period of time'])

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    padding: 15,
    paddingTop: 30,
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
});

const App = () => {
  return (
    <View style={styles.app}>
      <Text style={styles.title}>Lista de compras</Text>
      <ListaProductos />
      <InputNuevoProducto />
    </View>
  );
};

export default App;
