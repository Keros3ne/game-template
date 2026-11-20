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

## Sending a game

A game is sent as one file, and nothing else of yours goes with it: no site sees this
repository. `bun run pack` writes everything a site needs of a version of a game into
`release/<slug>-<version>.tar.gz`: its `game.json`, `guide.json` and card, its client as
it was built, the books its maths made, and any `assets/`. It is an ordinary archive, so
you can open it and see exactly what you are sending.

1. Change the game, and raise `version` in its `game.json`: a site publishes a version
   once, and the next must come after it.
2. Run `bun run books`, `bun run client`, `bun run check`, `bun run test` and
   `bun run test:browser`. Commit, with `books/books.json` and `client/client.json`.
3. Run `bun run pack game-title`, and send Keros3ne the file.

Each game is sent by itself, at its own version, however many games a repository holds.
What you sent is reviewed as it was built: your books by what they come to, your guide,
and your game, played. A site never runs your maths, and never builds or runs your
client's code.

Keros3ne takes this repository's own game in under a studio it keeps hidden: its tests
play Game Title, and players are not shown it.

MIT licensed: see `LICENSE`.
