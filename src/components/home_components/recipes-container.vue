<script setup lang="ts">
    import RecipeItem from './recipe_item.vue';

    const props = defineProps<{
        recipes: {
            _id: string,
            title: string,
            category: string,
            totalTime: number,
            lastingTime: number,
            cost: number,
            thumbnailImage: string,
            ingredients: {
                name: string,
                checked: boolean
            }[],
            stepTexts: string[],
            stepImages: string[],
            difficulty: string,
            createdAt: string,
            updatedAt: string,
        }[]
    }>();
    

</script>

<template>
    <div class="recipes-wrapper">
        <RecipeItem v-for="(recipe, index) in recipes" :key="index" v-bind="recipe" ></RecipeItem>
    </div>
</template>
