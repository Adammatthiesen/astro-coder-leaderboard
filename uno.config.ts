import { defineConfig } from 'unocss'
import { presetDaisy } from '@matthiesenxyz/unocss-preset-daisyui';
import { presetIcons, presetTypography, presetUno, presetWind, presetWebFonts, transformerDirectives } from 'unocss';
import type { IconifyJSON } from '@iconify-json/logos/index.js';

const darkmodeSelector = { dark: '[data-theme="dark"]' }

export default defineConfig({
    presets: [
        presetUno({
            dark: darkmodeSelector,
        }),
        presetWind({
            dark: darkmodeSelector,
        }),
        presetTypography(),
        presetDaisy({
            themes: ["nord", "synthwave"],
            darkTheme: "synthwave",
        }),
        presetIcons({
            collections: {
                logos: () => import('@iconify-json/logos/icons.json').then((i) => i.default as IconifyJSON),
                mdi: () => import('@iconify-json/mdi/icons.json').then((i) => i.default),
                "skill-icons": () => import('@iconify-json/skill-icons/icons.json').then((i) => i.default),
            }
        }),
        presetWebFonts(),
    ],
    transformers: [
        transformerDirectives(),
    ],
})