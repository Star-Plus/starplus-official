<script lang="ts">
    import { onMount, tick } from 'svelte';
    import { browser } from '$app/environment';

    // Store references to the actual DOM elements
    let sections: HTMLElement[] = $state([]);
    let activeSectionIndex = $state(0);

    onMount(async () => {
        if (!browser) return;
        await tick();

        // The scroll container
        const container = document.querySelector('main');
        if (!container) return;

        // Give the DOM a tiny fraction to mount all routed child components
        setTimeout(() => {
            // Find all top-level elements inside the main scroll container
            const foundSections = Array.from(container.children).filter(el => 
                el.tagName !== 'STYLE' && el.tagName !== 'SCRIPT'
            ) as HTMLElement[];
            
            sections = foundSections;

            if (sections.length === 0) return;

            // Using IntersectionObserver is robust for varying section heights
            const observerOptions = {
                root: container, 
                rootMargin: '0px',
                threshold: 0.5 // Trigger when a section is 50% visible
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = sections.indexOf(entry.target as HTMLElement);
                        if (index !== -1) {
                            activeSectionIndex = index;
                        }
                    }
                });
            }, observerOptions);

            sections.forEach(section => observer.observe(section));
        }, 100);
    });

    const scrollToSection = (index: number) => {
        if (!browser || !sections[index]) return;
        
        // Let the browser handle the smooth scroll natively to the element
        sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
</script>

<div class="nav-stars-container pointer-events-auto">
    {#each sections as _, dotIndex}
        <button 
            class="star-btn" 
            class:active={activeSectionIndex === dotIndex}
            onclick={() => scrollToSection(dotIndex)}
            aria-label={`Scroll to section ${dotIndex + 1}`}
        >
            <div class="gemini-star"></div>
        </button>
    {/each}
</div>

<style>
    .nav-stars-container {
        position: fixed;
        right: 40px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 20px;
        z-index: 100;
        align-items: center;
    }

    .star-btn {
        background: none;
        border: none;
        padding: 5px; /* Increase click area */
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0.3;
        transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .star-btn:hover {
        opacity: 0.7;
        transform: scale(1.2);
    }

    .star-btn.active {
        opacity: 1;
        transform: scale(1.4);
    }

    /* CSS 4-Pointed Star matching Gemini style */
    .gemini-star {
        position: relative;
        width: 14px;
        height: 14px;
        background-color: #fff;
        /* Clip-path creates the exact 4-pointed curved star shape */
        clip-path: polygon(
            50% 0%, 
            60% 40%, 
            100% 50%, 
            60% 60%, 
            50% 100%, 
            40% 60%, 
            0% 50%, 
            40% 40%
        );
        box-shadow: 0 0 10px rgba(255,255,255,0.8);
        transition: background-color 0.3s ease, filter 0.3s ease;
    }

    .star-btn.active .gemini-star {
        background-color: #5865F2; /* Active star uses StarPlus Blurple/Purple theme */
        filter: drop-shadow(0 0 8px #5865F2);
    }

    @media (max-width: 768px) {
        .nav-stars-container {
            right: 15px; /* Move closer to edge on mobile */
            gap: 15px;
        }
    }
</style>
