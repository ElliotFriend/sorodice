import { purgeCss } from 'vite-plugin-tailwind-purgecss'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
    server: {
        fs: {
            allow: ['./packages'],
        },
    },
    plugins: [nodePolyfills({ include: ['buffer', 'stream', 'util'] }), sveltekit(), purgeCss()],
})
