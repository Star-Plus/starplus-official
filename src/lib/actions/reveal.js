/**
 * Action to trigger reveal animations on scroll
 */
export function reveal(node, { delay = 0 } = {}) {
    node.classList.add('reveal-hidden');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    node.classList.remove('reveal-hidden');
                    node.classList.add('reveal-visible');
                }, delay);
                observer.unobserve(node);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
        }
    };
}
