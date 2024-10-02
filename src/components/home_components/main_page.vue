<script lang="ts">
    import SectionTitle from './section_title.vue';
    import RecipesContainer from './recipes-container.vue';
    import { getRecipes } from '../api/get_recipes';

    import { defineComponent, ref, onMounted } from 'vue';
    
    export default defineComponent({
    components: {
        SectionTitle,
        RecipesContainer,
    },
    setup() {
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
                const data = await getRecipes();                 
                recipes.value = data.data;                                 
            } catch (err) {
                error.value = `Err: ${err instanceof Error ? err.message : 'Unknown error'}`;
            } finally {                
                loading.value = false; // Update loading state
            }
        };

        onMounted(fetchRecipes);        
        return {
            recipes,
            loading,
            error,
        };
    },
});


</script>

<template>
    <article class="wrapper recipe-wrapper container-fluid">
        <SectionTitle>Today's recipe</SectionTitle>

        <div 
        @click="$router.push('/recipes/meal/lasagn')"
        class="recipe today-recipe">
            <h5 class="recipe-title">Lasagna</h5>
            <div class="image-wrapper">
                <img src="/src/assets/images/lasagn2.jpg" alt="Lasagn">
                <span class="difficulty ff-medium">Easy</span>
            </div>
            <div class="details">
                <div class="detail">
                    <h3 class="detail-accent">4</h3>
                    <p class="detail-name ff-light">Ingredients</p>
                </div>
                <div class="detail">
                    <h3 class="detail-accent">1h</h3>
                    <p class="detail-name ff-light">Total time</p>
                </div>
                <div class="detail">
                    <h3 class="detail-accent">2 days</h3>
                    <p class="detail-name ff-light">Last for</p>
                </div>
                <div class="detail">
                    <h3 class="detail-accent">50RON</h3>
                    <p class="detail-name ff-light">Price</p>
                </div>
            </div>
        </div>

        <SectionTitle>Explore all recipes</SectionTitle>
        <div class="explore-all">
            <header class="filter-header">
                <h5 class="ff-regular">Sort by:</h5>
                <div class="filters">
                    <div class="filter">Name</div>
                    <div class="filter">Price</div>
                    <div class="filter">Steps</div>
                    <div class="filter">Ingredients</div>
                    <div class="filter">Total Time</div>
                    <div class="filter">Lasts for</div>
                </div>
            </header>
            <RecipesContainer v-if="recipes.length > 0" v-bind:recipes="recipes" />
            <h4 v-else-if="loading">Loading..</h4>
            <h4 v-else>There was an error</h4>

        </div>
    </article>
</template>


