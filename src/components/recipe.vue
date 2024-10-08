<script lang="ts">
    import { ref, watch, defineComponent, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { getRecipes } from './api/get_recipes';
    import SectionTitle from '../components/home_components/section_title.vue';
    
    export default defineComponent({
        components: {
            SectionTitle,
        },
        setup() {
            const route = useRoute();
            let category = ref(route.params.category)
            let recipe_name = ref(route.params.recipe)

        const recipe = ref<{
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
        }>(); 
        const loading = ref<boolean>(true); 
        const error = ref<string | null>(null); 

        const fetchRecipes = async () => {
            try {
                const data = await getRecipes(`/recipe?name=${recipe_name.value}`);                 
                recipe.value = data.data;           
                console.log(data.data);
                                                      
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
            recipe,
            loading,
            error,
            category,
            recipe_name,
        };

        }
    })
   

 
</script>

<template>
    <article class="wrapper recipe-wrapper container-fluid">
        <header class="title col-12">
            <p class="history"> 
                <router-link :to="'/' ">home</router-link> >>
                <router-link :to="'/recipes/' + category">{{category}}</router-link> >> 
                {{ recipe_name }}</p>
            <SectionTitle >{{ recipe_name }}</SectionTitle>
          
        </header>

        <h3 v-if="loading">Loading...</h3>
        <h3 v-if="error">There was an error..</h3>
        
        <div class="thumbnail-image-wrapper col-12">
            <img :src="recipe?.thumbnailImage" :alt="recipe?.title" class="image" id="thumbnail-image">
        </div>

        <section class="recipe-section row">
            <SectionTitle>Ingredients:</SectionTitle>
            <div class="ingredients">
                <span v-for="(ingredient, index) in recipe?.ingredients" :key="index">
                    <label class="ingredient" :for="'ingredient-' + index">
                        <span>{{ ingredient }}</span>
                    </label>
                </span>
            </div>
        </section>
        
        <section v-for="(step, index) in recipe?.stepTexts" :key="index" class="recipe-step recipe-section">
            <SectionTitle>Step {{ index + 1 }}.</SectionTitle>

            <div :class="{'row': true, 'step-content': true, 'reverse': index % 2 == 0}">
                <div v-if="recipe?.stepImages[index]" class="image-wrapper col-lg-6 col-12">
                    <img :src="recipe?.stepImages[index]" alt="recipe-image" class="image">
                </div>
                <div  v-if="!recipe?.stepImages[index]" class="text text-center col-lg-6 col-12">
                    <p v-for="text in step.split('\n')">{{ text }}</p>
                </div>
                <div v-else class="text col-lg-6 col-12">
                    <p v-for="text in step.split('\n')">{{ text }}</p>
                </div>
            </div>
        </section>
    </article>
</template>