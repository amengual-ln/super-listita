import React from 'react'
import { useDispatch } from 'react-redux'
import { useWindowDimensions } from 'react-native'
import { togglePurchased, removeProduct } from '../store/reducers/products'
import {
	StyleSheet,
	Text,
	Vibration,
	View,
	TouchableOpacity,
} from 'react-native'

import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
	runOnJS,
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
	const window = useWindowDimensions();
	const dispatch = useDispatch()
	const toggleEstado = () => {
		Vibration.vibrate(50)
		dispatch(togglePurchased(id, comprado))
	}

	const removeItem = (id) => {
		Vibration.vibrate(50)
		dispatch(removeProduct(id))
	}

	const translateX = useSharedValue(0)

	const panGestureEvent = useAnimatedGestureHandler({
		onStart: (event, context) => {
			'worklet'
			context.translateX = translateX.value
		},
		onActive: (event, context) => {
			'worklet'
			translateX.value = event.translationX + context.translateX
		},
		onEnd: (event, context) => {
			const distance = Math.abs(translateX.value)
			if (distance > window.width / 2) {
				translateX.value = withSpring(window.width, { stiffness: 150, mass: 0.5 })
				runOnJS(removeItem)(id)
			} else {
				translateX.value = withSpring(0, { stiffness: 150, mass: 0.5 })
			}
		},
	})

	const animationStyle = useAnimatedStyle(() => {
		"worklet"
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
