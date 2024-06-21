import { defineConfig } from 'astro/config';
import db from '@astrojs/db';
import node from "@astrojs/node";
import unoCSS from '@unocss/astro';
import astrolace from '@matthiesenxyz/astrolace';

// https://astro.build/config
export default defineConfig({
    site: "https://codeleaderboard.matthiesen.dev",
    output: "server",
    adapter: node({
        mode: "standalone" 
    }),
    integrations: [
        db(),
        unoCSS({ injectReset: true }),
        astrolace({
            verbose: true,
        }),
    ],
});
