# main.py
# ------------------------------------------------------------
# DWON Cars website ka main file. Isse chalao:
#     python main.py
# Phir browser mein kholo:  http://localhost:8080
#
# Har page ek function hai jiske upar @ui.page("/rasta") likha hai.
# ------------------------------------------------------------

import json
from datetime import date
from pathlib import Path

from nicegui import app, ui

import config
from cars_data import CARS, SEGMENTS, cars_in_segment, get_car
from components import (apply_theme, car_grid, footer, header, hero_slider,
                        section_title, spinning_car_3d, whatsapp_link)

# "static" folder (photos) ko website pe /static naam se available karo
app.add_static_files("/static", Path(__file__).parent / "static")


# ============================ HOME PAGE ============================

@ui.page("/")
def home_page():
    apply_theme()
    header()
    hero_slider()

    # --- Teen stats cards ---
    with ui.element("div").classes("section").style("padding-top:0;margin-top:-70px;position:relative;z-index:5"):
        with ui.element("div").classes("grid w-full gap-6 grid-cols-1 md:grid-cols-3"):
            stats = [
                ("local_fire_department", f"{len(cars_in_segment('modified'))}+", "BRABUS Supercars",
                 "750 to 1000 hp, ready to drive"),
                ("groups", "5K+", "Happy Drivers", "Tourists, residents and VIPs"),
                ("support_agent", "24/7", "Concierge Support", "Delivery and help any time"),
            ]
            for icon, number, title, sub in stats:
                with ui.column().classes("stat-card items-center text-center p-8 gap-1"):
                    ui.icon(icon, size="34px").classes("red")
                    ui.label(number).classes("heading red").style("font-size:48px")
                    ui.label(title).classes("text-lg font-semibold")
                    ui.label(sub).classes("muted text-sm")

    # --- BRABUS section (sabse zyada focus) ---
    with ui.element("div").classes("brabus-band w-full"):
        with ui.element("div").classes("section"):
            section_title("THE BRABUS COLLECTION", "Modified Mercedes", red_part="BRABUS",
                          subtitle="Every car here was hand-tuned by BRABUS in Bottrop, Germany. "
                                   "More power, carbon body kits, forged wheels and bespoke interiors.")
            modified = sorted(cars_in_segment("modified"), key=lambda c: c["power_hp"], reverse=True)
            car_grid(modified[:6])
            with ui.row().classes("w-full justify-center mt-10"):
                ui.button(f"See all {len(modified)} BRABUS cars", icon="arrow_forward",
                          on_click=lambda: ui.navigate.to("/cars/modified")).props("unelevated size=lg no-caps")

    # --- 3D showroom (ghoomti gaadi) ---
    with ui.element("div").classes("section"):
        section_title("360° VIRTUAL SHOWROOM", "Take A Spin", red_part="360°",
                      subtitle="Drag the car with your mouse or finger to look around it. Scroll to zoom.")
        with ui.element("div").classes("showroom w-full overflow-hidden p-2"):
            spinning_car_3d()

    # --- Baaki segments (Sports, SUV, Sedan) ---
    for key in ("sports", "suv", "sedan"):
        seg = SEGMENTS[key]
        with ui.element("div").classes("section").style("padding-top:40px"):
            with ui.row().classes("w-full items-end justify-between mb-8"):
                with ui.column().classes("gap-1"):
                    ui.label(seg["title"].upper()).classes("eyebrow")
                    ui.label(seg["subtitle"]).classes("heading").style("font-size:clamp(24px,3vw,34px)")
                ui.button("View all", icon="arrow_forward",
                          on_click=lambda k=key: ui.navigate.to(f"/cars/{k}")).props("flat no-caps")
            car_grid(cars_in_segment(key)[:3])

    # --- Kaise book karein (3 steps) ---
    with ui.element("div").classes("section"):
        section_title("SIMPLE PROCESS", "In 3 Steps", red_part="Rent A Car")
        with ui.element("div").classes("grid w-full gap-6 grid-cols-1 md:grid-cols-3"):
            steps = [
                ("01", "search", "Choose your car", "Pick a BRABUS, sports car, SUV or sedan from our fleet."),
                ("02", "badge", "Share documents", "Send your driving licence and passport or Emirates ID on WhatsApp."),
                ("03", "key", "We deliver", "The car arrives at your hotel, home or the airport. Enjoy!"),
            ]
            for num, icon, title, text in steps:
                with ui.column().classes("dark-card p-8 gap-3"):
                    with ui.row().classes("w-full justify-between items-center"):
                        ui.icon(icon, size="36px").classes("red")
                        ui.label(num).classes("heading").style("font-size:44px;color:#2a2a2a")
                    ui.label(title).classes("heading text-2xl")
                    ui.label(text).classes("muted")

    # --- Rental requirements ---
    with ui.element("div").classes("section").style("padding-top:0"):
        with ui.row().classes("dark-card w-full p-8 gap-10 justify-between items-center"):
            with ui.column().classes("gap-2"):
                ui.label("WHAT YOU NEED").classes("eyebrow")
                ui.label("Rental requirements in Dubai").classes("heading text-3xl")
            with ui.column().classes("gap-2"):
                for line in ["✅ Age 25+ (30+ for BRABUS cars)",
                             "✅ Valid UAE or International Driving Licence",
                             "✅ Passport with visa, or Emirates ID",
                             "✅ Refundable security deposit (depends on car)"]:
                    ui.label(line)

    # --- CTA (booking ka bada button) ---
    with ui.element("div").classes("w-full").style(f"background:{config.RED}"):
        with ui.row().classes("section w-full justify-between items-center gap-6").style("padding:48px 20px"):
            with ui.column().classes("gap-1"):
                ui.label("Ready to drive a BRABUS?").classes("heading text-4xl text-white")
                ui.label("Get a price on WhatsApp in under 2 minutes.").classes("text-white")
            with ui.row().classes("gap-3"):
                ui.button("WhatsApp Us", icon="chat",
                          on_click=lambda: ui.navigate.to(whatsapp_link("Hi DWON Cars! I want to rent a car."),
                                                          new_tab=True)) \
                    .props("unelevated color=black no-caps size=lg")
                ui.button("Book Online", icon="event",
                          on_click=lambda: ui.navigate.to("/book")).props("outline color=white no-caps size=lg")

    footer()


