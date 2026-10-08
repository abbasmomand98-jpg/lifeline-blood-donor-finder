// LifeLine — demo donor data + interactions (front-end only, no backend)
const DONORS = [
  { name: "Ahmed Raza",     group: "O+",  city: "Karachi",   last: "Jan 2026", phone: "0300-1234567" },
  { name: "Fatima Noor",    group: "B+",  city: "Lahore",    last: "Dec 2025", phone: "0321-9876543" },
  { name: "Bilal Hussain",  group: "A+",  city: "Peshawar",  last: "Feb 2026", phone: "0333-4567890" },
  { name: "Ayesha Malik",   group: "O-",  city: "Karachi",   last: "Nov 2025", phone: "0345-2345678" },
  { name: "Usman Tariq",    group: "AB+", city: "Islamabad", last: "Jan 2026", phone: "0301-3456789" },
  { name: "Sana Sheikh",    group: "B-",  city: "Lahore",    last: "Oct 2025", phone: "0322-5678901" },
  { name: "Kamran Ali",     group: "O+",  city: "Peshawar",  last: "Mar 2026", phone: "0334-6789012" },
  { name: "Hira Shahid",    group: "A-",  city: "Multan",    last: "Dec 2025", phone: "0302-7890123" },
  { name: "Danish Iqbal",   group: "B+",  city: "Karachi",   last: "Feb 2026", phone: "0346-8901234" },
  { name: "Mahnoor Asif",   group: "AB-", city: "Quetta",    last: "Jan 2026", phone: "0323-9012345" },
  { name: "Fahad Mehmood",  group: "O+",  city: "Islamabad", last: "Nov 2025", phone: "0335-0123456" },
  { name: "Zainab Qureshi", group: "A+",  city: "Lahore",    last: "Mar 2026", phone: "0304-1230987" },
];

const grid = document.getElementById("donorGrid");
const meta = document.getElementById("resultMeta");

function maskPhone(p) {
  // show first 4 + masked, reveal on click
  return p.slice(0, 4) + "-xxxxxxx";
}

function renderDonors(list, group, city) {
  grid.innerHTML = "";
  if (!list.length) {
    meta.textContent = `No ${group} donors found in ${city} right now — try the emergency helpline below.`;
    return;
  }
  meta.textContent = `${list.length} ${group} donor${list.length > 1 ? "s" : ""} found in ${city}.`;
  list.forEach(d => {
    const card = document.createElement("div");
    card.className = "donor-card";
    card.innerHTML = `
      <div class="top">
        <div class="badge">${d.group}</div>
        <div><h3>${d.name}</h3><div class="city">${d.city}</div></div>
      </div>
      <div class="meta"><span>Last donation: ${d.last}</span><span class="avail">Available</span></div>
      <a class="phone" href="tel:${d.phone.replace(/-/g, "")}" data-full="${d.phone}">${maskPhone(d.phone)} — tap to reveal</a>`;
    const link = card.querySelector(".phone");
    link.addEventListener("click", e => {
      if (link.dataset.revealed !== "1") {
        e.preventDefault();
        link.textContent = link.dataset.full;
        link.dataset.revealed = "1";
      }
    });
    grid.appendChild(card);
  });
}

document.getElementById("searchForm").addEventListener("submit", e => {
  e.preventDefault();
  const group = document.getElementById("bloodGroup").value;
  const city = document.getElementById("city").value;
  if (!group || !city) return;
  const matches = DONORS.filter(d => d.group === group && d.city === city);
  renderDonors(matches, group, city);
  document.getElementById("search").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("donorForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("formOk").hidden = false;
  e.target.querySelector("button").disabled = true;
  e.target.querySelector("button").textContent = "Registered ✓";
});

// animated counters
const counters = document.querySelectorAll("[data-count]");
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target, target = +el.dataset.count;
    const t0 = performance.now(), dur = 1400;
    (function tick(t) {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3))).toLocaleString() + "+";
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
    io.unobserve(el);
  });
}, { threshold: .5 });
counters.forEach(c => io.observe(c));
