<script>
    import { navigate } from "svelte-routing";
    import { login } from "../authStore";
    import { API_URL } from "../lib/helpers";
    import axios from "axios";
    import { Link } from "svelte-routing";
    let username = $state("");
    let password = $state("");
    let errorMessage = "";
    async function handleLogin() {
        try {
            const response = await axios.post(`${API_URL}/login`, {
                username,
                password,
            });

            const data = response.data;

            if (data.access_token) {
                login(data.access_token);
                navigate("/time");
            } else {
                errorMessage = "Invalid credentials";
            }
        } catch (err) {
            errorMessage = "An error occurred";
            console.error(err); 
        }
    }
</script>

<div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mx-auto">
    <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">
        وارد حساب خود شوید
    </h2>

    <form>
        <div class="mb-4">
            <label
                for="username"
                class="block text-sm font-medium text-gray-600"
                >نام کاربری</label
            >
            <input
                bind:value={username}
                type="text"
                id="username"
                name="username"
                placeholder="نام کاربری ت رو بزن"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 mt-2"
            />
        </div>

        <div class="mb-4">
            <label
                for="password"
                class="block text-sm font-medium text-gray-600">رمزعبور</label
            >
            <input
                bind:value={password}
                type="password"
                id="password"
                name="password"
                placeholder="رمزعبورت رو بزن"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 mt-2"
            />
        </div>

        <!-- Submit Button -->
        <button
            onclick={handleLogin}
            type="button"
            class="mb-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
        >
            ورود
        </button>

        <p class="text-center text-sm text-gray-600">
            حساب کاربری نداری ؟
            <Link to="/register" class="text-green-600 hover:underline">
                بریم ثبت نام کنیم
            </Link>
        </p>
    </form>
</div>

<style>
</style>
