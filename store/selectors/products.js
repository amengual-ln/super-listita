export const getProductsState = (store) => store.products

export const getAllProducts = (store) =>
	getProductsState(store).items ? getProductsState(store).items : []

export const getProducts = (store) =>
	getProductsState(store).items ? getProductsState(store).items.filter(product => !product.comprado) : []

export const getPurchasedProducts = (store) =>
	getProductsState(store).items ? getProductsState(store).items.filter(product => product.comprado) : []

export const getProduct = (store, id) =>
	getProductsState(store)?.find((product) => product.id === id)

export const getProductsStatus = (store) =>
	getProductsState(store).status
