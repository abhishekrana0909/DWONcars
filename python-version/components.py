# components.py
# ------------------------------------------------------------
# Website ke "tukde" (components) jo har page pe baar-baar use hote hain:
#   - theme (dark rang + fonts)
#   - header (upar ka menu)
#   - footer (neeche ka hissa)
#   - car_card (ek gaadi ka card)
#   - hero_slider (upar ghoomne wala 3D slider)
#   - spinning_car_3d (360 degree ghoomti hui 3D gaadi)
# ------------------------------------------------------------

import math
import urllib.parse

from nicegui import ui

import config
from cars_data import SEGMENTS


# ---------------------------- THEME ----------------------------

# Poori website ka style. Dark background, laal accent.
CSS = f"""
:root {{ --red: {config.RED}; --black: {config.BLACK}; }}
body {{ background: var(--black); color: #f2f2f2; font-family: 'Inter', sans-serif; }}
.nicegui-content {{ padding: 0; gap: 0; }}
.heading {{ font-family: 'Rajdhani', sans-serif; font-weight: 700; letter-spacing: .5px; line-height: 1.05; }}
.red {{ color: var(--red); }}
.muted {{ color: #9a9a9a; }}
.section {{ width: 100%; max-width: 1240px; margin: 0 auto; padding: 72px 20px; }}
.eyebrow {{ color: var(--red); font-weight: 700; letter-spacing: 3px; font-size: 13px; }}

/* Top menu */
.topbar {{ background: #000; border-bottom: 1px solid #1c1c1c; font-size: 13px; color: #bbb; }}
.navbar {{ background: rgba(10,10,10,.97); border-bottom: 1px solid #1f1f1f; }}
.nav-link {{ color: #e8e8e8 !important; text-decoration: none; font-weight: 600; padding: 6px 2px;
            border-bottom: 2px solid transparent; transition: .2s; }}
.nav-link:hover {{ color: var(--red) !important; border-bottom-color: var(--red); }}

/* Hero slider: har nayi slide 3D mein ghoom ke aati hai (video jaisa effect) */
.hero-slide {{ background-size: cover; background-position: center;
              animation: flipIn 1.1s cubic-bezier(.2,.8,.2,1); transform-origin: 50% 50%; }}
@keyframes flipIn {{
  0%   {{ transform: perspective(1400px) rotateY(-75deg) scale(.85); opacity: 0; }}
  60%  {{ opacity: 1; }}
  100% {{ transform: perspective(1400px) rotateY(0) scale(1); opacity: 1; }}
}}
.q-carousel__navigation {{ bottom: 70px !important; }}
@media (max-width: 640px) {{ .q-carousel__arrow {{ display: none; }} }}
.hero-title {{ font-size: clamp(42px, 7vw, 92px); }}
.q-carousel {{ background: #000 !important; }}

/* Cards */
.dark-card {{ background: #121212 !important; border: 1px solid #242424; border-radius: 16px !important; }}
.car-card {{ background: #121212 !important; border: 1px solid #242424; border-radius: 18px !important;
            overflow: hidden; transition: transform .25s, border-color .25s, box-shadow .25s; }}
.car-card:hover {{ transform: translateY(-6px); border-color: var(--red);
                  box-shadow: 0 18px 40px -18px rgba(225,6,0,.55); }}
.car-card img {{ transition: transform .5s; }}
.car-card:hover img {{ transform: scale(1.06); }}
.chip {{ background: #1c1c1c; border: 1px solid #2a2a2a; border-radius: 999px; padding: 3px 10px;
        font-size: 12px; color: #ddd; white-space: nowrap; }}
.tag {{ background: var(--red); color: #fff; font-size: 11px; font-weight: 700; border-radius: 6px;
       padding: 3px 8px; letter-spacing: .5px; }}
.price {{ font-family: 'Rajdhani', sans-serif; font-size: 26px; font-weight: 700; color: #fff; }}
.stat-card {{ background: linear-gradient(160deg, rgba(225,6,0,.22), rgba(20,20,20,.9));
             border: 1px solid rgba(225,6,0,.35); border-radius: 18px; }}
.brabus-band {{ background: radial-gradient(ellipse at top, rgba(225,6,0,.18), transparent 60%), #0d0d0d; }}
.spec-row {{ border-bottom: 1px solid #222; padding: 12px 0; }}
.footer {{ background: #050505; border-top: 3px solid var(--red); }}
.footer a {{ color: #bbb; text-decoration: none; }}
.footer a:hover {{ color: var(--red); }}
.showroom {{ background: radial-gradient(circle at 50% 60%, #2a0000 0%, #0a0a0a 65%); border-radius: 22px;
            border: 1px solid #262626; }}
"""


