import { defineConfig } from 'astro/config';
import db from '@astrojs/db';
import node from "@astrojs/node";
import unoCSS from '@unocss/astro';
import astrolace from '@matthiesenxyz/astrolace';

// https://astro.build/config
export default defineConfig({
    site: "https://astrocoderstats.fun",
    output: "server",
    adapter: node({
        mode: "standalone" 
    }),
    vite: {
        optimizeDeps: {
            exclude: ["@resvg/resvg-js"]
        },
    },
    integrations: [
        db(),
        unoCSS({ 
            injectReset: true, 
        }),
        astrolace(),
    ],
});
