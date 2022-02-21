<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-toolbar-title>MEVN Trello Clone</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items v-if="!authenticated">
                <v-btn text :to="{ name: 'Login' }">Login</v-btn>
                <v-btn text :to="{ name: 'SignUp' }">SignUp</v-btn>
            </v-toolbar-items>
            <v-toolbar-items v-if="authenticated">
                <v-layout justify-content align-center>
                    <h3>{{user.displayName}}</h3>
                </v-layout>
                <v-btn text @click="logout">Logout</v-btn>
            </v-toolbar-items>
        </v-app-bar>

        <v-main>

            <router-view/>
            <pre>{{ user }}</pre>
        </v-main>
    </v-app>
</template>


<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'App',

       computed: {
            ...mapGetters({
                authenticated: 'auth/authenticated',
                user: 'auth/GET_USER'
            })
        },
       methods: {
           ...mapActions({
               vuex_logout: 'auth/logout'
           }),
           logout() {
               this.vuex_logout().then( () => this.$router.push('/login')  )
           }
       }
    }
</script>
