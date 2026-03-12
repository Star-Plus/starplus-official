<script>
    import { onMount } from "svelte";
    import PixelLed from "./canvas/PixelLed.svelte";

    let mounted = false;
    onMount(() => (mounted = true));
</script>

<section
    class="min-h-screen flex items-center justify-center relative overflow-hidden pointer-events-none"
>

    <div class="w-screen h-screen absolute top-0 left-0 -z-10 p-20">
        <PixelLed />
    </div>

    <div
        class="relative z-10 text-center space-y-12 pointer-events-auto transform transition-all duration-1000 {mounted
            ? 'translate-y-0 opacity-100'
            : 'translate-y-10 opacity-0'}"
    >
        <div class="size-16 mx-auto mb-8">
            <img src="Sp_Logo.png" alt="" class="selection:bg-transparent! w-full h-full object-contain" />
        </div>

        <h1
            class="font-display selection:bg-transparent! cursor-default font-bold text-6xl md:text-8xl tracking-[0.3em] text-white "
        >
            STARPLUS<br>GAMES
        </h1>

        <p
            class="text-neutral-200 font-Inter text-md opacity-100 mt-12"
        >
            Making games, and things related to games.
        </p>
    </div>
</section>
