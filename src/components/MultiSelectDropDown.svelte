<!-- MultiSelectDropdown.svelte -->
<script>
    import { toPersianNumbers } from "../lib/helpers";
    let {
        options = [],
        selectedItems = $bindable([]),
        title = "...",
        additionalClass = "",
        add_course,
        remove_course,
    } = $props();
    let search_term = $state("");
    let is_dropdown_open = $state(false);
    const toggle_dropdown = () => {
        is_dropdown_open = !is_dropdown_open;
    };
    const handle_checkbox_input_change = (e, id) => {
        if (e.target.checked) {
            add_course(id);
        } else {
            remove_course(id);
        }
    };
    const filteredOptions = $derived(
        options.filter((option) => {
            if (search_term == "") return true;
            return option.course_name.includes(search_term.toLowerCase());
        }),
    );
</script>

<div
    class="relative inline-block group {additionalClass}"
    style="width: 100%;"
    dir="rtl"
>
    <input
        type="text"
        placeholder={title}
        bind:value={search_term}
        onclick={toggle_dropdown}
        style="width: 100%;"
        class="px-4 py-2 bg-green-500 placeholder-gray-200 text-white rounded-md focus:outline-none"
    />
    <div
        style="width: 100%;max-height: 500px;"
        class="absolute hidden bg-gray-100 shadow-md rounded-md w-48 mt-0 p-2 z-10 overflow-y-auto"
        class:block={is_dropdown_open}
        class:hidden={!is_dropdown_open}
    >
        {#each filteredOptions as option}
            <label class="flex items-center space-x-2 py-3">
                <input
                    onchange={(e) => {
                        handle_checkbox_input_change(
                            e,
                            option.course_number_and_group,
                        );
                    }}
                    type="checkbox"
                    bind:group={selectedItems}
                    value={option.course_number_and_group}
                    class="w-6 h-6 text-green-500 focus:ring-2 focus:ring-green-500"
                />
                <span class="text-lg text-gray-600 pr-2"
                    >{toPersianNumbers(option.course_name)}</span
                >
                <span class="text-yellow-600">{option.professor_name}</span>
                <div dir="ltr">
                    <span class="text-red-500">{option.registered}</span>
                    <span class="text-gray-700">/</span>
                    <span class="text-blue-500">{option.capacity}</span>
                </div>
            </label>
        {/each}
    </div>
</div>

<style>
</style>
