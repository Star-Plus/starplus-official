<script>
    import { onMount } from "svelte";

    let mounted = false;
    onMount(() => (mounted = true));
</script>

<section
    class="min-h-screen flex items-center justify-center relative overflow-hidden pointer-events-none"
>
    <div
        class="relative z-10 text-center space-y-12 pointer-events-auto transform transition-all duration-1000 {mounted
            ? 'translate-y-0 opacity-100'
            : 'translate-y-10 opacity-0'}"
    >
        <div
            class="animate-float"
            style="animation-delay: 0.5s; animation-duration: 10s"
        >
            <h1
                class="font-display font-bold text-6xl md:text-9xl tracking-[0.2em] text-white mix-blend-overlay"
            >
                STARPLUS
            </h1>

            <p
                class="text-primary font-mono text-sm tracking-[0.8em] uppercase opacity-60 mt-12"
            >
                Next Gen Gaming Experience
            </p>
        </div>
    </div>
</section>
