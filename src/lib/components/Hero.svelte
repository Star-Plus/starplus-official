<script>
    import { onMount } from "svelte";
    import PixelLed from "./canvas/PixelLed.svelte";

    let mounted = false;
    onMount(() => (mounted = true));
</script>

<section
    class="h-screen w-full flex items-center justify-center relative overflow-hidden pointer-events-none snap-start"
>

    <div class="w-screen h-screen absolute top-0 left-0 -z-10 lg:p-20 p-10">
        <PixelLed />
    </div>

    <div
        class="relative z-10 text-center h-full flex flex-col items-center justify-center space-y-12 pointer-events-auto transform transition-all duration-1000 {mounted
            ? 'translate-y-0 opacity-100'
            : 'translate-y-10 opacity-0'}"
    >
        <div class="size-16 mx-auto mb-8">
            <img src="Sp_Logo.png" alt="" class="selection:bg-transparent! w-full h-full object-contain" />
        </div>

        <h1
            class="font-display selection:bg-transparent! cursor-default font-bold text-4xl md:text-6xl lg:text-8xl tracking-[0.3em] text-white "
        >
            STARPLUS<br>GAMES
        </h1>

        <p
            class="absolute bottom-3 text-neutral-400 font-Inter text-xs lg:text-md opacity-100 mt-12"
        >
            Making games, and things related to games.
        </p>
    </div>
</section>
