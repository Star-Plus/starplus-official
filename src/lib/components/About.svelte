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
                class="text-4xl md:text-5xl font-display font-bold mb-8 text-white"
            >
                <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-purple-light"
                >
                    Crafting the Unknown
                </span>
            </h2>
            <div
                class="space-y-6 text-gray-300 text-lg leading-relaxed font-light mb-10"
            >
                <p>
                    StarPlus Studios is more than just a game developer; we are
                    architects of digital dreams. Founded on the belief that
                    gaming is the ultimate art form, we push the boundaries of
                    what's possible in interactive storytelling.
                </p>
                <p>
                    Our team of visionaries extracts the raw essence of
                    imagination and forges it into playable realities. From
                    deep-space dogfights to intricate narrative RPGs, our
                    portfolio reflects our passion for the extraordinary.
                </p>
                <p class="font-bold text-neon-purple">
                    Join us as we chart the uncharted.
                </p>
            </div>
            <button
                class="px-8 py-3 bg-white/5 border border-neon-purple/30 rounded-full hover:bg-neon-purple/10 transition-colors text-neon-purple font-display tracking-widest uppercase text-sm font-bold shadow-lg hover:shadow-neon-purple/20"
            >
                Read Our Story
            </button>
        </div>
    </div>
</section>
