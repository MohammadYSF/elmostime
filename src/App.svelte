<!-- <script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
</script>

<main>
  <div>
    <a href="https://vite.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style> -->
<script>
	import bgImage from "./assets/bg.jpg";
	let w = 45;
</script>

<div class="background" style="background-image: url({bgImage});">
	<table class="w-full" style="table-layout: fixed;">
		<thead>
			<tr>
				<th style="width:{w}px;" class="border-b text-left">#</th>
				<th style="width:{w}px;" class="border-b text-left border-l"
					>7</th
				>
				<th style="width:{w}px;" class="border-b text-left invisible"
					>7:30</th
				>
				<th style="width:{w}px;" class="border-b text-left border-l"
					>8</th
				>
				<th style="width:{w}px;" class="border-b text-left invisible"
					>8:30</th
				>
				<th style="width:{w}px;" class="border-b text-left border-l"
					>9</th
				>
				<th style="width:{w}px;" class="border-b text-left invisible"
					>9:30</th
				>
				<th style="width:{w}px;" class="border-b text-left border-l"
					>10</th
				>
				<th style="width:{w}px;" class="border-b text-left invisible"
					>10:30</th
				>
				<th style="width:{w}px;" class="border-b text-left border-l"
					>11</th
				>
				<th style="width:{w}px;" class="border-b text-left invisible"
					>11:30</th
				>
				<th style="width:{w}px;" class="border-b text-left border-l"
					>12</th
				>
				<th style="width:{w}px;" class="border-b text-left invisible"
					>12:30</th
				>
				<th style="width:{w}px;" class="border-b text-left border-l"
					>13</th
				>
				<th style="width:{w}px;" class="border-b text-left invisible"
					>13:30</th
				>
				<th style="width:{w}px;" class="border-b text-left border-l"
					>14</th
				>
				<th style="width:{w}px;" class="border-b text-left invisible"
					>14:30</th
				>
				<th style="width:{w}px;" class="border-b text-left border-l"
					>15</th
				>
				<th style="width:{w}px;" class="border-b text-left invisible"
					>15:30</th
				>
				<th style="width:{w}px;" class="border-b text-left border-l"
					>16</th
				>
				<th style="width:{w}px;" class="border-b text-left invisible"
					>16:30</th
				>
				<th style="width:{w}px;" class="border-b text-left border-l"
					>17</th
				>
				<th style="width:{w}px;" class="border-b text-left invisible"
					>17:30</th
				>
				<th style="width:{w}px;" class="border-b text-left border-l"
					>18</th
				>
				<th style="width:{w}px;" class="border-b text-left invisible"
					>18:30</th
				>
				<th style="width:{w}px;" class="border-b text-left border-l"
					>19</th
				>
			</tr>
		</thead>
		<tbody>
			{#each Array(6) as _, index}
				<tr>
					<td style="height: 50px; width: {w}px" class="border-b"
						>D{index + 1}</td
					>
					<!--#-->
					<td
						style="height: 50px; width: {w}px"
						class="border-l border-b">07:00</td
					>
					<td style="height: 50px; width: {w}px" class="border-b">
						<div
							class="inline-block bg-green-700 z-20 relative"
							style="width: {3 * w}px;"
						>
							آمار و احتمال مهندسی
						</div>
					</td>
					<td
						style="height: 50px; width: {w}px"
						class="border-l border-b"
					></td>
					<td style="height: 50px; width: {w}px" class="border-b">
						<div
							class="bg-green-700 inline-block z-10 relative"
							style="width: {3 * w}px"
						>
							معادلات دیفرانسیل
						</div>
						<div
							class="bg-green-700 inline-block z-10 relative"
							style="width: {3 * w}px"
						>
							جبرخطی عددی
						</div>
						<div
							class="bg-green-700 inline-block z-10 relative"
							style="width: {2 * w}px"
						>
							بهینه سازی غیرخطی
						</div>
						<div
							class="bg-green-700 inline-block z-10 relative"
							style="width: {2 * w}px"
						>
							بهینه سازی غیرخطی
						</div>
					</td>
					<td
						style="height: 50px; width: {w}px"
						class="border-l border-b"
					>
					</td><!--9-->
					<td style="height: 50px; width: {w}px" class="border-b"
					></td>
					<td
						style="height: 50px; width: {w}px"
						class="border-l border-b">10:00</td
					>
					<td style="height: 50px; width: {w}px" class="border-b"
					></td>
					<td
						style="height: 50px; width: {w}px"
						class="border-l border-b">11:00</td
					>
					<td style="height: 50px; width: {w}px" class="border-b"
					></td>
					<td
						style="height: 50px; width: {w}px"
						class="border-l border-b">12:00</td
					>
					<td style="height: 50px; width: {w}px" class="border-b"
					></td>
					<td
						style="height: 50px; width: {w}px"
						class="border-l border-b">13:00</td
					>
					<td style="height: 50px; width: {w}px" class="border-b"
					></td>
					<td
						style="height: 50px; width: {w}px"
						class="border-l border-b">14:00</td
					>
					<td style="height: 50px; width: {w}px" class="border-b"
					></td>
					<td
						style="height: 50px; width: {w}px"
						class="border-l border-b">15:00</td
					>
					<td style="height: 50px; width: {w}px" class="border-b"
					></td>
					<td
						style="height: 50px; width: {w}px"
						class="border-l border-b">16:00</td
					>
					<td style="height: 50px; width: {w}px" class="border-b"
					></td>
					<td
						style="height: 50px; width: {w}px"
						class="border-l border-b">17:00</td
					>
					<td style="height: 50px; width: {w}px" class="border-b"
					></td>
					<td
						style="height: 50px; width: {w}px"
						class="border-l border-b">18:00</td
					>
					<td style="height: 50px; width: {w}px" class="border-b"
					></td>
					<td
						style="height: 50px; width: {w}px"
						class="border-l border-b">19:00</td
					>
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
