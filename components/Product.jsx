import React from 'react'
import { useDispatch } from 'react-redux'
import { togglePurchased } from '../store/reducers/products'
import {
	StyleSheet,
	Text,
	Vibration,
	View,
	TouchableOpacity,
} from 'react-native'

import Icon from 'react-native-vector-icons/Octicons'
const checkIcon = <Icon name="check" size={30} color="#fff" />

const styles = StyleSheet.create({
	producto: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#FFF',
		marginTop: 10,
		marginBottom: 10,
		padding: 15,
		borderRadius: 10,
	},
	check: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: 42,
		height: 42,
		backgroundColor: '#F1F1F1',
		borderRadius: 10,
	},
	nombre: {
		fontSize: 20,
	},
	nombreComprado: {
		fontSize: 20,
		textDecorationLine: 'line-through',
		opacity: 0.5,
	},
})

const Product = ({ id, text, comprado = false }) => {
	const dispatch = useDispatch()
	const toggleEstado = () => {
		Vibration.vibrate(50)
		dispatch(togglePurchased(id, comprado))
	}

	return (
		<View style={styles.producto}>
			<Text style={comprado ? styles.nombreComprado : styles.nombre}>
				{text}
			</Text>
			<TouchableOpacity onPress={() => toggleEstado()}>
				<View style={styles.check}>{checkIcon}</View>
			</TouchableOpacity>
		</View>
	)
}

export default Product
