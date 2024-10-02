<script setup lang='ts'>
    import { useRouter } from 'vue-router';
    const router = useRouter();

    const props = defineProps<{
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

</script>

<template>
    <div 
        @click="router.push(`/recipes/${category.toLowerCase()}/${title.toLowerCase()}`)"
        class="recipe recipe-item-grid">
            <h5 class="recipe-title">{{ title }}</h5>
            <div class="image-wrapper">
                <img src="/src/assets/images/lasagn2.jpg" :alt="title">
                <span class="difficulty ff-medium">{{ difficulty }}</span>
            </div>

            <div class="details">
                <div class="detail">
                    <h3 class="detail-accent">{{ ingredients.length }}</h3>
                    <p class="detail-name ff-light">Ingredients</p>
                </div>
                <div class="detail">
                    <h3 class="detail-accent">{{ totalTime }}h</h3>
                    <p class="detail-name ff-light">Total time</p>
                </div>
                <div class="detail">
                    <h3 class="detail-accent">{{ lastingTime }} days</h3>
                    <p class="detail-name ff-light">Last for</p>
                </div>
                <div class="detail">
                    <h3 class="detail-accent">{{cost}}RON</h3>
                    <p class="detail-name ff-light">Price</p>
                </div>
            </div>
        </div>
</template>