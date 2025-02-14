<script>
    import axios from "axios";
    import { API_URL, countHalfHours, toPersianNumbers } from "./lib/helpers";
    import { authStore, logout } from "./authStore";
    import { onMount } from "svelte";

    let error = $state("NO_ERROR");
    let data = $state([]);
    let total_unit = $state(0);
    async function fetch_data() {
        try {
            const response = await axios.get(API_URL + "/summary", {
                headers: {
                    Authorization: `Bearer ${$authStore.token}`,
                },
            });
            total_unit = response.data.total_unit;
            data = response.data.data;
        } catch (err) {
            if (err.response && err.response.status === 401) {
                logout();
            }
            error = err.message;
        }
    }
    onMount(fetch_data);
</script>

<div class="grid grid-cols-4 gap-4" dir="rtl">
    <div class="col-span-4 mb-32">
        <h2 class="text-6xl text-right px-10">
            مجموع واحد ها :‌<span>{toPersianNumbers(total_unit)}</span>
        </h2>
    </div>
    
    <table class="table  table-fixed  w-full col-span-4 xl:col-span-3 ">
        <thead class="mb-5 text-xl xl:text-2xl text-gray-400">
            <tr>
                <th>نام درس</th>
                <th>کد</th>
                <th>تعداد واحد</th>
            </tr>
        </thead>
        <tbody class="text-2xl xl:text-4xl">
            {#each data as item}
                <tr style="height: 100px;">
                    <td>
                        {toPersianNumbers(item.course_name)}
                    </td>
                    <td dir="ltr">
                        {toPersianNumbers(item.course_number_and_group)}
                    </td>
                    <td>
                        {toPersianNumbers(item.unit)}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
