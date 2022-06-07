import { fetchCartItems } from "@/api"

// constants
export const FETCH_CART_ITEMS = 'FETCH_CART_ITEMS'

// store 
export const state = () => ({
    cartItems: [],
})

export const mutations = {
    addCartItem(state,cartItem) {
        state.cartItems.push(cartItem)
    },

    setCartItems(state, cartItems) {
        state.cartItems = cartItems
    }
}

export const actions = {
    async [FETCH_CART_ITEMS]({ commit }) {
        const {data} = await fetchCartItems()
        commit('setCartItems', data)
        // return response
    },

    async nuxtServerInit(storeContext, nuxtContext) {
        await storeContext.dispatch(FETCH_CART_ITEMS)
        // const {data} = await fetchCartItems()
        // storeContext.commit('setCartItems', data)
    }
}
