<script lang="ts">
    import Icon from "@iconify/svelte";
    import projectStore from "$lib/data/ProjectStore";
    import ProjectCard from "./atoms/ProjectCard.svelte";

    let activeIndex = 0;

    function showPrevious() {
        activeIndex = (activeIndex - 1 + projectStore.length) % projectStore.length;
    }

    function showNext() {
        activeIndex = (activeIndex + 1) % projectStore.length;
    }

    function goToSlide(index: number) {
        activeIndex = index;
    }

</script>

<section class="w-screen h-screen p-6 md:p-12 lg:p-20 overflow-hidden">
    <div class="relative w-full h-full bg-slate-950/80 shadow-[0_30px_80px_rgba(15,23,42,0.45)] backdrop-blur overflow-hidden">
        <div
            class="flex h-full transition-transform duration-700 ease-out"
            style={`transform: translateX(-${activeIndex * 100}%);`}
        >
            {#each projectStore as project}
                <div class="h-full w-full shrink-0">
                    <ProjectCard {project} />
                </div>
            {/each}
        </div>

        {#if projectStore.length > 1}
            <div class="pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 justify-between px-4 md:px-6">
                <button
                    type="button"
                    class="pointer-events-auto grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-slate-900/75 text-white transition-colors hover:bg-slate-800"
                    aria-label="Show previous project"
                    on:click={showPrevious}
                >
                    <Icon icon="mdi:chevron-left" width="24" height="24" />
                </button>
                <button
                    type="button"
                    class="pointer-events-auto grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-slate-900/75 text-white transition-colors hover:bg-slate-800"
                    aria-label="Show next project"
                    on:click={showNext}
                >
                    <Icon icon="mdi:chevron-right" width="24" height="24" />
                </button>
            </div>

            <div class="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full border border-white/10 bg-slate-900/60 px-3 py-2 backdrop-blur">
                {#each projectStore as _, index}
                    <button
                        type="button"
                        class={`h-2.5 rounded-full transition-all ${index === activeIndex ? "w-8 bg-white" : "w-2.5 bg-white/35 hover:bg-white/60"}`}
                        aria-label={`Go to project ${index + 1}`}
                        on:click={() => goToSlide(index)}
                    ></button>
                {/each}
            </div>
        {/if}
    </div>
</section>