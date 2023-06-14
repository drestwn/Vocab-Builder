<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapActions, mapState } from 'pinia';
import { useRenderStore } from '../stores/counter';

export default {
    name: 'cardInput',
    props: ['dataWord', 'definitionWORD'],
    data() {
        return {
            dataInput: {
                valueInput: ''
            }
        }
    },
    computed: {
        ...mapState(useRenderStore, ['score'])
    },
    methods: {
        ...mapActions(useRenderStore, ['inputLogs']),
        ...mapActions(useRenderStore, ['renderLog']),
        submitForm(data) {
            this.inputLogs(data),
                this.dataInput.valueInput = ''

        }
    }
}
</script>
<template>
    <div class="card w-96 bg-white bg-opacity-80 rounded-lg shadow-xl p-11">
        <div class="text-center">
            <h1 class="text-3xl font-bold text-purple-800 mb-4">What's the Word?</h1>
            <div v-if="definitionWORD.length > 0">
                <p class="text-lg font-semibold text-gray-700">{{ definitionWORD }}</p>
            </div>
            <div v-else>
                <div class="flex justify-center items-center">
                    <progress class="progress w-58"></progress>
                </div>
            </div>
        </div>
        <div class="card-body items-center text-center">
            <form class="flex flex-col items-center">
                <input type="text" placeholder="What's the word?"
                    class="w-full max-w-xs py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"
                    v-model="this.dataInput.valueInput" />

                <button type="submit" class="bg-green-500 hover:bg-secondary text-white font-bold py-2 px-5 rounded"
                    @click.prevent="submitForm(this.dataInput)">
                    Submit
                </button>
            </form>
        </div>
    </div>
</template>
