import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/ts-react-hw-03-phonebook/",
	plugins: [react()],
});
