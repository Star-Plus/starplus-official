<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    // The number of sections we have
    const sectionsCount = 5;
    let activeSectionIndex = $state(0);

    // Creates an array [0, 1, 2, 3, 4] for iteration
    let dots = [...Array(sectionsCount).keys()];

    onMount(() => {
        if (!browser) return;

        // The scroll container is the main element in +layout.svelte
        const container = document.querySelector('main');
        if (!container) return;

        // Update active index based on scroll position
        const handleScroll = () => {
            const containerScrollTop = container.scrollTop;
            const containerHeight = container.clientHeight;
            // Calculate which section is currently most visible
            activeSectionIndex = Math.round(containerScrollTop / containerHeight);
            
            // Bounds check
            if (activeSectionIndex < 0) activeSectionIndex = 0;
            if (activeSectionIndex >= sectionsCount) activeSectionIndex = sectionsCount - 1;
        };

        // Attach scroll listener to the container
        container.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial call
        handleScroll();

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    });

    const scrollToSection = (index: number) => {
        if (!browser) return;
        const container = document.querySelector('main');
        if (!container) return;

        // Scroll to the specific height (assuming each section is exactly 100vh)
        container.scrollTo({
            top: index * window.innerHeight,
            behavior: 'smooth'
        });
    };
</script>

<div class="nav-stars-container pointer-events-auto">
    {#each dots as dotIndex}
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
