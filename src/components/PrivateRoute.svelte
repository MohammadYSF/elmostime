<script>
    import { authStore } from "../authStore";
    import { navigate } from "svelte-routing";
    import { onDestroy } from "svelte";

    export let component; // The component to render
    export let path; // The route path

    $: $authStore, navigateToProtectedRoute();

    function navigateToProtectedRoute() {
        if (!$authStore.isAuthenticated) {
            // Redirect to login if the user is not authenticated
            navigate("/login");
        }
    }

    // Check if user is authenticated on mount
    import { onMount } from "svelte";
    onMount(() => {
        if (!$authStore.isAuthenticated) {
            navigate("/login");
        }
    });
</script>

{#if $authStore.isAuthenticated}
    <svelte:component this={component} />
{/if}
