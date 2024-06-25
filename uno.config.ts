import { defineConfig, e, presetAttributify, presetTagify } from 'unocss'
import { presetDaisy } from '@matthiesenxyz/unocss-preset-daisyui';
import { presetIcons, presetTypography, presetUno, presetWind, presetWebFonts, transformerDirectives } from 'unocss';
import type { IconifyJSON } from '@iconify-json/logos/index.js';

const darkmodeSelector = { dark: '[data-theme="dark"]' }

export default defineConfig({
    preflights: [
        { getCSS() {
             return `
                *,::before,::after {
                    @media screen and (max-width: 1024px) {
                        .rank .ranklabel {
                            font-size: 1.125rem; /* 18px */
                            line-height: 1.75rem; /* 28px */
                            flex-shrink: 1;
                            padding-left: 0;
                            padding-right: 0;
                        }
                        .rank .rankvalue {
                            flex-shrink: 1;
                            padding-left: 0;
                            padding-right: 0;
                        }
                        .rank .levelnumber {
                            font-size: 1.125rem; /* 18px */
                            line-height: 1.75rem; /* 28px */
                            flex-shrink: 1;
                            padding-left: 0;
                            padding-right: 0;
                        }
                        .rank .levelprogress {
                            flex-shrink: 1;
                            padding-left: 0;
                            padding-right: 0;
                        }
                        .rank {
                            font-size: 1.125rem; /* 18px */
                            line-height: 1.75rem; /* 28px */
                            display: flex;
                            flex-direction: row;
                            justify-content: center;
                            align-content: center;
                            align-items: center;
                            padding-left: 0;
                            padding-right: 0;
                            gap: 0.5rem; /* 8px */
                            width: fit-content;
                        }
                    }

                    @media screen and (min-width: 768px) {
                        .ranklabel {
                            display: none;
                        }
                        .menu-divider {
                            display: inherit;
                            position: relative;
                            padding: 0;
                            margin: 0;
                        }
                    }

                    @media screen and (max-width: 768px) {
                        .menu-divider {
                            display: none;
                        }
                    }

                    profilelink {
                        position: absolute;
                        right: 2rem;
                        top: 50%;
                        vertical-align: middle;
                    } 
                    profilelink sl-tooltip, 
                    profilelink sl-tooltip a {
                        vertical-align: middle;
                    }

                    .progressbar {
                        --height: 24px;
                    }

                    .progressbar::part(label) {
                        font-weight: bolder;
                        font-size: 1rem;
                        text-align: center;
                    }   
                }` }
        }
    ],
    shortcuts: {
        'main': 'flex flex-col justify-center justify-items-center max-w-[100vw] p-4 lg:p-12 bg-base-100 font-sans',
        'screen-title-holder': 'flex flex-col items-center justify-center justify-items-center',
        'screen-title': 'text-xl md:text-4xl font-bold text-primary',
        'screen-title-buttons': 'flex flex-wrap w-full lg:flex-row lg:px-8rem pt-2 gap-4 position-relative pr-1rem pl-1rem',
        'code-check': 'text-gray-400 text-sm pt-2 font-italic',
        'sl-relative-time': 'font-bold',
        'sl-card': 'drop-shadow-2xl mb-8 w-full md:w-[80vw] lg:w-full content-center items-center justify-center self-center',
        'sl-card-header': 'drop-shadow-2xl w-full md:w-[80vw] lg:w-full content-center items-center justify-center self-center',
        'card-content': 'flex flex-col lg:flex-row content-center items-center justify-center p-4 lg:px-24 lg:gap-8 lg:gap-14 lg:w-full',
        'sl-avatar': 'flex-none drop-shadow-xl',
        'card-content-div': 'text-lg flex flex-col content-center justify-center items-center w-full',
        'name': 'text-secondary',
        'languages': 'text-accent',
        'machine': 'text-secondary',
        'level': 'text-accent',
        'rank': 'text-secondary',
        'header': 'text-xl font-bold flex justify-center w-full drop-shadow-xl',
        'no-user-data': 'text-primary text-4xl font-bold',
        'menu-divider': 'm-0 p-0',
        'opennewuserbtn': 'position-relative p-0 m-0',
    },
    presets: [
        presetUno({
            dark: darkmodeSelector,
        }),
        presetWind({
            dark: darkmodeSelector,
        }),
        presetTypography(),
        presetDaisy({
            themes: ["winter", "synthwave"],
            darkTheme: "synthwave",
        }),
        presetIcons({
            collections: {
                logos: () => import('@iconify-json/logos/icons.json').then((i) => i.default as IconifyJSON),
                mdi: () => import('@iconify-json/mdi/icons.json').then((i) => i.default),
                "skill-icons": () => import('@iconify-json/skill-icons/icons.json').then((i) => i.default),
            }
        }),
        presetWebFonts({
            provider: 'google',
            fonts: {
              sans: 'Poppins',
              mono: ['Fira Code', 'Fira Mono:400,700']
            },
          }),
        presetAttributify(),
        presetTagify(),
    ],
    transformers: [
        transformerDirectives(),
    ],
})