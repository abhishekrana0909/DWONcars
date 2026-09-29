// config.js
// ------------------------------------------------------------
// Business ki basic details. Naam, number, email badalna ho
// toh sirf yahi file badlo, poori website mein badal jaayega.
//
// ⚠️ Ye website ek DEMO / SAMPLE project hai, asli business nahi.
// Isliye contact details placeholder hain aur booking band hai.
// Asli business banana ho toh: demo: false karo aur asli number /
// email daalo (aur UAE ka trade / RTA license zaroori hai).
// ------------------------------------------------------------

const CONFIG = {
  demo: true, // true = demo mode: banner dikhega, call/WhatsApp/booking band

  name: "DWON Cars",
  owner: "DWON",
  tagline: "Luxury & BRABUS Car Rental in Dubai",

  phoneDisplay: "+971 XX XXX XXXX", // placeholder (demo)
  phoneLink: "",                    // asli number: "+9715XXXXXXXX"
  whatsapp: "",                     // asli number: "9715XXXXXXXX" (bina + aur 0)
  email: "demo@example.com",        // placeholder (demo)

  delivery: "Delivery anywhere in Dubai: home, hotel or airport",
  openHours: "Demo website: contact details are placeholders",

  // Booking form mein delivery ki jagah
  locations: [
    "My home / hotel (address in notes)",
    "Dubai International Airport (DXB)",
    "Dubai Marina / JBR",
    "Downtown Dubai",
    "Business Bay",
    "Palm Jumeirah",
    "Jumeirah",
    "Deira",
  ],
};
