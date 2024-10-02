<script lang="ts">
    import { ref, watch, defineComponent, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { getRecipes } from './api/get_recipes';

    import RecipesContainer from './home_components/recipes-container.vue';
    import SectionTitle from './home_components/section_title.vue'

    
    export default defineComponent({
        components: {
            SectionTitle,
            RecipesContainer,
        },
        setup() {
        const route = useRoute();
        let category = ref<string | string[]>(route.params.category);


        const recipes = ref<{
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
            steps: {
                text: string,
                image: string,
            }[],
            difficulty: string,
            createdAt: string,
            updatedAt: string,
        }[]>([]); 
        const loading = ref<boolean>(true); 
        const error = ref<string | null>(null); 

        const fetchRecipes = async () => {
            try {
                const data = await getRecipes(`?category=${category.value}`);                 
                recipes.value = data.data;                                 
            } catch (err) {
                error.value = `Err: ${err instanceof Error ? err.message : 'Unknown error'}`;
            } finally {                
                loading.value = false; // Update loading state
            }
        };

        onMounted(fetchRecipes);       
        
        watch(() => route.params.category,
            (newCat) => {
                category.value = newCat;
                fetchRecipes()
            }
        )

        return {
            recipes,
            loading,
            error,
            category,
        };
    },
});


</script>

<template>
    <article class="wrapper recipe-wrapper container-fluid">
        <header>
            <div class="row d-flex">
                <router-link to="/" class="col-1 navigation">
                    <i class="fa-solid fa-arrow-left-long"></i> Home</router-link>
            </div>
            <SectionTitle>{{ category }} Recipes</SectionTitle>
        </header>

        <RecipesContainer v-if="recipes.length > 0" v-bind:recipes="recipes"></RecipesContainer>
        <h3 v-if="recipes.length === 0">No recipes yet.</h3>
        <h3 v-else-if="loading">Loading...</h3>
        <h3 v-if="error">There was an error..</h3>
    </article>
</template>