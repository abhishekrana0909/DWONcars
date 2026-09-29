# DWON Cars 🚗 Luxury & BRABUS Car Rental (Dubai)

Rana Paints jaisi simple **HTML / CSS / JavaScript** website. Koi build step nahi.
GitHub Pages pe free mein online chal sakti hai.

## Computer pe kaise dekhein

3D showroom ke liye ek chhota local server chahiye (seedha double-click se 3D nahi chalega):

```bash
python -m http.server 8000
```

Phir browser mein kholo: **http://localhost:8000**

## Files kya karti hain

| File / Folder | Kaam |
|---|---|
| `index.html` | Home: 3D slider, bada logo, BRABUS collection, 360° showroom, baaki gaadiyan |
| `cars.html` | Ek category ki saari gaadiyan (`?type=modified / sports / suv / sedan`) |
| `car.html` | Ek gaadi ki poori specs (`?id=...`) |
| `book.html` | Booking form, total kiraya jodta hai aur WhatsApp pe bhejta hai |
| `contact.html` | Contact details |
| `js/config.js` | **Naam, phone, WhatsApp, email, address yahan badlo** |
| `js/cars-data.js` | **Saari gaadiyan, specs aur kiraya (AED/day) yahan badlo** |
| `js/site.js` | Header, footer, car cards, slider, booking ka code |
| `js/showroom3d.js` | 3D ghoomti gaadi (three.js) |
| `css/style.css` | Poora design (rang `:root` mein) |
| `images/cars/` | Gaadiyon ki photos (naam = gaadi ki id, jaise `brabus-930.jpg`) |
| `images/logo/` | DWON Cars logo (SVG + PNG) |
| `models/car.glb` | 3D car model |
| `python-version/` | Purana Python (NiceGUI) wala version, reference ke liye |

## Kuch badalna ho toh

- **Phone / address / email / owner:** `js/config.js` (address abhi SAMPLE hai)
- **Nayi gaadi:** `js/cars-data.js` mein ek `{ ... }` block copy karo, aur photo `images/cars/<id>.jpg` naam se daalo
- **Kiraya:** `js/cars-data.js` mein us gaadi ka `price`
- **Rang:** `css/style.css` ke upar `--red`, `--black`

## Credits

- Car photos: [Unsplash](https://unsplash.com) (free Unsplash License). Photographer ka naam har gaadi ke page pe hai.
  Photos milti-julti kaali Mercedes / BRABUS gaadiyon ki hain, har ek exact model nahi.
- 3D model: "Car Concept" by Eric Chadwick / Darmstadt Graphics Group,
  [Khronos glTF Sample Assets](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/CarConcept),
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Paint ko kaala kiya gaya hai. Ye credit website pe rehna zaroori hai.
