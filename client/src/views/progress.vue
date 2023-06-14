<script>
import { mapActions, mapState } from 'pinia';
import { useRenderStore } from '../stores/counter'
import cardDashboard from '../components/cardDashboard.vue';
import { RouterLink } from 'vue-router';
import router from '../router';
export default {
    name: 'progress',
    components: {
        cardDashboard
    },
    methods: {
        ...mapActions(useRenderStore, ['renderLogs'])
    },
    computed: {
        ...mapState(useRenderStore, ['dataLogs']),
        newMethod() {
            router.push('/')
            console.log('coba')
        }
    },
    created() {
        this.renderLogs()
    }
}
</script>
<template>
    <div class="navbar bg-base-100">
        <div class="flex-1">
            <a class="btn btn-ghost normal-case text-xl">VOCAB-BUILDER</a>
        </div>
        <div class="flex-none">
            <ul class="menu menu-horizontal px-1">
                <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" @click.prevent="newMethod"><a>BACK</a></button>
            </ul>
        </div>
    </div>
    <div class="grid grid-cols-3 gap-4">
        <template v-for="(dl, index) in dataLogs" :key="dl.id">
            <div>
                <cardDashboard :dataLogs="dl" />
            </div>
        </template>
    </div>
</template>