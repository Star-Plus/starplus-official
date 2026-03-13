export type Palette = string[];

export type RgbColor = { r: number; g: number; b: number };

export const PIXEL_LED_PALETTES: Palette[] = [
    ["#5337FF", "#22d3ee", "#60a5fa", "#a78bfa"],
    ["#FF378E", "#fb7185", "#f43f5e", "#e879f9"],
    ["#84cc16", "#22c55e", "#14b8a6", "#06b6d4"],
    ["#f97316", "#ef4444", "#ec4899", "#8b5cf6"]
];

export const PIXEL_LED_FALLBACK_PALETTES: Palette[] = [["#2dd4bf", "#22d3ee"]];
export const PIXEL_LED_COLOR_STEPS = 64;
export const PIXEL_LED_PALETTE_CYCLE_SPEED = 1.12;

function hexToRgb(hex: string): RgbColor {
    const value = hex.replace("#", "");
    return {
        r: Number.parseInt(value.slice(0, 2), 16),
        g: Number.parseInt(value.slice(2, 4), 16),
        b: Number.parseInt(value.slice(4, 6), 16)
    };
}

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

function lerpColor(a: RgbColor, b: RgbColor, t: number): RgbColor {
    return {
        r: Math.round(lerp(a.r, b.r, t)),
        g: Math.round(lerp(a.g, b.g, t)),
        b: Math.round(lerp(a.b, b.b, t))
    };
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
}

function normalizePalettes(input: Palette[]): RgbColor[][] {
    const source = input.length > 0 ? input : PIXEL_LED_FALLBACK_PALETTES;
    return source.map((palette, paletteIndex) => {
        if (palette.length === 0) {
            return [hexToRgb(PIXEL_LED_FALLBACK_PALETTES[0][0])];
        }

        return palette.map((hex) => {
            if (!hex) {
                const fallback = source[paletteIndex][0] || PIXEL_LED_FALLBACK_PALETTES[0][0];
                return hexToRgb(fallback);
            }
            return hexToRgb(hex);
        });
    });
}

export function buildPaletteLutRgb(
    palettes: Palette[],
    t: number,
    paletteCycleSpeed = PIXEL_LED_PALETTE_CYCLE_SPEED,
    colorSteps = PIXEL_LED_COLOR_STEPS
): RgbColor[] {
    const safePalettes = normalizePalettes(palettes);
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

    const stopCount = Math.min(fromPalette.length, toPalette.length);
    const colors = new Array<RgbColor>(colorSteps);

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

        colors[step] = {
            r: Math.round(lerp(blendFromR, blendToR, paletteBlend)),
            g: Math.round(lerp(blendFromG, blendToG, paletteBlend)),
            b: Math.round(lerp(blendFromB, blendToB, paletteBlend))
        };
    }

    return colors;
}

export function buildPaletteLutCss(
    palettes: Palette[],
    t: number,
    paletteCycleSpeed = PIXEL_LED_PALETTE_CYCLE_SPEED,
    colorSteps = PIXEL_LED_COLOR_STEPS
): string[] {
    const rgbLut = buildPaletteLutRgb(palettes, t, paletteCycleSpeed, colorSteps);
    return rgbLut.map((color) => `rgb(${color.r}, ${color.g}, ${color.b})`);
}

export function buildHarmonicImageLutRgb(
    palettes: Palette[],
    colorSteps = 256
): RgbColor[] {
    const safePalettes = normalizePalettes(palettes);
    const stops = safePalettes.flatMap((palette) => palette);

    if (stops.length < 2) {
        return [stops[0] || { r: 45, g: 212, b: 191 }, stops[0] || { r: 45, g: 212, b: 191 }];
    }

    const colors = new Array<RgbColor>(colorSteps);
    for (let step = 0; step < colorSteps; step += 1) {
        const position = step / (colorSteps - 1);
        const scaled = position * (stops.length - 1);
        const left = Math.floor(scaled);
        const right = Math.min(stops.length - 1, left + 1);
        const blend = scaled - left;
        colors[step] = lerpColor(stops[left], stops[right], blend);
    }

    return colors;
}

export function mapPixelToHarmonicPalette(r: number, g: number, b: number, lut: RgbColor[]): RgbColor {
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    const idx = clamp(Math.round(luminance * (lut.length - 1)), 0, lut.length - 1);
    return lut[idx];
}

export function mapPixelToHarmonicPaletteSmooth(
    r: number,
    g: number,
    b: number,
    lut: RgbColor[],
    hueWeight = 0.24
): RgbColor {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let hue = 0;
    if (delta > 0) {
        if (max === r) {
            hue = ((g - b) / delta) % 6;
        } else if (max === g) {
            hue = (b - r) / delta + 2;
        } else {
            hue = (r - g) / delta + 4;
        }
        hue /= 6;
        if (hue < 0) {
            hue += 1;
        }
    }

    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    const pos = clamp(luminance * (1 - hueWeight) + hue * hueWeight, 0, 1);

    const scaled = pos * (lut.length - 1);
    const left = Math.floor(scaled);
    const right = Math.min(lut.length - 1, left + 1);
    const blend = scaled - left;
    const mapped = lerpColor(lut[left], lut[right], blend);

    const mappedLum = (0.2126 * mapped.r + 0.7152 * mapped.g + 0.0722 * mapped.b) / 255;
    const gain = mappedLum > 0.001 ? clamp(luminance / mappedLum, 0.75, 1.25) : 1;

    return {
        r: Math.round(clamp(mapped.r * gain, 0, 255)),
        g: Math.round(clamp(mapped.g * gain, 0, 255)),
        b: Math.round(clamp(mapped.b * gain, 0, 255))
    };
}