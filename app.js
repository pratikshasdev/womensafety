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
