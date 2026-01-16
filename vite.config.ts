import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/.netlify/functions': {
				target: 'http://localhost:8888',
				changeOrigin: true,
				secure: false
			}
		}
	}
};

export default config;
