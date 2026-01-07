<script>
    import { reveal } from "$lib/actions/reveal";

    const team = [
        { name: "SAIF STAR", role: "Director" },
        { name: "Ahmed Mostafa", role: "Software Engineer" },
        { name: "Abdelrahman Mahmoud", role: "Technical & Community Manager" },
        { name: "Habiba Hossam", role: "Business Developer" },
        { name: "Dalia Talaat", role: "Technical Artist" },
        { name: "Tarek", role: "AI Engineer" },
    ];
</script>

<section id="team" class="relative py-24 bg-transparent pointer-events-none">
    <div class="max-w-7xl mx-auto px-4 z-10 relative pointer-events-auto">
        <div class="text-center mb-16">
            <h2
                class="text-3xl md:text-5xl font-display font-bold text-white mb-4"
            >
                Our <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-pink"
                    >Squad</span
                >
            </h2>
            <p class="text-gray-400">The minds behind the simulation.</p>
        </div>

        <div
            class="grid grid-cols-1 md:grid-cols-3 gap-12 perspective-[2000px]"
        >
            {#each team as member, i}
                <div
                    use:reveal={{ delay: i * 150 }}
                    class="group relative transition-all duration-700 hover:-translate-y-4 hover:scale-105 cursor-pointer p-8 flex flex-col items-center justify-center text-center min-h-[300px]
                    {i % 3 === 0 ? 'lg:rotate-y-[10deg] lg:translate-y-16' : ''}
                    {i % 3 === 2
                        ? 'lg:-rotate-y-[10deg] lg:translate-y-16'
                        : ''}"
                >
                    <div
                        class="animate-float"
                        style="animation-delay: {i *
                            2}s; animation-duration: {9 + (i % 2) * 3}s"
                    >
                        <div
                            class="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/5 flex items-center justify-center border border-primary/30 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(109,40,217,0.15)] mx-auto"
                        >
                            <h3
                                class="text-3xl font-display font-bold text-primary opacity-80"
                            >
                                {member.name.charAt(0)}
                            </h3>
                        </div>

                        <h3
                            class="text-2xl font-bold text-white font-display group-hover:text-primary transition-colors mb-2"
                        >
                            {member.name}
                        </h3>
                        <p
                            class="text-gray-400 font-mono text-sm tracking-wider uppercase"
                        >
                            {member.role}
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
