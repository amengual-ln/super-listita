import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { db } from "../db/firebase";
import Producto from "./Producto";

const styles = StyleSheet.create({
  bottomDivider: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
    paddingBottom: 10,
    marginBottom: 10,
  },
})

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const productos = [];
      try {
        const querySnapshot = await db.collection("producto").get();
        querySnapshot.forEach((doc) => {
          const { nombre, comprado } = doc.data();
          productos.push({
            id: doc.id,
            nombre,
            comprado,
          });
        });
        setProductos(productos);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProductos();
  });

  return (
    <ScrollView>
      <View style={styles.bottomDivider}>
        {productos
          .filter((producto) => !producto.comprado)
          .map((producto) => (
            <Producto text={producto.nombre} id={producto.id} key={producto.id} />
          ))}
      </View>
      <View>
        {productos
          .filter((producto) => producto.comprado)
          .map((producto) => (
            <Producto text={producto.nombre} id={producto.id} key={producto.id} comprado />
          ))}
      </View>
    </ScrollView>
  );
};

export default ListaProductos;