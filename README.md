# Brayden Bush for Freshman Class President

A one-page campaign site. Its job is to turn visitors into TikTok followers.

Plain HTML, CSS and JavaScript. No frameworks, no build step, nothing to install.
Open `index.html` and it works.

---

## The 30-second version

Almost everything you'll want to change is in **`js/config.js`**. Change the words
between the quote marks, save, refresh.

Your handle is already in there:

```js
tiktok: 'braydenclass.pres',
```

Change that one line and every button on the site follows it.

---

## Where things live

```
index.html         The page. All the words are here.
css/tokens.css     Colours, fonts, sizes. Change the design here.
css/style.css      Layout.
js/config.js       ✏️ Your handle and dates. THIS IS THE ONE YOU EDIT.
js/app.js          Sticky bar and the share link. That's all the JS there is.
img/               Your original photos, untouched, full size.
assets/img/        The cropped web versions the site actually loads.
assets/video/      Campaign video goes here.
assets/fonts/      Archivo, so the site doesn't depend on Google.
```

Anywhere you see **✏️**, that bit is meant for you to change.

---

## The design

Built from your Figma file. Name block on the left, media carousel on the right
with the next panel peeking past the edge of the screen. On a phone it stacks:
name, button, carousel, arrows.

The four colours are sampled straight out of your design, not guessed:

| | | |
|---|---|---|
| `#F0E5CE` | cream | the page |
| `#16181C` | near-black | the name, the dark bands |
| `#381E72` | purple | the eyebrow, the Follow button, the 3px rules |
| `#1E1E1E` | panel | behind the carousel media |

### The carousel

It's CSS scroll-snap, which means **it swipes natively on a phone with no
JavaScript at all**. The arrows just nudge the same scroll container a finger
would, so if the JavaScript ever broke, the carousel still works by swiping — it
would only lose the buttons and the counter.

**To add a slide:** copy a `<figure class="slide">` block in `index.html` and
change the image and the label. The `1 / 4` counter updates itself. There's no
number to keep in sync anywhere.

**Three of the four slides aren't photos.** The order is photo, giveaway,
TikTok, then YouTube. The prize is what makes someone stop swiping, the Follow
card is what they land on next by which point they know why, and YouTube comes
last because it's where someone goes after they've already decided they want
more. All three are flat colour panels and the whole panel is the link — the tap
target is about the size of a phone screen. They're the same 5:7 shape as the
photos and sit in the same swipe, so the ask turns up in the middle of the thing
people are already swiping through instead of waiting in a section further down
that a lot of phones never reach. Edit their words in `index.html`. Two of them
switch themselves off: empty `giveawayUrl` in `js/config.js` and the giveaway
card is removed from the carousel, empty `youtube` and the YouTube card goes the
same way. The counter follows either one.

The colours aren't decoration. Purple is the Follow card and nothing else on
this page — two purple cards in one swipe and neither one is the thing you
press. The giveaway is the pale blue of the section further down, so the card
and the section read as one offer. YouTube is red, the one colour on the site
that isn't from your Figma file, and it's deepened from YouTube's own `#FF0000`
so the cream text on it stays readable. It's in `tokens.css` as `--red` and it
appears on that card and nowhere else.

The gift cards on the giveaway panel are tilted and cropped by the top and right
edges on purpose. Straight and fully inside the panel, a cut-out on a flat
colour field reads as clip art; cropped by the frame it reads as an object lying
there. The card panels carry no label chip either — the photos need one because
a photo doesn't say what it is, and on a narrow phone the chip landed straight
on top of the gift cards.

**Every link on the site opens in a new tab** — TikTok, the giveaway form, the
sticky bar, all of them. The campaign site is still sitting there when they come
back. They all carry `rel="noopener"` with it, which stops the page you opened
from reaching back and controlling the tab it came from. `js/app.js` sets both
again at runtime, so a link added later can't forget them.

The outdoor photo is out of the carousel. Its files are still in `assets/img/`
(`outdoor-*`) if you want it back — put the `<figure class="slide">` block back
in `index.html` and the counter follows.

There's no Follow button in the hero any more. The name stands on its own up
there and the ask lives in the carousel instead, so it isn't said twice on the
same screen. The bar that slides up from the bottom still covers the gap: it
appears whenever no Follow button is on screen.

Two things I changed from your Figma, both deliberate:

- **The arrows.** You asked for this. They're square and outlined instead of
  black circles, they grey out at each end so you know when to stop pressing,
  and there's a position counter between them. Your version had no way of
  telling how many panels there were or where you were in them.
