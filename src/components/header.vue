<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { useRouter } from 'vue-router';
    
    export default defineComponent({
        components: {},
        setup() {
            const router = useRouter();
            let nav_state = false;

            const navbar = ref<HTMLDivElement>();

            function goToRecipe(type: string) {
                router.push({ path: `/recipes/${type}` });
            }

            function toggleNavbar() {

                if(!nav_state) {
                    navbar.value?.classList.add('extended-navbar-active')
                }else {
                    navbar.value?.classList.remove('extended-navbar-active')
                }

                nav_state = !nav_state;
            }

            return {
                goToRecipe,
                toggleNavbar,
                navbar
            }
        }
    })

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

        <div class="hamburger" @click="toggleNavbar()">
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
        </div>

        <div class="extended-navbar" ref="navbar">
            <div @click="goToRecipe('breakfast')" class="nav-item">
                Breakfast
            </div>
            <div @click="goToRecipe('meal')" class="nav-item">
                Meal
            </div>
            <div @click="goToRecipe('deserts')" class="nav-item">
                Deserts
            </div>
        </div>

        <div class="search-field row navbar-section">
            <input type="search" name="search" placeholder="Search a recipe" id="search" class="input ff-regular ">
        </div>
    </header>
</template>
