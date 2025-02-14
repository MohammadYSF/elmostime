<script>
	import { onMount } from "svelte";
	import MultiSelectDropDown from "./components/MultiSelectDropDown.svelte";
	import {
		toPersianNumbers,
		API_URL,
		countHalfHours,
		api,
	} from "./lib/helpers";
	import { authStore, logout } from "./authStore";
	import dayjs from "dayjs";
	import utc from "dayjs/plugin/utc";
	import { jwtDecode } from "jwt-decode";
	dayjs.extend(utc);

	let flat_data = $state([]);
	let departments = $state([]);
	let ta_data = $state([]);
	let original_data = $state([]);
	let error = $state("NO_ERROR");
	let selected_courses = $state([]);
	const SCRAPE_DATETIME = "scrape_datetime";
	let last_scrape_datetime = $state(dayjs());
	const payload = jwtDecode($authStore.token);
	let user_department = payload.department;
	let user_sex = payload.sex;
	async function fetch_data() {
		try {
			const [response, response2, response3] = await Promise.all([
				api.get(API_URL + "/data", {
					cache: {
						ttl: 1000 * 60 * 5,
					},
					headers: {
						Authorization: `Bearer ${$authStore.token}`,
						"Cache-Control": "public, max-age=60",
					},
				}),
				api.get(API_URL + "/userCourses", {
					cache: false,
					headers: {
						Authorization: `Bearer ${$authStore.token}`,
					},
				}),
				api.get(API_URL + "/departments", {
					cache: {
						ttl: 1000 * 60 * (24 * 60),
					},
					headers: {
						Authorization: `Bearer ${$authStore.token}`,
					},
				}),
			]);
			departments = response3.data;
			selected_courses = response2.data;
			last_scrape_datetime = dayjs(
				response.data[SCRAPE_DATETIME],
			).local();
			flat_data = Object.entries(response.data)
				.filter(([k, v]) => k != SCRAPE_DATETIME)
				.flatMap(([category, courses]) =>
					courses.map((course) => ({ ...course, category })),
				)
				.filter((a) => ["COMPLEX", user_sex].includes(a.sex));
			ta_data = flat_data
				.filter((a) => a.ta_schedule != undefined)
				.map((item) => {
					return {
						course_number_and_group: item.course_number_and_group,
						course_name: `حل تمرین ${item.course_name}`,
						lecture_schedules: [
							{
								start_time: item.ta_schedule?.start_time,
								end_time: item.ta_schedule?.end_time,
								day_of_week: item.ta_schedule?.day_of_week,
							},
						],
					};
				});
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
	const WEEK_DAYS = [
		"SATURDAY",
		"SUNDAY",
		"MONDAY",
		"TUESDAY",
		"WEDNESDAY",
		"THURSDAY",
	];
	const PERSIAN_WEEKDAY_MAP = new Map();
	PERSIAN_WEEKDAY_MAP.set("SATURDAY", "شنبه");
	PERSIAN_WEEKDAY_MAP.set("SUNDAY", "یکشنبه");
	PERSIAN_WEEKDAY_MAP.set("MONDAY", "دوشنبه");
	PERSIAN_WEEKDAY_MAP.set("TUESDAY", "سه شنبه");
	PERSIAN_WEEKDAY_MAP.set("WEDNESDAY", "چهارشنبه");
	PERSIAN_WEEKDAY_MAP.set("THURSDAY", "پنجشنبه");
	let filtered_data = $derived(
		flat_data
			.concat(ta_data)
			.filter((a) =>
				selected_courses.includes(a.course_number_and_group),
			),
	);

	onMount(fetch_data);

	async function remove_course(id) {
		const response = await api.put(API_URL + "/userCourses", [id], {
			cache: false,
			headers: {
				Authorization: `Bearer ${$authStore.token}`,
			},
		});
		selected_courses = response.data;
	}
	async function add_course(id) {
		const response = await api.post(API_URL + "/userCourses", [id], {
			cache: false,
			headers: {
				Authorization: `Bearer ${$authStore.token}`,
			},
		});
		selected_courses = response.data;
	}
	let mouse_entered_id = $state("");
	const last_update_diff_in_minutes = $derived(
		dayjs().diff(last_scrape_datetime, "minute"),
	);
</script>

<div class="grid grid-cols-4" dir="rtl">
	<div class="col-span-4 md:col-span-1 px-5">
		<div class="" style="width: 100%;">
			<h4 class="mb-5">
				آخرین بروزرسانی :{toPersianNumbers(last_update_diff_in_minutes)}
				دقیقه پیش
			</h4>
			<MultiSelectDropDown
				{add_course}
				{remove_course}
				additionalClass="mb-3"
				title="همه دانشکده ها ..."
				options={flat_data}
				bind:selectedItems={selected_courses}
			/>
			<MultiSelectDropDown
				{add_course}
				{remove_course}
				additionalClass="mb-3"
				title="{departments.find(a=> a.value=="ISLAMICEDU")?.label} ..."
				options={flat_data.filter((a) => a.category == "ISLAMICEDU")}
				bind:selectedItems={selected_courses}
			/>
			<MultiSelectDropDown
				{add_course}
				{remove_course}
				additionalClass="mb-3"
				title="{departments.find(a=> a.value=="PHYSICALEDU")?.label} ..."				
				options={flat_data.filter((a) => a.category == "PHYSICALEDU")}
				bind:selectedItems={selected_courses}
			/>
			<MultiSelectDropDown
				{add_course}
				{remove_course}
				additionalClass="mb-3"
				title="{departments.find(a=> a.value=="MATH")?.label} ..."				
				options={flat_data.filter((a) => a.category == "MATH")}
				bind:selectedItems={selected_courses}
			/>
			<MultiSelectDropDown
				{add_course}
				{remove_course}
				additionalClass="mb-3"
				title="{departments.find(a=> a.value=="PHYSICS")?.label} ..."				
				options={flat_data.filter((a) => a.category == "PHYSICS")}
				bind:selectedItems={selected_courses}
			/>
			<MultiSelectDropDown
				{add_course}
				{remove_course}
				additionalClass="mb-3"
				title="دانشکده شما : {departments.find(a=> a.value == user_department)?.label} ..."
				options={flat_data.filter((a) => a.category == user_department)}
				bind:selectedItems={selected_courses}
			/>
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
				{#each WEEK_DAYS as item, _}
					<tr>
						<td style="height: 50px;" class="border-b"
							>{PERSIAN_WEEKDAY_MAP.get(item)}</td
						>
						{#each TIMES as t, i}
							{#if filtered_data.filter((a) => a.lecture_schedules.findIndex((b) => b.start_time == t && b.day_of_week == item) != -1).length > 0}
								<td
									style="height: 50px; width: {W}px"
									class="border-b {i % 2 == 0
										? 'border-r'
										: ''}"
								>
									{#each filtered_data.filter((a) => a.lecture_schedules.findIndex((b) => b.start_time == t && b.day_of_week == item) != -1) as c, j}
										<div
											onmouseenter={() => {
												mouse_entered_id =
													c.course_number_and_group;
											}}
											onmouseleave={() =>
												(mouse_entered_id = "")}
											onclick={() =>
												remove_course(
													c.course_number_and_group,
												)}
											class="transition-all duration-300 ease-in-out cursor-pointer inline-block {mouse_entered_id ==
											c.course_number_and_group
												? `bg-red-700 z-${DEFAULT_Z_INDEX + 10}`
												: `bg-green-700 z-${DEFAULT_Z_INDEX}`} relative {j >
											0
												? 'border-t'
												: ''}"
											style="width: {countHalfHours(
												c.lecture_schedules.find(
													(a) =>
														a.start_time == t &&
														a.day_of_week == item,
												).start_time,
												c.lecture_schedules.find(
													(a) =>
														a.start_time == t &&
														a.day_of_week == item,
												).end_time,
											) * W}px;overflow-x:clip"
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
