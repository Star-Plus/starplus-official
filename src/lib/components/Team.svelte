<script lang="ts">
    import { onMount } from 'svelte';

    const defaultAvatar = "https://placehold.co/64x64/0B0B0F/FFFFFF?text=*";

    const team = [
        { name: "SAIF STAR", role: "Director", isCenter: true, shape: "star", imageUrl: "/images/saif.jpg" },
        { name: "Ahmed Mustafa", role: "Software Engineer", isCenter: false, shape: "code", imageUrl: "/images/ahmed.jpg" },
        { name: "Abdelrahman Mahmoud", role: "Technical & Community Manager", isCenter: false, shape: "network", imageUrl: "" },
        { name: "Habiba Hossam", role: "Business Developer", isCenter: false, shape: "chart", imageUrl: "https://placehold.co/64x64/F472B6/FFFFFF?text=HH" },
        { name: "Dalia Talaat", role: "Technical Artist", isCenter: false, shape: "palette", imageUrl: "" },
        { name: "Tarek", role: "AI Engineer", isCenter: false, shape: "brain", imageUrl: "https://placehold.co/64x64/60A5FA/FFFFFF?text=TA" },
    ];

    // Separate director and other members
    const director = team.find(m => m.isCenter);
    const members = team.filter(m => !m.isCenter);

    let containerWidth = 0;
    let containerHeight = 0;
    let nodeElements : HTMLElement[] = [];
    let directorElement : HTMLElement;
    let lineElements  : HTMLElement[] = [];

    // Get SVG path for each role's shape
    function getShapePath(shape: string): string {
        const shapes: Record<string, string> = {
            star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
            code: "M8 3l-6 9 6 9h2l-6-9 6-9H8zm8 0l6 9-6 9h-2l6-9-6-9h2z",
            network: "M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-7 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm14 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM12 14c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-7 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm14 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM12 8l-4 2.5 4 2.5 4-2.5L12 8zm0 6l-4 2.5 4 2.5 4-2.5L12 14z",
            chart: "M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z",
            palette: "M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.21-.64-1.67-.08-.09-.13-.21-.13-.33 0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z",
            brain: "M13 3C9.23 3 6.19 5.95 6 9.66l-1.92.27c-1.04.15-1.92 1.03-1.92 2.07v.5c0 1.11.89 2 2 2l.75-.75.75.75c1.11 0 2-.89 2-2V12c0 4.08 2.99 7.47 6.91 7.97.04.01.08.03.12.03h.24c3.75-.46 6.78-3.49 7.24-7.24.03-.29.05-.59.05-.89 0-4.97-4.03-9-9-9zm-1 7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
        };
        return shapes[shape] || shapes.star;
    }

    // Position nodes in Orion constellation pattern
    // Orion has a distinctive shape: belt in middle, shoulders above, legs below
    function getOrionPosition(index: number) {
        const centerX = containerWidth / 2;
        const centerY = containerHeight / 2;
        
        // Expand horizontally but constrain vertically
        const scaleX = containerWidth * 0.4;  // Use 40% of width for horizontal spread
        const scaleY = containerHeight * 0.3; // Use 30% of height for vertical spread
        
        // Orion constellation pattern (normalized coordinates, then scaled)
        const positions = [
            { x: 0, y: -0.9 },      // Top left shoulder (Betelgeuse)
            { x: 0.6, y: -0.8 },    // Top right shoulder (Bellatrix)
            { x: -0.3, y: 0.1 },    // Left of belt
            { x: 0.3, y: 0.1 },     // Right of belt
            { x: -0.5, y: 0.9 },    // Bottom left (left leg)
        ];
        
        if (index < positions.length) {
            return {
                x: centerX + positions[index].x * scaleX,
                y: centerY + positions[index].y * scaleY
            };
        }
        
        return { x: centerX, y: centerY };
    }

    // Get center position for director (Orion's belt center)
    function getCenterPosition() {
        return {
            x: containerWidth / 2,
            y: containerHeight / 2
        };
    }

    onMount(() => {
        let animationFrame: number;
        
        function updateLines() {
            if (directorElement && nodeElements.length > 0) {
                const directorShape = directorElement.querySelector('svg');
                if (!directorShape) return;
                
                const containerRect = directorElement.closest('.relative')!.getBoundingClientRect();
                const directorRect = directorShape.getBoundingClientRect();
                
                const centerX = directorRect.left + directorRect.width / 2 - containerRect.left;
                const centerY = directorRect.top + directorRect.height / 2 - containerRect.top;
                
                nodeElements.forEach((node, i) => {
                    if (node && lineElements[i]) {
                        const nodeShape = node.querySelector('svg');
                        if (!nodeShape) return;
                        
                        const nodeRect = nodeShape.getBoundingClientRect();
                        const nodeX = nodeRect.left + nodeRect.width / 2 - containerRect.left;
                        const nodeY = nodeRect.top + nodeRect.height / 2 - containerRect.top;
                        
                        lineElements[i].setAttribute('x1', centerX.toString());
                        lineElements[i].setAttribute('y1', centerY.toString());
                        lineElements[i].setAttribute('x2', nodeX.toString());
                        lineElements[i].setAttribute('y2', nodeY.toString());
                    }
                });
            }
            
            animationFrame = requestAnimationFrame(updateLines);
        }
        
        updateLines();
        
        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    });
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
            bind:clientWidth={containerWidth}
            bind:clientHeight={containerHeight}
            class="relative w-full h-[600px] md:h-[700px] flex items-center justify-center"
        >
            <!-- Inline title inside constellation area, pinned away from nodes -->
            <div class="absolute top-6 left-6 z-20 px-4 py-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-sm shadow-lg">
                <p class="text-sm md:text-base font-display font-bold text-white tracking-wide">Our Squad</p>
            </div>
            <!-- SVG for connection lines -->
            <svg class="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:rgb(109,40,217);stop-opacity:0.2" />
                        <stop offset="100%" style="stop-color:rgb(219,39,119);stop-opacity:0.2" />
                    </linearGradient>
                </defs>
                
                {#if containerWidth > 0}
                    <!-- Lines from center to each member -->
                    {#each members as member, i}
                        <line
                            bind:this={lineElements[i]}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="0"
                            stroke="url(#lineGradient)"
                            stroke-width="1"
                            stroke-dasharray="5,5"
                            opacity="0"
                            style="animation-delay: {0.5 + i * 0.2}s; stroke-dashoffset: {i * 5};"
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                from="0"
                                to="10"
                                dur="2s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="opacity"
                                from="0"
                                to="0.4"
                                dur="0.8s"
                                begin="{0.5 + i * 0.2}s"
                                fill="freeze"
                            />
                        </line>
                    {/each}
                {/if}
            </svg>

            <!-- Director Node (Center) -->
            {#if director && containerWidth > 0}
                {@const centerPos = getCenterPosition()}
                <div
                    bind:this={directorElement}
                    class="absolute group cursor-pointer animate-fade-in"
                    style="left: {centerPos.x}px; top: {centerPos.y}px; transform: translate(-50%, -50%); animation-delay: 0.2s;"
                >
                    <div class="relative flex flex-col items-center">
                        <!-- Pulsing rings -->
                        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary/20 animate-ping" style="animation-duration: 3s;"></div>
                        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary/10 animate-pulse"></div>
                        
                        <!-- Main node with custom shape -->
                        <div class="w-12 h-12 flex items-center justify-center group-hover:scale-125 transition-all duration-500 animate-twinkle" style="animation-duration: 3s;">
                            <svg viewBox="0 0 24 24" class="w-10 h-10 drop-shadow-[0_0_8px_rgba(109,40,217,0.8)]">
                                <path
                                    d={getShapePath(director.shape)}
                                    fill="url(#directorGradient)"
                                    stroke="rgba(255,255,255,0.3)"
                                    stroke-width="0.5"
                                />
                                <defs>
                                    <linearGradient id="directorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style="stop-color:#6D28D9" />
                                        <stop offset="50%" style="stop-color:#A855F7" />
                                        <stop offset="100%" style="stop-color:#DB2777" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>

                        <!-- Hover avatar circle for director -->
                        <div class="absolute -right-7 -top-7 w-14 h-14 rounded-full overflow-hidden border border-white/60 shadow-[0_0_16px_rgba(0,0,0,0.55)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-space-black">
                            <img
                                src={director.imageUrl || defaultAvatar}
                                alt={`${director.name} avatar`}
                                class="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        
                        <!-- Name below node -->
                        <div class="mt-3 text-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p class="text-xs font-display text-white font-bold">
                                {director.name}
                            </p>
                            <p class="text-xs text-primary font-mono mt-1">
                                {director.role}
                            </p>
                        </div>
                    </div>
                </div>
            {/if}

            <!-- Member Nodes (Scattered randomly) -->
            {#if containerWidth > 0}
                {#each members as member, i}
                    {@const pos = getOrionPosition(i)}
                    <div
                        bind:this={nodeElements[i]}
                        class="absolute group cursor-pointer animate-fade-in"
                        style="left: {pos.x}px; top: {pos.y}px; transform: translate(-50%, -50%); animation-delay: {0.5 + i * 0.2}s;"
                    >
                        <div class="relative flex flex-col items-center animate-float" style="animation-duration: {3 + i * 0.5}s; animation-delay: {i * 0.3}s;">
                            <!-- Main node with custom shape -->
                            <div class="w-8 h-8 flex items-center justify-center group-hover:scale-150 transition-all duration-500 animate-twinkle" style="animation-duration: {2.5 + i * 0.5}s; animation-delay: {i * 0.4}s;">
                                <svg viewBox="0 0 24 24" class="w-7 h-7 drop-shadow-[0_0_6px_rgba(109,40,217,0.6)]">
                                    <path
                                        d={getShapePath(member.shape)}
                                        fill="url(#memberGradient{i})"
                                        stroke="rgba(109,40,217,0.5)"
                                        stroke-width="0.5"
                                    />
                                    <defs>
                                        <linearGradient id="memberGradient{i}" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style="stop-color:rgba(109,40,217,0.6)" />
                                            <stop offset="100%" style="stop-color:rgba(168,139,250,0.4)" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>

                            <!-- Hover avatar circle -->
                            <div class="absolute -right-6 -top-6 w-12 h-12 rounded-full overflow-hidden border border-white/45 shadow-[0_0_14px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-space-black">
                                <img
                                    src={member.imageUrl || defaultAvatar}
                                    alt={`${member.name} avatar`}
                                    class="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            
                            <!-- Name below node -->
                            <div class="absolute top-full mt-2 text-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p class="text-xs font-display text-white font-bold">
                                    {member.name}
                                </p>
                                <p class="text-xs text-gray-400 font-mono mt-1">
                                    {member.role}
                                </p>
                            </div>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</section>
