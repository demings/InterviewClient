<template>
    <div>
        <h1>Hi {{user.username}}!</h1>
        <p>You're logged in with Vue + Vuex & JWT!!</p>
        <h3>Users from secure api end point:</h3>
        <em v-if="users.loading">Loading users...</em>
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
        <ul v-if="users.items">
            <li class="card" v-for="user in users.items" :key="user.id">
                {{user.username}}
            </li>
        </ul>
        <ul v-if="rooms.items">
            <li class="card" v-for="room in rooms.items" :key="room.id">
                {{room.name}}
            </li>
        </ul>
        <ul v-if="admins.items">
            <li class="card" v-for="admin in admins.items" :key="admin.id">
                {{admin.username}}
            </li>
        </ul>
        <p>
            <router-link to="/login">Logout</router-link>
        </p>
    </div>
</template>

<script>
export default {
    computed: {
        user () {
            return this.$store.state.authentication.user;
        },
        users () {
            return this.$store.state.users.all;
        },
        rooms () {
            return this.$store.state.rooms.all;
        },
        admins () {
            return this.$store.state.admins.all;
        }
    },
    created () {
        this.$store.dispatch('users/getAll');
        this.$store.dispatch('rooms/getAll');
        this.$store.dispatch('admins/getAll');
    }
};
</script>