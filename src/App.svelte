<script>
	import bgImage from "./assets/bg.jpg";
	import axios from "axios";
	import { onMount } from "svelte";

	let flat_data = [];
	let error = "NO_ERROR";
	let selected_courses = ["1211011_01", "1711014_03", "2011192_01","1611042_01"];
	async function fetch_data() {
		try {
			const response = await axios.get("http://127.0.0.1:5000/data");
			flat_data = Object.entries(response.data).flatMap(
				([category, courses]) =>
					courses.map((course) => ({ ...course, category })),
			);
			set_filtered_data();
			console.log(flat_data);
		} catch (err) {
			error = err.message;
		}
	}
	let w = 45;
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
	let filtered_data = [];
	function set_filtered_data() {
		filtered_data = flat_data.filter(
			(a) =>
				selected_courses.findIndex(
					(b) => b == a.course_number_and_group,
				) != -1,
		);
	}

	onMount(fetch_data);
	// console.log("data", flat_data);
	// console.log("fdata", filtered_data);
</script>

<div class="background" style="background-image: url({bgImage});">
	<table class="w-full" style="table-layout: fixed;">
		<thead>
			<tr>
				<th style="width:{w + 40}px;" class="border-b text-left">#</th>
				{#each TIMES as t, i}
					{#if i % 2 == 0}
						<th
							style="width:{w}px;"
							class="border-b text-left border-l"
							>{t.substring(0, 2)}</th
						>
					{:else}
						<th
							style="width:{w}px;"
							class="border-b text-left invisible">{t}</th
						>
					{/if}

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
								style="height: 50px; width: {w}px"
								class="border-b"
							>
								{#each filtered_data.filter((a) => a.lecture_schedules.findIndex((b) => b.start_time == t && b.day_of_week == item) != -1) as c, _}
									<div
										class="bg-green-700 inline-block z-10 relative"
										style="width: {3 * w}px"
									>
										{c.course_name}
									</div>
								{/each}
							</td>
						{:else if i % 2 == 0}
							<td
								style="height: 50px; width: {w}px"
								class="border-l border-b"
							></td>
						{:else}
							<td
								style="height: 50px; width: {w}px"
								class="border-b"
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
