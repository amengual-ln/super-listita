import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../store/reducers/products";
import {
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

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
  const dispatch = useDispatch();
  const [state, setState] = useState({
    nombre: "",
  });

  const handleTextChange = (value) => {
    setState({ nombre: value });
  };

  const saveNewProduct = async () => {
    if (state.nombre === "") return;
    const nuevoProducto = {
      nombre: state.nombre,
      comprado: false,
    };
    setState({ nombre: "" });
    Keyboard.dismiss();
    dispatch(createProduct(nuevoProducto))
  };

  return (
    <KeyboardAvoidingView style={styles.newProduct}>
      <TextInput
        style={styles.input}
        placeholder="Escribí acá eso que falta"
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
