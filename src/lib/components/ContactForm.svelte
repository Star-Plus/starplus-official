<script lang="ts">
    import ContactFormApi, { ContactFormData, type ContactTopic } from "$lib/api/ContactFormApi";

    let isSubmitting = false;
    let isSuccess = false;
    let submitError = "";

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        const payload = {
            name: String(formData.get("name") ?? "").trim(),
            email: String(formData.get("email") ?? "").trim(),
            topic: String(formData.get("topic") ?? "") as ContactTopic,
            message: String(formData.get("message") ?? "").trim()
        };

        if (!payload.name || !payload.email || !payload.topic || !payload.message) {
            submitError = "Please fill out all required fields.";
            isSuccess = false;
            return;
        }

        isSubmitting = true;
        isSuccess = false;
        submitError = "";

        try {
            await ContactFormApi.submit(new ContactFormData(payload));
            form.reset();
            isSuccess = true;
        } catch {
            isSuccess = false;
            submitError = "Could not send message. Please try again.";
        } finally {
            isSubmitting = false;
        }
    }
</script>

<section class="contact-section" id="contact">
    <div class="contact-grid">
        <!-- Form Column (Left) -->
        <div class="form-column">
            <h2 class="title">Get In Touch</h2>
            <p class="subtitle">We'd love to hear from you. Please fill out this form.</p>

            <form on:submit={handleSubmit} class="contact-form">
                <div class="form-row">
                    <div class="input-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required placeholder="Jane Doe" />
                    </div>
                    <div class="input-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required placeholder="jane@example.com" />
                    </div>
                </div>

                <div class="input-group">
                    <label for="topic">Topic</label>
                    <select id="topic" name="topic" required>
                        <option value="" disabled selected>Select a topic</option>
                        <option value="GENERAL">General Inquiry</option>
                        <option value="NEW PROJECT">New Project</option>
                        <option value="PARTNERSHIP">Partnership</option>
                    </select>
                </div>

                <div class="input-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" required placeholder="How can we help?" rows="3"></textarea>
                </div>

                <button type="submit" class="submit-btn" disabled={isSubmitting}>
                    {#if isSubmitting}
                        Sending...
                    {:else if isSuccess}
                        Message Sent
                    {:else}
                        Send Message
                    {/if}
                </button>

                {#if isSubmitting}
                    <p class="submit-status sending" aria-live="polite">Sending your message...</p>
                {:else if isSuccess}
                    <p class="submit-status success" aria-live="polite">Your message was sent successfully.</p>
                {:else if submitError}
                    <p class="submit-status error" aria-live="polite">{submitError}</p>
                {/if}
            </form>
        </div>

        <!-- Slogan/Welcome Column (Right) -->
        <div class="slogan-column">
            <h3 class="slogan-title">Let's build<br/>something<br/>amazing.</h3>
            <p class="slogan-text">Whether you have a question, an idea for a project, or just want to connect, our team is ready to listen.</p>
            
            <div class="contact-info">
                <div class="info-item">
                    <span class="info-label">Email</span>
                    <a href="mailto:hello@starplus.com" class="info-value">hello@starplus.com</a>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    .contact-section {
        height: 100vh; /* Force exactly one screen height */
        padding: 0 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Inter', sans-serif;
        background-color: transparent; 
        color: #ededed;
        /* Snapping behavior if the parent uses it: */
        scroll-snap-align: start; 
    }

    .contact-grid {
        width: 100%;
        max-width: 1100px;
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        gap: 3.5rem; /* Reduced gap */
        align-items: center; /* Center the two columns together */
    }

    /* Left Column: Form */
    .title {
        font-size: 2rem;
        font-weight: 700;
        margin: 0 0 0.5rem 0;
        letter-spacing: -0.03em;
    }

    .subtitle {
        font-size: 0.95rem;
        color: #a1a1aa;
        margin: 0 0 1.5rem 0; /* Tighter padding here */
    }

    .contact-form {
        display: flex;
        flex-direction: column;
        gap: 1.25rem; /* Tighter gap */
    }

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.25rem;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 0.35rem; /* Tighter gap */
    }

    label {
        font-size: 0.8rem;
        font-weight: 500;
        color: #a1a1aa;
    }

    input, textarea, select {
        width: 100%;
        padding: 0.6rem 0; /* Thinner vertical padding */
        font-size: 0.95rem;
        font-family: inherit;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #333333;
        color: #ededed;
        transition: border-color 0.2s ease;
        box-sizing: border-box;
    }

    input::placeholder, textarea::placeholder {
        color: #555555;
    }

    input:focus, textarea:focus, select:focus {
        outline: none;
        border-bottom-color: #ededed;
    }

    textarea {
        resize: vertical;
        min-height: 80px; /* Reduced textarea size */
    }
    
    select {
        appearance: none;
        cursor: pointer;
    }
    select option {
        background-color: #111;
    }

    .submit-btn {
        margin-top: 0.5rem; /* Reduced margin */
        width: auto;
        align-self: flex-start;
        padding: 0.75rem 2.25rem; /* Tighter button padding */
        font-size: 0.95rem;
        font-weight: 600;
        color: #000000;
        background-color: #ededed;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s ease, transform 0.1s ease;
    }

    .submit-btn:hover:not(:disabled) {
        background-color: #ffffff;
        transform: translateY(-1px);
    }

    .submit-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .submit-status {
        margin: 0.25rem 0 0 0;
        font-size: 0.85rem;
        font-weight: 500;
    }

    .submit-status.sending {
        color: #a1a1aa;
    }

    .submit-status.success {
        color: #8ef7ba;
    }

    .submit-status.error {
        color: #ff8a8a;
    }

    /* Right Column: Slogan */
    .slogan-column {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .slogan-title {
        font-size: 2.75rem; /* Reduced from 3.5rem to fit tight screens */
        font-weight: 700;
        line-height: 1.1;
        letter-spacing: -0.04em;
        margin: 0 0 1.25rem 0;
        color: #ffffff;
    }

    .slogan-text {
        font-size: 1rem; /* Slightly smaller text */
        line-height: 1.5;
        color: #a1a1aa;
        margin: 0 0 2rem 0;
        max-width: 90%;
    }

    .contact-info {
        display: flex;
        flex-direction: column;
        gap: 1.5rem; /* Tighter separation */
    }

    .info-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .info-label {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #666666;
        font-weight: 600;
    }

    .info-value {
        font-size: 0.95rem;
        color: #ededed;
        line-height: 1.4;
        text-decoration: none;
        transition: color 0.2s ease;
    }

    a.info-value:hover {
        color: #ffffff;
    }

    /* Responsive */
    @media (max-width: 900px) {
        .contact-grid {
            grid-template-columns: 1fr;
            gap: 2rem; /* Tighter gap on tablet */
        }
        
        .contact-section {
            height: auto;
            min-height: 100vh;
            padding: 4rem 1.5rem; /* Restore padding if falling back */
        }

        .slogan-column {
            order: -1;
        }

        .slogan-title {
            font-size: 2.25rem;
        }
    }

    @media (max-width: 640px) {
        .title {
            font-size: 1.7rem;
        }

        .subtitle {
            font-size: 0.88rem;
        }

        .slogan-title {
            font-size: 1.9rem;
        }

        .slogan-text {
            font-size: 0.92rem;
        }

        label {
            font-size: 0.75rem;
        }

        input, textarea, select {
            font-size: 0.9rem;
        }

        .submit-btn {
            font-size: 0.9rem;
        }

        .submit-status {
            font-size: 0.8rem;
        }

        .info-label {
            font-size: 0.7rem;
        }

        .info-value {
            font-size: 0.9rem;
        }

        .form-row {
            grid-template-columns: 1fr;
        }
        
        .submit-btn {
            width: 100%;
        }
    }
</style>