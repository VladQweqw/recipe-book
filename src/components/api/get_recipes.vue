<script lang='ts'>
    import { defineComponent, ref } from 'vue';

    const ENDPOINT  = 'http://192.168.1.69:3003';

    export default defineComponent({
        setup() {
            const recipes = ref([]);
            const loading = ref<boolean>(true);
            const error = ref<string | null>(null);

            async function use_fetch() {
                try {
                    const response = await fetch(ENDPOINT, {
                        method: 'GET',
                    })

                    if(response.ok) {
                        const data = await response.json();
                        console.log(data);
                        
                        recipes.value = data;
                    }else {
                        throw new Error(`HTTP error! Status: ${response.status}`)
                    }

                }
                catch(err) {
                    error.value = `Err: ${err}`;
                }
                finally {
                    loading.value = false;
                }
            }
            
            use_fetch();

            return {
                recipes,
                loading,
                error
            }
        }
    })
    
</script>
