<script>
	import { Route, Router, Link } from "svelte-routing";
	import PrivateRoute from "./components/PrivateRoute.svelte";
	import Login from "./components/Login.svelte";
	import { authStore, logout, checkAuthentication } from "./authStore";
	import TimeSchedules from "./TimeSchedules.svelte";
	import Register from "./components/Register.svelte";
	import Exams from "./Exams.svelte";
	import Home from "./Home.svelte";
	checkAuthentication();
</script>

<Router>
	<nav class="fixed top-0 left-0 w-full bg-transparent shadow-md p-4 z-50">
		<div class="flex space-x-4">
			<Link to="/" class="text-gray-300 hover:text-green-600">خانه</Link>
			{#if $authStore.isAuthenticated}
				<Link to="/time" class="text-gray-300 hover:text-green-600"
					>برنامه هفتگی</Link
				>
				<Link to="/exams" class="text-gray-300 hover:text-green-600"
					>امتحانات</Link
				>

				<a
					role="button"
					onclick={logout}
					class="text-red-700 hover:text-red-400"
				>
					خروج
				</a>
			{:else}
				<Link to="/login" class="text-gray-300 hover:text-green-600"
					>ورود</Link
				>
				<Link to="/register" class="text-gray-300 hover:text-green-600"
					>ثبت نام</Link
				>
			{/if}
		</div>
	</nav>

	<main class="mt-10" style="max-width: 100%;">
		<Route path="/register" component={Register} />
		<Route path="/" component={Home} />
		<Route path="/login" component={Login} />
		<PrivateRoute path="/exams" component={Exams} />
		<PrivateRoute path="/time" component={TimeSchedules} />
	</main>
</Router>
