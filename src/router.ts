import { createRouter, createWebHistory } from 'vue-router';

import Home_page from './components/home_components/main_page.vue'
import RecipeCategory from './components/category.vue';
import Recipe from './components/recipe.vue'
import Add from './components/add.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home_page
  },
  {
    path: '/recipes/:category',
    name: 'Category',
    component: RecipeCategory
  },
  {
    path: '/recipes/:category/:recipe',
    name: 'Recipe',
    component: Recipe
  },
  {
    path: '/add',
    name: 'Add',
    component: Add
  },
];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});

export default router;
