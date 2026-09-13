/* ============================================================================
   config.js — ✏️ THIS IS THE FILE YOU EDIT.
   ----------------------------------------------------------------------------
   Everything you're likely to want to change is here, in one place. Change a
   value between the quote marks, save, refresh the page. That's the whole job.

   You do not need to understand any of the other JavaScript to use this file.

   Rules:
     - Keep the quote marks. 'braydenclass.pres' works, braydenclass.pres does not.
     - Keep the comma at the end of each line.
     - Leaving something as '' (two quote marks, nothing between) switches it
       OFF. That's how the unused social buttons stay hidden.
   ========================================================================== */

const CAMPAIGN = {

  /* --------------------------------------------------------------------------
     SOCIAL HANDLES
     --------------------------------------------------------------------------
     Type the handle WITHOUT the @ sign. The site adds it where it's needed.

     TikTok is the main one — it's what every gold button on the site points at.
     The others are switched off. Fill one in and its button appears at the
     bottom of the Follow section automatically; you don't have to touch any
     other file. Leave it as '' and nothing shows up.
     ------------------------------------------------------------------------ */

  tiktok:    'braydenclass.pres',
  instagram: '',
  snapchat:  '',

  /* Capital B, the way it's written on the channel. Handles are case sensitive
     in the address bar, so copy it exactly.

     This one now feeds TWO things: the small YouTube button at the bottom of
     the page, and the YouTube card in the carousel. Blank it out and both
     disappear, and the carousel counter adjusts by itself. */
  youtube:   'Braydenclasspres',


  /* --------------------------------------------------------------------------
     ELECTION DAY  (optional — leave blank until you actually know it)
     --------------------------------------------------------------------------
     Blank right now on purpose. While it's empty, the orange line above the last
     button just reads "Before you go" and no date appears anywhere on the site.

     When you find out, write it the way you'd say it out loud:

       voteDate: 'March 14',

     and that line turns into "VOTE MARCH 14" by itself. Nothing else to change.

     Don't put a guess here. A wrong date is the one mistake on a campaign site
     that actually costs votes.
     ------------------------------------------------------------------------ */

  voteDate: '',


  /* --------------------------------------------------------------------------
     GIVEAWAY  (optional — leave blank to hide the whole section)
     --------------------------------------------------------------------------
     Paste the share link to your Google Form here and the giveaway section
     appears on the site. Leave it as '' and the section isn't there at all.

       giveawayUrl: 'https://forms.gle/xxxxxxxx',

     In Google Forms: press Send, then the link icon, then copy. Tick "Shorten
     URL" so it's a forms.gle link.

     ⚠️ THE RULES ON THIS GIVEAWAY SAY "VOTE FOR ME". READ THIS.
        Most schools treat a prize that depends on voting as vote-buying and
        disqualify you for it. A prize that depends on a follow is just a
        giveaway. Ask whoever runs your election BEFORE you post the link — and
        if the answer is no, delete the two lines marked ⚠️ in index.html (one
        in the giveaway section, one in the rules box). Everything else keeps
        working.

     The form itself needs to collect a phone number or an email, because that's
     how the winner gets told. It should repeat the rules too: anyone can open
     the form link directly without ever seeing the box on the site.
     ------------------------------------------------------------------------ */

  giveawayUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSd2FsH3hcravJplwkdmqbnJR7oxNkM2XkGMDAQJWaINqKnmQQ/viewform',

  /* ✏️ What they can win. Shows as the headline of that section, and it's the
     link behind the giveaway card in the carousel. */
  giveawayPrize: 'Win an Amazon gift card',


  /* --------------------------------------------------------------------------
     LAST UPDATED
     --------------------------------------------------------------------------
     Shows in the footer. Change it when you actually change something.

     It is not generated automatically on purpose — a page that always claims to
     have been updated today is lying, and people can tell.
     ------------------------------------------------------------------------ */

  updated: 'September 2026',


  /* --------------------------------------------------------------------------
     SHARING
     --------------------------------------------------------------------------
     What gets filled in when someone taps "Send to a friend" and their phone
     opens its share sheet. Keep it short — this shows up inside a text message,
     so anything long gets cut off.
     ------------------------------------------------------------------------ */

  shareTitle: 'Brayden Bush for Class President',
  shareText:  'Brayden Bush for Class President — take a look.',

};
