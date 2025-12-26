<script>
    let isOpen = false;

    const links = [
        { name: "Home", href: "#" },
        { name: "About", href: "#about" },
        { name: "Services", href: "#services" },
        { name: "Roadmap", href: "#roadmap" },
        { name: "Team", href: "#team" },
    ];
</script>

<nav
    class="fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-space-black/50 border-b border-white/10"
>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
            <div class="flex-shrink-0">
                <a
                    href="/"
                    class="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-pink hover:scale-105 transition-transform duration-300"
                >
                    STARPLUS
                </a>
            </div>
            <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-8">
                    {#each links as link}
                        <a
                            href={link.href}
                            class="text-gray-300 hover:text-primary transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium font-display tracking-widest uppercase relative group"
                        >
                            {link.name}
                            <span
                                class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"
                            ></span>
                        </a>
                    {/each}
                    <button
                        class="ml-4 bg-primary text-white font-bold px-6 py-2 rounded-full transform hover:scale-105 transition-all shadow-[0_0_15px_rgba(109,40,217,0.5)] hover:shadow-[0_0_25px_rgba(109,40,217,0.7)] font-display"
                    >
                        CONNECT
                    </button>
                </div>
            </div>
            <div class="-mr-2 flex md:hidden">
                <button
                    on:click={() => (isOpen = !isOpen)}
                    type="button"
                    class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
                >
                    <svg
                        class="h-6 w-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        {#if isOpen}
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        {:else}
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        {/if}
                    </svg>
                </button>
            </div>
        </div>
    </div>

    {#if isOpen}
        <div
            class="md:hidden bg-space-black/95 backdrop-blur-xl border-b border-white/10"
        >
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                {#each links as link}
                    <a
                        href={link.href}
                        class="text-gray-300 hover:text-neon-purple block px-3 py-2 rounded-md text-base font-medium font-display uppercase tracking-widest"
                    >
                        {link.name}
                    </a>
                {/each}
            </div>
        </div>
    {/if}
</nav>
