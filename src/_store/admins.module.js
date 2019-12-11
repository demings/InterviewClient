import { adminService } from '../_services';

export const admins = {
    namespaced: true,
    state: {
        all: {}
    },
    actions: {
        getAll({ commit }) {
            commit('getAllRequest');

            adminService.getAll()
                .then(
                    admins => commit('getAllSuccess', admins),
                    error => commit('getAllFailure', error)
                );
        }
    },
    mutations: {
        getAllRequest(state) {
            state.all = { loading: true };
        },
        getAllSuccess(state, admins) {
            state.all = { items: admins };
        },
        getAllFailure(state, error) {
            state.all = { error };
        }
    }
}
