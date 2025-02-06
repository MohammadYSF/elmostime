<script>
    import jalaali from "jalaali-js";
    import axios from "axios";
    import { onMount } from "svelte";
    import { API_URL, countHalfHours, toPersianNumbers } from "./lib/helpers";
    import { authStore, logout } from "./authStore";
    import dayjs from "dayjs";
    import utc from "dayjs/plugin/utc";
    import { jwtDecode } from "jwt-decode";
    dayjs.extend(utc);

    function convertToGregorian(persianDate) {
        const [jy, jm, jd] = persianDate.split("/").map(Number);
        const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
        return new Date(gy, gm - 1, gd);
    }

    function convertToPersian(date) {
        const { jy, jm, jd } = jalaali.toJalaali(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
        );
        return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
    }
    function getPersianDayName(persianDate) {
        const dayNames = [
            "یکشنبه",
            "دوشنبه",
            "سه‌شنبه",
            "چهارشنبه",
            "پنج‌شنبه",
            "جمعه",
            "شنبه",
        ];
        const gregorianDate = convertToGregorian(persianDate);
        const weekday = gregorianDate.getDay(); // Get weekday (0-6, 0 is Sunday)

        return dayNames[weekday];
    }

    function sortAndFillPersianDates(persianDates) {
        // Remove duplicates using a Set
        let uniqueDates = [...new Set(persianDates)];

        let convertedDates = uniqueDates.map((date) => ({
            persianDate: date,
            gregorianDate: convertToGregorian(date),
        }));

        // Sort by Gregorian date
        convertedDates.sort((a, b) => a.gregorianDate - b.gregorianDate);

        let result = [];

        for (let i = 0; i < convertedDates.length; i++) {
            let currentDate = convertedDates[i].gregorianDate;
            result.push(convertedDates[i].persianDate);

            if (i < convertedDates.length - 1) {
                let nextDate = convertedDates[i + 1].gregorianDate;
                let tempDate = new Date(currentDate);

                // Fill missing dates
                while (tempDate < nextDate) {
                    tempDate.setDate(tempDate.getDate() + 1);
                    if (tempDate < nextDate) {
                        result.push(convertToPersian(tempDate));
                    }
                }
            }
        }

        return result;
    }

    let flat_data = $state([]);
    let error = $state("NO_ERROR");
    let selected_courses = $state([]);
    const SCRAPE_DATETIME = "scrape_datetime";
    let last_scrape_datetime = $state(dayjs());
    async function fetch_data() {
        try {
            const response = await axios.get(API_URL + "/data", {
                headers: {
                    Authorization: `Bearer ${$authStore.token}`,
                },
            });
            const response2 = await axios.get(API_URL + "/userCourses", {
                headers: {
                    Authorization: `Bearer ${$authStore.token}`,
                },
            });
            selected_courses = response2.data;
            last_scrape_datetime = dayjs(
                response.data[SCRAPE_DATETIME],
            ).local();

            flat_data = Object.entries(response.data)
                .filter(([k, v]) => k != SCRAPE_DATETIME)
                .flatMap(([category, courses]) =>
                    courses.map((course) => {
                        return {
                            exam_date: course.exam_date,
                            exam_start_time: course.exam_start_time,
                            exam_end_time: course.exam_end_time,
                            course_name: course.course_name,
                            course_number_and_group:
                                course.course_number_and_group,
                        };
                    }),
                )
                .filter(
                    (a) =>
                        selected_courses.includes(a.course_number_and_group) &&
                        a.exam_date != "",
                );
            console.log(flat_data);
            original_data = response.data.filter(
                ([k, v]) => k != SCRAPE_DATETIME,
            );
        } catch (err) {
            if (err.response && err.response.status === 401) {
                logout();
            }
            error = err.message;
        }
    }
    const W = 23;
    const DEFAULT_Z_INDEX = 10;

    const TIMES = [
        "07:00",
        "07:30",
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
    ];

    onMount(fetch_data);

    let mouse_entered_id = $state("");
    const last_update_diff_in_minutes = $derived(
        dayjs().diff(last_scrape_datetime, "minute"),
    );
    const days = $derived(
        sortAndFillPersianDates(flat_data.map((item) => item.exam_date)),
    );
</script>



<div class="grid grid-cols-4" dir="rtl">
    <div class="col-span-4 md:col-span-1 px-5">
        <div class="" style="width: 100%;">
            <h4 class="mb-5">
                آخرین بروزرسانی :{toPersianNumbers(last_update_diff_in_minutes)}
                دقیقه پیش
            </h4>
        </div>
    </div>
    <div class="col-span-4 md:col-span-3 px-5">
        <table
            class="w-full"
            style="table-layout: fixed; height: 450px;"
            dir="rtl"
        >
            <thead>
                <tr>
                    <th
                        style="width:{W + 40}px;height:5px;"
                        class="border-b text-right">#</th
                    >
                    {#each TIMES as t, i}
                        <th
                            style="width:{W}px;"
                            class="border-b {i % 2 == 0
                                ? 'text-rtl relative'
                                : 'invisible'}"
                        >
                            {#if i % 2 == 0}
                                <span class="absolute top-0 -right-2">
                                    {toPersianNumbers(t.substring(0, 2))}
                                </span>
                            {/if}
                        </th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each days as item, _}
                    <tr>
                        <td style="height: 50px;" class="border-b">
                            <span class="block">{getPersianDayName(item)}</span>
                            <span>{toPersianNumbers(item)}</span>
                        </td>
                        {#each TIMES as t, i}
                            {#if flat_data.filter((a) => a.exam_start_time == t && a.exam_date == item).length > 0}
                                <td
                                    style="height: 50px; width: {W}px"
                                    class="border-b {i % 2 == 0
                                        ? 'border-r'
                                        : ''}"
                                >
                                    {#each flat_data.filter((a) => a.exam_start_time == t && a.exam_date == item) as c, j}
                                        <div
                                            onmouseenter={() => {
                                                mouse_entered_id =
                                                    c.course_number_and_group;
                                            }}
                                            onmouseleave={() =>
                                                (mouse_entered_id = "")}
                                            class="cursor-pointer inline-block {mouse_entered_id ==
                                            c.course_number_and_group
                                                ? `bg-red-700 z-${DEFAULT_Z_INDEX + 10}`
                                                : `bg-green-700 z-${DEFAULT_Z_INDEX}`} relative {j >
                                            0
                                                ? 'border-t'
                                                : ''}"
                                            style="width: {countHalfHours(
                                                c.exam_start_time,
                                                c.exam_end_time,
                                            ) * W}px"
                                        >
                                            {toPersianNumbers(c.course_name)}
                                        </div>
                                    {/each}
                                </td>
                            {:else}
                                <td
                                    style="height: 50px; width: {W}px"
                                    class="border-b {i % 2 == 0
                                        ? 'border-r'
                                        : ''}"
                                ></td>
                            {/if}
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
<style>

</style>