def apply_theme():
    """Har page ke shuru mein call karo: dark mode, rang aur fonts laga deta hai."""
    ui.dark_mode(True)
    ui.colors(primary=config.RED, secondary="#1a1a1a", accent=config.RED, dark=config.BLACK)
    ui.add_head_html(
        '<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700'
        '&family=Saira+Stencil+One&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">'
    )
    ui.add_css(CSS)
    ui.query("body").style(f"background:{config.BLACK}")


def whatsapp_link(message):
    """WhatsApp ka link banata hai jisme message pehle se likha ho."""
    return f"https://wa.me/{config.WHATSAPP_NUMBER}?text={urllib.parse.quote(message)}"


# ---------------------------- HEADER ----------------------------

MENU = [
    ("Home", "/"),
    ("BRABUS", "/cars/modified"),
    ("Sports", "/cars/sports"),
    ("SUVs", "/cars/suv"),
    ("Sedans", "/cars/sedan"),
    ("Contact", "/contact"),
]


def header():
    """Upar ka menu: logo, links, aur 'Book Now' button."""
    # Sabse upar patli si line (phone, timing)
    with ui.row().classes("topbar w-full justify-center py-2 px-4"):
        with ui.row().classes("w-full max-w-[1240px] justify-between items-center"):
            with ui.row().classes("gap-5 items-center"):
                ui.label(f"📞 {config.PHONE_DISPLAY}")
                ui.label("🕒 24/7 Available").classes("max-sm:hidden")
                ui.label("💰 Best Price Guarantee").classes("max-md:hidden")
            ui.label("📍 Free delivery across Dubai").classes("max-sm:hidden")

    # Main menu bar (scroll karne pe bhi upar chipka rehta hai)
    with ui.row().classes("navbar w-full justify-center px-4 py-3 sticky top-0 z-50"):
        with ui.row().classes("w-full max-w-[1240px] justify-between items-center no-wrap"):
            logo()

            # Badi screen pe links dikhenge
            with ui.row().classes("gap-7 items-center max-lg:hidden"):
                for text, target in MENU:
                    ui.link(text, target).classes("nav-link")

            with ui.row().classes("items-center gap-2 no-wrap"):
                ui.button("Book Now", icon="arrow_forward",
                          on_click=lambda: ui.navigate.to("/book")).props("unelevated no-caps").classes("max-sm:hidden")
                # Chhoti screen (mobile) pe menu button
                with ui.button(icon="menu").props("flat round color=white").classes("lg:hidden"):
                    with ui.menu().props("dark"):
                        for text, target in MENU + [("Book Now", "/book")]:
                            ui.menu_item(text, on_click=lambda t=target: ui.navigate.to(t))


def logo():
    """DWON Cars ka logo: seengon wali shield (static/logo/dwon-emblem.svg) + naam."""
    with ui.link(target="/").classes("no-underline"):
        with ui.row().classes("items-center gap-3 no-wrap"):
            ui.image("/static/logo/dwon-emblem.svg").classes("w-12 h-12").props("no-spinner loading=eager")
            with ui.column().classes("gap-0"):
                # "DWON CARS" ka font: Saira Stencil One (aggressive stencil style)
                ui.html('<span style="font-family:\'Saira Stencil One\',sans-serif;font-size:27px;'
                        'line-height:1;color:#fff;letter-spacing:1.5px">DWON'
                        '<span style="color:var(--red)"> CARS</span></span>', sanitize=False)
                ui.label("LUXURY · BRABUS · RENTAL").classes("muted max-sm:hidden") \
                    .style("font-size:10px;letter-spacing:2px")


# ---------------------------- FOOTER ----------------------------

def footer():
    """Neeche ka hissa: contact details aur links."""
    with ui.element("footer").classes("footer w-full"):
        with ui.row().classes("section gap-12 justify-between").style("padding-top:56px;padding-bottom:30px"):
            with ui.column().classes("gap-3 max-w-xs"):
                logo()
                ui.label("Dubai's home of BRABUS and Mercedes-Benz rentals. "
                         "Clean cars, honest prices, delivered to your door.").classes("muted")
            with ui.column().classes("gap-2"):
                ui.label("Our Fleet").classes("heading text-xl")
                for key, seg in SEGMENTS.items():
                    ui.link(seg["title"], f"/cars/{key}")
            with ui.column().classes("gap-2"):
                ui.label("Contact").classes("heading text-xl")
                ui.link(f"📞 {config.PHONE_DISPLAY}", f"tel:{config.PHONE_LINK}")
                ui.link("💬 WhatsApp us", whatsapp_link("Hi DWON Cars!"), new_tab=True)
                ui.link(f"✉️ {config.EMAIL}", f"mailto:{config.EMAIL}")
                ui.label(f"📍 {config.ADDRESS}").classes("muted max-w-[260px]")
        with ui.row().classes("w-full justify-center pb-6 px-4"):
            with ui.row().classes("w-full max-w-[1240px] justify-between muted text-sm"):
                ui.label(f"© 2026 {config.BUSINESS_NAME}. All rights reserved.")
                ui.link("Photo credits", "/credits").classes("muted")


