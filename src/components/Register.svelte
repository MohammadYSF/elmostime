<script>
    import { Link } from "svelte-routing";
    import { navigate } from "svelte-routing";
    import { API_URL } from "../lib/helpers";
    import axios from "axios";
    let username = $state("");
    let password = $state("");
    let errorMessage = "";
    async function handleRegister() {
        try {
            const response = await axios.post(`${API_URL}/register`, {
                username,
                password,
            });

            const data = response.data;

            if (data.access_token) {
                navigate("/login");
            } else {
                errorMessage = "Invalid credentials";
            }
        } catch (err) {
            errorMessage = "An error occurred";
            console.error(err);
        }
    }
</script>

<div class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mx-auto">
    <h2 class="text-3xl font-semibold text-center text-gray-700 mb-6">
        حساب کاربری بساز
    </h2>

    <!-- Registration Form -->
    <form method="POST">
        <!-- Username -->
        <div class="mb-4">
            <label
                for="username"
                class="block text-sm font-medium text-gray-700"
                >نام کاربری</label
            >
            <input
                bind:value={username}
                type="text"
                id="username"
                name="username"
                class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
            />
        </div>

        <!-- Password -->
        <div class="mb-6">
            <label
                for="password"
                class="block text-sm font-medium text-gray-700">رمزعبور</label
            >
            <input
                bind:value={password}
                type="password"
                id="password"
                name="password"
                class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
            />
        </div>

        <!-- Submit Button -->
        <div class="mb-4">
            <button
                onclick={handleRegister}
                type="button"
                class="w-full py-2 px-4 bg-purple-600 text-white text-lg font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
            >
                ثبت نام
            </button>
        </div>
    </form>

    <!-- Redirect to Login -->
    <p class="text-center text-sm text-gray-600">
        حساب کاربری داری از قبل ؟‌
        <Link to="/login" class="text-purple-600 hover:underline">
            بریم لاگین
        </Link>
    </p>
</div>
