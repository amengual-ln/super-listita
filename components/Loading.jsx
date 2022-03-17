import React from 'react'
import { useWindowDimensions } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'

import Icon from 'react-native-vector-icons/Octicons'
const loadingIcon = <Icon name="kebab-horizontal" size={30} color="#fff" />

const styles = StyleSheet.create({
	loading: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		width: window.width,
		height: window.height,
		backgroundColor: 'rgba(0,0,0,0.3)',
		zIndex: 999,
	},
	text: {
		position: 'absolute',
		top: '50%',
		left: '50%',

		fontSize: 24,
		fontWeight: 'bold',
		zIndex: 999,
	},
})

export default function Loading() {
	const window = useWindowDimensions();
	return (
		<>
			<View style={styles.loading}></View>
			<Text style={styles.text}>{loadingIcon}</Text>
		</>
	)
}
