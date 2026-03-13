<section class="discord-panel">
    <!-- Deep Space Background Elements -->
    <div class="stars-group-1"></div>
    <div class="stars-group-2"></div>

    <!-- Nebula Glows used in place of heavy blur filters -->
    <div class="nebula nebula-1"></div>
    <div class="nebula nebula-2"></div>

    <!-- Orbital Rings -->
    <div class="orbit-sys">
        <div class="orbit-ring ring-1"></div>
        <div class="orbit-ring ring-2"></div>
    </div>

    <!-- The Giant Discord Moon rising over mountains -->
    <div class="celestial-discord">
        <svg viewBox="0 0 127.14 96.36">
            <defs>
                <linearGradient id="discord-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="40%" stop-color="#d8b4fe"/>
                    <stop offset="100%" stop-color="#5865F2"/>
                </linearGradient>
            </defs>
            <path fill="url(#discord-grad)" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a67.55,67.55,0,0,1-10.87,5.19,77.67,77.67,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53C53.89,60,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.1,53C96.1,60,91.08,65.69,84.69,65.69Z"/>
        </svg>
    </div>

    <!-- Foreground Terrain Layering for Depth -->
    <div class="mountain-silhouette"></div>
    <div class="mountain-front"></div>

    <!-- Content Aligned Layout -->
    <div class="content-side">
        <div class="text-wrapper">
            <div class="top-brand">
                <svg viewBox="0 0 127.14 96.36" class="small-icon" fill="currentColor">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a67.55,67.55,0,0,1-10.87,5.19,77.67,77.67,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53C53.89,60,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.1,53C96.1,60,91.08,65.69,84.69,65.69Z"/>
                </svg>
                <span>StarPlus Official</span>
            </div>

            <h1 class="headline">Join Our</h1>
            <h1 class="headline">Community</h1>
            
            <div class="badge-row">
                <span class="muted-text">Of</span>
                <span class="hashtag-badge">#IndieGames</span>
            </div>

            <p class="description">
                Step into our celestial hub. Connect with developers,
                get early sneak peeks, share feedback, and find friends to play with.
            </p>

            <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer" class="join-btn">
                Launch Discord
            </a>
        </div>
    </div>
