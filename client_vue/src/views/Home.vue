<template>
    <div>
        <h3>Home</h3>
        <pre>{{ user }}</pre>
    </div>
    <!-- <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <v-layout column align-center>
                <v-btn :to="{ name: 'Login' }">Login</v-btn>
                <v-btn :to="{ name: 'SignUp' }">SignUp</v-btn>
            </v-layout>
        </v-slide-y-transition>
    </v-container> -->

</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'Home',
        computed: {
            ...mapState({
                user: 'auth/user'
            })
        }
    }
</script>

<style scope></style>
