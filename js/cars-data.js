// cars-data.js
// ------------------------------------------------------------
// DWON Cars ki saari gaadiyan yahan hain.
// Nayi gaadi add karni ho: ek { ... } block copy karo, details badlo,
// aur uski photo images/cars/ folder mein daal do.
//
// segment: "modified" (BRABUS), "sports", "suv", "sedan"
// price   = ek din ka kiraya, UAE Dirham (AED) mein
// photoBy = Unsplash photographer ka naam (credit ke liye)
// Specs: BRABUS / Mercedes official data (internet se)
// ------------------------------------------------------------

const SEGMENTS = {
  modified: { title: "BRABUS Modified", subtitle: "Mercedes cars hand-tuned by BRABUS in Germany. 750 to 1000 hp.", icon: "local_fire_department" },
  sports:   { title: "Sports Cars", subtitle: "Mercedes-AMG coupés, roadsters and sports sedans.", icon: "speed" },
  suv:      { title: "SUVs", subtitle: "From the compact GLA to the legendary G 63.", icon: "directions_car" },
  sedan:    { title: "Sedans", subtitle: "C-Class to Maybach. Comfort for every trip.", icon: "airline_seat_recline_extra" },
};

const CARS = [
  // ==================== MODIFIED (BRABUS) ====================
  { id: "brabus-800-superblack", name: "BRABUS 800 SUPERBLACK", base: "Mercedes-AMG G 63 (W465)", segment: "modified",
    engine: "4.0L V8 Biturbo (BRABUS turbochargers)", hp: 800, torque: 1000, zero100: 4.0, top: 240,
    gearbox: "9-speed automatic", drive: "All-wheel drive", seats: 5, price: 5500, tag: "",
    about: "The newest G-Class turned stealth monster: all black, carbon everywhere and 800 hp.", photoBy: "NAM CZ" },

  { id: "brabus-900-rocket-edition", name: "BRABUS 900 ROCKET EDITION", base: "Mercedes-AMG G 63 (W463A)", segment: "modified",
    engine: "4.5L V8 Biturbo (bored-out Rocket engine)", hp: 900, torque: 1050, zero100: 3.7, top: 280,
    gearbox: "9-speed automatic", drive: "All-wheel drive", seats: 5, price: 7500, tag: "1 of 25",
    about: "The top of the BRABUS G-Class range. Billet crankshaft, forged rods and 900 hp.", photoBy: "NAM CZ" },

  { id: "brabus-800-widestar", name: "BRABUS 800 WIDESTAR", base: "Mercedes-AMG G 63 (W463A)", segment: "modified",
    engine: "4.0L V8 Biturbo (BRABUS turbochargers)", hp: 800, torque: 1000, zero100: 3.9, top: 240,
    gearbox: "9-speed automatic", drive: "All-wheel drive", seats: 5, price: 5000, tag: "",
    about: "Wide-body G 63 with extra-wide arches, big forged wheels and a loud sports exhaust.", photoBy: "NAM CZ" },

  { id: "brabus-xlp-900-6x6", name: "BRABUS XLP 900 6x6 SUPERBLACK", base: "Mercedes-AMG G 63 pickup (6 wheels)", segment: "modified",
    engine: "4.5L V8 Biturbo (Rocket 900 engine)", hp: 900, torque: 1250, zero100: 5.2, top: 210,
    gearbox: "9-speed automatic", drive: "Six-wheel drive", seats: 4, price: 12000, tag: "Desert King",
    about: "Six wheels, portal axles and 900 hp. Built for the dunes, looks good at the mall too.", photoBy: "Franco Debartolo" },

  { id: "brabus-xlp-800-6x6", name: "BRABUS XLP 800 6x6 ADVENTURE", base: "Mercedes-AMG G 63 pickup (6 wheels)", segment: "modified",
    engine: "4.0L V8 Biturbo", hp: 800, torque: 1000, zero100: 5.8, top: 210,
    gearbox: "9-speed automatic", drive: "Six-wheel drive", seats: 4, price: 10000, tag: "Off-road",
    about: "The adventure pickup: huge off-road tyres, roof lights and a luxury cabin.", photoBy: "Toni Zaat" },

  { id: "brabus-900-superblack-gls", name: "BRABUS 900 SUPERBLACK", base: "Mercedes-AMG GLS 63 4MATIC+", segment: "modified",
    engine: "4.5L V8 Biturbo (Rocket 900 engine)", hp: 900, torque: 1050, zero100: 3.6, top: 330,
    gearbox: "9-speed automatic", drive: "All-wheel drive", seats: 7, price: 6500, tag: "330 km/h SUV",
    about: "A 7-seat family SUV that reaches 330 km/h. The fastest seven-seater we have.", photoBy: "hemantha varma" },

  { id: "brabus-800-gls", name: "BRABUS 800", base: "Mercedes-AMG GLS 63 4MATIC+", segment: "modified",
    engine: "4.0L V8 Biturbo (PowerXtra B40S-800)", hp: 800, torque: 1000, zero100: 3.8, top: 280,
    gearbox: "9-speed automatic", drive: "All-wheel drive", seats: 7, price: 4500, tag: "",
    about: "Luxury 7-seater with 24-inch forged wheels, lowered suspension and 800 hp.", photoBy: "Rana Singh" },

  { id: "brabus-800-gle-coupe", name: "BRABUS 800 COUPE", base: "Mercedes-AMG GLE 63 S Coupé", segment: "modified",
    engine: "4.0L V8 Biturbo (PowerXtra B40S-800)", hp: 800, torque: 1000, zero100: 3.4, top: 280,
    gearbox: "9-speed automatic", drive: "All-wheel drive", seats: 5, price: 4000, tag: "",
    about: "Sporty coupé-SUV that's faster than most sports cars off the line.", photoBy: "robin mikalsen" },

  { id: "brabus-930", name: "BRABUS 930", base: "Mercedes-AMG S 63 E PERFORMANCE", segment: "modified",
    engine: "4.0L V8 Biturbo + electric motor (hybrid)", hp: 930, torque: 1510, zero100: 3.2, top: 290,
    gearbox: "9-speed automatic", drive: "All-wheel drive", seats: 5, price: 6000, tag: "Hybrid",
    about: "Luxury limo with 930 hp. Silent in 'Coming Home' mode, loud V8 in 'Sport'.", photoBy: "Dekler Ph" },

  { id: "brabus-850-maybach", name: "BRABUS 850", base: "Mercedes-Maybach S 680", segment: "modified",
    engine: "6.3L V12 Biturbo (increased displacement)", hp: 850, torque: 1400, zero100: 4.1, top: 250,
    gearbox: "9-speed automatic", drive: "All-wheel drive", seats: 4, price: 7000, tag: "V12",
    about: "The ultimate chauffeur car. V12 power, champagne seats and total silence.", photoBy: "Romain Water" },

  { id: "brabus-900-maybach", name: "BRABUS 900", base: "Mercedes-Maybach S 650", segment: "modified",
    engine: "6.3L V12 Biturbo", hp: 900, torque: 1500, zero100: 3.7, top: 350,
    gearbox: "7-speed automatic", drive: "Rear-wheel drive", seats: 4, price: 6500, tag: "V12",
    about: "Classic BRABUS Maybach with a 900 hp V12. A true collector's limousine.", photoBy: "Mark Tryapichnikov" },

  { id: "brabus-800-e63", name: "BRABUS 800", base: "Mercedes-AMG E 63 S 4MATIC+", segment: "modified",
    engine: "4.0L V8 Biturbo (PowerXtra B40S-800)", hp: 800, torque: 1000, zero100: 3.0, top: 300,
    gearbox: "9-speed automatic", drive: "All-wheel drive", seats: 5, price: 3500, tag: "Best value",
    about: "Everyday executive car on the outside, 800 hp and 300 km/h underneath.", photoBy: "T. Hoffmann" },

  { id: "brabus-1000-gt", name: "BRABUS 1000", base: "Mercedes-AMG GT 63 S E PERFORMANCE Coupé", segment: "modified",
    engine: "4.5L V8 Biturbo + electric motor (hybrid)", hp: 1000, torque: 1620, zero100: 2.6, top: 316,
    gearbox: "9-speed automatic", drive: "All-wheel drive", seats: 4, price: 9500, tag: "1000 HP",
    about: "The most powerful car in our fleet. 0 to 100 km/h in 2.6 seconds.", photoBy: "Anil Baki Durmus" },

  { id: "brabus-750-gt", name: "BRABUS 750", base: "Mercedes-AMG GT 63 Coupé", segment: "modified",
    engine: "4.0L V8 Biturbo (PowerXtra B40S-750)", hp: 750, torque: 900, zero100: 2.9, top: 315,
    gearbox: "9-speed automatic", drive: "All-wheel drive", seats: 4, price: 5000, tag: "",
    about: "Carbon aero kit, big rear wing, forged wheels and a sports exhaust.", photoBy: "Michael Lock" },

  { id: "brabus-750-sl", name: "BRABUS 750 BODO BUSCHMANN EDITION", base: "Mercedes-AMG SL 63 4MATIC+", segment: "modified",
    engine: "4.0L V8 Biturbo (BRABUS turbochargers)", hp: 750, torque: 900, zero100: 3.3, top: 315,
    gearbox: "9-speed automatic", drive: "All-wheel drive", seats: 4, price: 6000, tag: "1 of 25",
    about: "Open-top BRABUS roadster made in honour of the company's founder.", photoBy: "Dekler Ph" },

  // ==================== SPORTS ====================
  { id: "amg-gt-63-s-e", name: "Mercedes-AMG GT 63 S E PERFORMANCE", base: "Coupé (C192)", segment: "sports",
    engine: "4.0L V8 Biturbo + electric motor", hp: 816, torque: 1420, zero100: 2.8, top: 320,
    gearbox: "AMG 9-speed MCT", drive: "All-wheel drive", seats: 4, price: 3500, tag: "",
    about: "AMG's most powerful GT. Hybrid V8 with an electric boost.", photoBy: "Rana Singh" },

  { id: "amg-gt-63", name: "Mercedes-AMG GT 63 4MATIC+", base: "Coupé", segment: "sports",
    engine: "4.0L V8 Biturbo", hp: 585, torque: 800, zero100: 3.2, top: 315,
    gearbox: "AMG 9-speed MCT", drive: "All-wheel drive", seats: 4, price: 2800, tag: "",
    about: "Hand-built V8 sports coupé in matte black.", photoBy: "Flavien" },

  { id: "amg-sl-63", name: "Mercedes-AMG SL 63 4MATIC+", base: "Roadster (R232)", segment: "sports",
    engine: "4.0L V8 Biturbo", hp: 585, torque: 800, zero100: 3.6, top: 315,
    gearbox: "AMG 9-speed MCT", drive: "All-wheel drive", seats: 4, price: 2500, tag: "Convertible",
    about: "Soft-top roadster, perfect for a Jumeirah Beach Road evening drive.", photoBy: "Samuel Hagger" },

  { id: "amg-c-63-s-e", name: "Mercedes-AMG C 63 S E PERFORMANCE", base: "Sedan (W206)", segment: "sports",
    engine: "2.0L 4-cyl Turbo + electric motor", hp: 680, torque: 1020, zero100: 3.4, top: 280,
    gearbox: "AMG 9-speed MCT", drive: "All-wheel drive", seats: 5, price: 1800, tag: "",
    about: "Compact sports sedan with Formula 1 hybrid tech and 680 hp.", photoBy: "Dextar Studio" },

  // ==================== SUV ====================
  { id: "amg-g-63", name: "Mercedes-AMG G 63", base: "G-Class", segment: "suv",
    engine: "4.0L V8 Biturbo (mild hybrid)", hp: 585, torque: 850, zero100: 4.4, top: 220,
    gearbox: "AMG 9-speed automatic", drive: "All-wheel drive", seats: 5, price: 2800, tag: "Most booked",
    about: "Dubai's favourite SUV. Iconic boxy look, V8 sound and serious off-road ability.", photoBy: "Rana Singh" },

  { id: "gls-580", name: "Mercedes-Benz GLS 580 4MATIC", base: "GLS (X167)", segment: "suv",
    engine: "4.0L V8 Biturbo (EQ Boost)", hp: 510, torque: 700, zero100: 4.7, top: 250,
    gearbox: "9G-TRONIC", drive: "All-wheel drive", seats: 7, price: 1400, tag: "7 seats",
    about: "The S-Class of SUVs. Big, quiet and very comfortable for 7 people.", photoBy: "Asawin Phunphairoj" },

  { id: "gle-450", name: "Mercedes-Benz GLE 450 4MATIC", base: "GLE", segment: "suv",
    engine: "3.0L 6-cyl Turbo (EQ Boost)", hp: 381, torque: 500, zero100: 5.6, top: 250,
    gearbox: "9G-TRONIC", drive: "All-wheel drive", seats: 7, price: 950, tag: "",
    about: "Smooth six-cylinder family SUV with plenty of space.", photoBy: "Jaswinder Singh" },

  { id: "glc-300", name: "Mercedes-Benz GLC 300 4MATIC", base: "GLC", segment: "suv",
    engine: "2.0L 4-cyl Turbo (mild hybrid)", hp: 258, torque: 400, zero100: 6.2, top: 240,
    gearbox: "9G-TRONIC", drive: "All-wheel drive", seats: 5, price: 650, tag: "",
    about: "The perfect everyday luxury SUV for the city.", photoBy: "Václav Pechar" },

  { id: "gla-250", name: "Mercedes-Benz GLA 250", base: "GLA", segment: "suv",
    engine: "2.0L 4-cyl Turbo", hp: 224, torque: 350, zero100: 6.7, top: 240,
    gearbox: "8G-DCT", drive: "All-wheel drive", seats: 5, price: 400, tag: "Budget",
    about: "Compact, easy to park and light on fuel. Our most affordable SUV.", photoBy: "Ninah Heikamp" },

  // ==================== SEDAN ====================
  { id: "maybach-s-680", name: "Mercedes-Maybach S 680", base: "S-Class Maybach", segment: "sedan",
    engine: "6.0L V12 Biturbo", hp: 612, torque: 900, zero100: 4.5, top: 250,
    gearbox: "9G-TRONIC", drive: "All-wheel drive", seats: 4, price: 3500, tag: "Chauffeur",
    about: "Luxury limousine with reclining rear seats. Best with a chauffeur.", photoBy: "Angelina Kusznirewicz" },

  { id: "s-580", name: "Mercedes-Benz S 580 4MATIC", base: "S-Class (W223)", segment: "sedan",
    engine: "4.0L V8 Biturbo (EQ Boost)", hp: 503, torque: 700, zero100: 4.4, top: 250,
    gearbox: "9G-TRONIC", drive: "All-wheel drive", seats: 5, price: 1800, tag: "",
    about: "The flagship Mercedes sedan. Business meetings, weddings, VIP guests.", photoBy: "Mikolaj Górzyński" },

  { id: "e-300", name: "Mercedes-Benz E 300", base: "E-Class", segment: "sedan",
    engine: "2.0L 4-cyl Turbo (mild hybrid)", hp: 258, torque: 400, zero100: 6.2, top: 250,
    gearbox: "9G-TRONIC", drive: "Rear-wheel drive", seats: 5, price: 550, tag: "",
    about: "Business-class comfort with the latest MBUX screens.", photoBy: "Manuel Pappacena" },

  { id: "c-200", name: "Mercedes-Benz C 200", base: "C-Class (W206)", segment: "sedan",
    engine: "1.5L 4-cyl Turbo (EQ Boost)", hp: 204, torque: 300, zero100: 7.3, top: 246,
    gearbox: "9G-TRONIC", drive: "Rear-wheel drive", seats: 5, price: 350, tag: "Budget",
    about: "Stylish, economical and easy to drive. Great for everyday use in Dubai.", photoBy: "Dextar Studio" },
];

// Ek gaadi ID se dhoondho
function getCar(id) {
  return CARS.find((car) => car.id === id);
}

// Ek segment ki saari gaadiyan
function carsIn(segment) {
  return CARS.filter((car) => car.segment === segment);
}

// Gaadi ki photo ka rasta
function carImage(car) {
  return `images/cars/${car.id}.jpg`;
}
