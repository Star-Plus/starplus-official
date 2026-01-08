<script>
    import { onMount } from "svelte";
    import { reveal } from "$lib/actions/reveal";

    const featuresLeft = [
        {
            title: "Game Design",
            desc: "Crafting immersive mechanics and loops.",
            icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z",
        },
        {
            title: "Visual Arts",
            desc: "Stunning 3D environments and assets.",
            icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
        },
        {
            title: "Soundscapes",
            desc: "Adaptive audio that responds to gameplay.",
            icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
        },
    ];

    const featuresRight = [
        {
            title: "Multiplayer",
            desc: "Seamless networking and matchmaking.",
            icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
        },
        {
            title: "Development Tools",
            desc: "Easy and efficient tools for creators.",
            icon: "M12 6v6l4 2m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        {
            title: "Cloud Storage",
            desc: "Secure, decentralized asset management.",
            icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
        },
    ];
</script>

<section
    id="services"
    class="relative py-24 overflow-hidden bg-transparent pointer-events-none"
>
    <div class="max-w-7xl mx-auto px-4 relative z-10 pointer-events-auto">
        <div class="text-center mb-16">
            <h2
                class="text-3xl md:text-5xl font-display font-bold text-white mb-4"
            >
                Core <span
                    class="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent-pink"
                    >Capabilities</span
                >
            </h2>
            <p class="text-gray-400 max-w-2xl mx-auto">
                We leverage diverse technologies to build the impossible.
            </p>
        </div>

        <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 perspective-[2000px]"
        >
            {#each [...featuresLeft, ...featuresRight] as feature, i}
                <div
                    use:reveal={{ delay: i * 100 }}
                    class="group p-6 transform transition-all duration-700 hover:scale-110 hover:translate-z-10
                    {i % 3 === 0 ? 'lg:rotate-y-10 lg:translate-y-12' : ''}
                    {i % 3 === 2
                        ? 'lg:-rotate-y-10 lg:translate-y-12'
                        : ''}
                    {i % 3 === 1 ? 'lg:translate-y-0' : ''}"
                >
                    <div
                        class="animate-float"
                        style="animation-delay: {i *
                            1.5}s; animation-duration: {8 + (i % 3) * 2}s"
                    >
                        <div
                            class="flex flex-col items-center text-center gap-4"
                        >
                            <div
                                class="p-3 rounded-full bg-white/5 border border-primary/20 text-primary shadow-[0_0_15px_rgba(109,40,217,0.1)] group-hover:shadow-[0_0_20px_rgba(109,40,217,0.3)] transition-all"
                            >
                                <svg
                                    class="w-8 h-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.5"
                                        d={feature.icon}
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3
                                    class="text-xl font-bold text-white group-hover:text-primary transition-colors font-display mb-2"
                                >
                                    {feature.title}
                                </h3>
                                <p
                                    class="text-gray-400 text-sm leading-relaxed"
                                >
                                    {feature.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
