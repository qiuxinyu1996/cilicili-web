<template>
    <div class="index">
        <Header></Header>
        <Catalog></Catalog>
    </div>
</template>

<script>
    import Header from '@/components/Index/Header.vue';
    import Catalog from '@/components/Index/Catalog.vue';
    export default {
        name: 'Index' ,
        components: {
            Header,
            Catalog
        }
    }
</script>

<style>

</style>