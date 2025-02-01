<!-- MultiSelectDropdown.svelte -->
<script>
    let {options=[],selectedItems=$bindable([])} = $props();
    let search_term = $state("");
    let is_dropdown_open = $state(false);
    const toggle_dropdown = () => {
        is_dropdown_open = !is_dropdown_open;
    };
    const filteredOptions =$derived(options.filter((option) => {
        if (search_term == "")return true;
        return option.course_name.includes(search_term.toLowerCase());
    }));
</script>

<div class="relative inline-block group z-30" dir="rtl">

    <input
        type="text"
        placeholder="همه دانشکده ها..."
        bind:value={search_term}
        onclick={toggle_dropdown}
        style="width: 300px;"
        class="px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none"
    />
    <div
        style="width: 300px;max-height: 500px;"
        class="absolute hidden bg-yellow-700 shadow-md rounded-md w-48 mt-0 p-2 z-10 overflow-y-auto"
        class:block={is_dropdown_open}
        class:hidden={!is_dropdown_open}
    >
        {#each filteredOptions as option}
            <label class="flex items-center space-x-2 py-3">
                <input
                    type="checkbox"
                    bind:group={selectedItems}
                    value={option.course_number_and_group}
                    class="w-6 h-6 text-green-500 focus:ring-2 focus:ring-green-500"
                />
                <span class="text-lg">{option.course_name}</span>
            </label>
        {/each}
    </div>
</div>

<style>

</style>
