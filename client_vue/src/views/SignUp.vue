<template>
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <v-layout column align-center>
                <v-form
                    v-model="valid"
                    @submit.prevent="signUp"
                    @keydown.prevent.enter
                  >
                    <v-text-field
                      v-model="formUser.email"
                      :rules="notEmptyRules"
                      label="Email"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="formUser.displayName"
                      :rules="notEmptyRules"
                      label="displayName"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="formUser.password"
                      :rules="notEmptyRules"
                      label="password"
                      type="password"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="formUser.confirmPassword"
                      :rules="confirmPasswordRules"
                      label="confirmPassword"
                      type="password"
                      required
                    ></v-text-field>


                    <v-text-field
                      v-model="formUser.imageUrl"
                      :rules="notEmptyRules"
                      label="image Url"
                      type="imageUrl"
                      required
                    ></v-text-field>

                    <v-btn type="submit" :disabled="!valid">SignUp</v-btn>
                  </v-form>
            </v-layout>
        </v-slide-y-transition>
    </v-container>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'signUp',
        data: (vm) => ({
            valid: false,
            formUser: {
                email: '',
                password: '',
                confirmPassword: '',
                displayName: '',
                imageUrl: ''
            },
            notEmptyRules: [ (value) => !!value || 'cannot be empty'],
            confirmPasswordRules: [ (confirmPassword) => confirmPassword === vm.formUser.password || 'password must match']
        }),
        methods: {
            async signUp() {
                console.log('submitted')
                let resp = await axios.post('/api/users', this.formUser)
                if ('errors' in resp.data) {
                    this.formUser =  {
                        email: '',
                        password: '',
                        confirmPassword: '',
                        displayName: '',
                        imageUrl: ''
                    }
                    alert('error in signup')
                } else
                    this.$router.replace({ name: 'Login' })

            }
        }
    }
</script>
