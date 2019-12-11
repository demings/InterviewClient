import { roomService } from '../_services';

export const rooms = {
    namespaced: true,
    state: {
        all: {}
    },
    actions: {
        getAll({ commit }) {
            commit('getAllRequest');

            roomService.getAll()
                .then(
                    rooms => commit('getAllSuccess', rooms),
                    error => commit('getAllFailure', error)
                );
        },
    },
    mutations: {
        getAllRequest(state) {
            state.all = { loading: true };
        },
        getAllSuccess(state, rooms) {
            state.all = { items: rooms };
        },
        getAllFailure(state, error) {
            state.all = { error };
        }
    }
}
