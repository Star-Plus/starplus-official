
<script lang="ts">
    import { onMount } from "svelte";

    type Palette = string[];

    export let pixelSize = 10;
    export let pixelGap =2;
    export let timeScale = 0.00009;

    export let speedBase = 0.1;
    export let speedVariance = 0.05;
    export let speedFrequency = 0.42;

    export let waveScaleXBase = 0.04;
    export let waveScaleXVariance = 0.08;
    export let waveScaleXFrequency = 5.3;

    export let waveScaleYBase = 0.009;
    export let waveScaleYVariance = 0.07;
    export let waveScaleYFrequency = 10.6;

    export let waveWeight = 4.5;
    export let ringWeight = 0.04;
    export let ringFrequency = 0.62;
    export let ringSpeedBase = 0.8;

    export let flickerWeight = 0.0024;
    export let flickerSpeedBase = 10.1;
    export let flickerSpeedVariance = 10.8;
    export let flickerPhaseScale = 1.5;

    export let thresholdBase = 0.048;
    export let thresholdVariance = 0.14;
    export let thresholdFrequency = 0.9;

    export let patternCycleSpeed = 0.08;
    export let baseWaveStrength = 1.3;
    export let patternVariance = 1.25;

    export let paletteCycleSpeed = 1.12;
    export let offPixelColor = "rgba(8, 10, 18, 0.75)";
    export let palettes: Palette[] = [
        ["#5337FF", "#22d3ee", "#60a5fa", "#a78bfa"],
        ["#FF378E", "#fb7185", "#f43f5e", "#e879f9"],
        ["#84cc16", "#22c55e", "#14b8a6", "#06b6d4"],
        ["#f97316", "#ef4444", "#ec4899", "#8b5cf6"]
    ];

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let resizeObserver: ResizeObserver;
    let animationId = 0;
    let cssWidth = 0;
    let cssHeight = 0;
    let gridCols = 0;
    let gridRows = 0;
    let gridSeeds = new Float32Array(0);
    let gridRadius = new Float32Array(0);
    let mouseX = -9999;
    let mouseY = -9999;
    const mouseRadius = 70;

    type RgbColor = { r: number; g: number; b: number };
    let parsedPalettes: RgbColor[][] = [];

    const fallbackHexPalettes: Palette[] = [["#2dd4bf", "#22d3ee"]];
    const colorSteps = 64;

    onMount(() => {
        ctx = canvas.getContext("2d")!;

        resizeObserver = new ResizeObserver(() => {
            resizeCanvas();
        });

        resizeObserver.observe(canvas);
        resizeCanvas();
        animationId = requestAnimationFrame(animate);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouseX = -9999;
            mouseY = -9999;
        };

        document.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            resizeObserver.disconnect();
            cancelAnimationFrame(animationId);
            document.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
        };
    });

    function resizeCanvas() {
        const dpr = Math.max(1, window.devicePixelRatio || 1);
        cssWidth = canvas.clientWidth;
        cssHeight = canvas.clientHeight;

        canvas.width = Math.floor(cssWidth * dpr);
        canvas.height = Math.floor(cssHeight * dpr);

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.imageSmoothingEnabled = false;
        rebuildGridCache();
    }

    function pseudoRandom(ix: number, iy: number) {
        const n = Math.sin(ix * 127.1 + iy * 311.7) * 43758.5453123;
        return n - Math.floor(n);
    }

    function hexToRgb(hex: string) {
        const value = hex.replace("#", "");
        return {
            r: Number.parseInt(value.slice(0, 2), 16),
            g: Number.parseInt(value.slice(2, 4), 16),
            b: Number.parseInt(value.slice(4, 6), 16)
        };
    }

    function lerp(a: number, b: number, t: number) {
        return a + (b - a) * t;
    }

    function clamp(value: number, min: number, max: number) {
        return Math.min(max, Math.max(min, value));
    }

    function normalizePalettes(input: Palette[]) {
        const source = input.length > 0 ? input : fallbackHexPalettes;
        return source.map((palette, paletteIndex) => {
            if (palette.length === 0) {
                return [hexToRgb(fallbackHexPalettes[0][0])];
            }

            return palette.map((hex, colorIndex) => {
                if (!hex) {
                    const fallback = source[paletteIndex][0] || fallbackHexPalettes[0][0];
                    return hexToRgb(fallback);
                }
                return hexToRgb(hex);
            });
        });
    }

    function rebuildGridCache() {
        const safePixelSize = Math.max(2, pixelSize);
        const cols = Math.ceil(cssWidth / safePixelSize);
        const rows = Math.ceil(cssHeight / safePixelSize);

        if (cols === gridCols && rows === gridRows && gridSeeds.length === cols * rows) {
            return;
        }

        gridCols = cols;
        gridRows = rows;

        const size = cols * rows;
        gridSeeds = new Float32Array(size);
        gridRadius = new Float32Array(size);

        const centerX = cols * 0.5;
        const centerY = rows * 0.5;

        let index = 0;
        for (let row = 0; row < rows; row += 1) {
            for (let col = 0; col < cols; col += 1) {
                const dx = col - centerX;
                const dy = row - centerY;
                gridSeeds[index] = pseudoRandom(col, row);
                gridRadius[index] = Math.hypot(dx, dy);
                index += 1;
            }
        }
    }

    function buildColorLut(t: number) {
        const safePalettes = parsedPalettes.length > 0 ? parsedPalettes : normalizePalettes(fallbackHexPalettes);
        const cycle = (t * paletteCycleSpeed) % safePalettes.length;
        const fromIndex = Math.floor(cycle);
        const toIndex = (fromIndex + 1) % safePalettes.length;
        const paletteBlend = cycle - fromIndex;

        const fromPalette = safePalettes[fromIndex].length > 1
            ? safePalettes[fromIndex]
            : [safePalettes[fromIndex][0], safePalettes[fromIndex][0]];
        const toPalette = safePalettes[toIndex].length > 1
            ? safePalettes[toIndex]
            : [safePalettes[toIndex][0], safePalettes[toIndex][0]];

        const stopCount = fromPalette.length;
        const colors = new Array<string>(colorSteps);

        for (let step = 0; step < colorSteps; step += 1) {
            const colorPosition = step / (colorSteps - 1);
            const scaled = colorPosition * (stopCount - 1);
            const left = Math.floor(scaled);
            const right = Math.min(stopCount - 1, left + 1);
            const stopBlend = scaled - left;

            const fromLeft = fromPalette[left];
            const fromRight = fromPalette[right];
            const toLeft = toPalette[left];
            const toRight = toPalette[right];

            const blendFromR = lerp(fromLeft.r, fromRight.r, stopBlend);
            const blendFromG = lerp(fromLeft.g, fromRight.g, stopBlend);
            const blendFromB = lerp(fromLeft.b, fromRight.b, stopBlend);

            const blendToR = lerp(toLeft.r, toRight.r, stopBlend);
            const blendToG = lerp(toLeft.g, toRight.g, stopBlend);
            const blendToB = lerp(toLeft.b, toRight.b, stopBlend);

            const r = Math.round(lerp(blendFromR, blendToR, paletteBlend));
            const g = Math.round(lerp(blendFromG, blendToG, paletteBlend));
            const b = Math.round(lerp(blendFromB, blendToB, paletteBlend));
            colors[step] = `rgb(${r}, ${g}, ${b})`;
        }

        return colors;
    }

    $: parsedPalettes = normalizePalettes(palettes);
    $: if (canvas) {
        rebuildGridCache();
    }

    function animate(timestamp: number) {

        const t = timestamp * timeScale;

        const patternPhase = (t * patternCycleSpeed) % (Math.PI * 2);
        const patternInfluence = Math.sin(patternPhase) * patternVariance;

        const speed = speedBase + Math.sin(t * speedFrequency) * speedVariance + patternInfluence * 0.3;
        const waveScaleX = waveScaleXBase + Math.cos(t * waveScaleXFrequency + patternPhase) * waveScaleXVariance;
        const waveScaleY = waveScaleYBase + Math.sin(t * waveScaleYFrequency + patternPhase) * waveScaleYVariance;

        const safePixelSize = Math.max(2, pixelSize);
        const safePixelGap = clamp(pixelGap, 0, safePixelSize - 1);
        const cols = gridCols;
        const rows = gridRows;
        const colorLut = buildColorLut(t);

        ctx.clearRect(0, 0, cssWidth, cssHeight);

        let index = 0;
        for (let row = 0; row < rows; row += 1) {
            for (let col = 0; col < cols; col += 1) {
                const seed = gridSeeds[index];
                const radius = gridRadius[index];

                const baseWave = Math.sin(col * 0.18 + patternPhase * 0.5) + Math.cos(row * 0.22 + patternPhase * 0.3);

                const wave =
                    Math.sin(col * waveScaleX + t * (speed + seed * 0.6)) +
                    Math.cos(row * waveScaleY - t * (speed * 0.85 + seed * 0.5));
                const ring = Math.sin(radius * ringFrequency - t * (ringSpeedBase + seed));
                const flicker = Math.sin(t * (flickerSpeedBase + seed * flickerSpeedVariance) + seed * flickerPhaseScale) * flickerWeight;

                const signal = (baseWave * baseWaveStrength) + (wave * waveWeight) + (ring * ringWeight) + flicker;
                const threshold = thresholdBase + Math.sin(t * thresholdFrequency + seed * 10) * thresholdVariance;
                const isOn = signal > threshold;

                const x = col * safePixelSize;
                const y = row * safePixelSize;
                const x_center = x + safePixelSize * 0.5;
                const y_center = y + safePixelSize * 0.5;
                const dist = Math.hypot(x_center - mouseX, y_center - mouseY);
                const isMouseNear = dist < mouseRadius;

                if (isOn && !isMouseNear) {
                    const intensity = clamp((signal - threshold + 1) * 0.5, 0, 1);
                    const colorPosition = clamp(intensity * 0.8 + seed * 0.2, 0, 0.999);
                    const colorIndex = Math.floor(colorPosition * (colorSteps - 1));
                    ctx.fillStyle = colorLut[colorIndex];
                } else {
                    ctx.fillStyle = offPixelColor;
                }

                ctx.fillRect(
                    x,
                    y,
                    safePixelSize - safePixelGap,
                    safePixelSize - safePixelGap
                );

                index += 1;
            }
        }

        animationId = requestAnimationFrame(animate);
    }

</script>

<canvas bind:this={canvas} class="w-full h-full pixel-canvas">

</canvas>

<style>
    .pixel-canvas {
        display: block;
        image-rendering: pixelated;
    }
</style>