/**
 * The game's own tests: its rules, held to its manifest and its guide. `bun run test`.
 * They run on Bun, as the SDK's book files do.
 *
 * Author: dwclake
 * Created: 2026-11-19
 */

import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "node",
		testTimeout: 60_000,
		maxWorkers: 4,
		include: ["*/maths/**/*.spec.ts", "*/client/src/**/*.spec.ts"],
		exclude: ["**/node_modules/**", "**/dist/**"]
	}
});
