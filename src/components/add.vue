<script lang='ts'>
    import { ref, watch, defineComponent, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { getRecipes } from './api/get_recipes';

    export default defineComponent({
        components: {
            
        },
        setup() {
        const route = useRoute();
        const form_elem = ref({
            title: "",
            category: "",
            totalTime: 0,
            LastingTime: 0,
            cost: 0,
            difficulty: "",
            ingredients: "",
        })
        const thumbnailImage = ref<HTMLInputElement | null>(null);
        
        const createRecipe = (e: Event) => {
            e.preventDefault();
            const form = form_elem.value;
                        
            const data = {
                title: form.title,
                category: form.category,
                totalTime: form.totalTime,
                lastingTime: form.LastingTime,
                cost: form.cost,
                difficulty: form.difficulty.value,
                thumbnailImage: thumbnailImage.value?.files?.[0],
                ingredients: form.ingredients?.split(','),
                steps: [],
            }

            console.log(data);
            
        }

        return {
            createRecipe,
            form_elem,
            thumbnailImage,
        };
    },
});

</script>

<template>
    <div class="recipe-wrapper add-wrapper">
        <form 
        ref="form_elem"
        action=""
        id="form">
            <div class="input">
                <label for="title">Title:</label>
                <input 
                type="text" 
                v-model="form_elem.title" 
                class="input-field" 
     
                placeholder="Title">
            </div>

            <div class="input">
                <label for="title">Category:</label>
                <input 
                v-model="form_elem.category" 
                type="text" 
                class="input-field" 
                placeholder="Category">
            </div>

            <div class="input">
                <label for="title">Total Time:</label>
                <input 
                v-model="form_elem.totalTime" 
                type="number" 
                class="input-field"
                 placeholder="Total time">
            </div>

            <div class="input">
                <label for="title">Lasting time:</label>
                <input v-model="form_elem.LastingTime"  type="number" class="input-field" placeholder="Lasting time">
            </div>

            <div class="input">
                <label for="title">Cost:</label>
                <input v-model="form_elem.cost"  type="number" class="input-field" placeholder="Cost">
            </div>

            <div class="input">
                <label for="title">Difficulty:</label>
                <select v-model="form_elem.difficulty"  name="difficulty">
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>

            <div class="input">
                <label for="title">Thumbnail image:</label>
                <input type="file" ref="thumbnailImage" class="input-field" placeholder="Thumbnail image">
            </div>

            <div class="input">
                <label for="title">Ingredients:</label>
                <textarea v-model="form_elem.ingredients" placeholder="Ingrediensts separed by ,"></textarea>
            </div>

            <div class="steps">
                <div class="step">
                    <label for="">step 1.</label>
                    <input type="file" name="step image" placeholder="Step image" id="stepimage">
                    <textarea name="" id="step1" placeholder="step 1 text"></textarea>
                </div>
            </div>
                <button 
                @click="createRecipe"
                
                class="btn">Create Recipe</button>
            </form>

    </div>
</template>