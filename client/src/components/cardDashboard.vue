<script>
import { mapActions, mapState } from 'pinia';
import { RouterLink } from 'vue-router';
import { useRenderStore, useDeleteStore } from '../stores/counter'

export default {
    name: "cardDashboard",
    props: ["dataLogs"],
    methods: {
        ...mapActions(useRenderStore, ['renderDetailLog']),
        ...mapActions(useRenderStore, ['renderLogs']),
        ...mapActions(useDeleteStore, ['deleteLog']),
        transit(id) {
            this.renderLogs()
            this.deleteLog(id)
            this.renderLogs()
        }
    },
    computed: {
    }
}
</script>
<template>
    <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">{{ dataLogs.word }}</h2>
            <p>{{ dataLogs.definition }}</p>
            <div class="card-actions justify-between">
                <button class="btn btn-primary" @click.prevent="transit(dataLogs.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <button class="btn btn-secondary" @click.prevent="renderDetailLog(dataLogs.id)">edit</button>
            </div>
        </div>
    </div>
</template>