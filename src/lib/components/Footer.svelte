<script>
    import Icon from "@iconify/svelte";
</script>

<footer class="starplus-footer">
    <!-- Purple flashlight sweep -->
    <div class="footer-glare"></div>

    <div class="footer-container">
        <!-- Huge headline -->
        <h1 class="headline">Maybe alienation isn't so bad if you make friends with the stars</h1>

        <div class="footer-bottom-section">
            <div class="footer-grid">
                <!-- Left: Contact -->
                <div class="info-block">
                    <h4 class="block-title">Contact</h4>
                    <div class="contact-links">
                        <a href="mailto:Contact@starplus.com" class="lined-link">Contact@starplus.com</a>
                    </div>
                </div>

                <!-- Right: Connect -->
                <div class="info-block connect-block">
                    <h4 class="block-title">Connect</h4>
                    <div class="social-links">
                        <a href="https://x.com/StarPlusArts" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="X (Twitter)">
                            <Icon icon="ri:twitter-x-fill" width="30" height="30" />
                        </a>
                        <a href="https://www.tiktok.com/@star.plus.games?_r=1&_t=ZS-94eLfTM6e0W" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="TikTok">
                            <Icon icon="ri:tiktok-fill" width="30" height="30" />
                        </a>
                        <a href="https://www.youtube.com/@StarPlusGames." target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="YouTube">
                            <Icon icon="ri:youtube-fill" width="30" height="30" />
                        </a>
                        <a href="https://www.instagram.com/starplus.games/?hl=en" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="Instagram">
                            <Icon icon="ri:instagram-fill" width="30" height="30" />
                        </a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p class="copyright">© 2026 Star Plus Games. All rights reserved.</p>
            </div>
        </div>
    </div>
</footer>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');

    .starplus-footer {
        position: relative;
        background-color: #020202;
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        border-top: 1px solid #111;
        font-family: 'Inter', sans-serif;
        scroll-snap-align: start;
    }

    /* Flashlight Purple Glare */
    .footer-glare {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    }

    .footer-glare::after {
        content: '';
        position: absolute;
        top: 50%;
        left: -60vw;
        width: 120vw;
        height: 120vh;
        /* Vivid purple lighting */
        background: radial-gradient(circle, rgba(140, 60, 255, 0.18) 0%, rgba(90, 20, 200, 0.08) 35%, transparent 65%);
        border-radius: 50%;
        transform: translateY(-50%);
        animation: searchlight 10s infinite alternate ease-in-out;
        will-change: transform;
    }

    @keyframes searchlight {
        0% { transform: translate(0, -50%) scale(0.9); }
        100% { transform: translate(140vw, -50%) scale(1.1); }
    }

    .footer-container {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 1600px; /* Wider for more dramatic spacing */
        margin: 0 auto;
        padding: 6rem 4rem 3rem; /* More generous side padding */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        color: #ffffff;
    }

    .headline {
        font-family: 'Inter', sans-serif;
        font-size: clamp(2.5rem, 5vw, 4.5rem); 
        font-weight: 700;
        line-height: 1.1;
        color: #f8f8f8;
        margin: auto 0; /* Vertically center in its flex top space */
        max-width: 1000px;
        letter-spacing: -0.04em;
    }

    /* Unique Layout at the bottom */
    .footer-bottom-section {
        display: flex;
        flex-direction: column;
        margin-top: auto;
    }

    .footer-grid {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        border-top: 1px solid rgba(255, 255, 255, 0.15); /* Premium separator */
        padding-top: 3.5rem;
        margin-bottom: 2rem;
    }

    .info-block {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    
    .connect-block {
        align-items: flex-end;
    }

    .block-title {
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-weight: 600;
        color: #888;
        margin: 0 0 1.5rem 0;
    }

    .contact-links {
        display: flex;
        gap: 3rem;
    }

    .lined-link {
        color: #f0f0f0;
        text-decoration: none;
        font-size: 1.1rem;
        position: relative;
        padding-bottom: 4px;
        transition: color 0.3s ease;
    }

    .lined-link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: rgba(255,255,255,0.4);
        transition: background-color 0.3s ease;
    }

    .lined-link:hover {
        color: #d8b4fe; /* Purple tint on hover */
    }
    .lined-link:hover::after {
        background-color: #d8b4fe;
    }

    .social-links {
        display: flex;
        gap: 2.5rem;
    }

    .icon-link {
        color: #f0f0f0;
        text-decoration: none;
        transition: color 0.3s ease, transform 0.3s ease, filter 0.3s ease;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
    
    .icon-link:hover {
        color: #d8b4fe; /* Purple match */
        transform: translateY(-3px) scale(1.1);
        filter: drop-shadow(0 0 10px rgba(216, 180, 254, 0.4));
    }

    .footer-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .copyright {
        color: #666;
        font-size: 0.85rem;
        margin: 0;
    }

    @media (max-width: 900px) {
        .footer-grid {
            flex-direction: column;
            align-items: flex-start;
            gap: 3rem;
        }
        .connect-block {
            align-items: flex-start;
        }
        .footer-container {
            padding: 4rem 2rem 2rem;
        }
        .contact-links {
            flex-direction: column;
            gap: 1.5rem;
        }
        .social-links {
            flex-wrap: wrap;
            gap: 1.5rem;
        }
    }

    @media (max-width: 640px) {
        .social-links {
            gap: 1.5rem;
        }
    }
</style>