# ============================ SEGMENT PAGE ============================
# Jaise /cars/modified, /cars/suv ...

@ui.page("/cars/{segment}")
def segment_page(segment: str):
    apply_theme()
    header()

    if segment not in SEGMENTS:
        with ui.element("div").classes("section"):
            ui.label("Category not found").classes("heading text-4xl")
        footer()
        return

    seg = SEGMENTS[segment]
    cars = cars_in_segment(segment)

    with ui.element("div").classes("brabus-band w-full"):
        with ui.element("div").classes("section").style("padding-bottom:30px"):
            section_title(f"{len(cars)} CARS AVAILABLE", "", red_part=seg["title"], subtitle=seg["subtitle"])

            # Segment badalne ke buttons
            with ui.row().classes("w-full justify-center gap-2 mb-6"):
                for key, s in SEGMENTS.items():
                    ui.button(s["title"], icon=s["icon"], on_click=lambda k=key: ui.navigate.to(f"/cars/{k}")) \
                        .props(f"{'unelevated' if key == segment else 'outline color=white'} no-caps rounded")

            # Sort karne ka option
            grid_box = ui.element("div").classes("w-full")

            def show(sort_by):
                if sort_by == "Price: low to high":
                    ordered = sorted(cars, key=lambda c: c["price_aed"])
                elif sort_by == "Price: high to low":
                    ordered = sorted(cars, key=lambda c: c["price_aed"], reverse=True)
                else:
                    ordered = sorted(cars, key=lambda c: c["power_hp"], reverse=True)
                grid_box.clear()
                with grid_box:
                    car_grid(ordered)

            with ui.row().classes("w-full justify-end mb-4"):
                ui.select(["Most powerful", "Price: low to high", "Price: high to low"],
                          value="Most powerful", label="Sort by",
                          on_change=lambda e: show(e.value)).props("dark outlined dense").classes("w-56")
            grid_box.move()  # grid ko sort wale dabbe ke neeche le aao
            show("Most powerful")

    footer()


# ============================ CAR DETAIL PAGE ============================

