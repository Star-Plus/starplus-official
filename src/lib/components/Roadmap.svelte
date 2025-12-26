<script>
    import { onMount } from "svelte";
    import { reveal } from "$lib/actions/reveal";

    const phases = [
        {
            name: "Phase 1: Genesis",
            date: "Q1 2026",
            items: [
                "Platform Launch",
                "Token Generation Event",
                "Core Team Assembly",
            ],
        },
        {
            name: "Phase 2: Expansion",
            date: "Q2 2026",
            items: [
                "Marketplace Beta",
                "First Game Release",
                "Strategic Partnerships",
            ],
        },
        {
            name: "Phase 3: Ascension",
            date: "Q3 2026",
            items: [
                "Cross-Chain Integration",
                "Esports Tournament",
                "Mobile App Launch",
            ],
        },
        {
            name: "Phase 4: Zenith",
            date: "Q4 2026",
            items: ["DAO Governance", "Metaverse Land Sale", "Global Scaling"],
        },
    ];
</script>

<section
    id="roadmap"
    class="relative py-24 bg-transparent overflow-hidden pointer-events-none"
>
    <div class="max-w-7xl mx-auto px-4 z-10 relative pointer-events-auto">
        <div class="text-center mb-16">
            <h2
                class="text-3xl md:text-5xl font-display font-bold text-white mb-4"
            >
                Project <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-pink"
                    >Roadmap</span
                >
            </h2>
        </div>

        <div class="relative">
            <!-- Vertical line -->
            <div
                class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-transparent via-primary to-transparent opacity-50"
            ></div>

            <div class="space-y-12 md:space-y-24">
                {#each phases as phase, i}
                    <div
                        class="relative flex items-center justify-between {i %
                            2 ===
                        0
                            ? 'flex-row'
                            : 'flex-row-reverse'} w-full"
                    >
                        <!-- Content Side -->
                        <div
                            class="w-5/12 {i % 2 === 0
                                ? 'text-right pr-8'
                                : 'text-left pl-8'} transform transition-all duration-500 hover:scale-105"
                        >
                            <div
                                use:reveal={{ delay: i * 200 }}
                                class="glass-panel p-6 rounded-2xl group"
                            >
                                <div class="text-primary font-mono mb-2">
                                    {phase.date}
                                </div>
                                <h3
                                    class="text-2xl font-bold text-white mb-4 font-display group-hover:text-primary transition-colors"
                                >
                                    {phase.name}
                                </h3>
                                <ul class="space-y-2 text-gray-400">
                                    {#each phase.items as item}
                                        <li
                                            class="flex items-center {i % 2 ===
                                            0
                                                ? 'justify-end'
                                                : 'justify-start'} gap-2"
                                        >
                                            {#if i % 2 !== 0}<span
                                                    class="w-1.5 h-1.5 rounded-full bg-primary"
                                                ></span>{/if}
                                            {item}
                                            {#if i % 2 === 0}<span
                                                    class="w-1.5 h-1.5 rounded-full bg-primary"
                                                ></span>{/if}
                                        </li>
                                    {/each}
                                </ul>
                            </div>
                        </div>

                        <!-- Absolute Center Marker -->
                        <div
                            class="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-space-black border-4 border-primary z-10 shadow-[0_0_15px_rgba(109,40,217,0.5)]"
                        ></div>

                        <!-- Empty Side -->
                        <div class="w-5/12"></div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>
