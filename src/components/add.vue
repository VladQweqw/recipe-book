<script lang='ts'>
    import { ref, watch, defineComponent, onMounted, reactive, toRaw } from 'vue';
    import { useRoute } from 'vue-router';
    import { getRecipes } from './api/get_recipes';

    export default defineComponent({
        components: {
            
        },
        setup() {
        const route = useRoute();
        const form_elem = ref({
            title: "",
            totalTime: 0,
            LastingTime: 0,
            cost: 0,
            ingredients: "",
        })
        const cateogry_ref = reactive({
            category: "Meal"
        })
        const difficulty_ref = reactive({
            difficulty: "Easy"
        })
        const thumbnailImage = ref<HTMLInputElement | null>(null);
        const steps = ref([]);

        const individualSteps = ref<{
            text: string,
            image: any
        }[]>([]);
        const allSteps = ref<{
            text: string,
            image: any
        }[]>([]);

        function addStep() {
            individualSteps.value.push({
                text: "",
                image: null
            })
        }

        function onFileChange(event: any, index: number) {
            const file = event.target!.files[0];
            
            if(file) {
                individualSteps.value[index] = {
                    ...individualSteps.value[index],
                    image: file,
                }
            }
        }

        function submitData() {
            individualSteps.value.forEach((step: any) => {
                allSteps.value.push(step);
            })
        }
        
        const error = ref<string | null>();
        const loading = ref<boolean>(false);

        const fetchRecipes = async (body: any) => {            
            loading.value = true; 

            try {
                const data = await getRecipes('', body, 'POST');                 
                alert(data.detail)
            } catch (err) {
                error.value = `Err: ${err instanceof Error ? err.message : 'Unknown error'}`;
            } finally {                
                loading.value = false; 
            }
        };

        const createRecipe = () => {
            const form = form_elem.value;
            const formData = new FormData();
            
            formData.append('title', form.title);
            formData.append('category', cateogry_ref.category);
            formData.append('totalTime', form.totalTime.toString());
            formData.append('lastingTime', form.LastingTime.toString());
            formData.append('cost', form.cost.toString());
            formData.append('difficulty', difficulty_ref.difficulty);
            formData.append('thumbnailImage', thumbnailImage.value!.files![0]);
            
            const steps = toRaw(allSteps);

            form.ingredients?.split(',').forEach((ingredient: string) => formData.append('ingredients', ingredient.trim()))
            steps.value.forEach((step: any) => {
                formData.append('stepImages', step.image)
                formData.append('stepTexts', step.text)
            });
            
            fetchRecipes(formData)
        }   

        return {
            createRecipe,
            form_elem,
            thumbnailImage,
            steps,
            individualSteps,
            allSteps,
            addStep,
            onFileChange,
            submitData,
            cateogry_ref,
            difficulty_ref,
            error,
            loading
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
                <select v-model="cateogry_ref.category" name="category" id="category">
                    <option value="Breakfast">Breakfast</option>
                    <option value="Meal">Meal</option>
                    <option value="Deserts">Deserts</option>
                </select>
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
                <label for="difficulty">Difficulty:</label>
                <select v-model="difficulty_ref.difficulty" name="difficulty" id="difficulty">
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
                <div v-for="(data, idx) in individualSteps" :key="idx" class="step">
                    <label for="">step {{ idx + 1 }}.</label>

                    <input 
                    @change="onFileChange($event, idx)"
                    accept="image/*"
                    type="file" 
                    name="step image" 
                    placeholder="Step image" 
                    >

                    <textarea 
                    v-model="data.text"
                    :placeholder="'Add step ' + (idx + 1) "
                    ></textarea>
                </div>
                
                <button 
                @click="addStep"
                type="button"
                class="btn">Add step</button>
            </div>
                <h2 v-if="error">Error, try again later pls.</h2>
                <button 
                @click="submitData();createRecipe()"
                type="button"
                class="btn">Create Recipe</button>

                <h4 v-if="loading">Loading...</h4>
            </form>

    </div>
</template>