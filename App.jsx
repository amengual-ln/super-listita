import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { fetchProducts } from './store/reducers/products'
import ListaProductos from './components/ListaProductos'
import InputNuevoProducto from './components/InputNuevoProducto'
import { useDispatch } from 'react-redux'


const styles = StyleSheet.create({
	app: {
		flex: 1,
		backgroundColor: '#F1F1F1',
		padding: 15,
		paddingTop: 30,
		paddingBottom: 60,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginVertical: 20,
	},
})

const App = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchProducts())
	}, [dispatch])

	return (
		<View style={styles.app}>
				<Text style={styles.title}>Lista de compras</Text>
				<ListaProductos />
				<InputNuevoProducto />
		</View>
	)
}

export default App
