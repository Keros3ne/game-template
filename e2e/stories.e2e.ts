/**
 * The game's stories, in the SDK's Storybook: that the whole game is played from its real
 * books with nothing of the site behind it.
 *
 * Author: dwclake
 * Created: 2026-11-20
 */

import { expect, test, type Page } from "@playwright/test";
import { spawn, type ChildProcess } from "node:child_process";

// Storybook builds a story the first time it is asked for, which takes a while when the
// rest of the suite is running beside it.
test.describe.configure({ mode: "serial", timeout: 120_000 });

let storybook: ChildProcess;
let origin: string;

test.beforeAll(async () => {
	test.setTimeout(180_000);

	const port = 6110 + test.info().parallelIndex;
	origin = `http://localhost:${port}`;
	storybook = spawn(
		"bun",
		["x", "keros3ne-studio", "stories", "--port", String(port)],
		{
			stdio: "ignore"
		}
	);

	await expect
		.poll(async () => (await fetch(`${origin}/index.json`).catch(() => null))?.ok, {
			timeout: 120_000
		})
		.toBe(true);
});

test.afterAll(async () => {
	const exited = new Promise((done) => storybook.once("exit", done));

	storybook.kill("SIGTERM");
	await exited;
});

/** Opens one story by itself, as Storybook shows it in its frame. */
async function open(page: Page, id: string) {
	const errors: string[] = [];
	page.on("pageerror", (error) => errors.push(error.message));

	await page.goto(`${origin}/iframe.html?id=${id}&viewMode=story`);
	await expect(page.locator("#storybook-root > *").first()).toBeAttached({
		timeout: 60_000
	});

	return errors;
}

test("the whole game is played from its book in a story, with no site behind it", async ({
	page
}) => {
	const errors = await open(page, "game-title-the-game--a-spin-from-the-book");
	const spin = page.getByRole("button", { name: "Spin", exact: true });

	await expect(spin).toBeVisible();
	await spin.click();
	await expect(page.locator(".sdk-story-said")).toHaveText(
		/you won \d+\.\d\d\.|No win\./,
		{
			// The first round asked of Storybook opens the game's book, which takes a while.
			timeout: 60_000
		}
	);
	expect(errors).toEqual([]);
});

test("a story of a spin that pays is one, and the tall view plays the same game", async ({
	page
}) => {
	let errors = await open(page, "game-title-the-game--a-spin-that-pays");

	await page.getByRole("button", { name: "Spin", exact: true }).click();
	await expect(page.locator(".sdk-story-said")).toHaveText(/you won \d+\.\d\d\./, {
		timeout: 60_000
	});
	expect(errors).toEqual([]);

	errors = await open(page, "game-title-the-game--the-tall-view");
	await expect(page.locator('.sdk-view[data-view="tall"]')).toBeVisible();
	await page.getByRole("button", { name: "Spin", exact: true }).click();
	await expect(page.locator(".sdk-story-said")).toHaveText(
		/you won \d+\.\d\d\.|No win\./,
		{
			timeout: 60_000
		}
	);
	expect(errors).toEqual([]);
});
