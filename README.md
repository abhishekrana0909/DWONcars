# DWON Cars 🚗 Luxury & BRABUS Car Rental (Dubai)

Rana Paints jaisi simple **HTML / CSS / JavaScript** website. Koi build step nahi.
GitHub Pages pe free mein online chal sakti hai.

## Computer pe kaise dekhein

Seedha `index.html` pe double-click karke khol sakte ho, ya ek chhota local server chalao:

```bash
python -m http.server 8000
```

Phir browser mein kholo: **http://localhost:8000**

## Files kya karti hain

| File / Folder | Kaam |
|---|---|
| `index.html` | Home: slider, bada logo, BRABUS collection, baaki gaadiyan |
| `cars.html` | Ek category ki saari gaadiyan (`?type=modified / sports / suv / sedan`) |
| `car.html` | Ek gaadi ki poori specs (`?id=...`) |
| `book.html` | Booking form, total kiraya jodta hai (demo mode mein kuch nahi bhejta) |
| `contact.html` | Contact details |
| `js/config.js` | **Naam, phone, WhatsApp, email yahan badlo** |
| `js/cars-data.js` | **Saari gaadiyan, specs aur kiraya (AED/day) yahan badlo** |
| `js/site.js` | Header, footer, car cards, slider, booking ka code |
| `css/style.css` | Poora design (rang `:root` mein) |
| `images/cars/` | Gaadiyon ki photos (naam = gaadi ki id, jaise `brabus-930.jpg`) |
| `images/logo/` | DWON Cars logo (SVG + PNG) |
| `python-version/` | Purana Python (NiceGUI) wala version, reference ke liye |

## Kuch badalna ho toh

- **Phone / email / owner:** `js/config.js` (abhi DEMO hai: `demo: true` aur placeholder details)
- **Nayi gaadi:** `js/cars-data.js` mein ek `{ ... }` block copy karo, aur photo `images/cars/<id>.jpg` naam se daalo
- **Kiraya:** `js/cars-data.js` mein us gaadi ka `price`
- **Rang:** `css/style.css` ke upar `--red`, `--black`

## Credits

- Car photos: [Unsplash](https://unsplash.com) (free Unsplash License). Photographer ka naam har gaadi ke page pe hai.
  Photos milti-julti kaali Mercedes / BRABUS gaadiyon ki hain, har ek exact model nahi.
