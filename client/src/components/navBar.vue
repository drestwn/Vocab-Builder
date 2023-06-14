<script>
import { mapActions, mapState } from 'pinia';
import { RouterLink, RouterView } from 'vue-router'
import { useloginStore } from '../stores/counter';

export default {
    name: 'navBar',
    data() {
        return {
            dataLogin: {
                email: '',
                password: ''
            }
        }
    },
    computed: {
        ...mapState(useloginStore, ['statusLoggin'])
    },
    methods: {
        ...mapActions(useloginStore, ['loginSubmit', 'logOut', 'checkStatus', 'callback']),
    },
    created() {
        this.checkStatus()
    }
}
</script>
<template>
    <div class="navbar bg-neutral">
        <div class="flex-1">
            <a class="btn btn-ghost normal-case text-xl font-semibold">VOCAB-BUILDER</a>
        </div>
        <div class="flex-none">
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img src="../assets/2476166.png" />
                    </div>
                </label>
                <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    v-if="statusLoggin === false">
                    <RouterLink to="/about">
                        <li class="font-medium"><a>About</a></li>
                    </RouterLink>
                    <form class="flex flex-col items-center space-y-4">
                        <div class="w-full max-w-xs">
                            <input type="email" placeholder="Email" class="input input-bordered w-full"
                                v-model="this.dataLogin.email" />
                        </div>
                        <div class="w-full max-w-xs">
                            <input type="password" placeholder="Password" class="input input-bordered w-full"
                                v-model="this.dataLogin.password" />
                        </div>
                        <button type="submit" class="btn btn-primary w-full"
                            @click.prevent="loginSubmit(this.dataLogin)">Login</button>
                    </form>
                    <div class="form-control mt-6">
                        <GoogleLogin :callback="callback" prompt />
                    </div>
                </ul>
                <ul tabindex=" 0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    v-else>
                    <li>
                        <a class="justify-between">
                            Profile
                            <span class="badge">New</span>
                        </a>
                    </li>
                    <RouterLink to="/progress">
                        <li><a>Progress</a></li>
                    </RouterLink>
                    <li @click.prevent="logOut"><a>Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style scoped></style>