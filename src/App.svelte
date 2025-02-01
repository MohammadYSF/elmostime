<script>
	import bgImage from "./assets/bg.jpg";
	import axios from "axios";
	import { onMount } from "svelte";
	import MultiSelectDropDown from "./components/MultiSelectDropDown.svelte";
	let flat_data = $state([]);
	let original_data = $state([]);
	let error = $state("NO_ERROR");
	let selected_courses = $state([
		"1211011_01",
		"1711014_03",
		"2011192_01",
		"1611042_01",
		"1611033_01",
	]);
	async function fetch_data() {
		try {
			const response = await axios.get("http://127.0.0.1:5000/data");
			flat_data = Object.entries(response.data).flatMap(
				([category, courses]) =>
					courses.map((course) => ({ ...course, category })),
			);
			original_data = response.data;
		} catch (err) {
			error = err.message;
		}
	}
	const W = 45;
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

	// let filtered_data = $state([]);
	let filtered_data = $derived(
		flat_data.filter((a) =>
			selected_courses.includes(a.course_number_and_group),
		),
	);

	function toPersianNumbers(num) {
		const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
		return num.toString().replace(/\d/g, (d) => persianDigits[d]);
	}
	onMount(fetch_data);

	function remove_course(id) {
		selected_courses = [...selected_courses.filter((a) => a != id)];
	}
</script>
<div class="max-w-xs mx-auto">
<MultiSelectDropDown options={flat_data.map(item=>item.course_name)} selectedItems={selected_courses}/>

</div>
<!-- {#each Object.entries(original_data) as [key, v]}
	<div class="max-w-xs mx-auto">
		<select
			id="course"
			class="mt-5 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
		>
			<option value="course1">{key}</option>
			{#each v as item, i}
				<option value="course1">{item.course_name}</option>
			{/each}
		</select>
	</div>
{/each} -->

<div class="background" style="background-image: url({bgImage});">
	<table class="w-full" style="table-layout: fixed;" dir="rtl">
		<thead>
			<tr>
				<th style="width:{W + 40}px;" class="border-b text-right">#</th>
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
										on:click={() =>
											remove_course(
												c.course_number_and_group,
											)}
										class="bg-green-700 inline-block z-10 relative {j >
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
								class="border-b {i % 2 == 0 ? 'border-r' : ''}"
							></td>
						{/if}
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
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