- **The labels sit on a solid block.** The Figma puts white text straight onto
  the panel, which is fine while the panels are empty dark rectangles — but over
  a real photograph it lands on whatever happens to be behind it. A solid chip
  stays readable on anything.

### Three rules that hold it together

1. **No gradients.** Flat colour only. There are zero in the project.
2. **Nothing centred.** Everything lines up on one left gutter — the name, the
   first slide, the arrows.
3. **Square edges, except the media.** `--radius` is `0px`; `--radius-media` is
   `20px`. Rounded panels read as phone screens, which is what's in them. The
   contrast between rounded media and square buttons is intentional.

### Why the button isn't full width

A full-width rounded button is one of the loudest "a template made this" signals.
A button that stops where its text stops looks like something a person placed.
Purple appears only on that button, the eyebrow and the 3px rules, which is why
your eye lands on it instantly.

---

## Writing for this site

This matters more than the design, and it's the part that's yours.

The giveaways that make writing read as fake:

- Dashes in the middle of sentences.
- Three things in a row with the same rhythm. "Show up, listen, deliver."
- Sentences that turn at the end to sound clever.
- The words *actually*, *genuinely*, *simply*, *truly*.

Real writing is flatter and shorter. "I play soccer" beats anything a copywriter
would put in its place. **When a line sounds good, that's usually the moment to
make it plainer.**

**Be specific.** Name the actual thing: a real date, a real event, a real number.
A real detail can't be faked, and nothing else reads as more genuine.

---

## The giveaway

The section is hidden until you paste a form link into `js/config.js`:

```js
giveawayUrl:   'https://forms.gle/xxxxxxxx',
giveawayPrize: 'Win a pair of AirPods',
```

Blank means the section isn't on the page at all. No half-finished giveaway.

### ⚠️ Read this before you post it

**The rules currently say "vote for me".** You asked for that, so it's on the
site — but it's the one thing here that can cost you the election rather than
win it. Most schools treat a prize that depends on voting as vote-buying, and
the penalty is usually disqualification. A prize that depends on a follow is
just a normal giveaway. Same prize, completely different rule.

**Ask whoever runs your election before you post the link.** Two minutes now
beats getting pulled off the ballot later. If they say no, delete the two `<li>`
blocks marked ⚠️ in `index.html` — one in the giveaway section, one in the rules
box. Nothing else needs touching and everything keeps working.

### The rules box

Pressing either "Enter the giveaway" — the card in the carousel or the button in
the section — opens a popup before the form.

**The form button stays dead until two things have happened:** they've got past
step 1, and "I'm in 9th grade" is ticked. Press the button early and it says
which one is still missing. Both reset every time the popup opens.

That order is the whole point of the box. Following is what the site is for, and
the prize now waits behind it instead of sitting next to it.

**There are two ways past step 1.** Pressing "Follow me on TikTok" puts a purple
DONE beside it. Pressing the small **"Don't have TikTok?"** underneath marks it
a grey NO TIKTOK and unlocks the form anyway, then disappears. It says NO TIKTOK
rather than DONE on purpose: they got past the step, they didn't do the thing,
and the box shouldn't claim otherwise on their behalf.

That way out is there because someone without TikTok is still in your class and
can still vote for you. Shutting them out of the prize costs more than the
follow was worth. The terms say following isn't required, so the rules and the
buttons agree.

It's a real `<dialog>`, not a div dressed up as one, so Escape closes it, focus
stays inside while it's open, and a screen reader announces it properly. All of
that is hand-built and usually wrong in a homemade popup. The **Terms** at the
bottom are a plain `<details>` — it opens and closes with no JavaScript at all.
✏️ Read them and make them true; the closing date in there is a placeholder.

Three things it doesn't do, on purpose:

- **It doesn't check anything.** It knows the Follow link was *pressed*. It
  cannot know whether anyone then pressed Follow on TikTok's own page — no web
  page can see that, and any site claiming otherwise is guessing. Same for
  voting. The tick and the press are promises, not proof; the real check is you
  looking at your follower list before you pick a winner.
- **It doesn't replace the rules on the form.** Anyone can open the form link
  directly and never see the box, so the form has to carry the rules too.
- **It doesn't block anyone with JavaScript off.** Both buttons keep a real link
  to the form.

The giveaway card also counts as a Follow button for the sticky bar, so the bar
stays down while someone is reading the card. Entering means following, so it's
the same ask.

### Setting up the Google Form

