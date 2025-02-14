<script>
    import { Link } from "svelte-routing";
    import { navigate } from "svelte-routing";
    import { API_URL, api } from "../lib/helpers";
    import { onMount } from "svelte";
    let username = $state("");
    let password = $state("");
    let departments = $state([]);
    let selected_sex = $state("");
    let selected_department = $state("");
    let errorMessage = "";
    async function fetch_data() {
        const response = await api.get(`${API_URL}/departments`, {
            cache: {
                ttl: 1000 * 60 * (24 * 60),
            },
        });
        departments = response.data;
        console.log(response.data);
    }
    onMount(fetch_data);
    async function handleRegister() {
        try {
            const response = await api.post(
                `${API_URL}/register`,
                {
                    username,
                    password,
                    sex: selected_sex,
                    department:selected_department
                },
                {
                    cache: false,
                },
            );

            const data = response.data;

            if (response.status == 201) {
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
        <div class="mb-4">
            <select
                style="overflow-y: auto;"
                class="w-full bg-white text-gray-700 border border-gray-700 px-4"
                bind:value={selected_department}
                dir="rtl"
            >
                <option value="" disabled selected
                    >دانشکده ت رو انتخاب کن
                </option>
                {#each departments as dep}
                    <option value={dep.value}>{dep.label}</option>
                {/each}
            </select>
        </div>
        <div class="mb-4">
            <select
                class="w-full bg-white text-gray-700 border border-gray-700 px-4"
                bind:value={selected_sex}
                dir="rtl"
            >
                <option value="" disabled selected
                    >جنسیت را انتخاب کنید
                </option>
                <option value="MALE">آقا</option>
                <option value="FEMALE">خانم</option>
            </select>
        </div>
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
