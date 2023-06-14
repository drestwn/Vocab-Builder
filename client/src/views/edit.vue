<script>
import { mapState, mapActions } from 'pinia';
import { useRenderStore, useSubmitStore } from '../stores/counter';


export default {
    name: 'edit',
    data() {
        return {
            data: {
                word: '',
                definition: ''
            }
        }
    },
    methods: {
        ...mapActions(useRenderStore, ['renderLogs']),
        ...mapActions(useSubmitStore, ['submitEdit'])
    },
    computed: {
        ...mapState(useRenderStore, ['detailLog'])
    },
    created() {
        this.data.word = this.detailLog.word
        this.data.definition = this.detailLog.definition
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
                <RouterLink to="/progress"><button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"><a>BACK</a></button>
                </RouterLink>
            </ul>
        </div>
    </div>
    <div class="container mx-auto py-10">
        <form class="max-w-xs mx-auto">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="word">
                        Word
                    </label>
                    <input
                        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="word" type="text" placeholder="Type here" v-model="data.word">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="definition">
                        Definition
                    </label>
                    <input
                        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="definition" type="text" placeholder="Type here" v-model="data.definition">
                </div>
                <div class="flex justify-end">
                    <button class="bg-green-500 hover:bg-secondary text-white font-bold py-2 px-5 rounded" type="submit"
                        @click.prevent="submitEdit(detailLog.id, data)">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>