1. Go to [forms.google.com](https://forms.google.com), start a blank form
2. **Settings → Responses → Collect email addresses → Verified.** This grabs
   their real signed-in school email automatically. Better than asking them to
   type it: no typos, and they can't enter fifty times
3. **Settings → Responses → Limit to 1 response.** Stops people spamming entries
4. Turn **off** "Allow response editing"
5. Add your questions:
   - **First name** — short answer, required
   - **Phone number** — short answer, required. The site tells people the winner
     gets contacted by phone or email, so the form has to ask for one of them
   - **Grade or homeroom** — multiple choice is better than short answer here,
     because you get clean data instead of forty spellings of the same thing
   - **TikTok @** — short answer, optional but worth adding. It's how you check
     someone actually followed before you hand over a prize
6. Put the rules at the top of the form as well, in the description. The box on
   the site only catches people who came through the site
7. Press **Send**, click the **link icon**, tick **Shorten URL**, copy it
8. Paste it into `js/config.js`

### Picking the winner

Responses land in a Google Sheet (Responses tab → the green Sheets icon). To pick
fairly, put this in an empty cell:

```
=INDEX(B2:B, RANDBETWEEN(2, COUNTA(B2:B)))
```

The site doesn't promise a public announcement any more, so this part is up to
you: posting the winner on TikTok is what makes a second giveaway work, because
people saw the first one pay out. Nothing in the terms commits you to it, so
it's a choice each time rather than a promise you have to keep.

---

## Adding your campaign video

The video is a **slide in the carousel**, so it sits right next to your photos
instead of in a section of its own.

1. Put the file in `assets/video/` and name it `campaign.mp4`
2. In `index.html`, find **YOUR CAMPAIGN VIDEO GOES HERE** inside the carousel
   and remove the comment markers around that `<figure>`
3. Optionally add a still at `assets/img/video-poster.jpg`

The counter will say `1 / 3` by itself once it's in. Nothing else to change.

It's commented out until then on purpose. There's no "coming soon" panel,
because everything on this page is a real thing and an empty promise block would
be the wrong move.

**Keep the file under about 8 MB.** A long uncompressed video undoes all the work
that went into making this page fast.

---

## Adding more photos

Drop originals into `img/`. **Don't point the site at them directly.** Photos off
your phone are 2–6 MB each; the whole site is currently 126 KB. One raw photo
would be fifty times the weight of everything else combined.

Ask Claude to re-run the image cropper. It writes web versions into `assets/img/`
and leaves your originals alone.

What it did to the two photos here:

| | Original | What a phone downloads |
|---|---|---|
| Portrait (hero) | 2,171 KB | **27 KB** |
| Outdoor | 6,141 KB | **72 KB** |

It also strips the hidden data phone photos carry, including the GPS coordinates
of where the picture was taken. Worth knowing before putting personal photos on a
public site.

**Crops are baked into the files, not done in CSS.** That's deliberate. A
pre-cropped file can't be got wrong by a later edit, which is exactly what went
wrong in the previous version.

---

## Before you launch

- [ ] Real TikTok handle in `js/config.js`
- [ ] Real vote date in `js/config.js`
- [ ] Name one real thing in each of the three points in `index.html`. They're
      written from what you told me — events for our year, a voice for the class,
      and hearing back — and they're true, but they're one step short. A dance
      you'd run, the meeting you'd sit in, something someone asked for last
      month. A real detail can't be faked and nothing else reads as more genuine
- [ ] Real closing date in the giveaway terms (it says "the day of the vote")
- [ ] In `index.html`, set `og:image` to your **full public address**, e.g.
      `https://yoursite.com/assets/img/og-image.jpg`, and add an `og:url`.
      Relative paths don't work for link previews, because the app fetching them
      isn't on your site. Without this, texting the link shows a bare URL instead
      of the preview card.
- [ ] Open it on a real phone and press the button. It should open the **TikTok
      app**, not a logged-out webpage. That's the whole product. Test it for real.

---

## Viewing it while you work

Double-clicking `index.html` mostly works, but browsers block a few things on
`file://` — fonts may not load and the share link can't copy. To see it properly,
run one of these in the project folder and open the address it prints:

```
npx serve
```

or

```
py -m http.server
```

---

## Why it's built this way

**Phone first.** The plain CSS rules are the phone layout; the
`@media (min-width: ...)` blocks adapt it upward. Nearly all your traffic is
phones, so the phone version is the real design.

**The button is on the first screen.** Your photo, name, one line and the button
all land without scrolling. Someone can arrive and follow having scrolled
nothing.

**126 KB total.** Fonts are self-hosted so there's no third-party request for
school WiFi to block. The second photo is lazy-loaded. The video downloads
nothing until someone presses play.

**It works with JavaScript off.** Every button is a real link with a real `href`
in the HTML. The JavaScript only keeps them in sync with `config.js` and adds the
sticky bar.
