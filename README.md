# womensafety181 — link-in-bio storefront

Free link-in-bio website for **@womensafety181**: emergency numbers, every Instagram post with its own links, and affiliate links for safety tools.

Each post has its own address, so you can send people straight to it:

| Link | Opens |
|---|---|
| `…/womensafety181/#safety-tools` | Post 6 |
| `…/womensafety181/#6` | Post 6 (by number) |
| `…/womensafety181/` | Everything |

---

## Files

| File | What it is | Edit it? |
|---|---|---|
| `data.js` | All posts, products and your Amazon tag | **Yes, this is the only one** |
| `images/` | Post images and logo | Add a new image for each post |
| `index.html`, `style.css`, `app.js` | The page itself | No |

---

## Put it online (one time, free)

1. Create a free account at **github.com**.
2. Click **+ → New repository**. Name it `womensafety181`, set it to **Public**, and click **Create repository**.
3. Click **uploading an existing file**, drag in **everything inside this folder** (including the `images` folder), and click **Commit changes**.
4. Go to **Settings → Pages**. Under *Branch*, choose `main` and `/ (root)`, then click **Save**.
5. After a minute or two your site is live at
   **`https://YOUR-USERNAME.github.io/womensafety181/`**
6. Put that link in your Instagram bio.

---

## Add a new post (about 2 minutes, all on github.com, phone works too)

1. **Upload the image:** open the `images` folder → **Add file → Upload files** → pick your post image
   (name it simply, like `travel-safety.jpg`) → **Commit changes**.
2. **Edit `data.js`:** open it → click the ✏️ pencil.
3. Copy this block and paste it at the **top** of the `POSTS` list (right after `const POSTS = [`):

   ```js
   {
     id: "travel-safety", number: 7, date: "2026-10-10",
     title: "Travel safety checklist",
     image: "travel-safety.jpg",
     products: ["door-alarm", "power-bank"],
     links: [
       { label: "Uber safety toolkit", url: "https://www.uber.com/in/en/safety/", note: "uber.com" },
     ],
   },
   ```
4. Change the `id`, `number`, `title`, `image`, and list the products/links for this post.
   Leave out `products` or `links` if the post doesn't need them.
5. Click **Commit changes**. The site updates in about a minute.
6. In your caption write: *"Link in bio → tap **Post 7**"* or DM the direct link
   `https://YOUR-USERNAME.github.io/womensafety181/#travel-safety`.

## Add a new product

Inside `PRODUCTS` in `data.js`, copy a block and change it:

```js
"safety-keychain": {
  icon: "🔑", name: "Safety Keychain", price: "approx. ₹199–₹399",
  why: "Alarm + torch on your keys.",
  amazon: "safety keychain alarm torch",   // search words OR a full amzn.to link
  blinkit: "keychain",                      // optional
},
```

Then use its id (`"safety-keychain"`) in any post's `products` list.

**Better Amazon links:** once your Associates account is active, open the product on Amazon, use the **SiteStripe** bar at the top → *Get Link → Short link* and paste the `https://amzn.to/...` link as `amazon:`. Search words also work and never break if a product goes out of stock.

## Set your Amazon tag

In `data.js`, change `amazonTag: "YOURTAG-21"` to your tracking ID from affiliate-program.amazon.in. It's added to every Amazon button automatically.

---

## Checklist when something looks broken

- A post doesn't show up? Check for a missing **comma** after the `}` of the block above it.
- "Missing product id"? The id in `products: [...]` doesn't match one in `PRODUCTS` (spelling!).
- Image not showing? File name in `image:` must match the file in `images/` exactly (case matters).
- Use GitHub's **History** button on `data.js` to undo any change.

---

*As an Amazon Associate I earn from qualifying purchases. Add `#ad` or "affiliate link" on Instagram posts that use these links (ASCI guidelines).*
