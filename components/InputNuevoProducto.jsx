import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { db } from "../db/firebase";

const styles = StyleSheet.create({
  newProduct: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    fontSize: 20,
    paddingLeft: 15,
  },
  addButtonWrapper: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#000",
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

const InputNuevoProducto = () => {
  const [state, setState] = useState({
    nombre: "",
  });

  const handleTextChange = (value) => {
    setState({ nombre: value });
  };

  const saveNewProduct = async () => {
    const nuevoProducto = {
      nombre: state.nombre,
      comprado: false,
    }
    setState({ nombre: "" });
    Keyboard.dismiss();
    try {
      const docRef = await db.collection("producto").add(nuevoProducto);
      console.log("Se guardó '"+ nuevoProducto.nombre +"' con id", docRef.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.newProduct}>
      <TextInput
        style={styles.input}
        placeholder="Escribi acá eso que falta"
        value={state.nombre}
        onChangeText={(value) => handleTextChange(value)}
      />
      <TouchableOpacity
        style={styles.addButtonWrapper}
        onPress={() => saveNewProduct()}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default InputNuevoProducto;
