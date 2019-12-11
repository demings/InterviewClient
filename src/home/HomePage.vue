<template>
  <div>
    <h1>Hi {{user.username}}!</h1>
    <!-- <p>You're logged in with Vue + Vuex & JWT!!</p> -->
    <!-- <h3>Rooms from secure api end point:</h3> -->
    <em v-if="users.loading">Loading users...</em>
    <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>

    <ul class="list-group row" v-if="rooms.items">
      <li class="card" v-for="room in rooms.items" :key="room.id">
        <div class="card-header">{{room.name}}</div>

        <div class="card-body">
          <p v-if="admins.items">
            Admin:
            <b>{{admins.items.find(admin => admin.id === room.adminId).username}}</b>
          </p>

          <ul class="list-group" v-if="room">
            <li class="list-group-item" v-for="userid in room.userIds" :key="userid">
              <div class="row">
                <div class="col-sm">{{users.items.find(_user => _user.id === userid).username}}</div>
                <div class="col-sm" v-if="admins.items">
                  <button
                    class="btn btn-primary"
                    v-if="user.username === admins.items.find(_admin => _admin.id === room.adminId).username"
                    v-on:click="kick(room.id, userid)"
                  >Kick</button>
                </div>
              </div>
            </li>
          </ul>

          <br />

          <div class="card-action">
            <button class="btn btn-primary" v-on:click="join(room.id)">Join</button>
          </div>
        </div>
      </li>
    </ul>

    <p>
      <router-link to="/login">Logout</router-link>
    </p>
  </div>
</template>

<script>
import { authHeader } from "../_helpers";
import config from "config";

export default {
  computed: {
    user() {
      return this.$store.state.authentication.user;
    },
    users() {
      return this.$store.state.users.all;
    },
    rooms() {
      return this.$store.state.rooms.all;
    },
    admins() {
      return this.$store.state.admins.all;
    }
  },
  methods: {
    log(message) {
      console.log(message);
    },
    join(roomId, userId) {
      let room = this.rooms.items.find(_room => _room.id === roomId);

      if (!room.userIds.includes(this.user.id)) {
        room.userIds.push(this.user.id);

        const requestOptions = {
          method: "PUT",
          headers: authHeader(),
          body: JSON.stringify(room)
        };

        console.log(requestOptions);

        fetch(`${config.apiUrl}/api/rooms/${room.id}`, requestOptions);
      }
    },
    kick(roomId, userId) {
      let room = this.rooms.items.find(_room => _room.id === roomId);

      room.userIds = room.userIds.filter(id => id !== userId);

      const requestOptions = {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(room)
      };

      fetch(`${config.apiUrl}/api/rooms/${room.id}`, requestOptions);
    }
  },
  created() {
    this.$store.dispatch("users/getAll");
    this.$store.dispatch("rooms/getAll");
    this.$store.dispatch("admins/getAll");
  }
};
</script>