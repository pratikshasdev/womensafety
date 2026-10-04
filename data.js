/* =====================================================================
   womensafety181 — THE ONLY FILE YOU NEED TO EDIT
   ---------------------------------------------------------------------
   • Add a product  → copy one block in PRODUCTS, give it a new id.
   • Add a post     → copy one block in POSTS (put it at the TOP so the
                      newest post shows first), list the product ids
                      and/or links that belong to it.
   • Each post gets its own link:  yoursite/#<post id>
     e.g. https://USERNAME.github.io/womensafety181/#safety-tools
   Keep the commas and quotes exactly like the examples.
   ===================================================================== */

const SITE = {
  handle: "womensafety181",
  tagline: "Safety tools, helplines and tips for women in India. Independent awareness page.",
  amazonTag: "YOURTAG-21",          // ← your Amazon Associates tracking ID
};

/* ---------- PRODUCTS ----------
   amazon:  either search words ("pepper spray for women")
            or a full product link from Amazon SiteStripe (https://amzn.to/...)
   blinkit: search words, or leave it out if Blinkit doesn't sell it      */
const PRODUCTS = {
  "pepper-spray": {
    icon: "🌶️", name: "Pepper Spray", price: "approx. ₹200–₹500",
    why: "Small enough for your palm. Aim at the face, spray, run.",
    amazon: "pepper spray for women self defence", blinkit: "pepper spray",
  },
  "safety-alarm": {
    icon: "🚨", name: "Personal Safety Alarm", price: "approx. ₹250–₹600",
    why: "Pull the pin for a loud siren. Clips to keys or bag.",
    amazon: "personal safety alarm keychain women",
  },
  "whistle": {
    icon: "📢", name: "Safety Whistle", price: "approx. ₹50–₹150",
    why: "Loud, light, and works without battery or signal.",
    amazon: "emergency safety whistle", blinkit: "whistle",
  },
  "torch": {
    icon: "🔦", name: "Pocket Torch", price: "approx. ₹150–₹400",
    why: "Light up dark lanes, stairways and parking lots.",
    amazon: "rechargeable pocket torch led", blinkit: "torch",
  },
  "power-bank": {
    icon: "🔋", name: "Power Bank", price: "approx. ₹700–₹1,200",
    why: "A dead phone can't call 112. Carry 10,000 mAh.",
    amazon: "10000mah power bank", blinkit: "power bank",
  },
  "door-alarm": {
    icon: "🚪", name: "Door Stop Alarm", price: "approx. ₹300–₹600",
    why: "Wedge under hotel or PG doors. Sirens if pushed open.",
    amazon: "door stop alarm travel safety",
  },
};

/* ---------- POSTS (newest first) ----------
   id:       short, lowercase, hyphens — this becomes the post's link
   number:   the post number you show on Instagram ("Post 6")
   image:    file inside the images/ folder
   products: ids from PRODUCTS above
   links:    any other useful links for this post                     */
const POSTS = [
  {
    id: "safety-tools", number: 6, date: "2026-10-03",
    title: "Safety tools every woman should carry",
    image: "safety-tools.jpg",
    products: ["pepper-spray", "safety-alarm", "whistle", "torch", "power-bank", "door-alarm"],
  },
  {
    id: "call-181", number: 5, date: "2026-10-01",
    title: "What happens when you dial 181?",
    image: "call-181.jpg",
    links: [
      { label: "About One Stop Centres (Sakhi)", url: "https://socialwelfare.vikaspedia.in/viewcontent/social-welfare/women-and-child-development/women-development-1/one-stop-centre-scheme?lgn=en", note: "vikaspedia.in" },
    ],
  },
  {
    id: "state-helplines", number: 4, date: "2026-10-01",
    title: "Women's safety helplines in your state",
    image: "state-helplines.jpg",
    links: [
      { label: "NCW: other useful helplines", url: "https://www.ncw.gov.in/other-useful-helplines/", note: "ncw.gov.in" },
    ],
  },
  {
    id: "which-number", number: 3, date: "2026-10-01",
    title: "Which number should you call?",
    image: "which-number.jpg",
    links: [
      { label: "Report cyber crime online", url: "https://cybercrime.gov.in/", note: "cybercrime.gov.in" },
    ],
  },
  {
    id: "wallpaper", number: 2, date: "2026-10-01",
    title: "Emergency numbers lock screen wallpaper",
    image: "wallpaper.jpg",
    links: [
      { label: "Download the wallpaper", url: "images/wallpaper.jpg", note: "Open, then long-press to save" },
    ],
  },
  {
    id: "helplines", number: 1, date: "2026-10-01",
    title: "Numbers every woman in India must save",
    image: "helplines.jpg",
    products: ["power-bank"],
    links: [
      { label: "National Commission for Women", url: "https://www.ncw.gov.in/", note: "ncw.gov.in" },
    ],
  },
];
