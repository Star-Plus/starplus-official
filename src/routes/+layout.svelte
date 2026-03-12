<script lang="ts">
	import "../app.css";

	let scrollY = $state(0);

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
			class="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth pointer-events-auto"
			onscroll={handleScroll}
		>
			{@render children()}
		</main>
	</div>
</div>
