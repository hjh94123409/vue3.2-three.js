import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            count: 0,
            isFullscreen: false,
            buyCarts: [],
        };
    },
    mutations: {
        INCREAMENT(state, data) {
            state.count += data;
        },
        SETFULLSCREEN(state, value) {
            state.isFullscreen = value;
        },
        addBuyCarts(state, product) {
            state.buyCarts.push(product);
        },
        addBuyCartsNum(state, num) {
            state.buyCarts[num].num++;
        },
        minusBuyCartsNum(state, num) {
            state.buyCarts[num].num--;
            if (state.buyCarts[num].num === 0) {
                state.buyCarts.splice(num, 1);
            }
        },
    },
    actions: {
        asyncChangeCount({ commit }, data) {
            setTimeout(() => {
                commit("INCREAMENT", data);
            }, 1000);
        },
    },
    getters: {
        countTen(state) {
            return state.count * 10;
        },
        totalPrice(state) {
            return state.buyCarts.reduce((pre, item) => {
                return pre + item.price * item.num;
            }, 0);
        },
    },
});

export default store;
