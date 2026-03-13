<script lang="ts">
    import { onMount } from "svelte";
    import type Project from "$lib/data/Project";
    import Icon from "@iconify/svelte";

    export let project: Project;

    let hovered = false;
    let videoEl: HTMLVideoElement;
    let videoContainer: HTMLDivElement;
    let isFullscreen = false;

    onMount(() => {
        const onFullscreenChange = () => {
            isFullscreen = document.fullscreenElement === videoContainer;
            if (!isFullscreen && videoEl) {
                videoEl.muted = true;
            }
        };

        document.addEventListener("fullscreenchange", onFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", onFullscreenChange);
        };
    });

    function handleEnter() {
        hovered = true;
        videoEl?.play();
    }

    function handleLeave() {
        hovered = false;
        if (videoEl && !isFullscreen) {
            videoEl.pause();
            videoEl.currentTime = 0;
        }
    }

    async function handleVideoClick() {
        if (!videoEl || !videoContainer) {
            return;
        }

        try {
            if (!hovered) {
                hovered = true;
            }
            await videoEl.play();
            videoEl.muted = false;
            if (document.fullscreenElement !== videoContainer) {
                await videoContainer.requestFullscreen();
            }
        } catch {
            videoEl.muted = true;
        }
    }

    async function exitFullscreen() {
        if (document.fullscreenElement) {
            await document.exitFullscreen();
        }
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="w-full h-full overflow-hidden relative"
    on:mouseenter={handleEnter}
    on:mouseleave={handleLeave}
>
    {#if !isFullscreen}
        <div class="absolute top-0 left-0 w-full h-full z-10 bg-space-black/35 p-6 md:p-12 lg:p-20 flex flex-col justify-end gap-4 pointer-events-none">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
        </div>
    {/if}

    <div class="absolute top-0 left-0 w-full h-full">
        <img
            src={project.image}
            alt={project.name}
            class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
            class:opacity-0={hovered && !!project.video}
        />

        {#if project.video}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                bind:this={videoContainer}
                class="absolute inset-0 overflow-hidden transition-opacity duration-700 ease-in-out"
                class:opacity-0={!hovered}
                on:click={handleVideoClick}
            >
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[max(100%,177.78vh)] h-[max(100%,56.25vw)]">
                    <!-- svelte-ignore element_invalid_self_closing_tag -->
                    <video
                        bind:this={videoEl}
                        src={project.video}
                        loop
                        muted
                        playsinline
                        preload="auto"
                        class="w-full h-full object-cover"
                    />
                </div>
            </div>
        {/if}
    </div>

    {#if !isFullscreen}
        <a href={project.link} target="_blank" class="absolute bottom-5 right-5 z-20 outline-none flex gap-2 items-center bg-neutral-100/90 border-2 border-primary px-4 py-2 rounded-full text-sm font-semibold text-black hover:bg-primary  hover:text-white pointer-events-auto transition-all duration-400">
            <span>View full page</span>
            <Icon icon="typcn:arrow-right" width="20" height="20"/>
        </a>
    {/if}
</div>