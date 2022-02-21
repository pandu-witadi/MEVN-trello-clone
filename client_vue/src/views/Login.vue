<template>
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <v-layout column align-center>
                <v-form
                    v-model="valid"
                    @submit.prevent="login"
                    @keydown.prevent.enter
                  >
                    <v-text-field
                      v-model="formUser.email"
                      :rules="notEmptyRules"
                      label="Email"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="formUser.password"
                      :rules="notEmptyRules"
                      label="password"
                      type="password"
                      required
                    ></v-text-field>

                    <v-btn type="submit" :disabled="!valid">Login</v-btn>
                  </v-form>
            </v-layout>
        </v-slide-y-transition>
    </v-container>
</template>

<script>
    // import axios from 'axios'
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'Login',
        data: (vm) => ({
            valid: false,
            formUser: {
                email: '',
                password: ''
            },
            notEmptyRules: [ (value) => !!value || 'cannot be empty']
        }),
        // computed: {
        //     ...mapState('auth', { loading: 'isAuthenticatePending' })
        //
        // },
        methods: {
            ...mapActions({
                vuex_login: 'auth/login'
            }),
            login() {
                if (this.valid) {
                    let ret = this.vuex_login(this.formUser)
                    if (ret)
                        this.$router.replace({ name: 'Home' })    
                }
            }
        }
    }
</script>

<style scope></style>
