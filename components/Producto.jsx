import React from "react";
import {
  StyleSheet,
  Text,
  Vibration,
  View,
  TouchableOpacity,
} from "react-native";
import { db } from "../db/firebase";

import Icon from "react-native-vector-icons/Octicons";
const myIcon = <Icon name="check" size={30} color="#fff" />;

const styles = StyleSheet.create({
  producto: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
  },
  check: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 42,
    height: 42,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
  },
  nombre: {
    fontSize: 20,
  },
  nombreComprado: {
    fontSize: 20,
    textDecorationLine: "line-through",
    opacity: 0.5,
  },
});

const Producto = ({ id, text, comprado = false }) => {
  const toggleEstado = () => {
    Vibration.vibrate(50);
    db.collection("producto").doc(id).set({
      comprado: !comprado
    }, { merge: true });
  };

  return (
    <View style={styles.producto}>
      <Text style={comprado ? styles.nombreComprado : styles.nombre}>
        {text}
      </Text>
      <TouchableOpacity onPress={() => toggleEstado()}>
        <View style={styles.check}>{myIcon}</View>
      </TouchableOpacity>
    </View>
  );
};

export default Producto;
