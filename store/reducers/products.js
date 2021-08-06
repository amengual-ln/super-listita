import { db } from '../../db/firebase'

let initialState = {
	items: [],
	status: 'idle',
	error: null,
}

export default function state(state = initialState, action) {
	if (action.type === '@products/SET_PRODUCTS') {
		action.payload.forEach((product) => {
			if (
				!state.items.find(
					(previousProduct) => previousProduct.id === product.id
				)
			) {
				state.items.push({
					id: product.id,
					...product.data(),
				})
			}
		})
	}
	if (action.type === '@products/CREATE_PRODUCT') {
		state.items.push(action.payload)
	}
	if (action.type === '@products/TOGGLE_PURCHASED') {
		state.items = state.items.map((item) => {
			if (item.id === action.payload) {
				return {
					...item,
					comprado: !item.comprado
				}
			}
			return item
		})
	}
	if (action.type === '@products/SET_LOADING') {
		state.status = action.payload
	}
	return state
}

/////////////////////

export const createProduct = (product) => async (dispatch, getState) => {
	try {
		const ref = await db.collection('producto').add(product)
		dispatch({
			type: '@products/CREATE_PRODUCT',
			payload: { ...product, id: ref.id },
		})
	} catch (error) {
		console.log(error)
	}
}

export const fetchProducts = () => {
	return async (dispatch) => {
		dispatch({ type: '@products/SET_LOADING', payload: 'loading'})
		const snapshot = await db.collection('producto').get()
		dispatch({ type: '@products/SET_PRODUCTS', payload: snapshot.docs })
		dispatch({ type: '@products/SET_LOADING', payload: 'idle'})

	}
}

export const togglePurchased = (id, comprado) => async (dispatch, getState) => {
	db.collection('producto').doc(id).set(
		{
			comprado: !comprado,
		},
		{ merge: true }
	)
	dispatch({ type: '@products/TOGGLE_PURCHASED', payload: id })
}

export const setLoading = (status) => async (dispatch, getState) => {
	dispatch({ type: '@products/SET_LOADING', payload: status })
}
