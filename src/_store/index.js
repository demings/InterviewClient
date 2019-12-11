import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert.module';
import { authentication } from './authentication.module';
import { users } from './users.module';
import { rooms } from './rooms.module';
import { admins } from './admins.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        authentication,
        users,
        rooms,
        admins
    }
});
