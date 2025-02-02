<script>
	import { Route, Router, Link } from "svelte-routing";
	import PrivateRoute from "./components/PrivateRoute.svelte";
	import Login from "./components/Login.svelte";
	import { authStore, login, logout, checkAuthentication } from "./authStore";
	import { onMount } from "svelte";
	import TimeSchedules from "./TimeSchedules.svelte";
	checkAuthentication();
</script>

<Router>
	<nav class="fixed top-0 left-0 w-full bg-transparent shadow-md p-4 z-50">
		<div class="flex space-x-4">
			{#if $authStore.isAuthenticated}
				<Link to="/Home" class="text-gray-300 hover:text-green-600"
					>خانه</Link
				>

				<Link to="/time" class="text-gray-300 hover:text-green-600"
					>برنامه هفتگی</Link
				>
				<Link to="/exams" class="text-gray-300 hover:text-green-600"
					>امتحانات</Link
				>

				<a
					href="#"
					onclick={logout}
					class="text-red-700 hover:text-red-400"
				>
					خروج
				</a>
			{/if}
		</div>
	</nav>

	<main class="mt-5" style="max-width: 100%;">
		<Route path="/login" component={Login} />
		<PrivateRoute path="/time" component={TimeSchedules} />
	</main>

	<!-- {#if !$authStore.isAuthenticated}
		<h1>please login to use this website</h1>
	{/if} -->
</Router>
