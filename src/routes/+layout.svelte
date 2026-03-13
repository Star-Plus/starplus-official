<script lang="ts">
	import "../app.css";
	import NavStars from "$lib/components/NavStars.svelte";
	import { onMount, tick } from "svelte";

	let scrollY = $state(0);
	let mainContainer: HTMLElement;
	let isScrolling = false;
	let currentIndex = 0;
	let sections: HTMLElement[] = [];

	onMount(() => {
		tick().then(() => {
			setTimeout(() => {
				if (!mainContainer) return;
				// Find all actual sections
				sections = Array.from(mainContainer.children).filter((el) => 
					el.tagName !== 'STYLE' && el.tagName !== 'SCRIPT' && el.tagName !== 'DIV'
				) as HTMLElement[];

				// Add a non-passive wheel listener to hijack scrolling
				mainContainer.addEventListener("wheel", handleWheel, { passive: false });
			}, 150);
		});

		return () => {
			if (mainContainer) {
				mainContainer.removeEventListener("wheel", handleWheel);
			}
		};
	});

	function handleWheel(e: WheelEvent) {
		// Prevent default teleport scrolling
		e.preventDefault();

		if (isScrolling || sections.length === 0) return;

		// Dynamically pull the nearest section index continuously
		currentIndex = Math.round(mainContainer.scrollTop / window.innerHeight);

		if (e.deltaY > 0) {
			// Scroll Down
			if (currentIndex < sections.length - 1) {
				moveSection(currentIndex + 1);
			}
		} else if (e.deltaY < 0) {
			// Scroll Up
			if (currentIndex > 0) {
				moveSection(currentIndex - 1);
			}
		}
	}

	function moveSection(index: number) {
		isScrolling = true;
		currentIndex = index;
		
		sections[currentIndex].scrollIntoView({ behavior: "smooth", block: "start" });

		// Lock further scrolling until the smooth animation completes (~800ms)
		setTimeout(() => {
			isScrolling = false;
		}, 800);
	}

	function handleScroll(e: Event) {
		scrollY = (e.currentTarget as HTMLElement).scrollTop;
	}

	let { children } = $props();
</script>

<svelte:head>
	<title>StarPlus - Next Gen Gaming</title>
</svelte:head>

<div
	class="h-screen w-full bg-space-black text-white selection:bg-primary selection:text-white overflow-hidden relative"
>
	<!-- UI Layer -->
	<div class="absolute inset-0 z-10 flex flex-col pointer-events-none">
		<main
			bind:this={mainContainer}
			class="flex-1 overflow-y-hidden overflow-x-hidden pointer-events-auto"
			onscroll={handleScroll}
		>
			{@render children()}
		</main>
		
		<NavStars />
	</div>
</div>