# ---------------------------- CAR CARD ----------------------------

def car_card(car):
    """Ek gaadi ka card: photo, naam, specs aur price."""
    with ui.card().tight().classes("car-card w-full"):
        # Photo (upar left mein segment ka tag)
        with ui.element("div").classes("relative w-full overflow-hidden"):
            ui.image(f"/static/cars/{car['image']}").classes("w-full h-56").props("fit=cover")
            if car["tag"]:
                ui.label(car["tag"]).classes("tag absolute top-3 left-3")
            if car["segment"] == "modified":
                ui.label("BRABUS").classes("tag absolute top-3 right-3").style("background:#000;border:1px solid #e10600")

        with ui.column().classes("p-5 gap-2 w-full"):
            ui.label(car["name"]).classes("heading text-2xl")
            ui.label(f"Based on {car['base']}" if car["segment"] == "modified" else car["base"]).classes("muted text-sm")

            # Chhoti specs
            with ui.row().classes("gap-2 mt-1"):
                ui.label(f"⚡ {car['power_hp']} HP").classes("chip")
                ui.label(f"⏱ 0-100 {car['zero_100']}s").classes("chip")
                ui.label(f"🏁 {car['top_speed']} km/h").classes("chip")
                ui.label(f"👤 {car['seats']} seats").classes("chip")

            ui.separator().classes("my-2").style("background:#262626")

            with ui.row().classes("w-full items-center justify-between"):
                with ui.column().classes("gap-0"):
                    ui.label("per day").classes("muted text-xs")
                    ui.label(f"AED {car['price_aed']:,}").classes("price")
                with ui.row().classes("gap-2"):
                    ui.button("Details", on_click=lambda: ui.navigate.to(f"/car/{car['id']}")) \
                        .props("outline no-caps color=white")
                    ui.button("Book", on_click=lambda: ui.navigate.to(f"/book?car={car['id']}")) \
                        .props("unelevated no-caps")


def car_grid(cars):
    """Bahut saari gaadiyon ko grid (jaali) mein dikhata hai."""
    with ui.element("div").classes("grid w-full gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"):
        for car in cars:
            car_card(car)


def section_title(eyebrow, title, red_part="", subtitle=""):
    """Har section ka heading (chhota laal text + bada heading)."""
    with ui.column().classes("w-full items-center text-center gap-3 mb-10"):
        ui.label(f"«  {eyebrow}  »").classes("eyebrow")
        ui.html(f'<h2 class="heading" style="font-size:clamp(32px,4.5vw,52px);margin:0">'
                f'<span class="red">{red_part}</span> {title}</h2>', sanitize=False)
        if subtitle:
            ui.label(subtitle).classes("muted max-w-2xl")


# ---------------------------- HERO SLIDER ----------------------------

# Slider ki slides: (photo, chhota text, bada heading, laal hissa, description)
SLIDES = [
    ("b900g.jpg", "BRABUS 900 ROCKET EDITION", "Drive Your", "Dream",
     "900 hp G-Class. Only 25 in the world, one of them can be yours this weekend."),
    ("b1000gt.jpg", "BRABUS 1000 · 2.6s TO 100", "Feel", "1000 HP",
     "The most powerful car in Dubai's rental market. Book it by the day."),
    ("b930.jpg", "BRABUS 930 · HYBRID LUXURY", "Arrive In", "Style",
     "S-Class comfort with 930 hp. Perfect for business, weddings and VIP guests."),
    ("bxlp900.jpg", "BRABUS XLP 900 6x6", "Rule The", "Desert",
     "Six wheels, 900 hp and portal axles. Your desert safari, upgraded."),
]


