<!-- MultiSelectDropdown.svelte -->
<script>
    export let options = [];
    export let selectedItems = [];
</script>

<div class="relative inline-block group">
    <button
        class="w-[300px] px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
    >
        همه دانشکده ها
        <i class="fas fa-caret-down ml-2"></i>
    </button>
    <div
        class="absolute hidden bg-yellow-700 shadow-md rounded-md w-48 mt-2 p-2 z-10 group-focus:block"
    >
        {#each options as option}
            <label class="flex items-center space-x-2">
                <input
                    type="checkbox"
                    bind:group={selectedItems}
                    value={option}
                    class="text-green-500 focus:ring-2 focus:ring-green-500"
                />
                <span>{option}</span>
            </label>
        {/each}
    </div>
</div>

<p class="mt-4 text-white-700">Selected items: {selectedItems.join(", ")}</p>

<style>
    .relative:hover .hidden {
        display: block;
    }
</style>
