<script>
    import { onMount } from "svelte";
    let mounted = false;
    onMount(() => (mounted = true));
</script>

<section id="about" class="relative py-20 overflow-hidden">
    <div
        class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
    >
        <div
            class="transform transition-all duration-1000 {mounted
                ? 'translate-y-0 opacity-100'
                : 'translate-y-20 opacity-0'}"
        >
            <h2
                class="text-4xl md:text-6xl font-display font-bold mb-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            >
                <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-pink"
                >
                    Crafting the Unknown
                </span>
            </h2>
            <div
                class="space-y-8 text-gray-200 text-lg md:text-xl leading-relaxed font-light mb-16 drop-shadow-md"
            >
                <div
                    class="animate-float"
                    style="animation-delay: 0.2s; animation-duration: 9s"
                >
                    StarPlus Studios is more than just a game developer; we are
                    architects of digital dreams. Founded on the belief that
                    gaming is the ultimate art form, we push the boundaries of
                    what's possible in interactive storytelling.
                </div>
                <div
                    class="animate-float"
                    style="animation-delay: 2.5s; animation-duration: 11s"
                >
                    Our team of visionaries extracts the raw essence of
                    imagination and forges it into playable realities. From
                    deep-space dogfights to intricate narrative RPGs, our
                    portfolio reflects our passion for the extraordinary.
                </div>
                <div
                    class="font-bold text-accent-pink tracking-widest uppercase text-sm animate-float"
                    style="animation-delay: 4s; animation-duration: 8s"
                >
                    Join us as we chart the uncharted.
                </div>
            </div>
            <button
                class="group px-8 py-3 relative bg-transparent overflow-hidden rounded-none border-l border-r border-primary/50 text-white font-display tracking-[0.2em] uppercase text-sm font-bold hover:text-primary transition-colors"
            >
                <span class="relative z-10">Read Our Story</span>
                <div
                    class="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                ></div>
            </button>
        </div>
    </div>
</section>
