/* ============================================================================
   app.js — the only JavaScript on the site.
   ----------------------------------------------------------------------------
   A few small features, each in its own function, each safe to delete on its own
   without breaking the others:

     1. applyConfig()   reads js/config.js and fills in your handle and dates
     2. initCarousel()  the arrows and the counter under the photos
     3. initGate()      the rules box that opens before the giveaway form
     4. initStickyBar() shows the bar pinned to the bottom of the screen
     5. initShare()     the "Send this to someone" link

   No libraries, no framework, no build step.

   Everything checks that an element exists before touching it. That's why
   deleting a whole section from index.html won't throw an error — the matching
   feature just quietly does nothing.

   Note: the page works fine with JavaScript switched off. Every Follow button is
   a plain link with a real href already in the HTML. All this does is keep those
   links in sync with config.js and add the sticky bar on top.
   ========================================================================== */

(function () {
  'use strict';

  /* If config.js failed to load, fall back to an empty object so the rest of the
     page still works instead of dying on the first line. */
  var cfg = (typeof CAMPAIGN !== 'undefined' && CAMPAIGN) ? CAMPAIGN : {};


  /* ==========================================================================
     1. APPLY CONFIG
     ======================================================================== */

  /* How to build a profile link for each platform. Snapchat's /add/ form is
     deliberate — it opens the app straight on the "Add friend" screen. */
  var PROFILE_URL = {
    tiktok:    function (h) { return 'https://www.tiktok.com/@' + h; },
    instagram: function (h) { return 'https://www.instagram.com/' + h; },
    snapchat:  function (h) { return 'https://www.snapchat.com/add/' + h; },
    youtube:   function (h) { return 'https://www.youtube.com/@' + h; }
  };

  var PLATFORM_LABEL = {
    instagram: 'Instagram',
    snapchat:  'Snapchat',
    youtube:   'YouTube'
  };

  function applyConfig() {

    /* ---- The TikTok link on every Follow button and the sticky bar --------
       These are also written into index.html as plain hrefs so they work with
       JavaScript off. This keeps them in sync with whatever config.js says. */
    if (cfg.tiktok) {
      var url = PROFILE_URL.tiktok(cfg.tiktok);

      document.querySelectorAll('[data-follow]').forEach(function (el) {
        el.href = url;

        /* Every link leaves in a new tab, so the campaign site is still sitting
           there when they come back from TikTok. These are in the HTML as well;
           setting them here too means a link added later can't forget.

           noopener is a security measure, not a nicety: without it the page you
           open can reach back and control the tab it was opened from. */
        el.target = '_blank';
        el.rel = 'noopener';
      });

      document.querySelectorAll('[data-handle]').forEach(function (el) {
        el.textContent = '@' + cfg.tiktok;
      });
    }

    /* ---- YouTube ---------------------------------------------------------
       The card in the carousel, and any other YouTube link. Same rule as the
       giveaway card: no handle means the card is removed rather than left
       pointing nowhere, and initCarousel() runs after this so the counter comes
       out right on its own. */
    if (cfg.youtube) {
      var tube = PROFILE_URL.youtube(cfg.youtube);

      document.querySelectorAll('[data-youtube]').forEach(function (el) {
        el.href = tube;
        el.target = '_blank';
        el.rel = 'noopener';
      });

      document.querySelectorAll('[data-youtube-handle]').forEach(function (el) {
        el.textContent = '@' + cfg.youtube;
      });
    } else {
      document.querySelectorAll('[data-youtube-card]').forEach(function (el) {
        el.remove();
      });
    }

    /* ---- "Last updated" line in the footer -------------------------------
       Deliberately not today's date generated on the fly. A page that always
       claims to have been updated today is lying, and people can tell. */
    if (cfg.updated) {
      document.querySelectorAll('[data-updated]').forEach(function (el) {
        el.textContent = 'Last updated ' + cfg.updated + '.';
      });
    }

    /* ---- Vote date -------------------------------------------------------
       The line above the last button reads "Before you go" until a date exists.
       Put one in config.js and it becomes "Vote March 14" on its own.

       It's blank by default on purpose. A vague or invented date on a live
       campaign site is worse than no date at all, because a date is the one
       thing that has to be right. */
    if (cfg.voteDate) {
      document.querySelectorAll('[data-vote-slot]').forEach(function (el) {
        el.textContent = 'Vote ' + cfg.voteDate;
      });
    }

    /* ---- Giveaway --------------------------------------------------------
       Two places point at the form: the card in the carousel, and the section
       further down. Both get their link from the one value in config.js, so
       there is no second address to remember to change.

       No form link means neither of them exists. An "enter the giveaway"
       button that goes nowhere is worse than nothing, and it's the same rule
       the video slide follows. */

    /* Every link to the form, wherever it is on the page. New tab and noopener
       for the same two reasons as the Follow links above. */
    document.querySelectorAll('[data-giveaway-link]').forEach(function (el) {
      el.href = cfg.giveawayUrl || '#';
      el.target = '_blank';
      el.rel = 'noopener';
    });

    /* Same for the name of the prize — the card and the section say the same
       words because they read the same line of config.js. */
    if (cfg.giveawayPrize) {
      document.querySelectorAll('[data-giveaway-prize]').forEach(function (el) {
        el.textContent = cfg.giveawayPrize;
      });
    }

    /* The card slide is REMOVED rather than hidden. It has to leave the
       carousel properly or it would still take up a swipe and still be counted
       in "1 / 4". initCarousel() runs after this, so the count comes out
       right on its own. */
    if (!cfg.giveawayUrl) {
      document.querySelectorAll('[data-giveaway-card]').forEach(function (el) {
        el.remove();
      });
    }

    /* The section carries `hidden` in the HTML and only appears once there's a
       real link — which also means it stays hidden with JavaScript switched
       off, when the link wouldn't have worked anyway. */
    var giveaway = document.querySelector('[data-giveaway]');
    if (giveaway) {
      if (cfg.giveawayUrl) {
        giveaway.hidden = false;
      } else {
        /* Belt and braces — it's already hidden in the markup. */
        giveaway.hidden = true;
      }
    }

    /* ---- Extra social buttons --------------------------------------------
       Only builds one for a platform you've actually filled in. A blank handle
       produces nothing at all: no empty button, no gap. */
    var extras = document.querySelector('[data-extra]');
    if (!extras) return;

    ['instagram', 'snapchat', 'youtube'].forEach(function (platform) {
      var handle = cfg[platform];
      if (!handle) return;          // switched off, skip entirely

      var link = document.createElement('a');
      link.href = PROFILE_URL[platform](handle);
      link.textContent = PLATFORM_LABEL[platform];
      link.target = '_blank';
      /* noopener is a security measure: without it the page you open can reach
         back and control the tab it was opened from. */
      link.rel = 'noopener';
      extras.appendChild(link);
    });
  }


  /* ==========================================================================
     1b. CAROUSEL
     --------------------------------------------------------------------------
     The carousel already works without any of this. It's a CSS scroll-snap
     container, so on a phone it swipes natively and snaps to each slide with
     zero JavaScript. Everything below is the arrows and the counter on top.

     That's why nothing here creates or moves slides. It only scrolls the same
     container a swipe would, which means the two can never disagree — swipe and
     the counter still updates, because it reads the scroll position rather than
     keeping a separate index of its own.

     Add or remove a <figure class="slide"> in the HTML and this adjusts itself.
     There is no slide count to keep in sync.
     ======================================================================== */

  function initCarousel() {
    var root = document.querySelector('[data-carousel]');
    if (!root) return;

    var track = root.querySelector('[data-track]');
    var prev  = root.querySelector('[data-prev]');
    var next  = root.querySelector('[data-next]');
    var curEl = root.querySelector('[data-slide-current]');
    var totEl = root.querySelector('[data-slide-total]');
    if (!track) return;

    var slides = [].slice.call(track.querySelectorAll('.slide'));
    if (!slides.length) return;

    if (totEl) totEl.textContent = slides.length;

    /* Which slide is currently nearest the left edge of the track. Derived from
       the scroll position rather than stored, so swiping and pressing the
       arrows can't get out of step. */
    /* The track has left padding so the first slide lines up with the name and
       the arrows. That padding has to come off these numbers, or every target
       would be one gutter too far right and the slide would sit against the
       screen edge. Read fresh each time, because the gutter changes with screen
       width. */
    function padLeft() {
      return parseFloat(getComputedStyle(track).paddingLeft) || 0;
    }

    /* Offset of a slide from the track's scrollable origin. */
    function offsetOf(slide) {
      return slide.offsetLeft - track.offsetLeft - padLeft();
    }

    function currentIndex() {
      var x = track.scrollLeft;
      var best = 0;
      var bestDist = Infinity;
      slides.forEach(function (slide, i) {
        var d = Math.abs(offsetOf(slide) - x);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      return best;
    }

    function goTo(i) {
      var clamped = Math.max(0, Math.min(slides.length - 1, i));
      var target = offsetOf(slides[clamped]);
      var from = track.scrollLeft;

      track.scrollTo({ left: target, behavior: 'smooth' });

      /* Some computers have animations switched off system-wide — it's on by
         default on a lot of school-managed Windows machines. On those, the line
         above does nothing whatsoever: no movement, no error, and the arrows
         look broken while swiping still works.

         So: check a moment later. If nothing has moved, jump there instead.
         scroll-behavior is turned off around the assignment because the
         stylesheet would otherwise route this through the same animation that
         just failed. */
      window.setTimeout(function () {
        if (Math.abs(target - from) < 1) return;          // already there
        if (Math.abs(track.scrollLeft - from) >= 1) return; // it's moving, leave it

        track.style.scrollBehavior = 'auto';
        track.scrollLeft = target;
        track.style.scrollBehavior = '';
        update();
      }, 120);
    }

    function update() {
      var i = currentIndex();
      if (curEl) curEl.textContent = i + 1;

      /* Greying out the ends tells people when to stop pressing. The Figma's
         arrows give no such signal. */
      if (prev) prev.disabled = i <= 0;
      if (next) next.disabled = i >= slides.length - 1;
    }

    if (prev) prev.addEventListener('click', function () { goTo(currentIndex() - 1); });
    if (next) next.addEventListener('click', function () { goTo(currentIndex() + 1); });

    /* Scroll fires constantly while a swipe is in motion, so the handler waits
       until it stops before doing anything. Without this it would run dozens of
       times per swipe, which is exactly the kind of thing that makes a cheap
       Chromebook stutter. */
    var settle = null;
    track.addEventListener('scroll', function () {
      window.clearTimeout(settle);
      settle = window.setTimeout(update, 90);
    }, { passive: true });

    /* Slide widths are in vw, so they change when the phone is turned. */
    window.addEventListener('resize', update);

    update();
  }


  /* ==========================================================================
     1c. THE RULES BOX
     --------------------------------------------------------------------------
     Both "Enter the giveaway" buttons open this instead of going straight to
     the form. It lists what makes someone eligible and won't open the form
     until the 9th grade box is ticked.

     Three things this deliberately does NOT do:

     - It does not check anything. A web page cannot tell whether someone liked
       a video, followed an account or voted. The tick is a promise, not proof,
       and the real check is you looking at your followers before you pick a
       winner. Building something that looks like verification would just be a
       lie with extra steps.
     - It does not replace the rules on the form. Someone can always open the
       form link directly, so the form has to carry them too.
     - It does not block anything when JavaScript is off. Both buttons keep
       their real href, so they still reach the form.
     ======================================================================== */

  function initGate() {
    var gate = document.querySelector('[data-gate]');
    if (!gate) return;

    /* Older browsers without <dialog>. Rather than half-build a modal out of
       divs, the buttons are left alone and go straight to the form. */
    if (typeof gate.showModal !== 'function') return;

    /* No form link means neither button exists, so there is nothing to open. */
    if (!cfg.giveawayUrl) return;

    var check  = gate.querySelector('[data-gate-check]');
    var go     = gate.querySelector('[data-gate-go]');
    var hint   = gate.querySelector('[data-gate-hint]');
    var follow = gate.querySelector('[data-gate-follow]');
    var step   = gate.querySelector('[data-gate-step="follow"]');
    var mark   = gate.querySelector('[data-gate-mark]');
    var skip   = gate.querySelector('[data-gate-skip]');
    var closers = gate.querySelectorAll('[data-gate-close]');
    if (!check || !go) return;

    /* Two ways past the first lock, and the box has to know which one happened
       so it can say so rather than claiming something untrue.

       followed: the Follow link was PRESSED. Not that anyone followed — nothing
       on a web page can see what happens once TikTok's own page opens. Getting
       them there is the job; checking the follower list before you pick a
       winner is yours.

       skipped: they said they haven't got TikTok. */
    var followed = false;
    var skipped  = false;

    /* The button is styled and announced as unavailable rather than being a
       disabled <button>, because it has to stay focusable — a disabled control
       is skipped by the keyboard and by a screen reader, so someone tabbing
       through would never find out why they can't get to the form. */
    function sync() {
      var past  = followed || skipped;
      var ready = past && check.checked;

      go.classList.toggle('is-off', !ready);
      go.setAttribute('aria-disabled', ready ? 'false' : 'true');

      if (step) step.classList.toggle('is-done', followed);

      /* The word next to step 1 says which of the two happened. "Done" on an
         entry from someone who told you they haven't got TikTok would be the
         box lying on their behalf. */
      if (mark) {
        mark.textContent = followed ? 'Done' : (skipped ? 'No TikTok' : '');
        mark.classList.toggle('gate__mark--muted', skipped && !followed);
      }

      /* Once they're through there's nothing left for it to do, and leaving it
         sitting there invites a second press that changes nothing. */
      if (skip) skip.hidden = past;

      if (ready && hint) hint.textContent = '';
    }

    check.addEventListener('change', sync);

    /* The link still does what it says — opens TikTok in its own tab. This just
       notices that it happened and unlocks the first half. */
    if (follow) {
      follow.addEventListener('click', function () {
        followed = true;
        sync();
      });
    }

    if (skip) {
      skip.addEventListener('click', function () {
        skipped = true;
        sync();
        /* Straight on to the thing they still have to do, so the box doesn't
           look like it swallowed the press. */
        check.focus();
      });
    }

    /* One listener on the document rather than one per button, so a giveaway
       link added later is picked up without touching this file. */
    document.addEventListener('click', function (e) {
      /* closest() walks up from whatever was actually clicked — on the carousel
         card that's the picture or a word inside it, never the link itself. */
      var link = e.target.closest ? e.target.closest('[data-giveaway-link]') : null;
      if (!link) return;

      /* The button inside the box is a giveaway link too. Ignore it here or
         pressing it would just reopen the box it's standing in. */
      if (gate.contains(link)) return;

      e.preventDefault();

      /* Fresh every time. Leaving the tick or the press from a previous visit
         would defeat the point of asking. */
      check.checked = false;
      followed = false;
      skipped  = false;
      if (hint) hint.textContent = '';

      /* The terms are long and only some people want them. Closed again each
         time, or the box opens at twice the height for everyone after the
         first person who peeked. */
      var terms = gate.querySelector('.gate__terms');
      if (terms) terms.open = false;

      sync();

      gate.showModal();
    });

    go.addEventListener('click', function (e) {
      /* Says which one is missing, rather than a single vague "you can't do
         that yet". Follow comes first because it's first in the list. */
      if (!followed && !skipped) {
        e.preventDefault();
        if (hint) hint.textContent = 'Press Follow me on TikTok first.';
        if (follow) follow.focus();
        return;
      }

      if (!check.checked) {
        e.preventDefault();
        if (hint) hint.textContent = 'Tick the box first.';
        check.focus();
        return;
      }
      /* The form opens in its own tab, so close this behind them — coming back
         to a box still demanding a tick reads as if it didn't work. */
      gate.close();
    });

    closers.forEach(function (btn) {
      btn.addEventListener('click', function () { gate.close(); });
    });

    /* Clicking the dark area outside the box closes it. The dialog element
       itself IS that area — .gate__inner is the white panel — so a click whose
       target is the dialog and not something inside it means "outside". */
    gate.addEventListener('click', function (e) {
      if (e.target === gate) gate.close();
    });

    sync();
  }


  /* ==========================================================================
     2. STICKY BAR
     --------------------------------------------------------------------------
     The rule is exactly this: show the bar whenever there is NO Follow button
     already on screen. Nothing about scroll positions or page sections — just
     "can they see a Follow button right now, yes or no". It stays correct if you
     add sections, remove sections, or move things around.

     This uses IntersectionObserver rather than a scroll listener. A scroll
     listener fires hundreds of times a second and is a real cause of stutter on
     a cheap Chromebook; IntersectionObserver only fires when something actually
     crosses the edge of the screen.
     ======================================================================== */

  function initStickyBar() {
    var bar = document.querySelector('[data-stickybar]');
    if (!bar) return;

    /* Older browsers without IntersectionObserver simply never show the bar.
       The page keeps working, it just loses one enhancement. */
    if (!('IntersectionObserver' in window)) return;

    /* Watches [data-follow-cta], not every [data-follow] link.

       The difference matters. [data-follow] is "set this href from config" and
       goes on every TikTok link, including the small text one inside the rules
       box. [data-follow-cta] is "this is a real, prominent button".
       If the bar watched every link, a single underlined word on screen would
       suppress it — and a word is not something you can comfortably tap.

       The bar's own link is excluded too, or it would see itself and never
       show. */
    var buttons = [].slice.call(document.querySelectorAll('[data-follow-cta]'))
      .filter(function (el) { return el !== bar && !bar.contains(el); });

    if (!buttons.length) return;

    var onScreen = [];

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var i = onScreen.indexOf(entry.target);
        if (entry.isIntersecting && i === -1) onScreen.push(entry.target);
        if (!entry.isIntersecting && i !== -1) onScreen.splice(i, 1);
      });
      bar.classList.toggle('is-visible', onScreen.length === 0);
    }, {
      /* Half the button has to be showing to count. A 2px sliver peeking over
         the edge of the screen is not something anyone can tap. */
      threshold: 0.5
    });

    buttons.forEach(function (btn) { observer.observe(btn); });
  }


  /* ==========================================================================
     3. SHARE
     --------------------------------------------------------------------------
     On a phone this opens the real system share sheet: messages, Snapchat,
     AirDrop, whatever they use. That is how a link actually spreads through a
     school, so it's worth having.

     Desktop browsers mostly have no share sheet, so there it copies the link and
     shows a small confirmation instead.
     ======================================================================== */

  function initShare() {
    var btn = document.querySelector('[data-share]');
    if (!btn) return;

    var toastEl = document.querySelector('[data-toast]');
    var toastTimer = null;

    function toast(message) {
      if (!toastEl) return;
      toastEl.textContent = message;
      toastEl.classList.add('is-visible');
      /* Clear any previous timer, or fast repeat taps cut each other off. */
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(function () {
        toastEl.classList.remove('is-visible');
      }, 2400);
    }

    btn.addEventListener('click', function () {
      var url = window.location.href;

      /* -- Phones: the real share sheet ------------------------------------ */
      if (navigator.share) {
        navigator.share({
          title: cfg.shareTitle || document.title,
          text:  cfg.shareText  || document.title,
          url:   url
        }).catch(function () {
          /* Rejects when someone opens the sheet and backs out. That's a normal
             thing to do, not an error, so nothing is shown. */
        });
        return;
      }

      /* -- Desktop: copy to clipboard --------------------------------------
         navigator.clipboard only exists on https:// and localhost. Opening the
         file straight off the desktop (file://) lands in the catch below, which
         is expected rather than broken. */
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          toast('Link copied');
        }).catch(function () {
          toast('Copy the link from your address bar');
        });
        return;
      }

      toast('Copy the link from your address bar');
    });
  }


  /* ==========================================================================
     START
     --------------------------------------------------------------------------
     The script tags sit at the bottom of index.html, so the page is already
     built by the time this runs and nothing needs to wait.
     ======================================================================== */

  applyConfig();
  initCarousel();
  initGate();
  initStickyBar();
  initShare();

})();
