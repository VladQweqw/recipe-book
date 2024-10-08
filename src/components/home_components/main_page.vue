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
        const latestRecipe = ref<{
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
        }>(); 
        const loading = ref<boolean>(true); 
        const error = ref<string | null>(null); 

        const fetchRecipes = async () => {
            try {
                const data = await getRecipes('?reverse=true', {}, "GET");       
                
                if(data.data) {
                    latestRecipe.value = data.data[0]
                }
                recipes.value = data.data;              
                                   
            } catch (err) {                
                console.log(err);
                
                error.value = `Err: ${err}`;
            } finally {                
                loading.value = false; // Update loading state
            }
        };

        onMounted(fetchRecipes);        
        return {
            recipes,
            loading,
            error,
            latestRecipe,
        };
    },
});


</script>

<template>
    <article class="wrapper recipe-wrapper container-fluid">
        <SectionTitle>Latest's recipe</SectionTitle>

        <div 
        @click="$router.push(`/recipes/${latestRecipe?.category}/${latestRecipe?.title}`)"
        class="recipe today-recipe">
            <h5 class="recipe-title">{{ latestRecipe?.title }}</h5>
            <div class="image-wrapper">
                <img :src="latestRecipe?.thumbnailImage" alt="Lasagn">
                <span class="difficulty ff-medium">{{ latestRecipe?.difficulty }}</span>
            </div>
            <div class="details">
                <div class="detail">
                    <h3 class="detail-accent">{{ latestRecipe?.ingredients.length }}</h3>
                    <p class="detail-name ff-light">Ingredients</p>
                </div>
                <div class="detail">
                    <h3 class="detail-accent">{{ latestRecipe?.totalTime }}h</h3>
                    <p class="detail-name ff-light">Total time</p>
                </div>
                <div class="detail">
                    <h3 class="detail-accent">{{ latestRecipe?.lastingTime }} days</h3>
                    <p class="detail-name ff-light">Last for</p>
                </div>
                <div class="detail">
                    <h3 class="detail-accent">{{ latestRecipe?.cost }}RON</h3>
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