@ui.page("/car/{car_id}")
def car_page(car_id: str):
    apply_theme()
    header()

    car = get_car(car_id)
    if car is None:
        with ui.element("div").classes("section"):
            ui.label("Car not found").classes("heading text-4xl")
        footer()
        return

    with ui.element("div").classes("section"):
        ui.link("← Back to " + SEGMENTS[car["segment"]]["title"], f"/cars/{car['segment']}").classes("red no-underline")

        with ui.element("div").classes("grid w-full gap-10 grid-cols-1 lg:grid-cols-2 mt-6"):
            # Left: photo
            with ui.element("div").classes("relative"):
                ui.image(f"/static/cars/{car['image']}").classes("w-full rounded-2xl").props("fit=cover") \
                    .style("aspect-ratio:4/3")
                if car["tag"]:
                    ui.label(car["tag"]).classes("tag absolute top-4 left-4")

            # Right: naam, price, specs
            with ui.column().classes("gap-3"):
                ui.label(SEGMENTS[car["segment"]]["title"].upper()).classes("eyebrow")
                ui.label(car["name"]).classes("heading").style("font-size:clamp(34px,4vw,50px)")
                ui.label(f"Based on {car['base']}" if car["segment"] == "modified" else car["base"]).classes("muted")
                ui.label(car["about"]).classes("text-lg").style("color:#d6d6d6")

                with ui.row().classes("items-end gap-6 mt-2"):
                    with ui.column().classes("gap-0"):
                        ui.label("per day").classes("muted text-xs")
                        ui.label(f"AED {car['price_aed']:,}").classes("price").style("font-size:40px")
                    with ui.column().classes("gap-0"):
                        ui.label("per week (10% off)").classes("muted text-xs")
                        ui.label(f"AED {round(car['price_aed'] * 7 * 0.9):,}").classes("price")

                with ui.row().classes("gap-3 mt-2"):
                    ui.button("Book This Car", icon="event_available",
                              on_click=lambda: ui.navigate.to(f"/book?car={car['id']}")) \
                        .props("unelevated size=lg no-caps")
                    ui.button("Ask on WhatsApp", icon="chat",
                              on_click=lambda: ui.navigate.to(
                                  whatsapp_link(f"Hi DWON Cars! Is the {car['name']} available?"), new_tab=True)) \
                        .props("outline color=white size=lg no-caps")

        # Specifications table
        with ui.column().classes("dark-card w-full p-8 mt-10 gap-0"):
            ui.label("SPECIFICATIONS").classes("eyebrow mb-3")
            specs = [
                ("Engine", car["engine"]),
                ("Power", f"{car['power_hp']} hp"),
                ("Torque", f"{car['torque_nm']:,} Nm"),
                ("0 - 100 km/h", f"{car['zero_100']} seconds"),
                ("Top speed", f"{car['top_speed']} km/h"),
                ("Transmission", car["transmission"]),
                ("Drive", car["drive"]),
                ("Seats", str(car["seats"])),
            ]
            with ui.element("div").classes("grid w-full grid-cols-1 md:grid-cols-2 gap-x-12"):
                for label, value in specs:
                    with ui.row().classes("spec-row w-full justify-between"):
                        ui.label(label).classes("muted")
                        ui.label(value).classes("font-semibold text-right")

        # Isi segment ki aur gaadiyan
        others = [c for c in cars_in_segment(car["segment"]) if c["id"] != car["id"]][:3]
        if others:
            ui.label("You may also like").classes("heading text-3xl mt-14 mb-6")
            car_grid(others)

    footer()


# ============================ BOOKING PAGE ============================

@ui.page("/book")
def booking_page(car: str = ""):
    apply_theme()
    header()

    # Dropdown ke liye: {id: "Naam - AED/day"}
    car_options = {c["id"]: f"{c['name']} ({c['base']}) - AED {c['price_aed']:,}/day" for c in CARS}
    today = date.today().isoformat()

    with ui.element("div").classes("section"):
        section_title("RESERVE YOUR RIDE", "Your Car", red_part="Book",
                      subtitle="Fill in the form. We'll confirm availability on WhatsApp within minutes.")

        with ui.element("div").classes("grid w-full gap-8 grid-cols-1 lg:grid-cols-3"):
            # ---- Form ----
            with ui.column().classes("dark-card p-8 gap-4 lg:col-span-2"):
                name = ui.input("Full name").props("dark outlined").classes("w-full")
                phone = ui.input("Phone / WhatsApp number", placeholder="+971 ...").props("dark outlined").classes("w-full")
                chosen = ui.select(car_options, label="Choose car", value=car if car in car_options else None,
                                   with_input=True).props("dark outlined").classes("w-full")
                with ui.row().classes("w-full gap-4 no-wrap max-sm:flex-wrap"):
                    start = ui.input("Pick-up date", value=today).props("dark outlined type=date stack-label").classes("flex-1")
                    end = ui.input("Return date").props("dark outlined type=date stack-label").classes("flex-1")
                place = ui.select(config.LOCATIONS, label="Pick-up location", value=config.LOCATIONS[0]) \
                    .props("dark outlined").classes("w-full")
                chauffeur = ui.checkbox("I want a chauffeur (driver) too")
                notes = ui.textarea("Anything else? (optional)").props("dark outlined").classes("w-full")
                submit = ui.button("Send Booking on WhatsApp", icon="chat").props("unelevated size=lg no-caps") \
                    .classes("w-full")

            # ---- Summary (price hisaab) ----
            with ui.column().classes("dark-card p-8 gap-3"):
                ui.label("BOOKING SUMMARY").classes("eyebrow")
                summary_img = ui.image().classes("w-full rounded-xl").props("fit=cover").style("aspect-ratio:16/10")
                summary_name = ui.label("Choose a car").classes("heading text-2xl")
                summary_days = ui.label("").classes("muted")
                summary_total = ui.label("").classes("price").style("font-size:36px")
                ui.label("Security deposit is refundable. Fuel and Salik (tolls) are charged separately.") \
                    .classes("muted text-xs")

    def number_of_days():
        """Pick-up aur return date ke beech kitne din hain."""
        try:
            d = (date.fromisoformat(end.value) - date.fromisoformat(start.value)).days
            return max(d, 1)
        except (TypeError, ValueError):
            return 1

    def update_summary():
        """Car ya date badalte hi summary aur total price update karo."""
        selected = get_car(chosen.value) if chosen.value else None
        if selected is None:
            summary_name.text = "Choose a car"
            summary_img.set_source("")
            summary_days.text = ""
            summary_total.text = ""
            return
        days = number_of_days()
        summary_img.set_source(f"/static/cars/{selected['image']}")
        summary_name.text = selected["name"]
        summary_days.text = f"{days} day(s) × AED {selected['price_aed']:,}"
        summary_total.text = f"AED {days * selected['price_aed']:,}"

    for field in (chosen, start, end):
        field.on_value_change(update_summary)
    update_summary()

    def send_booking():
        """Form check karo, phir WhatsApp pe booking message bhejo."""
        if not name.value or not phone.value or not chosen.value or not end.value:
            ui.notify("Please fill name, phone, car and both dates.", type="warning")
            return
        selected = get_car(chosen.value)
        days = number_of_days()
        message = (
            f"Hi DWON Cars! New booking request:\n"
            f"Name: {name.value}\nPhone: {phone.value}\n"
            f"Car: {selected['name']} ({selected['base']})\n"
            f"From: {start.value}  To: {end.value}  ({days} days)\n"
            f"Pick-up: {place.value}\n"
            f"Chauffeur: {'Yes' if chauffeur.value else 'No'}\n"
            f"Estimated total: AED {days * selected['price_aed']:,}\n"
            f"Notes: {notes.value or '-'}"
        )
        ui.notify("Opening WhatsApp...", type="positive")
        ui.navigate.to(whatsapp_link(message), new_tab=True)

    submit.on_click(send_booking)
    footer()


