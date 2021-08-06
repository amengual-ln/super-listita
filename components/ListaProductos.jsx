import React, { useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Producto from './Product'
import { useSelector } from 'react-redux'
import { getProducts, getPurchasedProducts } from '../store/selectors/products'

const styles = StyleSheet.create({
	bottomDivider: {
		borderStyle: 'solid',
		borderBottomWidth: 1,
		borderBottomColor: '#DDD',
		paddingBottom: 10,
		marginBottom: 10,
	},
})

export default function ListaProductos() {
	let products = useSelector((state) => getProducts(state))
	let purchasedProducts = useSelector((state) => getPurchasedProducts(state))

	return (
		<>
			{products.length > 0 && (
				<ScrollView>
					<View style={styles.bottomDivider}>
						{products.map((producto) => (
							<Producto
								text={producto.nombre}
								id={producto.id}
								key={producto.id}
							/>
						))}
					</View>
					<View>
						{purchasedProducts.map((producto) => (
							<Producto
								text={producto.nombre}
								id={producto.id}
								key={producto.id}
								comprado
							/>
						))}
					</View>
				</ScrollView>
			)}
		</>
	)
}
