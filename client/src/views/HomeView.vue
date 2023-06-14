<script>
import navBar from '../components/navBar.vue'
import cardInput from '../components/cardInput.vue';
import { useRenderStore, useloginStore } from '../stores/counter'
import { mapActions, mapState } from 'pinia';

export default {
    name: 'HomeView',
    components: {
        navBar,
        cardInput,
    },
    computed: {
        ...mapState(useRenderStore, ['dataWord', 'definitionWORD']),
        ...mapState(useloginStore, ['statusLoggin'])
    },
    methods: {
        ...mapActions(useRenderStore, ['renderInventory']),
        ...mapActions(useloginStore, ['checkStatus'])
    },
    created() {
        this.renderInventory()
    }
}

</script>

<template>
    <navBar />
    <div class="flex justify-center items-center h-screen">
        <cardInput :dataWord="dataWord" :definitionWORD="definitionWORD" />
    </div>
</template>
