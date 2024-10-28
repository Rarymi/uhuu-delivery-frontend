import { defineConfig, UserConfigExport } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: "./setupTests.ts",
	},
} as UserConfigExport)
