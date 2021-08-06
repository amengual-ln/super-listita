import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProducts } from './store/reducers/products'
import { useSelector } from 'react-redux'
import { getProductsStatus } from './store/selectors/products'
import { StyleSheet, Text, View } from 'react-native'
import Loading from './components/Loading'
import ListaProductos from './components/ListaProductos'
import InputNuevoProducto from './components/InputNuevoProducto'

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
	const status = useSelector((state) => getProductsStatus(state))

	return (
		<View style={styles.app}>
			{ status === 'loading' &&
				<Loading />
			}
			<Text style={styles.title}>Lista de compras</Text>
			<ListaProductos />
			<InputNuevoProducto />
		</View>
	)
}

export default App