</section>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    
    .discord-panel {
        position: relative;
        background-color: transparent; /* Seamless blend */
        height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        overflow: hidden;
        font-family: 'Inter', sans-serif;
        scroll-snap-align: start;
        border-top: 1px solid rgba(255,255,255,0.05); /* Soft visual separator */
    }

    /* Manually generated box-shadow stars for an authentic space texture without JS */
    .stars-group-1, .stars-group-2 {
        position: absolute;
        top: 0; left: 0;
        border-radius: 50%;
        background: transparent;
        z-index: 0;
        pointer-events: none;
    }
    .stars-group-1 {
        width: 2px; height: 2px;
        box-shadow: 
            15vw 10vh #fff, 85vw 20vh #fff, 45vw 75vh #fff, 
            75vw 60vh #fff, 90vw 80vh #fff, 20vw 85vh rgba(255,255,255,0.5), 
            40vw 15vh #fff, 65vw 35vh #fff, 55vw 15vh rgba(255,255,255,0.7),
            5vw 65vh #fff, 95vw 45vh rgba(255,255,255,0.6), 25vw 35vh #fff;
        opacity: 0.6;
    }
    .stars-group-2 {
        width: 1px; height: 1px;
        box-shadow: 
            10vw 25vh #fff, 80vw 15vh #fff, 50vw 85vh #fff, 
            70vw 65vh #fff, 85vw 90vh #fff, 15vw 70vh #fff, 
            35vw 40vh #fff, 60vw 20vh #fff, 50vw 30vh #fff,
            15vw 95vh #fff, 90vw 55vh #fff, 30vw 50vh #fff;
        opacity: 0.3;
        animation: twinkle 4s infinite alternate ease-in-out;
    }

    @keyframes twinkle {
        0% { opacity: 0.2; }
        100% { opacity: 0.8; }
    }

    /* Pure CSS Nebula Gradients (highly performant alternative to blur) */
    .nebula {
        position: absolute;
        border-radius: 50%;
        z-index: 1;
        pointer-events: none;
    }
    .nebula-1 {
        top: -20%; left: -20%;
        width: 80vw; height: 80vw;
        background: radial-gradient(circle at 50% 50%, rgba(88, 101, 242, 0.1) 0%, rgba(0,0,0,0) 60%);
    }
    .nebula-2 {
        bottom: -15%; right: -15%;
        width: 90vw; height: 90vw;
        background: radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.08) 0%, rgba(0,0,0,0) 60%);
    }

    /* Faint Orbital Rings */
    .orbit-sys {
        position: absolute;
        bottom: -20%; right: -10%;
        width: 120vw; height: 120vw;
        min-width: 1000px; min-height: 1000px;
        z-index: 2;
        pointer-events: none;
        transform: rotate(15deg);
    }
    .orbit-ring {
        position: absolute;
        top: 50%; left: 50%;
        border-radius: 50%;
        border: 1px solid rgba(255,255,255,0.03);
        transform: translate(-50%, -50%);
    }
    .ring-1 { width: 50%; height: 50%; border: 1px dashed rgba(255,255,255,0.02); }
    .ring-2 { width: 70%; height: 70%; }

    /* The Celestial Discord Logo (acting as a rising moon/planet) */
    .celestial-discord {
        position: absolute;
        bottom: 25vh; /* Peaking over the front mountain */
        right: 15vw; /* Shifted to intersect beautifully with the mountain peaks */
        width: 50vh; 
        height: 50vh;
        max-width: 550px;
        max-height: 550px;
        z-index: 4;
        animation: moonFloat 10s infinite alternate ease-in-out;
        pointer-events: none;
    }
    .celestial-discord svg {
        width: 100%;
        height: 100%;
        /* Massive soft glowing drop-shadow */
        filter: drop-shadow(0 0 45px rgba(138, 43, 226, 0.4)) drop-shadow(0 0 15px rgba(88, 101, 242, 0.5));
    }

    @keyframes moonFloat {
        0% { transform: translateY(0) scale(1); }
        100% { transform: translateY(-3vh) scale(1.02); }
    }

    /* Foreground Planet/Mountain Silhouettes crafted with Clip-paths */
    .mountain-silhouette {
        position: absolute;
        bottom: -5vh; 
        right: 0;
        width: 70vw; /* Scales with screen width */
        height: 50vh;
        /* Very faint purple/grey into pure black to give silhouette depth */
        background: linear-gradient(to top, #020202 40%, #100d17 100%);
        clip-path: polygon(100% 100%, 0% 100%, 0% 90%, 12% 82%, 25% 45%, 35% 55%, 48% 6%, 60% 40%, 72% 20%, 85% 45%, 100% 30%);
        z-index: 5;
        pointer-events: none;
    }
    
    .mountain-front {
        position: absolute;
        bottom: -5vh;
        right: 0;
        width: 100vw; /* Covers the entire bottom edge to prevent floating */
        height: 40vh;
        background: #020202; /* Seamless merge into background */
        clip-path: polygon(100% 100%, 0% 100%, 0% 60%, 15% 40%, 30% 75%, 45% 45%, 65% 85%, 80% 30%, 100% 60%);
        z-index: 6;
        pointer-events: none;
    }

    /* Content Alignment (Strictly centers exactly like Footer and ContactForm) */
    .content-side {
        position: relative;
        z-index: 10;
        width: 100%;
        max-width: 1400px; /* Precise layout alignment */
        margin: 0 auto;
        padding: 0 4rem; /* Aligns with inner components */
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        pointer-events: none; /* Let background elements shine, re-enable clicks on text wrapper */
    }

    .text-wrapper {
        max-width: 650px;
        pointer-events: auto; /* Re-enable for the button */
    }

    /* Exact Typography from Inspiration Image */
    .top-brand {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        color: #a1a1aa;
        font-weight: 600;
        font-size: 1.1rem;
        margin-bottom: 2rem;
    }
    .small-icon {
        width: 22px;
        height: 22px;
    }

    .headline {
        font-family: 'Inter', sans-serif;
        font-size: clamp(3.5rem, 7vw, 6.5rem);
        font-weight: 900;
        line-height: 0.95;
        letter-spacing: -0.05em;
        color: #f8f8f8;
        margin: 0;
        word-spacing: -0.1em;
    }

    .badge-row {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin: 1.5rem 0 2.5rem 0;
    }
    
    .muted-text {
        font-size: clamp(1.4rem, 3vw, 2.2rem);
        font-weight: 500;
        color: #a1a1aa;
        letter-spacing: -0.02em;
    }
    
    .hashtag-badge {
        background: linear-gradient(135deg, #FF73FA 0%, #5865F2 100%);
        color: #ffffff;
        padding: 0.3rem 1.4rem;
        border-radius: 50px; /* Pill shape */
        font-weight: 800;
        font-size: clamp(1.2rem, 2.5vw, 1.8rem);
        letter-spacing: -0.02em;
        box-shadow: 0 4px 20px rgba(88, 101, 242, 0.4);
    }

    .description {
        font-size: 1.15rem;
        line-height: 1.6;
        color: #c0c0c0;
        margin-bottom: 3.5rem;
        max-width: 480px;
        font-weight: 400;
    }

    .join-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: #ffffff;
        color: #020202;
        padding: 1rem 2.8rem;
        border-radius: 4px;
        font-weight: 800;
        font-size: 1rem;
        text-decoration: none;
        transition: transform 0.2s ease, background 0.2s ease;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
    .join-btn:hover {
        background: #f0f0f0;
        transform: translateY(-2px);
    }

    /* Responsiveness */
    @media (max-width: 1000px) {
        .content-side { padding: 0 2rem; }
        .celestial-discord {
            right: 5vw;
            bottom: 30vh;
            width: 40vh;
            height: 40vh;
        }
        .mountain-silhouette { width: 85vw; }
    }

    @media (max-width: 650px) {
        .content-side { padding: 0 1.5rem; }
        .description { font-size: 1rem; margin-bottom: 2.5rem; }
        .celestial-discord {
            right: -10vw; /* Pushes the moon partially off-screen */
            bottom: 35vh;
            opacity: 0.7;
            width: 35vh;
            height: 35vh;
        }
        .mountain-silhouette {
            width: 100vw;
            height: 45vh;
        }
        .mountain-front {
            height: 40vh;
        }
    }
</style>
