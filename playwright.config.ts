/**
 * The game's tests in a browser: its stories, played in Storybook from its real books.
 * `bun run test:browser`.
 *
 * Author: dwclake
 * Created: 2026-11-19
 */

import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "e2e",
	testMatch: "**/*.e2e.ts",
	workers: 4,
	fullyParallel: true,
	use: {
		launchOptions: {
			args: process.platform === "darwin" ? ["--use-angle=metal"] : []
		}
	}
});
