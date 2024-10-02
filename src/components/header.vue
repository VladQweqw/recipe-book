<script setup>
    import { useRouter } from 'vue-router';
    
    const router = useRouter();
    const props = defineProps({
        title: String,
    })

    function goToRecipe(type) {
        router.push({ path: `/recipes/${type}` });
    }

</script>

<template>
    <header class="header">
        <div class="logo  navbar-section">
            <router-link class="logo-item" to="/">
                <i class="fa-solid fa-pepper-hot"></i>
            </router-link>
        </div>

        <div class=" categories  navbar-section">
            <div @click="goToRecipe('breakfast')" class="category">
                Breakfast
            </div>
            <div @click="goToRecipe('meal')" class="category">
                Meal
            </div>
            <div @click="goToRecipe('deserts')" class="category">
                Deserts
            </div>
        </div>

        <div class="search-field row navbar-section">
            <input type="search" name="search" placeholder="Search a recipe" id="search" class="input ff-regular ">
        </div>
    </header>
</template>