def hero_slider():
    """Upar ka bada slider. Har 5 second mein slide 3D mein ghoom ke badalti hai."""
    # animated=False: purani slide turant hat-ti hai, nayi slide CSS wale 3D flip se aati hai
    with ui.carousel(animated=False, arrows=True, navigation=True).props(
        "autoplay=5000 infinite swipeable control-color=white"
    ).classes("w-full").style("height: calc(100vh - 110px); min-height: 560px"):
        for i, (img, eyebrow, title, red, desc) in enumerate(SLIDES):
            with ui.carousel_slide(name=f"s{i}").classes("hero-slide p-0").style(
                "background-image: linear-gradient(90deg, rgba(0,0,0,.92) 0%, rgba(0,0,0,.55) 45%, "
                f"rgba(0,0,0,.15) 100%), url('/static/cars/{img}')"
            ):
                with ui.column().classes("h-full w-full max-w-[1240px] mx-auto justify-center px-6 md:px-10 gap-5"):
                    ui.label(eyebrow).classes("eyebrow")
                    ui.html(f'<h1 class="heading hero-title" style="margin:0">{title}<br>'
                            f'<span class="red">{red}</span></h1>', sanitize=False)
                    ui.label(desc).classes("text-lg max-w-xl").style("color:#d6d6d6")
                    with ui.row().classes("gap-3 mt-2"):
                        ui.button("Book Now", icon="event_available",
                                  on_click=lambda: ui.navigate.to("/book")).props("unelevated size=lg no-caps")
                        ui.button("View BRABUS Fleet", icon="local_fire_department",
                                  on_click=lambda: ui.navigate.to("/cars/modified")) \
                            .props("outline size=lg no-caps color=white")


# ---------------------------- 3D GHOOMTI GAADI ----------------------------

def spinning_car_3d():
    """
    3D showroom: ek gaadi jo apne aap 360 degree ghoomti rehti hai.
    Mouse / ungli se pakad ke khud bhi ghuma sakte ho, aur zoom bhi kar sakte ho.
    Gaadi Python se chhote-chhote dabbon (box) aur pahiyon (cylinder) se bani hai.
    """
    red, black, glass, silver = config.RED, "#111111", "#1d2a38", "#c9c9c9"

    # fov chhota rakha hai taaki camera "zoom" karke gaadi badi dikhe
    camera = ui.scene.perspective_camera(fov=32)
    with ui.scene(background_color="#0a0a0a", grid=False, camera=camera).classes("w-full h-[420px]") as scene:
        # Neeche ka gol ghoomta platform (turntable)
        scene.cylinder(3.4, 3.4, 0.12, 64).material("#1a1a1a").rotate(math.pi / 2, 0, 0).move(0, 0, 0.0)
        scene.cylinder(3.5, 3.5, 0.06, 64).material(red, 0.6).rotate(math.pi / 2, 0, 0).move(0, 0, -0.04)

        with scene.group() as car:
            # Neeche ki body (lambi aur patli, sports car jaisi)
            scene.box(4.6, 1.95, 0.42).material(red).move(0, 0, 0.62)
            scene.box(1.5, 1.9, 0.12).material(red).rotate(0, 0.12, 0).move(1.55, 0, 0.86)   # bonnet
            scene.box(1.1, 1.9, 0.14).material(red).move(-1.75, 0, 0.9)                     # dikki (boot)
            # Cabin: aage aur peeche ka tircha sheesha, beech mein chhat
            scene.box(1.1, 1.6, 0.06).material(glass).rotate(0, 0.5, 0).move(0.62, 0, 1.08)   # windshield
            scene.box(1.2, 1.6, 0.06).material(glass).rotate(0, -0.42, 0).move(-0.95, 0, 1.06)  # peeche ka sheesha
            scene.box(1.0, 1.55, 0.06).material(black).move(-0.12, 0, 1.3)                  # chhat (roof)
            scene.box(1.9, 1.64, 0.36).material(glass, 0.95).move(-0.15, 0, 1.08)            # side windows
            # Aage ki grill aur headlights
            scene.box(0.06, 1.1, 0.22).material(black).move(2.31, 0, 0.55)
            scene.box(0.08, 0.5, 0.07).material("#ffffff").move(2.3, 0.6, 0.76)
            scene.box(0.08, 0.5, 0.07).material("#ffffff").move(2.3, -0.6, 0.76)
            # Peeche ki laal lights (poori chaudai mein ek patti)
            scene.box(0.06, 1.7, 0.07).material("#ff2a2a").move(-2.31, 0, 0.84)
            # Spoiler
            scene.box(0.35, 1.9, 0.05).material(black).move(-2.05, 0, 1.2)
            scene.box(0.1, 0.08, 0.25).material(black).move(-2.05, 0.6, 1.05)
            scene.box(0.1, 0.08, 0.25).material(black).move(-2.05, -0.6, 1.05)
            # Chaar pahiye (kaala tyre + chandi jaisa rim)
            for x in (1.45, -1.4):
                for y in (0.99, -0.99):
                    scene.cylinder(0.43, 0.43, 0.3, 32).material(black).move(x, y, 0.43)
                    scene.cylinder(0.27, 0.27, 0.32, 24).material(silver).move(x, y, 0.43)

        scene.move_camera(x=6.5, y=-6.0, z=3.0, look_at_z=0.6, duration=0)

    # Gaadi ko har thodi der mein thoda-thoda ghumao
    angle = {"value": 0.0}

    def spin():
        angle["value"] += 0.02
        car.rotate(0, 0, angle["value"])

    ui.timer(0.04, spin)
    return scene
