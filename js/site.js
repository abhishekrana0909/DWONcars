// site.js
// ------------------------------------------------------------
// Website ka main JavaScript:
//   - header (upar ka menu) aur footer har page pe khud lag jaate hain
//   - carCard(): ek gaadi ka card banata hai
//   - har page ka apna kaam: home slider, cars list, car detail, booking
// Har HTML page ke <body data-page="..."> se pata chalta hai kaunsa page hai.
// ------------------------------------------------------------

// ---------- Chhote helper ----------
const $ = (selector) => document.querySelector(selector);
const money = (n) => "AED " + n.toLocaleString("en-US");
const param = (name) => new URLSearchParams(location.search).get(name);

// Demo mode mein call / WhatsApp / email ke links band rehte hain
const DEMO_LINK = "#demo-contact";

function whatsappLink(message) {
  if (CONFIG.demo || !CONFIG.whatsapp) return DEMO_LINK;
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}
function phoneLink() {
  return CONFIG.demo || !CONFIG.phoneLink ? DEMO_LINK : `tel:${CONFIG.phoneLink}`;
}
function emailLink() {
  return CONFIG.demo ? DEMO_LINK : `mailto:${CONFIG.email}`;
}

// Chhota sa message neeche dikhane ke liye
function toast(text) {
  let t = $("#toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = text;
  t.style.display = "block";
  clearTimeout(t.timer);
  t.timer = setTimeout(() => (t.style.display = "none"), 3500);
}

// Demo link dabane pe message dikhao
document.addEventListener("click", (e) => {
  const link = e.target.closest(`a[href="${DEMO_LINK}"]`);
  if (link) {
    e.preventDefault();
    toast("This is a demo website. Contact and booking are turned off.");
  }
});

function icon(name) {
  return `<span class="icon">${name}</span>`;
}

// ---------- Header ----------
const MENU = [
  ["Home", "index.html"],
  ["BRABUS", "cars.html?type=modified"],
  ["Sports", "cars.html?type=sports"],
  ["SUVs", "cars.html?type=suv"],
  ["Sedans", "cars.html?type=sedan"],
  ["Contact", "contact.html"],
];

function logoHTML() {
  return `
    <a class="logo" href="index.html">
      <img src="images/logo/dwon-emblem.svg" alt="DWON Cars logo">
      <div>
        <div class="logo-name brand-font">DWON <span>CARS</span></div>
        <div class="logo-sub">LUXURY · BRABUS · RENTAL</div>
      </div>
    </a>`;
}

function buildHeader() {
  const here = location.pathname.split("/").pop() + location.search;
  const links = MENU.map(([text, href]) => {
    const active = here === href || (href === "index.html" && (here === "" || here === "index.html"));
    return `<a href="${href}" class="${active ? "active" : ""}">${text}</a>`;
  }).join("");

  $("#header").innerHTML = `
    ${CONFIG.demo ? `<div class="demo-banner">⚠️ <b>DEMO WEBSITE</b>: sample project, not a real business. Bookings are not accepted.</div>` : ""}
    <div class="topbar">
      <div class="container">
        <div><span>📞 ${CONFIG.phoneDisplay}</span><span class="hide-sm">✉️ ${CONFIG.email}</span></div>
        <div class="hide-sm">🚚 Delivery anywhere in Dubai</div>
      </div>
    </div>
    <header class="header">
      <div class="container">
        ${logoHTML()}
        <nav class="nav" id="nav">${links}<a href="book.html" class="menu-only">Book Now</a></nav>
        <div style="display:flex;align-items:center;gap:10px">
          <a class="btn btn-red" href="book.html">${icon("arrow_forward")} Book Now</a>
          <button class="menu-btn" id="menuBtn" aria-label="Menu">${icon("menu")}</button>
        </div>
      </div>
    </header>`;

  // Mobile menu khol / band karo
  $("#menuBtn").onclick = () => $("#nav").classList.toggle("open");
  // "Book Now" menu mein sirf mobile pe dikhe
  if (window.innerWidth > 1000) $("#nav .menu-only").style.display = "none";
}

// ---------- Footer ----------
function buildFooter() {
  const segLinks = Object.entries(SEGMENTS)
    .map(([key, seg]) => `<a href="cars.html?type=${key}">${seg.title}</a>`).join("");

  $("#footer").innerHTML = `
    <footer class="footer">
      <div class="container footer-grid">
        <div>
          ${logoHTML()}
          <p class="muted" style="max-width:320px">A sample car rental website project featuring BRABUS
          and Mercedes-Benz cars. Not a real business: no cars are rented and no bookings are taken.</p>
          <p class="muted" style="margin:0">Sample project by <b style="color:#fff">${CONFIG.owner}</b></p>
        </div>
        <div><h4>Our Fleet</h4>${segLinks}</div>
        <div>
          <h4>Contact</h4>
          <a href="${phoneLink()}">📞 ${CONFIG.phoneDisplay}</a>
          <a href="${whatsappLink("Hi DWON Cars!")}" target="_blank">💬 WhatsApp us</a>
          <a href="${emailLink()}">✉️ ${CONFIG.email}</a>
          <p class="muted">🚚 ${CONFIG.delivery}</p>
        </div>
      </div>
      ${CONFIG.demo ? `<div class="container"><div class="demo-note">⚠️ Demo website only. Car names, specs and prices are for
        illustration. Not affiliated with BRABUS or Mercedes-Benz.</div></div>` : ""}
      <div class="container copyright">
        <span>© ${new Date().getFullYear()} ${CONFIG.name} (demo project)</span>
        <span>Car photos from <a href="https://unsplash.com" target="_blank" style="display:inline">Unsplash</a></span>
      </div>
    </footer>`;
}

// ---------- Car card ----------
function carCard(car) {
  const based = car.segment === "modified" ? `Based on ${car.base}` : car.base;
  return `
    <article class="car-card">
      <a class="car-photo" href="car.html?id=${car.id}">
        <img src="${carImage(car)}" alt="${car.name}" loading="lazy">
        ${car.tag ? `<span class="tag">${car.tag}</span>` : ""}
        ${car.segment === "modified" ? `<span class="tag brabus">BRABUS</span>` : ""}
      </a>
      <div class="car-body">
        <h3 class="heading car-name">${car.name}</h3>
        <div class="muted" style="font-size:14px">${based}</div>
        <div class="chips">
          <span class="chip">⚡ ${car.hp} HP</span>
          <span class="chip">⏱ 0-100 ${car.zero100}s</span>
          <span class="chip">🏁 ${car.top} km/h</span>
          <span class="chip">👤 ${car.seats} seats</span>
        </div>
        <div class="car-bottom">
          <div><div class="per-day">per day</div><div class="price">${money(car.price)}</div></div>
          <div class="card-buttons">
            <a class="btn btn-outline btn-sm" href="car.html?id=${car.id}">Details</a>
            <a class="btn btn-red btn-sm" href="book.html?car=${car.id}">Book</a>
          </div>
        </div>
      </div>
    </article>`;
}

function showCars(element, cars) {
  element.innerHTML = cars.map(carCard).join("");
}

// ============================ HOME PAGE ============================

// Hero slider ki slides: photo, chhota text, heading, laal hissa, description
const SLIDES = [
  ["brabus-900-rocket-edition", "BRABUS 900 ROCKET EDITION", "Drive Your", "Dream",
   "900 hp G-Class. Only 25 were ever built."],
  ["brabus-1000-gt", "BRABUS 1000 · 2.6s TO 100", "Feel", "1000 HP",
   "1000 hp and 0 to 100 km/h in just 2.6 seconds."],
  ["brabus-930", "BRABUS 930 · HYBRID LUXURY", "Arrive In", "Style",
   "S-Class comfort with 930 hp. Perfect for business, weddings and VIP guests."],
  ["brabus-xlp-900-6x6", "BRABUS OFF-ROAD", "Rule The", "Desert",
   "Lifted, black and ready for the dunes. Your desert safari, upgraded."],
];

function initHome() {
  // --- Slider banao ---
  const hero = $("#hero");
  hero.innerHTML = SLIDES.map(([id, eyebrow, title, red, desc], i) => `
    <div class="slide ${i === 0 ? "active" : ""}" style="background-image:url('images/cars/${id}.jpg')">
      <div class="container hero-content">
        <div class="hero-text">
          <div class="eyebrow">${eyebrow}</div>
          <h1 class="heading hero-title">${title}<br><span class="red">${red}</span></h1>
          <p class="hero-desc">${desc}</p>
          <div class="hero-buttons">
            <a class="btn btn-red btn-lg" href="book.html">${icon("event_available")} Book Now</a>
            <a class="btn btn-outline btn-lg" href="cars.html?type=modified">${icon("local_fire_department")} View BRABUS Fleet</a>
          </div>
        </div>
        <img class="hero-logo" src="images/logo/dwon-emblem.svg" alt="DWON Cars">
      </div>
    </div>`).join("") + `
    <button class="hero-arrow prev" aria-label="Previous">${icon("chevron_left")}</button>
    <button class="hero-arrow next" aria-label="Next">${icon("chevron_right")}</button>
    <div class="hero-dots">${SLIDES.map((_, i) => `<button class="${i === 0 ? "active" : ""}" aria-label="Slide ${i + 1}"></button>`).join("")}</div>`;

  const slides = hero.querySelectorAll(".slide");
  const dots = hero.querySelectorAll(".hero-dots button");
  let current = 0;

  // Saari slides ki photos pehle se load kar lo, taaki slide badalte waqt kaala na dikhe
  SLIDES.forEach(([id]) => { new Image().src = `images/cars/${id}.jpg`; });

  function goTo(n) {
    if (n === current) return;
    // Purani slide peeche dikhti rahe, jab tak nayi slide poori tarah aa na jaaye
    const old = slides[current];
    old.classList.remove("active");
    old.classList.add("leaving");
    dots[current].classList.remove("active");
    current = (n + slides.length) % slides.length;
    const next = slides[current];
    next.classList.remove("leaving");
    next.classList.add("active");
    dots[current].classList.add("active");

    const done = () => { if (!old.classList.contains("active")) old.classList.remove("leaving"); };
    next.addEventListener("animationend", done, { once: true });
    setTimeout(done, 2500); // backup, agar animation event na aaye
  }

  let timer = setInterval(() => goTo(current + 1), 5000);
  function restart() { clearInterval(timer); timer = setInterval(() => goTo(current + 1), 5000); }
  hero.querySelector(".prev").onclick = () => { goTo(current - 1); restart(); };
  hero.querySelector(".next").onclick = () => { goTo(current + 1); restart(); };
  dots.forEach((dot, i) => (dot.onclick = () => { goTo(i); restart(); }));

  // --- Gaadiyan dikhao ---
  $("#brabusCount").textContent = carsIn("modified").length;
  $("#carCount").textContent = CARS.length;
  const modified = carsIn("modified").sort((a, b) => b.hp - a.hp);
  showCars($("#brabusGrid"), modified.slice(0, 6));
  $("#brabusAll").textContent = `See all ${modified.length} BRABUS cars`;
  showCars($("#sportsGrid"), carsIn("sports").slice(0, 3));
  showCars($("#suvGrid"), carsIn("suv").slice(0, 3));
  showCars($("#sedanGrid"), carsIn("sedan").slice(0, 3));

  $("#ctaWhatsapp").href = whatsappLink("Hi DWON Cars! I want to rent a car.");
}

// ============================ CARS (SEGMENT) PAGE ============================

function initCarsPage() {
  const type = SEGMENTS[param("type")] ? param("type") : "modified";
  const seg = SEGMENTS[type];
  const cars = carsIn(type);

  document.title = `${seg.title} | ${CONFIG.name} (Demo)`;
  $("#segEyebrow").textContent = `${cars.length} CARS`;
  $("#segTitle").textContent = seg.title;
  $("#segSubtitle").textContent = seg.subtitle;
  $("#segButtons").innerHTML = Object.entries(SEGMENTS)
    .map(([key, s]) => `<a href="cars.html?type=${key}" class="${key === type ? "active" : ""}">${icon(s.icon)} ${s.title}</a>`).join("");

  function render() {
    const sort = $("#sort").value;
    const list = [...cars];
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    else if (sort === "high") list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => b.hp - a.hp);
    showCars($("#carGrid"), list);
  }
  $("#sort").onchange = render;
  render();
}

