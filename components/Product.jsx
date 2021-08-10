import React from 'react'
import { useDispatch } from 'react-redux'
import { togglePurchased, removeProduct } from '../store/reducers/products'
import {
	StyleSheet,
	Text,
	Vibration,
	View,
	TouchableOpacity,
	Dimensions,
} from 'react-native'

import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'

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

	const translateX = useSharedValue(0)

	const panGestureEvent = useAnimatedGestureHandler({
		onStart: (event, context) => {
			context.translateX = translateX.value
		},
		onActive: (event, context) => {
			translateX.value = event.translationX + context.translateX
		},
		onEnd: (event, context) => {
			const screenWidth = Dimensions.get('window').width
			const distance = Math.abs(translateX.value)
			if (distance > screenWidth / 2) {
				translateX.value = withSpring(translateX.value * 2)
				dispatch(removeProduct(id))
			} else {
				translateX.value = withSpring(0, { stiffness: 150, mass: 0.5 })
			}
		},
	})

	const animationStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: translateX.value,
				},
			],
		}
	})

	return (
		<PanGestureHandler onGestureEvent={panGestureEvent}>
			<Animated.View style={[styles.producto, animationStyle]}>
				<Text style={comprado ? styles.nombreComprado : styles.nombre}>
					{text}
				</Text>
				<TouchableOpacity onPress={() => toggleEstado()}>
					<View style={styles.check}>{checkIcon}</View>
				</TouchableOpacity>
			</Animated.View>
		</PanGestureHandler>
	)
}

export default Product