# ============================ CONTACT PAGE ============================

@ui.page("/contact")
def contact_page():
    apply_theme()
    header()
    with ui.element("div").classes("section"):
        section_title("GET IN TOUCH", "Us", red_part="Contact",
                      subtitle="Call, WhatsApp or visit our showroom. We are open 24/7.")
        with ui.element("div").classes("grid w-full gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"):
            items = [
                ("call", "Call us", config.PHONE_DISPLAY, f"tel:{config.PHONE_LINK}"),
                ("chat", "WhatsApp", "Chat with our team", whatsapp_link("Hi DWON Cars!")),
                ("mail", "Email", config.EMAIL, f"mailto:{config.EMAIL}"),
                ("place", "Showroom", config.ADDRESS, "https://maps.google.com/?q=Al+Quoz+Dubai"),
            ]
            for icon, title, value, link in items:
                with ui.link(target=link, new_tab=link.startswith("http")).classes("no-underline"):
                    with ui.column().classes("car-card p-8 gap-2 h-full"):
                        ui.icon(icon, size="36px").classes("red")
                        ui.label(title).classes("heading text-2xl text-white")
                        ui.label(value).classes("muted")
        ui.label(config.OPEN_HOURS).classes("muted text-center w-full mt-10")
    footer()


# ============================ PHOTO CREDITS ============================
# Saari photos Wikimedia Commons se free license (Creative Commons) pe li gayi hain.
# License ke hisaab se photographer ka naam dikhana zaroori hai, isliye ye page hai.

@ui.page("/credits")
def credits_page():
    apply_theme()
    header()
    credits = json.loads((Path(__file__).parent / "static" / "cars" / "credits.json").read_text(encoding="utf-8"))
    with ui.element("div").classes("section"):
        section_title("PHOTO CREDITS", "Credits", red_part="Photo",
                      subtitle="All car photos are from Wikimedia Commons under free Creative Commons licences.")
        with ui.column().classes("dark-card w-full p-6 gap-0"):
            for key, info in credits.items():
                with ui.row().classes("spec-row w-full justify-between gap-4"):
                    ui.link(info["file"], info["page"], new_tab=True).classes("text-white")
                    ui.label(f"{info['author']} · {info['license']}").classes("muted")
    footer()


# ============================ WEBSITE CHALAO ============================

if __name__ in {"__main__", "__mp_main__"}:
    ui.run(title=f"{config.BUSINESS_NAME} | {config.TAGLINE}", port=8080,
           favicon=Path(__file__).parent / "static" / "logo" / "dwon-emblem.svg",
           dark=True, reload=False, show=False)
