/* Builds the page from data.js. You shouldn't need to edit this file. */
(function () {
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function amazonUrl(v) {
    if (/^https?:\/\//.test(v)) {
      // Full link: add your tag to amazon.in links that don't have one (amzn.to links already carry it)
      try {
        const u = new URL(v);
        if (/amazon\.in$/.test(u.hostname) && !u.searchParams.has("tag")) u.searchParams.set("tag", SITE.amazonTag);
        return u.toString();
      } catch { return v; }
    }
    return `https://www.amazon.in/s?k=${encodeURIComponent(v)}&tag=${encodeURIComponent(SITE.amazonTag)}`;
  }
  const blinkitUrl = v => /^https?:\/\//.test(v) ? v : `https://blinkit.com/s/?q=${encodeURIComponent(v)}`;

  function productCard(id) {
    const p = PRODUCTS[id];
    if (!p) return `<div class="empty">Missing product id "${esc(id)}" in data.js</div>`;
    return `<article class="item">
      <div class="ico" aria-hidden="true">${esc(p.icon || "🛡️")}</div>
      <div>
        <h3>${esc(p.name)}</h3>
        ${p.why ? `<p>${esc(p.why)}</p>` : ""}
        ${p.price ? `<span class="price">${esc(p.price)}</span>` : ""}
        <div class="btns">
          ${p.amazon ? `<a class="btn amz" href="${esc(amazonUrl(p.amazon))}" target="_blank" rel="noopener sponsored">Amazon ↗</a>` : ""}
          ${p.blinkit ? `<a class="btn blk" href="${esc(blinkitUrl(p.blinkit))}" target="_blank" rel="noopener">Blinkit ↗</a>` : ""}
        </div>
      </div>
    </article>`;
  }

  function linkRow(l) {
    const ext = /^https?:\/\//.test(l.url);
    return `<a class="link" href="${esc(l.url)}"${ext ? ' target="_blank" rel="noopener"' : ""}>${esc(l.label)}<span>${esc(l.note || "")}</span></a>`;
  }

  function postBlock(post) {
    const products = (post.products || []).map(productCard).join("");
    const links = (post.links || []).map(linkRow).join("");
    const searchText = [post.number, post.title, post.id,
      ...(post.products || []).map(id => PRODUCTS[id] ? PRODUCTS[id].name : ""),
      ...(post.links || []).map(l => l.label)].join(" ").toLowerCase();
    return `<details class="post" id="${esc(post.id)}" data-search="${esc(searchText)}">
      <summary>
        ${post.image ? `<img src="images/${esc(post.image)}" alt="" loading="lazy">` : `<span></span>`}
        <span><span class="pnum">Post ${esc(post.number)}</span><br><span class="ptitle">${esc(post.title)}</span></span>
        <span class="chev" aria-hidden="true">›</span>
      </summary>
      <div class="pbody">
        ${products}${links}
        ${!products && !links ? `<div class="empty">No links for this post yet.</div>` : ""}
        <div class="share">Link to this post: <button type="button" data-copy="${esc(post.id)}">Copy link</button></div>
      </div>
    </details>`;
  }

  // Header
  document.getElementById("tagline").textContent = SITE.tagline;
  const ig = document.getElementById("ig");
  ig.href = `https://instagram.com/${SITE.handle}`;
  ig.textContent = `@${SITE.handle} on Instagram`;

  // Posts + all products
  const postsEl = document.getElementById("posts");
  postsEl.innerHTML = POSTS.map(postBlock).join("") + `<div class="empty" id="none" hidden>No posts match that search.</div>`;
  document.getElementById("all").innerHTML = Object.keys(PRODUCTS).map(productCard).join("");

  // Open the post named in the link (#safety-tools) — also accepts #6 or #post-6
  function openFromHash() {
    let h = decodeURIComponent(location.hash.slice(1)).toLowerCase();
    if (!h) return;
    const m = h.match(/^(?:post-?)?(\d+)$/);
    if (m) { const p = POSTS.find(p => String(p.number) === m[1]); if (p) h = p.id; }
    const el = document.getElementById(h);
    if (el && el.tagName === "DETAILS") {
      el.open = true;
      el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash");
      el.scrollIntoView({ block: "start" });
    }
  }
  window.addEventListener("hashchange", openFromHash);
  openFromHash();

  // Search
  const none = document.getElementById("none");
  document.getElementById("q").addEventListener("input", e => {
    const q = e.target.value.trim().toLowerCase();
    let shown = 0;
    postsEl.querySelectorAll("details.post").forEach(d => {
      const hit = !q || d.dataset.search.includes(q);
      d.hidden = !hit; if (hit) shown++;
      if (q && hit && shown <= 1) d.open = true;
    });
    none.hidden = shown > 0;
  });

  // Copy-link buttons
  postsEl.addEventListener("click", e => {
    const b = e.target.closest("[data-copy]");
    if (!b) return;
    const url = `${location.origin}${location.pathname}#${b.dataset.copy}`;
    const done = () => { b.textContent = "Copied ✓"; setTimeout(() => (b.textContent = "Copy link"), 1500); };
    (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(done, () => { prompt("Copy this link:", url); });
  });
})();

/* ---------- Send my location ---------- */
(function () {
  const status = document.getElementById("loc-status");
  if (!status) return;
  const say = t => (status.textContent = t);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  function getMessage() {
    const base = "I need help. Please call me or come to me.";
    return new Promise(resolve => {
      if (!("geolocation" in navigator)) { resolve(base); return; }
      say("Getting your location…");
      navigator.geolocation.getCurrentPosition(
        p => {
          const { latitude: la, longitude: lo } = p.coords;
          resolve(`${base} My location: https://maps.google.com/?q=${la.toFixed(5)},${lo.toFixed(5)}`);
        },
        () => { say("Location is off, so the message won't include it. Call 112 if you are in danger."); resolve(base + " (Location unavailable.)"); },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    });
  }

  document.getElementById("loc-sms").addEventListener("click", async () => {
    const msg = await getMessage();
    say("Opening your messages app. Choose a contact and send.");
    location.href = `sms:${isIOS ? "&" : "?"}body=${encodeURIComponent(msg)}`;
  });
  document.getElementById("loc-wa").addEventListener("click", async () => {
    const msg = await getMessage();
    say("Opening WhatsApp. Choose a contact and send.");
    location.href = `https://wa.me/?text=${encodeURIComponent(msg)}`;
  });
  document.getElementById("loc-copy").addEventListener("click", async () => {
    const msg = await getMessage();
    try { await navigator.clipboard.writeText(msg); say("Copied. Paste it into any chat."); }
    catch { say(msg); }
  });
})();

/* ---------- State helpline finder ---------- */
(function () {
  const sel = document.getElementById("state");
  const out = document.getElementById("state-out");
  if (!sel || typeof STATES === "undefined") return;
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  sel.insertAdjacentHTML("beforeend", Object.keys(STATES).sort().map(s => `<option>${esc(s)}</option>`).join(""));

  function show(name) {
    const s = STATES[name];
    if (!s) { out.innerHTML = ""; return; }
    const phones = s.phone.map(p => `<a class="link" href="tel:${esc(p.replace(/[^\d]/g, ""))}">State Women Commission <span>${esc(p)}</span></a>`).join("");
    const web = s.web ? `<a class="link" href="${esc(s.web)}" target="_blank" rel="noopener">Commission website <span>${esc(new URL(s.web).hostname)}</span></a>` : "";
    out.innerHTML = `<div class="state-card">
      <a class="link" href="tel:112">Police · Ambulance · Fire <span>112</span></a>
      <a class="link" href="tel:181">Women Helpline (${esc(name)}) <span>181</span></a>
      ${phones}${web}
      ${!phones && !web ? `<p class="hint">We don't have a verified state commission number for ${esc(name)} yet. 112 and 181 work here.</p>` : ""}
      <p class="hint">Office numbers from the National Commission for Women list, checked ${esc(STATES_CHECKED)}. Commission offices keep working hours; for emergencies use 112 or 181.</p>
    </div>`;
  }
  sel.addEventListener("change", () => {
    show(sel.value);
    try { localStorage.setItem("ws181-state", sel.value); } catch {}
  });
  try { const saved = localStorage.getItem("ws181-state"); if (saved && STATES[saved]) { sel.value = saved; show(saved); } } catch {}
})();

/* ---------- Offline + add to home screen ---------- */
(function () {
  if ("serviceWorker" in navigator && location.protocol === "https:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
  const box = document.getElementById("install");
  const btn = document.getElementById("install-btn");
  const text = document.getElementById("install-text");
  if (!box) return;
  const standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone;
  if (standalone) return;
  let deferred = null;
  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault(); deferred = e; box.hidden = false; btn.hidden = false;
  });
  btn.addEventListener("click", async () => {
    if (!deferred) return;
    deferred.prompt(); await deferred.userChoice; deferred = null; box.hidden = true;
  });
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    box.hidden = false;
    text.textContent = "On iPhone: tap the Share button, then “Add to Home Screen”. Helpline numbers will open even without internet.";
  }
})();
