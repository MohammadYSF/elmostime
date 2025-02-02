<script>
    import { navigate } from "svelte-routing";
    import { login } from "../authStore";
    import { API_URL } from "../lib/helpers";
    import axios from "axios";
    let username = "";
    let password = "";
    let errorMessage = "";
    async function handleLogin() {
        try {
            // Example login: Replace with actual API call
            const response = await axios.post(`${API_URL}/login`, {
                username,
                password,
            });

            const data = response.data;
            console.log("data", data);

            if (data.access_token) {
                login(data.access_token);
                navigate("/time");
            } else {
                errorMessage = "Invalid credentials";
            }
        } catch (err) {
            errorMessage = "An error occurred";
            console.error(err); // Optional: log error for debugging
        }
    }
</script>

<div class="p-4" style="width: 100%;" dir="rtl">
    <h2 class="text-xl">ورود/ثبت نام</h2>
    <input
        class="border p-2 w-full"
        type="text"
        bind:value={username}
        placeholder="نام کاربری"
    />
    <input
        class="border p-2 w-full mt-2"
        type="password"
        bind:value={password}
        placeholder="رمزعبور"
    />
    <button class="bg-blue-500 text-white px-4 py-2 mt-2" onclick={handleLogin}
        >ورود/ثبت نام</button
    >
    {#if errorMessage}<p class="text-red-500">{errorMessage}</p>{/if}
</div>