// ============================ CAR DETAIL PAGE ============================

function initCarPage() {
  const car = getCar(param("id"));
  if (!car) {
    $("#carDetail").innerHTML = `<h1 class="heading">Car not found</h1><p><a href="cars.html" class="red">See all cars</a></p>`;
    return;
  }
  const seg = SEGMENTS[car.segment];
  document.title = `${car.name} | ${CONFIG.name} (Demo)`;

  const specs = [
    ["Engine", car.engine], ["Power", `${car.hp} hp`], ["Torque", `${car.torque.toLocaleString()} Nm`],
    ["0 - 100 km/h", `${car.zero100} seconds`], ["Top speed", `${car.top} km/h`],
    ["Transmission", car.gearbox], ["Drive", car.drive], ["Seats", car.seats],
  ];

  $("#carDetail").innerHTML = `
    <a href="cars.html?type=${car.segment}" class="red" style="text-decoration:none">← Back to ${seg.title}</a>
    <div class="detail">
      <div class="detail-photo">
        <img src="${carImage(car)}" alt="${car.name}">
        ${car.tag ? `<span class="tag">${car.tag}</span>` : ""}
      </div>
      <div>
        <div class="eyebrow">${seg.title}</div>
        <h1 class="heading">${car.name}</h1>
        <div class="muted">${car.segment === "modified" ? "Based on " : ""}${car.base}</div>
        <p style="font-size:18px;color:#d6d6d6">${car.about}</p>
        <div class="prices">
          <div><div class="per-day">per day</div><div class="price" style="font-size:40px">${money(car.price)}</div></div>
          <div><div class="per-day">per week (10% off)</div><div class="price">${money(Math.round(car.price * 7 * 0.9))}</div></div>
        </div>
        <div class="hero-buttons">
          <a class="btn btn-red btn-lg" href="book.html?car=${car.id}">${icon("event_available")} Book This Car</a>
          <a class="btn btn-outline btn-lg" target="_blank"
             href="${whatsappLink(`Hi DWON Cars! Is the ${car.name} available?`)}">${icon("chat")} Ask on WhatsApp</a>
        </div>
      </div>
    </div>
    <div class="dark-card" style="margin-top:40px">
      <div class="eyebrow" style="margin-bottom:8px">Specifications</div>
      <div class="specs">${specs.map(([k, v]) => `<div class="spec"><span class="muted">${k}</span><b>${v}</b></div>`).join("")}</div>
      <p class="muted" style="font-size:12px;margin:14px 0 0">Photo by ${car.photoBy} on Unsplash (similar car shown).</p>
    </div>`;

  const others = carsIn(car.segment).filter((c) => c.id !== car.id).slice(0, 3);
  showCars($("#moreGrid"), others);
}

