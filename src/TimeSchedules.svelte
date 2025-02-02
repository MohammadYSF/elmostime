<script>
	import axios from "axios";
	import { onMount } from "svelte";
	import MultiSelectDropDown from "./components/MultiSelectDropDown.svelte";
	import { toPersianNumbers } from "./lib/helpers";
    import { API_URL } from "./lib/helpers";
    import { authStore } from "./authStore";
	
	let flat_data = $state([]);
	let original_data = $state([]);
	let error = $state("NO_ERROR");
	let selected_courses = $state([]);
	async function fetch_data() {
		try {
			const response = await axios.get(API_URL + "/data",{
				headers:{
					Authorization:`Bearer ${$authStore.token}`
				}
			});
			flat_data = Object.entries(response.data).flatMap(
				([category, courses]) =>
					courses.map((course) => ({ ...course, category })),
			);
			original_data = response.data;
		} catch (err) {
			error = err.message;
		}
	}
	let user_department = $state("ARCHITECTURE_ENG");
	const W = 45;
	const DEFAULT_Z_INDEX = 10;
	fetch_data();

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
	const DEPARTMENT_NAMES_MAP = new Map();
	DEPARTMENT_NAMES_MAP.set("ELECTRICAL_ENG", "برق");
	DEPARTMENT_NAMES_MAP.set("RAILWAY_ENG", "راه آهن");
	DEPARTMENT_NAMES_MAP.set("INDUSTRIAL_ENG", "صنایع");
	DEPARTMENT_NAMES_MAP.set("PHYSICS", "فیزیک");
	DEPARTMENT_NAMES_MAP.set("METALOGY_ENG", "مواد");
	DEPARTMENT_NAMES_MAP.set("ARCHITECTURE_ENG", "معماری");
	DEPARTMENT_NAMES_MAP.set("MECHANICAL_ENG", "مکانیک");
	DEPARTMENT_NAMES_MAP.set("CHEMICAL_ENG", "م شیمی");
	DEPARTMENT_NAMES_MAP.set("CIVIL_ENG", "عمران");
	DEPARTMENT_NAMES_MAP.set("COMPUTER_ENG", "کامپیوتر");
	DEPARTMENT_NAMES_MAP.set("PHYSICALEDU", "تربیت بدنی");
	DEPARTMENT_NAMES_MAP.set("ISLAMICEDU", "معارف");
	DEPARTMENT_NAMES_MAP.set("CHEMISTRY", "شیمی");
	DEPARTMENT_NAMES_MAP.set("MANAGEMENT", "مدیریت");
	DEPARTMENT_NAMES_MAP.set("NOOR", "واحد نور");
	DEPARTMENT_NAMES_MAP.set("PARDIS", "پردیس");
	DEPARTMENT_NAMES_MAP.set("GENERAL", "سایر");
	DEPARTMENT_NAMES_MAP.set("MATH", "ریاضی");
	let filtered_data = $derived(
		flat_data.filter((a) =>
			selected_courses.includes(a.course_number_and_group),
		),
	);

	onMount(fetch_data);

	function remove_course(id) {
		selected_courses = [...selected_courses.filter((a) => a != id)];
	}
	let mouse_entered_id = $state("");
</script>

<div class="grid grid-cols-4" dir="rtl">
	<div class="col-span-4 md:col-span-1">
		<div class="" style="width: 100%;">
			<MultiSelectDropDown
				additionalClass="mb-3"
				title="همه دانشکده ها ..."
				options={flat_data}
				bind:selectedItems={selected_courses}
			/>
			<MultiSelectDropDown
				additionalClass="mb-3"
				title="{DEPARTMENT_NAMES_MAP.get('ISLAMICEDU')} ..."
				options={flat_data.filter((a) => a.category == "ISLAMICEDU")}
				bind:selectedItems={selected_courses}
			/>
			<MultiSelectDropDown
				additionalClass="mb-3"
				title="{DEPARTMENT_NAMES_MAP.get('PHYSICALEDU')} ..."
				options={flat_data.filter((a) => a.category == "PHYSICALEDU")}
				bind:selectedItems={selected_courses}
			/>
			<MultiSelectDropDown
				additionalClass="mb-3"
				title="{DEPARTMENT_NAMES_MAP.get('MATH')} ..."
				options={flat_data.filter((a) => a.category == "MATH")}
				bind:selectedItems={selected_courses}
			/>
			<MultiSelectDropDown
				additionalClass="mb-3"
				title="{DEPARTMENT_NAMES_MAP.get('PHYSICS')} ..."
				options={flat_data.filter((a) => a.category == "PHYSICS")}
				bind:selectedItems={selected_courses}
			/>
			<MultiSelectDropDown
				title="دانشکده شما : {DEPARTMENT_NAMES_MAP.get(
					user_department,
				)} ..."
				options={flat_data.filter((a) => a.category == "ISLAMICEDU")}
				bind:selectedItems={selected_courses}
			/>
		</div>
	</div>
	<div class="col-span-4 md:col-span-3">
		<table
			class="w-full"
			style="table-layout: fixed; height: 450px;"
			dir="rtl"
		>
			<thead>
				<tr>
					<th style="width:{W + 40}px;" class="border-b text-right"
						>#</th
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
									class="border-b"
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
											class="cursor-pointer inline-block {mouse_entered_id ==
											c.course_number_and_group
												? `bg-red-700 z-${DEFAULT_Z_INDEX + 10}`
												: `bg-green-700 z-${DEFAULT_Z_INDEX}`} relative {j >
											0
												? 'border-t'
												: ''}"
											style="width: {3 * W}px"
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
	.background {
		/* background-image: url({}); */
		background-size: cover;
		background-position: center;
	}
	.overlay {
		background-color: rgba(0, 0, 0, 0.6);
	}
</style>
