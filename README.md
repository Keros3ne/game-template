# Game template

A studio's repository to start from, for Keros3ne, a social casino played with play money.
It holds one studio, Studio Name, with one game, **Game Title**: a three-reel slot kept
deliberately simple, so that what it shows is everything a studio sends and how, not a
game's cleverness.

It is built on the studio SDK ([Keros3ne/sdk](https://github.com/Keros3ne/sdk)), a
dependency at a tag. **The SDK's README is the contract every game is held to**: read it
beside this.

## Starting a game of your own

You need [Bun](https://bun.sh).

1. Press **Use this template** on GitHub, and clone the repository it makes.
2. `bun install`, then `bun run books` and `bun run dev`: Game Title plays at
   http://localhost:4280/ against a stand-in for the site.
3. Make it yours. The names here are placeholders, to be replaced everywhere they appear:
    - `Studio Name`, in `studio.json`.
    - `game-title`, the game's slug: its folder, `games` in `studio.json`, `slug` in
      `game.json`, the `dev` script in `package.json`, and `story-host.ts`.
    - `Game Title`, the game's name: `game.json`, `guide.json`, the client's page and
      views, and its stories.
4. Change its maths (`game-title/maths/`), make its books again, and keep its tests true.
   Then its client (`game-title/client/src/`).

A studio keeps its games in as many repositories as it likes, one game to each or a few
together. A second game here is a second folder, named in `studio.json`. What your games
share across repositories goes in a package of its own (the contract's "Sharing between
repositories").

## What is here

```
package.json                      the scripts below, and the SDK at a tag
studio.json                       what this repository holds: its games, and the SDK's version
game-title/
  game.json                       the game: its name, blurb, section and modes
  guide.json                      its rules and paytable, as words and tables
  maths/rules.ts                  its rules, as figures and as play
  maths/index.ts                  how its book is made: every way its reels can stop
  maths/maths.spec.ts             its own tests: the rules, the manifest and the guide
  books/books.json                what its book comes to (the book itself is not committed)
  client/src/                     what the player sees, in Svelte and Pixi, run sandboxed
    game.svelte.ts                  what the game knows, kept above its two views
    WideView.svelte                 the game at 16 by 10, which every game has
    TallView.svelte                 the game at 9 by 16, for a phone
    *.stories.ts                    its stories
  client/public/card.svg          its picture on the site's game card
  client/client.json              the record of the client as it was built
e2e/stories.e2e.ts                its stories, played in a browser
.github/workflows/release.yml     releases each game whose version has no release yet
```

## Building a game

```sh
bun run books          # make each game's books from its maths, and say what they hold
bun run dev            # play Game Title in a browser against a stand-in for the site
bun run stories        # the game's stories, and the SDK's own, in Storybook
bun run client         # build each game's client, and put what was built on record
bun run check          # the site's checks on each game's books, guide, maths and client
bun run test           # the game's own tests: its rules, held to its guide and manifest
bun run test:browser   # its stories, played in a browser
bun run typecheck
```

1. **The site plays a game from its books**, not from your code: for each way of opening a
   round, a table of rows, each with a weight, what it pays and the events that play it
   out. Your maths plays the rounds that make them, and is pure: it draws every random
   choice from the rng it is handed. Every way of playing returns exactly 96.00%: the
   weights are made so. Game Title's book is every one of the 8,000 ways its reels can
   stop, so nothing the game can do is left out.
2. **The client decides nothing.** It asks the site to place a bet through the SDK, plays
   out the events of the row it is given, and calls `settled()` once it has been shown. It
   uses the SDK's stage, board, control bar and controls, has a view for a wide frame (16
   by 10) and one for a phone's (9 by 16), says what happens for a screen reader, and
   honours reduced motion. You build it, so what it is made of is yours to choose.
3. **The guide** is the game's rules and paytable as words and tables, held to the rules'
   own figures by a test.

## Sending a release

A game is released by itself. Its `game.json` says its `version`, and a release of it is
the tag `<slug>-v<version>` (`game-title-v1.1.0`) with one file, `game-title.tar.gz`: the
client as it was built and the books its maths made, in a `client` folder and a `maths`
folder. A repository of many games releases one without a word of the others.

The release is made by this repository's own workflow, `.github/workflows/release.yml`,
on GitHub Actions. Nothing of the SDK reaches GitHub from your machine.

1. Change the game, and raise `version` in its `game.json`.
2. Run `bun run books`, `bun run client`, `bun run check`, `bun run test` and
   `bun run test:browser`. Commit, with `books/books.json` and `client/client.json`.
3. Push to `main`. The workflow finds each game whose version has no tag yet, makes its
   books, builds its client again, holds both to the records you committed, packs it and
   creates the release.
4. Send Keros3ne the repository and the tag.

The workflow is yours to change: its own header says what must stay as it is for a site
to take a release in, and the rest is for your setup.

The site takes in, at the release's tag, your manifest, readme and licence, the game
released and any folders you list as `shared`, and nothing else; a person reads your
maths; then it fetches the game's file from the release, holds its books and built
client to the `books/books.json` and `client/client.json` you committed, checks them and
lists the game. It never runs your maths, and never builds or runs your client's code.

Keros3ne takes this repository's own game in under a studio it keeps hidden: its tests
play Game Title, and players are not shown it.

MIT licensed: see `LICENSE`.