// ============================ BOOKING PAGE ============================

function initBookPage() {
  // Dropdowns bharo
  $("#bCar").innerHTML = `<option value="">Choose a car</option>` + CARS
    .map((c) => `<option value="${c.id}">${c.name} (${c.base}) - ${money(c.price)}/day</option>`).join("");
  $("#bPlace").innerHTML = CONFIG.locations.map((l) => `<option>${l}</option>`).join("");

  const chosen = param("car");
  if (getCar(chosen)) $("#bCar").value = chosen;
  $("#bFrom").value = new Date().toISOString().slice(0, 10);

  function days() {
    const d = (new Date($("#bTo").value) - new Date($("#bFrom").value)) / 86400000;
    return d >= 1 ? Math.round(d) : 1;
  }

  // Car ya date badalte hi summary aur total update karo
  function updateSummary() {
    const car = getCar($("#bCar").value);
    if (!car) {
      $("#sumImg").style.display = "none";
      $("#sumName").textContent = "Choose a car";
      $("#sumDays").textContent = "";
      $("#sumTotal").textContent = "";
      return;
    }
    $("#sumImg").style.display = "block";
    $("#sumImg").src = carImage(car);
    $("#sumName").textContent = car.name;
    $("#sumDays").textContent = `${days()} day(s) × ${money(car.price)}`;
    $("#sumTotal").textContent = money(days() * car.price);
  }
  ["#bCar", "#bFrom", "#bTo"].forEach((id) => ($(id).onchange = updateSummary));
  updateSummary();

  // Form bhejo -> WhatsApp khulega (demo mode mein kuch nahi bhejta)
  $("#bookForm").onsubmit = (e) => {
    e.preventDefault();
    const car = getCar($("#bCar").value);
    if (!car || !$("#bTo").value) return toast("Please choose a car and both dates.");
    if (CONFIG.demo) return toast("Demo website: bookings are not accepted. Nothing was sent.");
    const message =
      `Hi DWON Cars! New booking request:\n` +
      `Name: ${$("#bName").value}\nPhone: ${$("#bPhone").value}\n` +
      `Car: ${car.name} (${car.base})\n` +
      `From: ${$("#bFrom").value}  To: ${$("#bTo").value}  (${days()} days)\n` +
      `Deliver to: ${$("#bPlace").value}\n` +
      `Chauffeur: ${$("#bDriver").checked ? "Yes" : "No"}\n` +
      `Estimated total: ${money(days() * car.price)}\n` +
      `Notes: ${$("#bNotes").value || "-"}`;
    toast("Opening WhatsApp...");
    window.open(whatsappLink(message), "_blank");
  };
}

// ============================ CONTACT PAGE ============================

function initContact() {
  const items = [
    ["call", "Call us", CONFIG.phoneDisplay, phoneLink()],
    ["chat", "WhatsApp", "Chat with our team", whatsappLink("Hi DWON Cars!")],
    ["mail", "Email", CONFIG.email, emailLink()],
    ["local_shipping", "Delivery", CONFIG.delivery, whatsappLink("Hi DWON Cars! Can you deliver a car to me?")],
  ];
  $("#contactGrid").innerHTML = items.map(([ic, title, value, link]) => `
    <a class="car-card contact-card dark-card" href="${link}" target="${link.startsWith("http") ? "_blank" : "_self"}">
      ${icon(ic)}
      <h3 class="heading" style="font-size:24px;margin:10px 0 4px">${title}</h3>
      <div class="muted">${value}</div>
    </a>`).join("");
  $("#openHours").textContent = CONFIG.openHours;
}

// ============================ START ============================

buildHeader();
buildFooter();
const PAGES = { home: initHome, cars: initCarsPage, car: initCarPage, book: initBookPage, contact: initContact };
const page = document.body.dataset.page;
if (PAGES[page]) PAGES[page]();
