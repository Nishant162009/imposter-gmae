"use strict";

/*
  IMPOSTER 2.0
  Word database is loaded from words.json.
  Keep the main word dataset separate from this file.
*/

let WORDS = {};
let wordsReady = false;
let wordsLoadError = "";

const FALLBACK_WORDS = {
  Anime: [
    { word: "Naruto", difficulty: "easy", hint: "Ninja with a fox spirit" },
    { word: "Gojo", difficulty: "easy", hint: "Powerful Jujutsu sorcerer" },
    { word: "One Piece", difficulty: "easy", hint: "Pirates search for treasure" },
    { word: "Luffy", difficulty: "easy", hint: "Rubber-powered pirate captain" },
    { word: "Zoro", difficulty: "easy", hint: "Swordsman with three blades" },
    { word: "Goku", difficulty: "easy", hint: "Saiyan martial artist" },
    { word: "Vegeta", difficulty: "medium", hint: "Proud Saiyan prince" },
    { word: "Ichigo", difficulty: "medium", hint: "Soul Reaper protagonist" },
    { word: "Levi", difficulty: "medium", hint: "Humanity’s strongest soldier" },
    { word: "Eren", difficulty: "easy", hint: "Wants freedom beyond the walls" },
    { word: "Mikasa", difficulty: "medium", hint: "Skilled fighter and Eren’s protector" },
    { word: "Tanjiro", difficulty: "easy", hint: "Demon Slayer with a kind heart" },
    { word: "Nezuko", difficulty: "easy", hint: "Demon sister of Tanjiro" },
    { word: "Deku", difficulty: "easy", hint: "Hero student with One For All" },
    { word: "Bakugo", difficulty: "medium", hint: "Explosive hero student" },
    { word: "Todoroki", difficulty: "medium", hint: "Uses fire and ice" },
    { word: "Light", difficulty: "medium", hint: "Uses the Death Note" },
    { word: "L", difficulty: "hard", hint: "Brilliant detective in Death Note" },
    { word: "Saitama", difficulty: "easy", hint: "One-punch hero" },
    { word: "Genos", difficulty: "medium", hint: "Cyborg disciple of Saitama" },
    { word: "Itachi", difficulty: "medium", hint: "Naruto’s older brother" },
    { word: "Kakashi", difficulty: "medium", hint: "Copy Ninja teacher" },
    { word: "Sasuke", difficulty: "easy", hint: "Naruto’s rival and friend" },
    { word: "Pikachu", difficulty: "easy", hint: "Electric Pokémon" },
    { word: "Ash", difficulty: "easy", hint: "Pokémon trainer from Pallet Town" }
  ],
  Gaming: [
    { word: "Minecraft", difficulty: "easy", hint: "Build with blocks" },
    { word: "GTA", difficulty: "easy", hint: "Open-world crime game" },
    { word: "Valorant", difficulty: "easy", hint: "Tactical shooter by Riot" },
    { word: "Fortnite", difficulty: "easy", hint: "Battle royale with building" },
    { word: "PUBG", difficulty: "easy", hint: "Battle royale with chicken dinner" },
    { word: "Free Fire", difficulty: "easy", hint: "Mobile battle royale" },
    { word: "Roblox", difficulty: "easy", hint: "Platform for user-made games" },
    { word: "Among Us", difficulty: "easy", hint: "Find the impostor" },
    { word: "Clash Royale", difficulty: "medium", hint: "Card-based tower battle" },
    { word: "Clash of Clans", difficulty: "medium", hint: "Build and raid villages" },
    { word: "Candy Crush", difficulty: "easy", hint: "Match colorful candies" },
    { word: "Subway Surfers", difficulty: "easy", hint: "Run from the inspector" },
    { word: "Temple Run", difficulty: "easy", hint: "Escape with an idol" },
    { word: "Mario", difficulty: "easy", hint: "Famous plumber hero" },
    { word: "Sonic", difficulty: "easy", hint: "Fast blue hedgehog" },
    { word: "Pac-Man", difficulty: "easy", hint: "Eats dots and avoids ghosts" },
    { word: "Tetris", difficulty: "easy", hint: "Fit falling blocks" },
    { word: "Chess", difficulty: "medium", hint: "Strategy board game" },
    { word: "Ludo", difficulty: "easy", hint: "Dice-based board game" },
    { word: "Carrom", difficulty: "medium", hint: "Flick discs into pockets" },
    { word: "PlayStation", difficulty: "medium", hint: "Sony gaming console" },
    { word: "Xbox", difficulty: "medium", hint: "Microsoft gaming console" },
    { word: "Nintendo", difficulty: "medium", hint: "Maker of Mario and Switch" },
    { word: "Controller", difficulty: "easy", hint: "Used to play games" },
    { word: "Respawn", difficulty: "hard", hint: "Return after being eliminated" }
  ],
  Technology: [
    { word: "Bluetooth", difficulty: "easy", hint: "Wireless short-range connection" },
    { word: "Robot", difficulty: "easy", hint: "Machine that can perform tasks" },
    { word: "AI", difficulty: "easy", hint: "Machines that simulate intelligence" },
    { word: "Internet", difficulty: "easy", hint: "Global computer network" },
    { word: "Wi-Fi", difficulty: "easy", hint: "Wireless internet connection" },
    { word: "Password", difficulty: "easy", hint: "Secret key to an account" },
    { word: "Browser", difficulty: "easy", hint: "Used to visit websites" },
    { word: "Website", difficulty: "easy", hint: "Pages on the internet" },
    { word: "App", difficulty: "easy", hint: "Software on a phone" },
    { word: "Laptop", difficulty: "easy", hint: "Portable computer" },
    { word: "Keyboard", difficulty: "easy", hint: "Used for typing" },
    { word: "Mouse", difficulty: "easy", hint: "Points and clicks on screen" },
    { word: "Charger", difficulty: "easy", hint: "Fills a battery" },
    { word: "Battery", difficulty: "easy", hint: "Stores electrical energy" },
    { word: "Camera", difficulty: "easy", hint: "Captures photos" },
    { word: "Screenshot", difficulty: "medium", hint: "Picture of your screen" },
    { word: "Download", difficulty: "easy", hint: "Save a file from internet" },
    { word: "Upload", difficulty: "easy", hint: "Send a file to internet" },
    { word: "Cloud", difficulty: "medium", hint: "Online storage and services" },
    { word: "Data", difficulty: "medium", hint: "Information stored or processed" },
    { word: "Code", difficulty: "medium", hint: "Instructions for a computer" },
    { word: "Software", difficulty: "medium", hint: "Programs running on a device" },
    { word: "Hardware", difficulty: "medium", hint: "Physical parts of a computer" },
    { word: "Satellite", difficulty: "medium", hint: "Orbits Earth for communication" },
    { word: "Encryption", difficulty: "hard", hint: "Protects information with codes" }
  ],
  "Indian Street Food": [
    { word: "Vada Pav", difficulty: "easy", hint: "Spicy potato in a bun" },
    { word: "Dosa", difficulty: "easy", hint: "Crispy South Indian crepe" },
    { word: "Pav Bhaji", difficulty: "easy", hint: "Mashed vegetables with buttered bread" },
    { word: "Pani Puri", difficulty: "easy", hint: "Crisp spheres with spicy water" },
    { word: "Bhel Puri", difficulty: "easy", hint: "Puffed rice snack" },
    { word: "Samosa", difficulty: "easy", hint: "Fried triangular snack" },
    { word: "Pakora", difficulty: "easy", hint: "Fried battered snack" },
    { word: "Chaat", difficulty: "easy", hint: "Tangy Indian snack" },
    { word: "Aloo Tikki", difficulty: "medium", hint: "Fried potato patty" },
    { word: "Poha", difficulty: "easy", hint: "Flattened rice breakfast" },
    { word: "Misal", difficulty: "medium", hint: "Spicy Maharashtrian curry snack" },
    { word: "Kanda Bhaji", difficulty: "medium", hint: "Onion fritters" },
    { word: "Idli", difficulty: "easy", hint: "Steamed rice cake" },
    { word: "Medu Vada", difficulty: "medium", hint: "Savory lentil doughnut" },
    { word: "Uttapam", difficulty: "medium", hint: "Thick dosa with toppings" },
    { word: "Chole Bhature", difficulty: "medium", hint: "Chickpeas with fried bread" },
    { word: "Kachori", difficulty: "medium", hint: "Fried stuffed snack" },
    { word: "Dhokla", difficulty: "easy", hint: "Steamed Gujarati snack" },
    { word: "Jalebi", difficulty: "easy", hint: "Sweet syrupy spiral" },
    { word: "Gulab Jamun", difficulty: "easy", hint: "Sweet milk dumpling" },
    { word: "Kulfi", difficulty: "easy", hint: "Traditional Indian ice cream" },
    { word: "Chai", difficulty: "easy", hint: "Popular Indian tea" },
    { word: "Lassi", difficulty: "easy", hint: "Yogurt-based drink" },
    { word: "Cutting Chai", difficulty: "medium", hint: "Small strong glass of tea" },
    { word: "Frankie", difficulty: "medium", hint: "Rolled Indian wrap" }
  ],
  "Countries & Cities": [
    { word: "Tokyo", difficulty: "easy", hint: "Capital of Japan" },
    { word: "Seoul", difficulty: "easy", hint: "Capital of South Korea" },
    { word: "Mumbai", difficulty: "easy", hint: "India’s financial capital" },
    { word: "Delhi", difficulty: "easy", hint: "Capital of India" },
    { word: "Nashik", difficulty: "easy", hint: "Maharashtra city known for grapes" },
    { word: "Pune", difficulty: "easy", hint: "Maharashtra city near Mumbai" },
    { word: "Paris", difficulty: "easy", hint: "City of the Eiffel Tower" },
    { word: "London", difficulty: "easy", hint: "Capital of the UK" },
    { word: "New York", difficulty: "easy", hint: "City with the Statue of Liberty" },
    { word: "Dubai", difficulty: "easy", hint: "Famous for Burj Khalifa" },
    { word: "Singapore", difficulty: "medium", hint: "City-state in Southeast Asia" },
    { word: "Bangkok", difficulty: "medium", hint: "Capital of Thailand" },
    { word: "Rome", difficulty: "easy", hint: "Capital of Italy" },
    { word: "Berlin", difficulty: "medium", hint: "Capital of Germany" },
    { word: "Madrid", difficulty: "medium", hint: "Capital of Spain" },
    { word: "Moscow", difficulty: "medium", hint: "Capital of Russia" },
    { word: "Beijing", difficulty: "medium", hint: "Capital of China" },
    { word: "Cairo", difficulty: "medium", hint: "Capital of Egypt" },
    { word: "Sydney", difficulty: "easy", hint: "Australian city with an opera house" },
    { word: "Toronto", difficulty: "medium", hint: "Largest city in Canada" },
    { word: "Brazil", difficulty: "easy", hint: "Country famous for football and Amazon" },
    { word: "Japan", difficulty: "easy", hint: "Country of sushi and anime" },
    { word: "Egypt", difficulty: "easy", hint: "Country of pyramids" },
    { word: "Australia", difficulty: "easy", hint: "Country and continent" },
    { word: "Switzerland", difficulty: "medium", hint: "Country known for chocolates and Alps" }
  ],
  "School Life": [
    { word: "Homework", difficulty: "easy", hint: "Work done after school" },
    { word: "Attendance", difficulty: "easy", hint: "Record of being present" },
    { word: "Exam", difficulty: "easy", hint: "Test of knowledge" },
    { word: "Teacher", difficulty: "easy", hint: "Teaches students" },
    { word: "Student", difficulty: "easy", hint: "Person who studies" },
    { word: "Classroom", difficulty: "easy", hint: "Room where lessons happen" },
    { word: "Blackboard", difficulty: "easy", hint: "Teacher writes on it" },
    { word: "Notebook", difficulty: "easy", hint: "Used for writing notes" },
    { word: "Textbook", difficulty: "easy", hint: "Book for a subject" },
    { word: "Library", difficulty: "easy", hint: "Place full of books" },
    { word: "Playground", difficulty: "easy", hint: "Where students play" },
    { word: "Uniform", difficulty: "easy", hint: "School dress code" },
    { word: "Timetable", difficulty: "medium", hint: "Schedule of classes" },
    { word: "Principal", difficulty: "medium", hint: "Head of the school" },
    { word: "Assembly", difficulty: "easy", hint: "School gathering" },
    { word: "Recess", difficulty: "easy", hint: "Break between classes" },
    { word: "Project", difficulty: "medium", hint: "Assigned school work" },
    { word: "Report Card", difficulty: "medium", hint: "Shows your marks" },
    { word: "Scholarship", difficulty: "hard", hint: "Financial award for study" },
    { word: "Discipline", difficulty: "medium", hint: "Following rules" },
    { word: "Friendship", difficulty: "easy", hint: "Bond between friends" },
    { word: "Farewell", difficulty: "medium", hint: "Final school event" },
    { word: "Annual Day", difficulty: "medium", hint: "School celebration event" },
    { word: "Science Fair", difficulty: "medium", hint: "Exhibition of experiments" },
    { word: "Detention", difficulty: "hard", hint: "Punishment after school" }
  ],
  Sports: [
    { word: "Cricket", difficulty: "easy", hint: "Bat-and-ball sport popular in India" },
    { word: "Football", difficulty: "easy", hint: "Played with a round ball" },
    { word: "Badminton", difficulty: "easy", hint: "Racket sport with a shuttlecock" },
    { word: "Basketball", difficulty: "easy", hint: "Shoot ball into a hoop" },
    { word: "Tennis", difficulty: "easy", hint: "Played with rackets and a ball" },
    { word: "Hockey", difficulty: "easy", hint: "Played with sticks and a puck or ball" },
    { word: "Kabaddi", difficulty: "medium", hint: "Indian contact team sport" },
    { word: "Kho Kho", difficulty: "medium", hint: "Indian chasing game" },
    { word: "Volleyball", difficulty: "medium", hint: "Hit ball over a net" },
    { word: "Swimming", difficulty: "easy", hint: "Moving through water" },
    { word: "Running", difficulty: "easy", hint: "Fast movement on foot" },
    { word: "Marathon", difficulty: "medium", hint: "Long-distance race" },
    { word: "Boxing", difficulty: "medium", hint: "Combat sport with gloves" },
    { word: "Wrestling", difficulty: "medium", hint: "Grappling combat sport" },
    { word: "Golf", difficulty: "medium", hint: "Hit ball into holes" },
    { word: "Skating", difficulty: "medium", hint: "Moving on wheels or ice" },
    { word: "Cycling", difficulty: "easy", hint: "Riding a bicycle" },
    { word: "Yoga", difficulty: "easy", hint: "Exercise for body and mind" },
    { word: "Referee", difficulty: "medium", hint: "Enforces game rules" },
    { word: "Goalkeeper", difficulty: "medium", hint: "Stops goals" },
    { word: "Stadium", difficulty: "easy", hint: "Large sports venue" },
    { word: "Trophy", difficulty: "easy", hint: "Prize for winning" },
    { word: "Olympics", difficulty: "medium", hint: "World’s biggest sports event" },
    { word: "World Cup", difficulty: "medium", hint: "International championship" },
    { word: "Coach", difficulty: "easy", hint: "Trains athletes" }
  ],
  "Brands & Products": [
    { word: "iPhone", difficulty: "easy", hint: "Apple smartphone" },
    { word: "PlayStation", difficulty: "easy", hint: "Sony gaming console" },
    { word: "LEGO", difficulty: "easy", hint: "Interlocking toy bricks" },
    { word: "Nike", difficulty: "easy", hint: "Sportswear brand with a swoosh" },
    { word: "Adidas", difficulty: "easy", hint: "Sportswear brand with three stripes" },
    { word: "Samsung", difficulty: "easy", hint: "Korean electronics company" },
    { word: "Google", difficulty: "easy", hint: "Popular search engine" },
    { word: "YouTube", difficulty: "easy", hint: "Video-sharing platform" },
    { word: "Instagram", difficulty: "easy", hint: "Photo and reel sharing app" },
    { word: "WhatsApp", difficulty: "easy", hint: "Messaging app" },
    { word: "Amazon", difficulty: "easy", hint: "Online shopping company" },
    { word: "Flipkart", difficulty: "easy", hint: "Indian e-commerce company" },
    { word: "Zomato", difficulty: "easy", hint: "Food delivery app" },
    { word: "Swiggy", difficulty: "easy", hint: "Food delivery app" },
    { word: "Netflix", difficulty: "easy", hint: "Streaming platform" },
    { word: "Spotify", difficulty: "easy", hint: "Music streaming app" },
    { word: "Coca-Cola", difficulty: "easy", hint: "Fizzy drink brand" },
    { word: "Maggi", difficulty: "easy", hint: "Popular instant noodles" },
    { word: "Amul", difficulty: "medium", hint: "Indian dairy brand" },
    { word: "Tata", difficulty: "medium", hint: "Major Indian business group" },
    { word: "Boat", difficulty: "medium", hint: "Indian audio brand" },
    { word: "Dyson", difficulty: "hard", hint: "Known for vacuum cleaners" },
    { word: "Rolex", difficulty: "medium", hint: "Luxury watch brand" },
    { word: "Ferrari", difficulty: "medium", hint: "Italian sports car brand" },
    { word: "Tesla", difficulty: "medium", hint: "Electric car company" }
  ],
  "Everyday Objects": [
    { word: "Pillow", difficulty: "easy", hint: "Supports your head while sleeping" },
    { word: "Mirror", difficulty: "easy", hint: "Shows your reflection" },
    { word: "Toothbrush", difficulty: "easy", hint: "Used to clean teeth" },
    { word: "Towel", difficulty: "easy", hint: "Used to dry yourself" },
    { word: "Blanket", difficulty: "easy", hint: "Keeps you warm" },
    { word: "Bucket", difficulty: "easy", hint: "Carries water" },
    { word: "Broom", difficulty: "easy", hint: "Used for sweeping" },
    { word: "Mop", difficulty: "easy", hint: "Used for cleaning floors" },
    { word: "Plate", difficulty: "easy", hint: "Used to serve food" },
    { word: "Spoon", difficulty: "easy", hint: "Used to eat liquids" },
    { word: "Fork", difficulty: "easy", hint: "Has pointed tines" },
    { word: "Bottle", difficulty: "easy", hint: "Holds water" },
    { word: "Cup", difficulty: "easy", hint: "Used for drinking" },
    { word: "Clock", difficulty: "easy", hint: "Shows time" },
    { word: "Key", difficulty: "easy", hint: "Opens a lock" },
    { word: "Wallet", difficulty: "easy", hint: "Holds money and cards" },
    { word: "Scissors", difficulty: "easy", hint: "Used for cutting" },
    { word: "Ladder", difficulty: "medium", hint: "Helps you climb" },
    { word: "Candle", difficulty: "easy", hint: "Gives light with a flame" },
    { word: "Fan", difficulty: "easy", hint: "Moves air" },
    { word: "Switch", difficulty: "easy", hint: "Turns lights on or off" },
    { word: "Remote", difficulty: "easy", hint: "Controls a TV" },
    { word: "Charger", difficulty: "easy", hint: "Charges a device" },
    { word: "Dustbin", difficulty: "easy", hint: "Holds waste" },
    { word: "Umbrella", difficulty: "easy", hint: "Useful in rain" }
  ],
  Science: [
    { word: "Black Hole", difficulty: "hard", hint: "Region with extreme gravity" },
    { word: "Gravity", difficulty: "easy", hint: "Pulls objects toward Earth" },
    { word: "Atom", difficulty: "easy", hint: "Basic unit of matter" },
    { word: "Molecule", difficulty: "medium", hint: "Group of bonded atoms" },
    { word: "Electron", difficulty: "medium", hint: "Negatively charged particle" },
    { word: "Proton", difficulty: "medium", hint: "Positively charged particle" },
    { word: "Neutron", difficulty: "medium", hint: "Neutral particle in nucleus" },
    { word: "Energy", difficulty: "easy", hint: "Ability to do work" },
    { word: "Force", difficulty: "easy", hint: "Push or pull" },
    { word: "Friction", difficulty: "medium", hint: "Resists motion between surfaces" },
    { word: "Magnet", difficulty: "easy", hint: "Attracts iron" },
    { word: "Electricity", difficulty: "easy", hint: "Flow of electric charge" },
    { word: "Circuit", difficulty: "medium", hint: "Path for electric current" },
    { word: "Photosynthesis", difficulty: "hard", hint: "Plants make food using sunlight" },
    { word: "Chlorophyll", difficulty: "hard", hint: "Green pigment in plants" },
    { word: "DNA", difficulty: "medium", hint: "Carries genetic information" },
    { word: "Cell", difficulty: "easy", hint: "Basic unit of life" },
    { word: "Virus", difficulty: "medium", hint: "Tiny infectious agent" },
    { word: "Bacteria", difficulty: "medium", hint: "Single-celled microorganism" },
    { word: "Evolution", difficulty: "hard", hint: "Gradual change in species" },
    { word: "Telescope", difficulty: "medium", hint: "Views distant objects in space" },
    { word: "Microscope", difficulty: "medium", hint: "Makes tiny things look bigger" },
    { word: "Volcano", difficulty: "easy", hint: "Erupts lava" },
    { word: "Earthquake", difficulty: "easy", hint: "Shaking of the ground" },
    { word: "Solar System", difficulty: "easy", hint: "Sun and planets" }
  ],
  Music: [
    { word: "Singer", difficulty: "easy", hint: "Performs songs" },
    { word: "Concert", difficulty: "easy", hint: "Live music event" },
    { word: "Headphones", difficulty: "easy", hint: "Listen privately to audio" },
    { word: "Guitar", difficulty: "easy", hint: "String instrument" },
    { word: "Piano", difficulty: "easy", hint: "Keyboard instrument" },
    { word: "Drums", difficulty: "easy", hint: "Percussion instrument" },
    { word: "Violin", difficulty: "medium", hint: "Played with a bow" },
    { word: "Flute", difficulty: "medium", hint: "Wind instrument" },
    { word: "Microphone", difficulty: "easy", hint: "Captures sound" },
    { word: "Speaker", difficulty: "easy", hint: "Plays sound aloud" },
    { word: "Playlist", difficulty: "easy", hint: "Collection of songs" },
    { word: "Lyrics", difficulty: "easy", hint: "Words of a song" },
    { word: "Melody", difficulty: "medium", hint: "Main tune of a song" },
    { word: "Rhythm", difficulty: "medium", hint: "Pattern of beats" },
    { word: "Beat", difficulty: "easy", hint: "Basic unit of music timing" },
    { word: "Chorus", difficulty: "medium", hint: "Repeated part of a song" },
    { word: "Album", difficulty: "easy", hint: "Collection of songs" },
    { word: "DJ", difficulty: "easy", hint: "Plays and mixes music" },
    { word: "Karaoke", difficulty: "easy", hint: "Sing along with music" },
    { word: "Orchestra", difficulty: "medium", hint: "Large group of musicians" },
    { word: "Bollywood", difficulty: "easy", hint: "Hindi film music industry" },
    { word: "Classical", difficulty: "medium", hint: "Traditional music style" },
    { word: "Podcast", difficulty: "medium", hint: "Spoken audio show" },
    { word: "Autotune", difficulty: "hard", hint: "Corrects or changes voice pitch" },
    { word: "Encore", difficulty: "hard", hint: "Extra performance after a show" }
  ],
  Situations: [
    { word: "First Date", difficulty: "medium", hint: "Nervous romantic meeting" },
    { word: "Job Interview", difficulty: "medium", hint: "Meeting for employment" },
    { word: "Exam Day", difficulty: "easy", hint: "Important test day" },
    { word: "Birthday Party", difficulty: "easy", hint: "Celebration of birth" },
    { word: "Wedding", difficulty: "easy", hint: "Marriage ceremony" },
    { word: "Rainy Day", difficulty: "easy", hint: "Stay indoors or use umbrella" },
    { word: "Power Cut", difficulty: "easy", hint: "Electricity stops working" },
    { word: "Late for School", difficulty: "easy", hint: "Rushing in the morning" },
    { word: "Lost Phone", difficulty: "medium", hint: "Cannot find your device" },
    { word: "Traffic Jam", difficulty: "easy", hint: "Vehicles stuck on road" },
    { word: "Train Journey", difficulty: "easy", hint: "Traveling by rail" },
    { word: "Airport Security", difficulty: "medium", hint: "Check before boarding" },
    { word: "Online Class", difficulty: "easy", hint: "Learning through video call" },
    { word: "Group Project", difficulty: "medium", hint: "School work with teammates" },
    { word: "Sleepover", difficulty: "easy", hint: "Staying at a friend’s home" },
    { word: "Family Dinner", difficulty: "easy", hint: "Eating together at home" },
    { word: "Movie Night", difficulty: "easy", hint: "Watching films together" },
    { word: "Surprise Gift", difficulty: "easy", hint: "Unexpected present" },
    { word: "Lost Wallet", difficulty: "medium", hint: "Money and cards missing" },
    { word: "Flat Tyre", difficulty: "medium", hint: "Vehicle wheel loses air" },
    { word: "Heavy Rain", difficulty: "easy", hint: "Very strong rainfall" },
    { word: "Morning Alarm", difficulty: "easy", hint: "Wake-up sound" },
    { word: "Missed Bus", difficulty: "medium", hint: "Bus left before you arrived" },
    { word: "Forgot Homework", difficulty: "medium", hint: "Left school work at home" },
    { word: "Lost Keys", difficulty: "medium", hint: "Cannot find house keys" }
  ]
};

async function loadWordDatabase() {
  try {
    const response = await fetch(
      new URL("words.json", document.baseURI),
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();

    let source =
      payload &&
      payload.categories &&
      typeof payload.categories === "object"
        ? payload.categories
        : payload;

    // Also accept: { categories: [ { category: "Anime", words: [...] } ] }
    if (Array.isArray(source)) {
      const converted = {};
      source.forEach(group => {
        if (
          group &&
          typeof group.category === "string" &&
          Array.isArray(group.words)
        ) {
          converted[group.category] = group.words;
        }
      });
      source = converted;
    }

    if (
      !source ||
      typeof source !== "object" ||
      Array.isArray(source)
    ) {
      throw new Error("Expected a category object");
    }

    const clean = {};

    for (const [category, entries] of Object.entries(source)) {
      if (!Array.isArray(entries)) continue;

      const valid = entries
        .map(entry => {
          if (typeof entry === "string") {
            return {
              word: entry.trim(),
              hint: "",
              difficulty: "easy",
              relatedWord: "",
              relatedHint: ""
            };
          }

          if (
            !entry ||
            typeof entry !== "object" ||
            typeof entry.word !== "string" ||
            !entry.word.trim()
          ) {
            return null;
          }

          const difficulty = [
            "easy",
            "medium",
            "hard"
          ].includes(String(entry.difficulty).toLowerCase())
            ? String(entry.difficulty).toLowerCase()
            : "easy";

          return {
            word: entry.word.trim(),
            hint:
              typeof entry.hint === "string"
                ? entry.hint.trim()
                : "",
            difficulty,
            relatedWord:
              typeof entry.relatedWord === "string"
                ? entry.relatedWord.trim()
                : "",
            relatedHint:
              typeof entry.relatedHint === "string"
                ? entry.relatedHint.trim()
                : ""
          };
        })
        .filter(Boolean);

      if (valid.length) {
        clean[String(category)] = valid;
      }
    }

    if (!Object.keys(clean).length) {
      throw new Error("No valid categories or words found");
    }

    WORDS = clean;
    wordsReady = true;
    wordsLoadError = "";

    return true;
  } catch (error) {
    // Keep the game playable if words.json is missing or unavailable.
    // A full words.json file will still be used whenever it loads correctly.
    WORDS = FALLBACK_WORDS;
    wordsReady = true;
    wordsLoadError = "";

    console.warn(
      "IMPOSTER: words.json could not be loaded; using built-in fallback words.",
      error
    );

    return true;
  }
}

/*
  Guess the Emoji has its own small dataset.
  The main Imposter word database remains external.
*/

const EMOJI_WORDS = [
  { answer: "The Lion King", emojis: "🦁👑", category: "Movies & TV" },
  { answer: "Spider-Man", emojis: "🕷️🕸️🧑", category: "Movies & TV" },
  { answer: "Harry Potter", emojis: "🧙‍♂️⚡🏰", category: "Movies & TV" },
  { answer: "Titanic", emojis: "🚢💔", category: "Movies & TV" },
  { answer: "Squid Game", emojis: "🦑🎮🔴🟢", category: "Movies & TV" },
  { answer: "Iron Man", emojis: "🦸‍♂️🔴🤖", category: "Movies & TV" },
  { answer: "Batman", emojis: "🦇🌑🚗", category: "Movies & TV" },
  { answer: "Superman", emojis: "🦸‍♂️🔵🦸", category: "Movies & TV" },
  { answer: "Shrek", emojis: "👹💚🧅", category: "Movies & TV" },
  { answer: "Frozen", emojis: "❄️👸⛄", category: "Movies & TV" },
  { answer: "Finding Nemo", emojis: "🐠🐟🌊", category: "Movies & TV" },
  { answer: "The Matrix", emojis: "🕶️💻🟩", category: "Movies & TV" },

  { answer: "Baby Shark", emojis: "🦈👶🎵", category: "Songs & Music" },
  { answer: "Karaoke", emojis: "🎤🎵🍻", category: "Songs & Music" },
  { answer: "Guitar", emojis: "🎸🎶", category: "Songs & Music" },
  { answer: "Piano", emojis: "🎹🎶", category: "Songs & Music" },
  { answer: "Drums", emojis: "🥁🎵", category: "Songs & Music" },
  { answer: "Headphones", emojis: "🎧🎵", category: "Songs & Music" },
  { answer: "Concert", emojis: "🎤🎶👥", category: "Songs & Music" },
  { answer: "DJ", emojis: "🎧🎛️🎉", category: "Songs & Music" },

  { answer: "Minecraft", emojis: "🟩⛏️🏠", category: "Video Games" },
  { answer: "Among Us", emojis: "🧑‍🚀🔪🚨", category: "Video Games" },
  { answer: "Pokémon", emojis: "🐭⚡🔴⚪", category: "Video Games" },
  { answer: "Pikachu", emojis: "⚡🐭", category: "Video Games" },
  { answer: "Mario", emojis: "🍄👨‍🔧🐢", category: "Video Games" },
  { answer: "Sonic", emojis: "🦔💨🔵", category: "Video Games" },
  { answer: "Free Fire", emojis: "🔥🔫📱", category: "Video Games" },
  { answer: "Clash of Clans", emojis: "🏰⚔️📱", category: "Video Games" },
  { answer: "Candy Crush", emojis: "🍬💥📱", category: "Video Games" },
  { answer: "Subway Surfers", emojis: "🚇🏃‍♂️🛹", category: "Video Games" },

  { answer: "Pizza", emojis: "🍕🧀", category: "Food" },
  { answer: "Burger", emojis: "🍔🍟", category: "Food" },
  { answer: "Biryani", emojis: "🍚🍗", category: "Food" },
  { answer: "Maggi", emojis: "🍜⏱️", category: "Food" },
  { answer: "Ice Cream", emojis: "🍦🥶", category: "Food" },
  { answer: "Chocolate Cake", emojis: "🎂🍫", category: "Food" },
  { answer: "Pani Puri", emojis: "🥟💧😋", category: "Food" },
  { answer: "Samosa", emojis: "🥟🌶️", category: "Food" },
  { answer: "Dosa", emojis: "🥞🥥🇮🇳", category: "Food" },
  { answer: "Gulab Jamun", emojis: "🟤🍯", category: "Food" },
  { answer: "Jalebi", emojis: "🌀🍯", category: "Food" },
  { answer: "Popcorn", emojis: "🍿🎬", category: "Food" },

  { answer: "Mount Everest", emojis: "🏔️❄️🧗", category: "Places" },
  { answer: "Taj Mahal", emojis: "🕌🤍🇮🇳", category: "Places" },
  { answer: "Goa", emojis: "🏖️🌴🍹", category: "Places" },
  { answer: "Mumbai", emojis: "🏙️🚂🎬", category: "Places" },
  { answer: "Delhi", emojis: "🇮🇳🏛️🚇", category: "Places" },
  { answer: "Antarctica", emojis: "🐧❄️🧊", category: "Places" },
  { answer: "Desert", emojis: "🏜️🐪☀️", category: "Places" },
  { answer: "Beach", emojis: "🏖️🌊⛱️", category: "Places" },
  { answer: "Jungle", emojis: "🌳🐒🐍", category: "Places" },
  { answer: "Space", emojis: "🚀🌌🪐", category: "Places" },

  { answer: "Cristiano Ronaldo", emojis: "⚽🇵🇹7️⃣", category: "Famous Personalities" },
  { answer: "Lionel Messi", emojis: "⚽🇦🇷🐐", category: "Famous Personalities" },
  { answer: "Virat Kohli", emojis: "🏏🇮🇳🔥", category: "Famous Personalities" },
  { answer: "MS Dhoni", emojis: "🏏🧤🇮🇳", category: "Famous Personalities" },
  { answer: "Shah Rukh Khan", emojis: "🎬❤️👑", category: "Famous Personalities" },
  { answer: "MrBeast", emojis: "💸🎥🎉", category: "Famous Personalities" },
  { answer: "Albert Einstein", emojis: "🧑‍🔬🧠💡", category: "Famous Personalities" },
  { answer: "Michael Jackson", emojis: "🕺🎤🌙", category: "Famous Personalities" },

  { answer: "Doraemon", emojis: "🤖🐱🔵", category: "Fictional Characters" },
  { answer: "Shinchan", emojis: "👦😈👖", category: "Fictional Characters" },
  { answer: "Tom and Jerry", emojis: "🐱🐭💥", category: "Fictional Characters" },
  { answer: "Mickey Mouse", emojis: "🐭🎩🔴", category: "Fictional Characters" },
  { answer: "Donald Duck", emojis: "🦆🔵😤", category: "Fictional Characters" },
  { answer: "Panda", emojis: "🐼🎍", category: "Fictional Characters" },
  { answer: "Unicorn", emojis: "🦄🌈✨", category: "Fictional Characters" },
  { answer: "Dragon", emojis: "🐉🔥🏰", category: "Fictional Characters" }
];

const ID_ALIASES = {
  categorySelect: "category",
  difficultySelect: "difficulty",
  revealName: "frontName",
  revealWord: "secretWord",
  revealRole: "roleTitle",
  revealCategory: "roleText",
  revealBtn: "revealCard",
  nextRevealBtn: "nextBtn",
  discussionTimer: "timer",
  confirmVoteBtn: "submitVotes",
  lastChanceInput: "lastChanceGuess",
  resultTitle: "resHead",
  resultSubtitle: "resMsg",
  resultWord: "resWord",
  resultCategory: "resSummary",
  resultPlayers: "resPlayers",
  quickRematchBtn: "quickRematch",
  playAgainBtn: "again",
  startGameBtn: "startBtn",
  emojiPuzzle: "emojiClue",
  emojiNextBtn: "emojiNext"
};
const $ = id => document.getElementById(ID_ALIASES[id] || id);

const DEFAULTS = {
  light: false,
  sound: true,
  calm: false,
  board: true,
  hints: true,
  timer: 120,
  haptics: true,
  preferFullscreen: false
};

const state = {
  names: [],
  players: [],
  roles: [],
  word: "",
  idx: 0,
  seen: false,
  left: 120,
  total: 120,
  tick: null,
  votes: [],
  scored: false,
  lastWords: [],
  gains: {},
  mode: "classic",
  roundActive: false,
  lastChanceAccused: -1,
  lastChanceCorrect: false
};

/* ---------- Safe storage ---------- */

const store = {
  get(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value ?? fallback;
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }
};

let settings = Object.assign({}, DEFAULTS);

(function loadSettings() {
  const saved = store.get("imposterSettings", {});

  if (saved && typeof saved === "object") {
    for (const key in DEFAULTS) {
      if (typeof saved[key] === typeof DEFAULTS[key]) {
        settings[key] = saved[key];
      }
    }
  }
})();

function getScores() {
  const scores = store.get("imposterScores", {});
  const clean = {};

  if (scores && typeof scores === "object") {
    for (const [name, value] of Object.entries(scores)) {
      if (Number.isFinite(value)) clean[name] = value;
    }
  }

  return clean;
}

/* ---------- Feedback: toast, sound, haptics ---------- */

let toastT;

function toast(message) {
  const element = $("toast");
  if (!element) return;

  element.textContent = message;
  element.classList.add("show");

  clearTimeout(toastT);

  toastT = setTimeout(() => {
    element.classList.remove("show");
  }, 2200);
}

let ac;

function beep(freq = 440, duration = 0.12) {
  if (!settings.sound) return;

  try {
    ac = ac || new (
      window.AudioContext ||
      window.webkitAudioContext
    )();

    const oscillator = ac.createOscillator();
    const gain = ac.createGain();

    oscillator.frequency.value = freq;
    gain.gain.value = 0.06;

    oscillator.connect(gain);
    gain.connect(ac.destination);

    oscillator.start();

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      ac.currentTime + duration
    );

    oscillator.stop(ac.currentTime + duration);
  } catch {}
}

const buzz = milliseconds => {
  try {
    if (
      settings.haptics !== false &&
      !settings.calm &&
      navigator.vibrate
    ) {
      navigator.vibrate(milliseconds);
    }
  } catch {}
};

function confetti() {
  if (
    settings.calm ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  const colours = [
    "#8b5cf6",
    "#e0409a",
    "#5eead4",
    "#fbbf24"
  ];

  for (let i = 0; i < 40; i++) {
    const piece = document.createElement("i");

    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colours[i % colours.length];
    piece.style.animationDelay = Math.random() * 0.5 + "s";

    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 3000);
  }
}

function confirmDialog(message) {
  return new Promise(resolve => {
    const dialog = $("dlg");

    if (!dialog) {
      resolve(window.confirm(message));
      return;
    }

    $("dlgText").textContent = message;

    const finish = answer => {
      if (dialog.open) dialog.close();
      resolve(answer);
    };

    $("dlgYes").onclick = () => finish(true);
    $("dlgNo").onclick = () => finish(false);

    dialog.oncancel = event => {
      event.preventDefault();
      finish(false);
    };

    dialog.showModal();
  });
}

/* ---------- Navigation and settings ---------- */

function show(id) {
  if (id !== "resultsScreen") cancelResultsReveal();

  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.toggle("is-active", screen.id === id);
  });

  if (id !== "discussionScreen") pauseTimer();

  if (id === "homeScreen") renderHome();
  if (id === "leaderboardScreen") renderBoard("boardMain");
  if (id === "achievementsScreen") renderAchievements();

  window.scrollTo(0, 0);

  const heading = document.querySelector(
    `#${id} h1, #${id} h2`
  );

  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
}

function applySettings() {
  document.body.classList.toggle("is-light", settings.light);
  document.body.classList.toggle("is-calm", settings.calm);

  const settingsMap = [
    ["setLight", settings.light],
    ["setSound", settings.sound],
    ["setMotion", settings.calm],
    ["setBoard", settings.board],
    ["setHints", settings.hints],
    ["hintOpt", settings.hints]
  ];

  settingsMap.forEach(([id, value]) => {
    const element = $(id);
    if (element) element.checked = value;
  });

  if ($("setHaptics")) {
    $("setHaptics").checked = settings.haptics !== false;
  }

  if ($("setFullscreen")) {
    $("setFullscreen").checked = !!settings.preferFullscreen;
  }

  if ($("setTimer")) {
    $("setTimer").value = String(settings.timer);
  }

  if ($("timerOpt")) {
    $("timerOpt").value = String(settings.timer);
  }

  const themeToggle = $("themeToggle");

  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-pressed",
      String(settings.light)
    );

    themeToggle.setAttribute(
      "aria-label",
      settings.light
        ? "Switch to dark theme"
        : "Switch to light theme"
    );
  }

  store.set("imposterSettings", settings);
}

function loadStats() {
  const saved = store.get("imposterStats", {});

  return {
    rounds: 0,
    civilianWins: 0,
    imposterWins: 0,
    perfectVotes: 0,
    maxPlayers: 0,
    speedWins: 0,
    ...(saved && typeof saved === "object" ? saved : {})
  };
}

const ACHIEVEMENTS = [
  {
    id: "first",
    icon: "🎬",
    title: "First Blood",
    desc: "Finish your first round.",
    test: stats => stats.rounds >= 1
  },
  {
    id: "veteran",
    icon: "🧠",
    title: "Veteran Crew",
    desc: "Play 10 rounds.",
    test: stats => stats.rounds >= 10
  },
  {
    id: "civilian",
    icon: "🛡️",
    title: "Truth Wins",
    desc: "Win 5 rounds as civilians.",
    test: stats => stats.civilianWins >= 5
  },
  {
    id: "imposter",
    icon: "🕶️",
    title: "Master of Lies",
    desc: "Win 5 rounds as an imposter.",
    test: stats => stats.imposterWins >= 5
  },
  {
    id: "detective",
    icon: "🎯",
    title: "Sharp Detective",
    desc: "Catch an imposter with every vote on the same player.",
    test: stats => stats.perfectVotes >= 1
  },
  {
    id: "squad",
    icon: "👥",
    title: "Full House",
    desc: "Play a round with 8 or more players.",
    test: stats => stats.maxPlayers >= 8
  }
];

function renderHome() {
  const stats = loadStats();

  if ($("statRounds")) {
    $("statRounds").textContent = stats.rounds;
  }

  const top = Object.entries(getScores())
    .sort((a, b) => b[1] - a[1])[0];

  if ($("statTop")) {
    $("statTop").textContent = top
      ? `${top[0]} (${top[1]})`
      : "None yet";
  }

  if ($("statAchievements")) {
    $("statAchievements").textContent =
      `${ACHIEVEMENTS.filter(a => a.test(stats)).length} / ` +
      `${ACHIEVEMENTS.length}`;
  }
}

function renderAchievements() {
  const stats = loadStats();
  const grid = $("achievementGrid");

  if (!grid) return;

  grid.innerHTML = "";

  ACHIEVEMENTS.forEach(achievement => {
    const unlocked = achievement.test(stats);

    const card = document.createElement("article");
    card.className =
      "achievement-card " +
      (unlocked ? "is-unlocked" : "is-locked");

    const icon = document.createElement("div");
    icon.className = "achievement-icon";
    icon.textContent = unlocked ? achievement.icon : "🔒";

    const title = document.createElement("h3");
    title.textContent = achievement.title;

    const description = document.createElement("p");
    description.textContent = achievement.desc;

    const tag = document.createElement("span");
    tag.className = "achievement-tag";
    tag.textContent = unlocked ? "UNLOCKED" : "LOCKED";

    card.append(icon, title, description, tag);
    grid.append(card);
  });

  const statsBox = $("careerStats");

  if (statsBox) {
    statsBox.innerHTML = "";

    [
      ["Rounds played", stats.rounds],
      ["Civilian wins", stats.civilianWins],
      ["Imposter wins", stats.imposterWins],
      ["Perfect catches", stats.perfectVotes],
      ["Largest lobby", stats.maxPlayers],
      ["Speed Run wins", stats.speedWins]
    ].forEach(([label, value]) => {
      const row = document.createElement("div");
      row.className = "career-stat";

      const term = document.createElement("dt");
      term.textContent = label;

      const definition = document.createElement("dd");
      definition.textContent = value;

      row.append(term, definition);
      statsBox.append(row);
    });
  }
}

/* ---------- Player setup ---------- */

function imposterMax() {
  return Math.max(
    1,
    Math.min(3, Math.floor((state.names.length - 1) / 2))
  );
}

function uniqueNames() {
  const seen = {};

  return state.names.map(name => {
    const key = name.toLowerCase();

    seen[key] = (seen[key] || 0) + 1;

    return seen[key] > 1
      ? `${name} (${seen[key]})`
      : name;
  });
}

function renderSetup() {
  if (!$("playerCount")) return;

  $("playerCount").textContent =
    `${state.names.length} / 12`;

  const list = $("playerList");
  list.innerHTML = "";

  state.names.forEach((name, index) => {
    const item = document.createElement("li");
    const label = document.createElement("span");
    const remove = document.createElement("button");

    label.textContent = name;

    remove.type = "button";
    remove.textContent = "✕";
    remove.setAttribute(
      "aria-label",
      `Remove ${name}`
    );

    remove.onclick = () => {
      state.names.splice(index, 1);
      store.set("imposterPlayers", state.names);
      renderSetup();
    };

    item.append(label, remove);
    list.append(item);
  });

  $("playerEmpty").hidden = state.names.length > 0;

  const selector = $("impCount");
  const previous = Number(selector.value) || 1;

  selector.innerHTML = "";

  for (let count = 1; count <= imposterMax(); count++) {
    selector.add(
      new Option(
        `${count} imposter${count > 1 ? "s" : ""}`,
        count
      )
    );
  }

  selector.value = Math.min(previous, imposterMax());
}

function addPlayer() {
  const input = $("newPlayerName");
  const name = input.value.trim().slice(0, 16);
  const error = $("setupError");

  if (!name) {
    error.textContent = "Type a name first.";
    return;
  }

  if (state.names.length >= 12) {
    error.textContent = "Maximum is 12 players.";
    return;
  }

  error.textContent = "";

  state.names.push(name);
  input.value = "";

  store.set("imposterPlayers", state.names);

  renderSetup();
  input.focus();
}

/* =========================================================
   PART 2 — WORD SELECTION AND GAMEPLAY
   ========================================================= */

/* ---------- Random helpers ---------- */

function randomInt(max) {
  if (!Number.isInteger(max) || max <= 0) return 0;

  if (window.crypto && window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    const limit = Math.floor(4294967296 / max) * max;

    let value;

    do {
      window.crypto.getRandomValues(array);
      value = array[0];
    } while (value >= limit);

    return value % max;
  }

  return Math.floor(Math.random() * max);
}

function pickRandom(items) {
  if (!Array.isArray(items) || !items.length) return null;
  return items[randomInt(items.length)];
}

function shuffle(items) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

/* ---------- Category and difficulty selection ---------- */

function getSelectedCategory() {
  const select = $("categorySelect");
  return select ? select.value : "random";
}

function getSelectedDifficulty() {
  const select = $("difficultySelect");
  return select ? (select.value === "chaos" ? "all" : select.value.toLowerCase()) : "all";
}

function getEligibleCategories() {
  const selected = getSelectedCategory();
  const difficulty = getSelectedDifficulty();

  return Object.entries(WORDS)
    .filter(([category, entries]) => {
      if (selected !== "random" && selected !== category) {
        return false;
      }

      return entries.some(entry => {
        return (
          difficulty === "all" ||
          entry.difficulty === difficulty
        );
      });
    })
    .map(([category, entries]) => ({
      category,
      entries: entries.filter(entry => {
        return (
          difficulty === "all" ||
          entry.difficulty === difficulty
        );
      })
    }))
    .filter(group => group.entries.length > 0);
}

function populateCategorySelect() {
  const select = $("categorySelect");
  if (!select) return;

  const previous = select.value || "random";

  select.innerHTML = "";

  select.add(new Option("🎲 Random Mix", "random"));

  Object.keys(WORDS)
    .sort((a, b) => a.localeCompare(b))
    .forEach(category => {
      select.add(new Option(category, category));
    });

  select.value = Object.hasOwn(WORDS, previous)
    ? previous
    : "random";
}

/* ---------- Word history and selection ---------- */

function getWordKey(category, entry) {
  return `${category}::${entry.word.toLowerCase()}`;
}

function chooseSecretWord() {
  if (!wordsReady) {
    throw new Error(
      wordsLoadError || "The word database isn't ready."
    );
  }

  const categories = getEligibleCategories();

  if (!categories.length) {
    throw new Error(
      "No words match your selected category and difficulty."
    );
  }

  /*
    Random Mix first chooses a category, then a word.
    This prevents categories with huge datasets from
    automatically dominating selection.
  */

  const allEntries = categories.flatMap(group =>
    group.entries.map(entry => ({
      category: group.category,
      entry
    }))
  );

  const unused = allEntries.filter(item => {
    return !state.lastWords.includes(
      getWordKey(item.category, item.entry)
    );
  });

  /*
    If possible, choose a word not used recently.
    When every eligible word has been used, clear history.
  */

  let pool = unused.length ? unused : allEntries;

  if (!unused.length) {
    state.lastWords = [];
  }

  const selectedCategory = pickRandom([
    ...new Set(pool.map(item => item.category))
  ]);

  const categoryPool = pool.filter(
    item => item.category === selectedCategory
  );

  const selected = pickRandom(categoryPool);

  if (!selected) {
    throw new Error("Couldn't select a word.");
  }

  state.lastWords.push(
    getWordKey(selected.category, selected.entry)
  );

  state.lastWords = state.lastWords.slice(-30);

  return {
    ...selected.entry,
    category: selected.category
  };
}

/* ---------- Mode configuration ---------- */

const MODE_CONFIG = {
  classic: {
    label: "Classic",
    imposters: 1,
    timer: true,
    blind: false,
    chaos: false,
    partners: false,
    fakeClue: false,
    lastChance: false
  },

  speed: {
    label: "Speed Run",
    imposters: 1,
    timer: true,
    blind: false,
    chaos: false,
    partners: false,
    fakeClue: false,
    lastChance: false,
    speed: true
  },

  double: {
    label: "Double Trouble",
    imposters: 2,
    timer: true,
    blind: false,
    chaos: false,
    partners: false,
    fakeClue: false,
    lastChance: false
  },

  blind: {
    label: "Blind Imposter",
    imposters: 1,
    timer: true,
    blind: true,
    chaos: false,
    partners: false,
    fakeClue: false,
    lastChance: false
  },

  chaos: {
    label: "Total Chaos",
    imposters: 2,
    timer: true,
    blind: true,
    chaos: true,
    partners: false,
    fakeClue: true,
    lastChance: true
  },

  partners: {
    label: "Hidden Partners",
    imposters: 1,
    timer: true,
    blind: false,
    chaos: false,
    partners: true,
    fakeClue: false,
    lastChance: false
  },

  fakeclue: {
    label: "Fake Clue",
    imposters: 1,
    timer: true,
    blind: false,
    chaos: false,
    partners: false,
    fakeClue: true,
    lastChance: false
  },

  lastchance: {
    label: "Last Chance",
    imposters: 1,
    timer: true,
    blind: false,
    chaos: false,
    partners: false,
    fakeClue: false,
    lastChance: true
  }
};

function getModeConfig() {
  return MODE_CONFIG[state.mode] || MODE_CONFIG.classic;
}

function readModeFromUI() {
  const select = $("gameMode");
  if (!select) return "classic";

  const value = select.value.toLowerCase();

  const aliases = {
    "classic": "classic",
    "speed": "speed",
    "speedrun": "speed",
    "speed run": "speed",
    "double": "double",
    "doubletrouble": "double",
    "double trouble": "double",
    "blind": "blind",
    "blindimposter": "blind",
    "blind imposter": "blind",
    "chaos": "chaos",
    "totalchaos": "chaos",
    "total chaos": "chaos",
    "partners": "partners",
    "hiddenpartners": "partners",
    "hidden partners": "partners",
    "fakeclue": "fakeclue",
    "fake clue": "fakeclue",
    "lastchance": "lastchance",
    "last chance": "lastchance"
  };

  return aliases[value] || "classic";
}

/* ---------- Player role assignment ---------- */

function makeRoleList(playerCount, imposterCount) {
  if (playerCount < 3) {
    throw new Error("You need at least 3 players.");
  }

  const maximum = Math.max(
    1,
    Math.floor((playerCount - 1) / 2)
  );

  const count = Math.max(
    1,
    Math.min(imposterCount, maximum)
  );

  const roles = Array(playerCount).fill("civilian");

  shuffle(
    Array.from({ length: playerCount }, (_, i) => i)
  )
    .slice(0, count)
    .forEach(index => {
      roles[index] = "imposter";
    });

  return roles;
}

function makePartners(roles) {
  /*
    Assign two civilians as hidden partners when possible.
    Partners are a separate attribute, not an extra imposter.
  */

  const candidates = shuffle(
    roles
      .map((role, index) => ({ role, index }))
      .filter(item => item.role === "civilian")
      .map(item => item.index)
  );

  if (candidates.length < 2) return [];

  return candidates.slice(0, 2);
}

/* ---------- Starting a round ---------- */

function readPlayerNames() {
  return state.names
    .map(name => name.trim())
    .filter(Boolean);
}

function readImposterCount() {
  const config = getModeConfig();

  if (config.imposters > 1) {
    return config.imposters;
  }

  const selector = $("impCount");
  return selector ? Number(selector.value) || 1 : 1;
}

function startGame() {
  if (!wordsReady) {
    toast("The word database is still loading.");
    return;
  }

  const names = readPlayerNames();

  if (names.length < 3) {
    toast("Add at least 3 players first.");
    show("setupScreen");
    return;
  }

  if (names.length > 12) {
    toast("Maximum is 12 players.");
    return;
  }

  try {
    state.mode = readModeFromUI();
    const config = getModeConfig();
    if (config.chaos) {
      const category = $("category");
      if (category) category.value = "random";
      const difficulty = $("difficulty");
      if (difficulty) difficulty.value = pickRandom(["easy", "medium", "hard"]);
    }
    const selected = chooseSecretWord();

    const requestedImposters = readImposterCount();

    state.names = names;
    state.word = selected.word;
    state.idx = 0;
    state.seen = false;
    state.votes = [];
    state.scored = false;
    state.lastChanceAccused = -1;
    state.lastChanceCorrect = false;

    state.roles = makeRoleList(
      names.length,
      requestedImposters
    );

    state.players = names.map((name, index) => {
      const isImposter = state.roles[index] === "imposter";

      return {
        name,
        role: state.roles[index],
        // Imposters never receive the real word.
        word: isImposter ? "" : selected.word,
        category: selected.category,
        // Only the imposter gets the hint; civilians already know the word.
        hint: isImposter ? (selected.hint || "") : "",
        partner: false,
        votedFor: null
      };
    });

    if (config.partners) {
      const partners = makePartners(state.roles);

      partners.forEach(index => {
        state.players[index].partner = true;
      });
    }

    if (config.fakeClue) {
      state.players.forEach(player => {
        if (player.role !== "imposter") return;

        const entry = WORDS[player.category] || [];

        const source = entry.find(
          word => word.word === selected.word
        );

        if (source && source.relatedWord) {
          player.word = source.relatedWord;
          player.hint = source.relatedHint || "";
        }
      });
    }

    if (config.blind) {
      state.players.forEach(player => {
        if (player.role === "imposter") {
          player.word = "";
          player.hint = "";
        }
      });
    }

    state.left = config.speed ? 60 : Number(settings.timer);
    state.total = state.left;
    state.roundActive = true;

    state.votes = Array(names.length).fill(-1);

    store.set("imposterPlayers", names);

    prepareRevealScreen();
    show("revealScreen");
  } catch (error) {
    console.error(error);
    toast(error.message || "Couldn't start the game.");
  }
}

/* ---------- Secret card reveal ---------- */

function prepareRevealScreen() {
  const player = state.players[state.idx];
  if (!player) return;
  setText("frontName", player.name);
  setText("backName", player.name);
  setText("secretWord", "••••••••");
  setText("roleTitle", "YOUR SECRET ROLE");
  setText("roleText", "Press and hold the card to reveal your role.");
  setText("revealHint", "");
  const card = $("revealCard");
  if (card) {
    card.classList.remove("is-held", "is-imposter");
    card.setAttribute("aria-pressed", "false");
  }
  setVisible("nextBtn", false);
  setVisible("hideBtn", false);
  setText("revealCount", `PLAYER ${state.idx + 1} OF ${state.players.length}`);
  const progress = document.querySelector(".progress__fill");
  if (progress) progress.style.width = `${(state.idx / state.players.length) * 100}%`;
  state.seen = false;
}

function revealCard() {
  if (state.seen) return;
  const player = state.players[state.idx];
  if (!player) return;
  state.seen = true;
  const config = getModeConfig();
  setText("backName", player.name);
  setText("roleTitle", player.role === "imposter" ? "🕵️ YOU ARE THE IMPOSTER" : "🟢 YOU ARE A CIVILIAN");
  setText("secretWord", player.role === "imposter"
    ? (player.word || (config.blind ? "NO SECRET WORD" : "YOU ARE THE IMPOSTER"))
    : player.word);
  let roleMessage = player.role === "imposter" ? "Blend in. Give clues that sound convincing." : `Category: ${player.category}`;
  if (config.partners && player.partner) roleMessage += " · You have a secret partner.";
  setText("roleText", roleMessage);
  setText("revealHint", settings.hints && player.hint ? `Hint: ${player.hint}` : "");
  const card = $("revealCard");
  if (card) {
    card.classList.add("is-held");
    card.classList.toggle("is-imposter", player.role === "imposter");
    card.setAttribute("aria-pressed", "true");
  }
  // The card stays visible only while the player is physically holding it.
  setVisible("hideBtn", false);
  setVisible("nextBtn", false);
  setText("holdIndicator", "Card is open — let go to hide it.");
  beep(620, 0.15);
  buzz(30);
}

function hideRevealCard() {
  // Ignore stray pointer/key-up events when the card is already hidden.
  if (!state.seen) return;

  const card = $("revealCard");
  if (card) {
    card.classList.remove("is-held", "is-imposter");
    card.setAttribute("aria-pressed", "false");
  }

  if (state.players[state.idx]) {
    setText("secretWord", "••••••••");
    setText("roleTitle", "YOUR SECRET ROLE");
    setText("roleText", "Card hidden. Pass the phone privately.");
    setText("revealHint", "");
  }

  state.seen = false;
  setVisible("hideBtn", false);
  setVisible("nextBtn", true);
  setText("holdIndicator", "Card hidden — pass the phone, then continue.");
}

function nextReveal() {
  if (state.seen) {
    toast("Hide the card before passing the phone.");
    return;
  }
  state.idx++;
  if (state.idx < state.players.length) {
    prepareRevealScreen();
    return;
  }
  startDiscussion();
}

/* ---------- Discussion and timer ---------- */

function startDiscussion() {
  show("discussionScreen");

  const config = getModeConfig();

  if ($("discussionWord")) {
    $("discussionWord").textContent =
      config.blind
        ? "Describe your clues carefully."
        : "Discuss the secret word!";
  }

  if ($("discussionTimer")) {
    $("discussionTimer").textContent = formatTime(state.left);
  }

  if ($("discussionMode")) {
    $("discussionMode").textContent = config.label;
  }

  startTimer();
}

function formatTime(seconds) {
  const safe = Math.max(0, Math.floor(seconds));

  return (
    String(Math.floor(safe / 60)).padStart(2, "0") +
    ":" +
    String(safe % 60).padStart(2, "0")
  );
}

function startTimer() {
  pauseTimer();

  if (!getModeConfig().timer) return;

  state.tick = setInterval(() => {
    state.left = Math.max(0, state.left - 1);

    if ($("discussionTimer")) {
      $("discussionTimer").textContent =
        formatTime(state.left);
    }

    if (state.left <= 0) {
      pauseTimer();
      toast("Time's up!");
      buzz([100, 80, 100]);
    }
  }, 1000);
}

function pauseTimer() {
  if (state.tick) {
    clearInterval(state.tick);
    state.tick = null;
  }
}

/* ---------- Voting ---------- */
/* ---------- Voting ---------- */

function beginVoting() {
  pauseTimer();

  state.votes = Array(state.players.length).fill(0);
  state.remainingVotes = state.players.length;

  renderVoting();
  show("votingScreen");
}

function getTotalVotes() {
  return state.votes.reduce((sum, votes) => sum + votes, 0);
}

function renderVoting() {
  const list = $("voteList");
  if (!list) return;

  list.innerHTML = "";

  const totalPlayers = state.players.length;
  const totalVotes = getTotalVotes();
  const remainingVotes = totalPlayers - totalVotes;

  state.players.forEach((player, index) => {
    const card = document.createElement("div");
    card.className = "vote-player";

    const header = document.createElement("div");
    header.className = "vote-player__header";

    const name = document.createElement("span");
    name.className = "vote-player__name";
    name.textContent = player.name;

    const count = document.createElement("span");
    count.className = "vote-count";
    count.textContent = `${state.votes[index] || 0} vote${state.votes[index] === 1 ? "" : "s"}`;

    header.append(name, count);

    const controls = document.createElement("div");
    controls.className = "vote-controls";

    const minus = document.createElement("button");
    minus.type = "button";
    minus.className = "vote-btn vote-btn--minus";
    minus.textContent = "−";
    minus.setAttribute("aria-label", `Remove a vote from ${player.name}`);
    minus.disabled = !(state.votes[index] > 0);

    minus.addEventListener("click", () => {
      if (state.votes[index] > 0) {
        state.votes[index]--;
        state.remainingVotes++;
        renderVoting();
      }
    });

    const plus = document.createElement("button");
    plus.type = "button";
    plus.className = "vote-btn vote-btn--plus";
    plus.textContent = "+";
    plus.setAttribute("aria-label", `Add a vote for ${player.name}`);
    plus.disabled = remainingVotes <= 0;

    plus.addEventListener("click", () => {
      const total = getTotalVotes();

      if (total >= state.players.length) {
        toast("All players have voted.");
        return;
      }

      state.votes[index]++;
      state.remainingVotes--;
      renderVoting();
    });

    controls.append(minus, plus);
    card.append(header, controls);
    list.append(card);
  });

  const info = $("voteInfo");
  if (info) {
    info.textContent = remainingVotes > 0
      ? `${remainingVotes} vote${remainingVotes === 1 ? "" : "s"} remaining`
      : "All votes recorded. Confirm to reveal the result.";
  }

  const submitBtn = $("submitVotes");
  if (submitBtn) {
    submitBtn.disabled = remainingVotes > 0;
  }
}

function submitAccusation(index) {
  if (!Number.isInteger(index) || index < 0 || index >= state.players.length) {
    toast("Choose a player first."); return;
  }
  state.lastChanceAccused = index;
  if (getModeConfig().lastChance && state.players[index].role === "imposter") {
    prepareLastChance();
  } else {
    resolveVote(index);
  }
}

function resolveVote(accusedIndex) {
  const maxVotes = Math.max(0, ...state.votes);
  const leaders = state.votes.map((votes, index) => ({ votes, index })).filter(item => item.votes === maxVotes && maxVotes > 0);
  if (leaders.length !== 1) {
    state.lastChanceAccused = -1;
    prepareResults(true, -1, true);
    return;
  }
  accusedIndex = leaders[0].index;
  const isImposter = state.players[accusedIndex]?.role === "imposter";
  state.lastChanceCorrect = isImposter;
  if (getModeConfig().lastChance && isImposter) {
    state.lastChanceAccused = accusedIndex;
    prepareLastChance();
    return;
  }
  prepareResults(!isImposter, accusedIndex);
}

/* ---------- Last Chance ---------- */

function prepareLastChance() {
  const accused = state.players[state.lastChanceAccused];
  if (!accused) return;
  setText("lastChancePrompt", `${accused.name} was caught as an imposter. They can try to guess the secret word.`);
  if ($("lastChanceInput")) $("lastChanceInput").value = "";
  setText("lastChanceError", "");
  show("lastChanceScreen");
}

function submitLastChance(event) {
  if (event && typeof event.preventDefault === "function") event.preventDefault();
  const accused = state.players[state.lastChanceAccused];
  if (!accused) return;
  const input = $("lastChanceInput");
  const guess = input ? input.value.trim() : "";
  if (!guess) { setText("lastChanceError", "Enter a guess first."); return; }
  const correct = guess.localeCompare(state.word, undefined, { sensitivity: "accent" }) === 0;
  state.lastChanceCorrect = correct;
  prepareResults(correct, state.lastChanceAccused);
}

/* ---------- Results ---------- */

function prepareResults(imposterWins, accusedIndex, tied = false) {
  pauseTimer();
  state.roundActive = false;
  const accused = accusedIndex >= 0 ? state.players[accusedIndex] : null;
  setText("resultTitle", imposterWins ? "🕵️ IMPOSTER WINS!" : "🛡️ CREW WINS!");
  setText("resultSubtitle", tied ? "The vote was tied or no votes were recorded. Nobody was caught." : accused ? `${accused.name} was accused.` : "Round completed.");
  setText("resultWord", state.word);
  const imposters = $("resImposters");
  if (imposters) {
    imposters.innerHTML = "";
    state.players.filter(player => player.role === "imposter").forEach(player => {
      const li = document.createElement("li"); li.textContent = player.name; imposters.append(li);
    });
  }
  const list = $("resultPlayers");
  if (list) {
    list.innerHTML = "";
    state.players.forEach((player, index) => {
      const row = document.createElement("div");
      row.className = "result-row";
      const votes = state.votes[index] || 0;
      row.textContent = `${player.name} — ${player.role === "imposter" ? "🕵️ Imposter" : "🟢 Civilian"} · ${votes} vote${votes === 1 ? "" : "s"}`;
      list.append(row);
    });
  }
  setText("resSummary", tied ? "No single player received the most votes." : `${accused ? accused.name + " was accused. " : ""}${imposterWins ? "The imposters win this round." : "The crew wins this round."}${getModeConfig().lastChance && state.lastChanceCorrect ? " The final word guess was correct." : ""}`);
  scoreRound(imposterWins, accusedIndex);
  if ($("resBoardPanel")) $("resBoardPanel").hidden = settings.board === false;
  renderBoard("boardResult");
  show("resultsScreen");
  playResultsReveal(imposterWins, accusedIndex, tied);
}

/* ---------- Dramatic results reveal ---------- */

let fxRun = 0;

function injectFxStyles() {
  if (document.getElementById("fxStyles")) return;
  const style = document.createElement("style");
  style.id = "fxStyles";
  style.textContent = `
.fx-overlay{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:24px;overflow:hidden;color:#fff;text-align:center;cursor:pointer;
  background:radial-gradient(circle at 50% 38%,#2b1157 0%,#0c0720 62%,#05030f 100%);transition:opacity .5s,background .6s}
.fx-overlay.fx-win-imp{background:radial-gradient(circle at 50% 38%,#6a0f2e 0%,#25061a 60%,#08030a 100%)}
.fx-overlay.fx-win-crew{background:radial-gradient(circle at 50% 38%,#0b5f63 0%,#0b2147 60%,#050a18 100%)}
.fx-overlay.fx-out{opacity:0;pointer-events:none}
.fx-overlay::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.12;
  background:repeating-linear-gradient(0deg,#fff 0 1px,transparent 1px 4px)}
.fx-stage{position:relative;z-index:3;display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;max-width:560px}
.fx-label{font-size:.85rem;letter-spacing:.32em;text-transform:uppercase;opacity:.85;animation:fxFade .5s both}
.fx-sub{font-size:1.05rem;opacity:.9;animation:fxFade .7s .3s both;max-width:30ch}
.fx-num{font-size:min(40vw,230px);font-weight:900;line-height:1;text-shadow:0 0 50px #8b5cf6,0 0 12px #fff;animation:fxPop .8s ease-out both}
.fx-name{font-size:clamp(2.2rem,11vw,4.4rem);font-weight:900;line-height:1.05;word-break:break-word;animation:fxSlam .55s cubic-bezier(.2,1.6,.4,1) both}
.fx-name.fx-bad{color:#ff5c8a;text-shadow:2px 0 #22d3ee,-2px 0 #ff2d55;animation:fxSlam .55s cubic-bezier(.2,1.6,.4,1) both,fxGlitch .35s .55s 4}
.fx-role{font-size:clamp(1.8rem,9vw,3.4rem);font-weight:900;animation:fxFlip .8s cubic-bezier(.2,1.2,.3,1) both}
.fx-role.good{color:#5eead4;text-shadow:0 0 30px #14b8a6}
.fx-role.bad{color:#ff5c8a;text-shadow:0 0 30px #ff2d55}
.fx-emblem{font-size:clamp(4rem,22vw,9rem);line-height:1;animation:fxSlam .8s cubic-bezier(.2,1.6,.4,1) both,fxFloat 2.4s 1s ease-in-out infinite}
.fx-big{font-size:clamp(2.6rem,13.5vw,5.6rem);font-weight:900;line-height:1.02;letter-spacing:-.01em;color:transparent;-webkit-background-clip:text;background-clip:text;animation:fxSlam .8s .1s cubic-bezier(.2,1.6,.4,1) both,fxGlow 1.6s 1s ease-in-out infinite alternate}
.fx-win-imp .fx-big{background-image:linear-gradient(90deg,#ff3b6b,#e0409a,#fbbf24)}
.fx-win-crew .fx-big{background-image:linear-gradient(90deg,#5eead4,#38bdf8,#a78bfa)}
.fx-ring{position:absolute;z-index:1;width:55vmin;height:55vmin;border-radius:50%;border:3px solid rgba(139,92,246,.7);animation:fxRing 1.3s ease-out infinite;pointer-events:none}
.fx-ring.r2{animation-delay:.65s}
.fx-shock{position:absolute;z-index:1;width:20vmin;height:20vmin;border-radius:50%;border:6px solid #fff;opacity:0;pointer-events:none;animation:fxShock 1.1s ease-out both}
.fx-flash{position:absolute;inset:0;z-index:5;background:#fff;pointer-events:none;animation:fxFlash .9s ease-out both}
.fx-shake{animation:fxShake .55s both}
.fx-emoji{position:absolute;top:-12vh;z-index:2;pointer-events:none;animation:fxFall linear forwards}
.fx-skip{position:absolute;bottom:18px;left:0;right:0;z-index:4;font-size:.75rem;letter-spacing:.2em;opacity:.45;text-transform:uppercase}
.fx-cta{margin-top:18px;animation:fxRise .6s 1.4s both}
.fx-rise{animation:fxRise .6s cubic-bezier(.2,.9,.3,1) both}
.screen.fx-hidden{visibility:hidden}
body > .confetti{z-index:10001!important}
@keyframes fxFade{from{opacity:0;transform:translateY(8px)}to{opacity:.85;transform:none}}
@keyframes fxPop{0%{transform:scale(.2);opacity:0}40%{transform:scale(1.25);opacity:1}100%{transform:scale(1)}}
@keyframes fxSlam{0%{transform:scale(3.2) rotate(-6deg);opacity:0}100%{transform:scale(1) rotate(0);opacity:1}}
@keyframes fxFlip{0%{transform:perspective(600px) rotateX(90deg);opacity:0}100%{transform:perspective(600px) rotateX(0);opacity:1}}
@keyframes fxFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes fxGlow{from{filter:drop-shadow(0 0 6px rgba(255,255,255,.2))}to{filter:drop-shadow(0 0 26px rgba(255,255,255,.55))}}
@keyframes fxRing{0%{transform:scale(.4);opacity:.9}100%{transform:scale(1.6);opacity:0}}
@keyframes fxShock{0%{transform:scale(.2);opacity:.9}100%{transform:scale(9);opacity:0}}
@keyframes fxFlash{0%{opacity:.95}100%{opacity:0}}
@keyframes fxShake{0%,100%{transform:translate(0)}15%{transform:translate(-14px,6px)}30%{transform:translate(12px,-8px)}45%{transform:translate(-10px,-6px)}60%{transform:translate(8px,8px)}75%{transform:translate(-5px,3px)}}
@keyframes fxGlitch{0%,100%{transform:translate(0)}25%{transform:translate(-5px,2px) skewX(6deg)}50%{transform:translate(5px,-2px) skewX(-6deg)}75%{transform:translate(-3px,-2px)}}
@keyframes fxFall{0%{transform:translateY(0) rotate(0)}100%{transform:translateY(120vh) rotate(540deg)}}
@keyframes fxRise{from{opacity:0;transform:translateY(26px) scale(.96)}to{opacity:1;transform:none}}
.is-calm .fx-overlay *,.is-calm .fx-rise{animation-duration:.01s!important;animation-delay:0s!important;animation-iteration-count:1!important}
@media (prefers-reduced-motion:reduce){.fx-overlay *,.fx-rise{animation-duration:.01s!important;animation-delay:0s!important;animation-iteration-count:1!important}}
`;
  document.head.appendChild(style);
}

function cancelResultsReveal() {
  fxRun++;
  const overlay = document.getElementById("fxOverlay");
  if (overlay) overlay.remove();
  const screen = document.getElementById("resultsScreen");
  if (screen) screen.classList.remove("fx-hidden");
}

function playResultsReveal(imposterWins, accusedIndex, tied) {
  injectFxStyles();

  const token = ++fxRun;
  const calm =
    settings.calm ||
    matchMedia("(prefers-reduced-motion: reduce)").matches;
  const speed = calm ? 0.5 : 1;
  const screen = $("resultsScreen");
  const accused = accusedIndex >= 0 ? state.players[accusedIndex] : null;
  const config = getModeConfig();

  const old = document.getElementById("fxOverlay");
  if (old) old.remove();

  screen.classList.add("fx-hidden");

  const overlay = document.createElement("div");
  overlay.id = "fxOverlay";
  overlay.className = "fx-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-label", "Round result reveal");

  const stage = document.createElement("div");
  stage.className = "fx-stage";

  const skipHint = document.createElement("div");
  skipHint.className = "fx-skip";
  skipHint.textContent = "Tap to skip";

  overlay.append(stage, skipHint);
  document.body.appendChild(overlay);

  const h = (tag, cls, text) => {
    const node = document.createElement(tag);
    node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const setStage = (...nodes) => {
    stage.replaceChildren(...nodes);
  };

  let skipped = false;
  let finaleShown = false;
  const waiters = new Set();

  const alive = () => token === fxRun && document.body.contains(overlay);

  const sleep = ms =>
    new Promise(resolve => {
      if (skipped) return resolve();
      let done;
      const timer = setTimeout(() => {
        waiters.delete(done);
        resolve();
      }, ms * speed);
      done = () => {
        clearTimeout(timer);
        resolve();
      };
      waiters.add(done);
    });

  overlay.addEventListener("click", event => {
    if (finaleShown || event.target.closest("button")) return;
    skipped = true;
    waiters.forEach(fn => fn());
    waiters.clear();
  });

  const shake = () => {
    if (calm) return;
    overlay.classList.remove("fx-shake");
    void overlay.offsetWidth;
    overlay.classList.add("fx-shake");
  };

  const rain = (emojis, count) => {
    if (calm) return;
    for (let i = 0; i < count; i++) {
      const piece = h("span", "fx-emoji", emojis[i % emojis.length]);
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.fontSize = 1.2 + Math.random() * 1.8 + "rem";
      piece.style.animationDuration = 2.4 + Math.random() * 2.4 + "s";
      piece.style.animationDelay = Math.random() * 1.4 + "s";
      overlay.appendChild(piece);
    }
  };

  async function run() {
    /* 1 — suspense countdown */
    const ring1 = h("div", "fx-ring");
    const ring2 = h("div", "fx-ring r2");
    overlay.append(ring1, ring2);

    setStage(h("div", "fx-label", "The votes are in"));
    beep(220, 0.2);
    await sleep(1100);

    for (const [number, freq] of [["3", 330], ["2", 440], ["1", 560]]) {
      if (!alive() || skipped) break;
      setStage(h("div", "fx-label", "Revealing in"), h("div", "fx-num", number));
      beep(freq, 0.18);
      buzz(40);
      await sleep(850);
    }

    /* 2 — the accused */
    if (alive() && !skipped) {
      if (accused) {
        setStage(
          h("div", "fx-label", "The group accused"),
          h("div", "fx-name", accused.name)
        );
        beep(180, 0.35);
        shake();
        buzz(120);
        await sleep(1700);

        if (alive() && !skipped) {
          setStage(
            h("div", "fx-name", accused.name),
            h("div", "fx-label", "was…")
          );
          beep(260, 0.3);
          await sleep(1500);
        }

        if (alive() && !skipped) {
          const guilty = accused.role === "imposter";
          setStage(
            h("div", "fx-name", accused.name),
            h("div", "fx-role " + (guilty ? "good" : "bad"),
              guilty ? "🕵️ AN IMPOSTER!" : "🟢 INNOCENT!")
          );
          beep(guilty ? 720 : 150, 0.4);
          shake();
          buzz(guilty ? [80, 40, 80] : 250);
          await sleep(1700);

          if (alive() && !skipped && config.lastChance && guilty) {
            const correct = state.lastChanceCorrect;
            setStage(
              h("div", "fx-label", "Final word guess"),
              h("div", "fx-role " + (correct ? "bad" : "good"),
                correct ? "🎯 CORRECT!" : "❌ WRONG!")
            );
            beep(correct ? 800 : 200, 0.35);
            shake();
            await sleep(1500);
          }
        }
      } else {
        setStage(
          h("div", "fx-label", "The vote ended in"),
          h("div", "fx-role bad", "⚖️ A TIE!"),
          h("div", "fx-sub", "Nobody was caught…")
        );
        beep(200, 0.4);
        shake();
        buzz(200);
        await sleep(2000);
      }
    }

    /* 3 — who the imposters really were */
    const imposters = state.players.filter(p => p.role === "imposter");
    if (alive() && !skipped) {
      setStage(
        h("div", "fx-label", imposters.length > 1 ? "The imposters were" : "The imposter was")
      );
      await sleep(900);
      for (const player of imposters) {
        if (!alive() || skipped) break;
        stage.appendChild(h("div", "fx-name fx-bad", player.name));
        beep(300 + imposters.indexOf(player) * 90, 0.25);
        shake();
        buzz(100);
        await sleep(1000);
      }
      if (alive() && !skipped) await sleep(500);
    }

    if (!alive()) return;
    finale();
  }

  function finale() {
    finaleShown = true;
    skipped = true;

    overlay.querySelectorAll(".fx-ring").forEach(node => node.remove());
    overlay.classList.add(imposterWins ? "fx-win-imp" : "fx-win-crew");
    skipHint.remove();

    const cta = h("button", "button button--primary fx-cta", "SEE FULL RESULTS →");
    cta.type = "button";

    setStage(
      h("div", "fx-emblem", imposterWins ? "🕵️" : "🛡️"),
      h("div", "fx-big", imposterWins ? "IMPOSTER WINS!" : "CREW WINS!"),
      h("div", "fx-sub", $("resMsg") ? $("resMsg").textContent : ""),
      h("div", "fx-label", "The word was · " + state.word),
      cta
    );

    overlay.append(h("div", "fx-flash"), h("div", "fx-shock"));
    shake();
    buzz(imposterWins ? [60, 40, 60, 40, 200] : [200, 60, 200]);

    rain(
      imposterWins
        ? ["🕵️", "😈", "🔥", "🎭", "💀", "✨"]
        : ["🛡️", "🎉", "⭐", "🏆", "🎊", "✨"],
      44
    );
    confetti();
    setTimeout(confetti, 600);
    setTimeout(confetti, 1300);

    const notes = imposterWins ? [392, 330, 262, 523] : [523, 659, 784, 1047];
    notes.forEach((freq, i) => setTimeout(() => beep(freq, 0.28), i * 150));

    cta.addEventListener("click", () => {
      overlay.classList.add("fx-out");
      setTimeout(() => overlay.remove(), 520);
      screen.classList.remove("fx-hidden");
      [...screen.children].forEach((child, i) => {
        child.classList.remove("fx-rise");
        void child.offsetWidth;
        child.style.animationDelay = i * 0.1 + "s";
        child.classList.add("fx-rise");
      });
      window.scrollTo(0, 0);
    });
  }

  run();
}

/* ---------- Scoring and statistics ---------- */

function scoreRound(imposterWins, accusedIndex) {
  if (state.scored) return;
  state.scored = true;

  const stats = loadStats();

  stats.rounds++;
  stats.maxPlayers = Math.max(
    stats.maxPlayers,
    state.players.length
  );

  if (imposterWins) {
    stats.imposterWins++;
  } else {
    stats.civilianWins++;
  }

  if (
    !imposterWins &&
    accusedIndex >= 0 &&
    state.players[accusedIndex] &&
    state.players[accusedIndex].role === "imposter"
  ) {
    stats.perfectVotes++;
  }

  if (
    getModeConfig().speed &&
    !imposterWins
  ) {
    stats.speedWins++;
  }

  store.set("imposterStats", stats);

  const scores = getScores();

  state.players.forEach(player => {
    const won =
      player.role === "imposter"
        ? imposterWins
        : !imposterWins;

    const points = won ? (player.role === "imposter" ? 3 : 2) : 0;
    scores[player.name] = (scores[player.name] || 0) + points;
  });

  store.set("imposterScores", scores);
}

/* ---------- Quick Rematch ---------- */

function quickRematch() {
  if (state.names.length < 3) {
    toast("Add at least 3 players.");
    show("setupScreen");
    return;
  }

  startGame();
}

/* ---------- Reset ---------- */

async function resetGame() {
  if (
    state.roundActive &&
    !await confirmDialog(
      "Leave this round? Your current game will end."
    )
  ) {
    return;
  }

  pauseTimer();

  state.roundActive = false;
  state.players = [];
  state.roles = [];
  state.word = "";
  state.idx = 0;
  state.seen = false;
  state.votes = [];
  state.scored = false;

  show("homeScreen");
}


/* =========================================================
   PART 3 — EVENT WIRING, PWA, EXIT PROTECTION, INITIALIZATION
   ========================================================= */

/* ---------- General event helpers ---------- */

function on(id, event, handler) {
  const element = $(id);

  if (!element) {
    console.warn(`IMPOSTER: Missing HTML element #${id}`);
    return;
  }

  element.addEventListener(event, handler);
}

function setText(id, value) {
  const element = $(id);

  if (element) {
    element.textContent = value;
  }
}

function setVisible(id, visible) {
  const element = $(id);

  if (element) {
    element.hidden = !visible;
  }
}

/* ---------- Main navigation ---------- */

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-go");
    if (target === "setupScreen") renderSetup();
    if (target === "settingsScreen") applySettings();
    show(target);
  });
});

on("themeToggle", "click", () => { settings.light = !settings.light; applySettings(); });
on("addPlayerBtn", "click", addPlayer);
on("newPlayerName", "keydown", event => { if (event.key === "Enter") { event.preventDefault(); addPlayer(); } });
on("startBtn", "click", startGame);
on("revealCard", "contextmenu", event => event.preventDefault());
on("revealCard", "pointerdown", event => {
  if (event.button !== 0) return;
  event.preventDefault();
  try { event.currentTarget.setPointerCapture(event.pointerId); } catch {}
  revealCard();
});
on("revealCard", "pointerup", hideRevealCard);
on("revealCard", "pointercancel", hideRevealCard);
on("revealCard", "lostpointercapture", hideRevealCard);
on("revealCard", "pointerleave", event => {
  // If the pointer leaves without capture (older browsers), fail closed.
  if (state.seen && event.buttons === 0) hideRevealCard();
});
on("revealCard", "keydown", event => {
  if ((event.key === " " || event.key === "Enter") && !event.repeat) {
    event.preventDefault();
    revealCard();
  }
});
on("revealCard", "keyup", event => {
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    hideRevealCard();
  }
});
on("revealCard", "blur", hideRevealCard);
on("hideBtn", "click", hideRevealCard);
on("nextBtn", "click", nextReveal);
on("toVote", "click", beginVoting);
on("tToggle", "click", () => { if (state.tick) { pauseTimer(); setText("tToggle", "Resume"); } else { startTimer(); setText("tToggle", "Pause"); } });
on("tReset", "click", () => { pauseTimer(); state.left = state.total; setText("timer", formatTime(state.left)); setText("tToggle", "Start"); });
on("voteCancel", "click", () => show("discussionScreen"));
on("submitVotes", "click", () => {
  const maxVotes = Math.max(0, ...state.votes);
  const leaders = state.votes.map((votes, index) => ({ votes, index })).filter(item => item.votes === maxVotes && maxVotes > 0);
  if (leaders.length !== 1) { resolveVote(-1); return; }
  submitAccusation(leaders[0].index);
});
on("lastChanceForm", "submit", submitLastChance);
on("skipLastChance", "click", () => { state.lastChanceCorrect = false; prepareResults(false, state.lastChanceAccused); });
on("quickRematch", "click", quickRematch);
on("again", "click", () => { renderSetup(); show("setupScreen"); });
on("resetScores", "click", () => confirmDialog("Reset all saved scores?").then(ok => { if (ok) { store.set("imposterScores", {}); renderBoard("boardMain"); renderHome(); toast("Scores reset."); } }));
on("resetScores2", "click", () => confirmDialog("Reset all saved scores?").then(ok => { if (ok) { store.set("imposterScores", {}); renderBoard("boardMain"); renderHome(); toast("Scores reset."); } }));

/* ---------- Settings ---------- */

function bindSetting(id, key, type = "checkbox") {
  on(id, "change", event => {
    settings[key] =
      type === "number"
        ? Number(event.target.value)
        : event.target.checked;

    if (
      key === "timer" &&
      (!Number.isFinite(settings.timer) ||
        settings.timer < 15 ||
        settings.timer > 600)
    ) {
      settings.timer = DEFAULTS.timer;
    }

    applySettings();
  });
}

bindSetting("setLight", "light");
bindSetting("setSound", "sound");
bindSetting("setMotion", "calm");
bindSetting("setBoard", "board");
bindSetting("setHints", "hints");
bindSetting("setHaptics", "haptics");
bindSetting("setFullscreen", "preferFullscreen");
bindSetting("setTimer", "timer", "number");

on("hintOpt", "change", event => {
  settings.hints = event.target.checked;
  applySettings();
});

on("timerOpt", "change", event => {
  const value = Number(event.target.value);

  if (Number.isFinite(value) && value >= 15 && value <= 600) {
    settings.timer = value;
    applySettings();
  }
});

/* ---------- Fullscreen ---------- */

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    if (document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen();
    } else {
      toast("Fullscreen isn't supported in this browser.");
    }
  } catch (error) {
    console.warn("Fullscreen request failed:", error);
    toast("Couldn't enter fullscreen. Try using the browser menu.");
  }
}

on("fullscreenBtn", "click", toggleFullscreen);

on("setFullscreen", "change", event => {
  settings.preferFullscreen = event.target.checked;
  applySettings();

  /*
    Do not force fullscreen immediately when a setting changes.
    Fullscreen is entered only after a direct user action.
  */
});

/* ---------- Leaderboard ---------- */

function renderBoard(containerId) {
  const board = $(containerId);
  if (!board) return;

  const scores = Object.entries(getScores())
    .sort((a, b) => b[1] - a[1]);

  board.innerHTML = "";

  if (!scores.length) {
    const empty = document.createElement("p");
    empty.textContent = "No scores yet. Play a round first!";
    board.append(empty);
    return;
  }

  scores.forEach(([name, score], index) => {
    const row = document.createElement("div");
    row.className = "leaderboard-row";

    const rank = document.createElement("span");
    rank.textContent = `#${index + 1}`;

    const player = document.createElement("span");
    player.textContent = name;

    const points = document.createElement("strong");
    points.textContent = String(score);

    row.append(rank, player, points);
    board.append(row);
  });
}

/* ---------- Guess the Emoji ---------- */
let emojiIndex = 0;
let emojiSolved = new Set();
function renderEmojiGame() {
  const puzzle = EMOJI_WORDS[emojiIndex % EMOJI_WORDS.length];
  setText("emojiClue", puzzle.emojis);
  setText("emojiCategory", puzzle.category);
  setText("emojiRound", `Puzzle ${emojiIndex + 1} / ${EMOJI_WORDS.length}`);
  setText("emojiAnswer", puzzle.answer);
  setVisible("emojiAnswerBox", false);
  setVisible("emojiReveal", true);
}
function revealEmojiAnswer() {
  setVisible("emojiAnswerBox", true);
  setVisible("emojiReveal", false);
}
function nextEmojiPuzzle() {
  emojiIndex = (emojiIndex + 1) % EMOJI_WORDS.length;
  renderEmojiGame();
}
on("emojiGameBtn", "click", () => { emojiSolved = new Set(store.get("imposterEmojiSolved", [])); renderEmojiGame(); show("emojiScreen"); });
on("emojiReveal", "click", revealEmojiAnswer);
on("emojiNext", "click", nextEmojiPuzzle);
on("emojiSkip", "click", nextEmojiPuzzle);

/* ---------- PWA installation ---------- */

let deferredInstallPrompt = null;

function updateInstallButton() {
  const button = $("installAppBtn");
  if (!button) return;

  const installed =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  button.hidden = installed || !deferredInstallPrompt;
}

window.addEventListener("beforeinstallprompt", event => {
  /*
    Chromium-based browsers can provide this event.
    Other browsers may use their own installation menu.
  */

  event.preventDefault();

  deferredInstallPrompt = event;

  updateInstallButton();
});

on("installAppBtn", "click", async () => {
  if (!deferredInstallPrompt) {
    toast(
      "If installation is supported, use your browser's Install App menu."
    );
    return;
  }

  deferredInstallPrompt.prompt();

  try {
    await deferredInstallPrompt.userChoice;
  } catch (error) {
    console.warn("Installation prompt ended:", error);
  }

  deferredInstallPrompt = null;
  updateInstallButton();
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  updateInstallButton();
  toast("IMPOSTER has been installed!");
});

updateInstallButton();

/* ---------- Service worker registration ---------- */

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    console.info("Service workers aren't supported here.");
    return;
  }

  const protocol = window.location.protocol;

  if (protocol !== "https:" && protocol !== "http:") {
    console.info(
      "Open IMPOSTER through HTTPS or localhost to enable its service worker."
    );
    return;
  }

  try {
    await navigator.serviceWorker.register("./service-worker.js");
    console.info("IMPOSTER service worker registered.");
  } catch (error) {
    console.warn("Service worker registration failed:", error);
  }
}

/* ---------- Prevent accidental exits ---------- */

function shouldWarnBeforeExit() {
  return (
    state.roundActive &&
    document.visibilityState !== "prerender"
  );
}

window.addEventListener("beforeunload", event => {
  if (!shouldWarnBeforeExit()) return;

  event.preventDefault();

  /*
    Modern browsers display their own generic warning.
    Custom text isn't supported.
  */

  event.returnValue = "";
});

let allowNextNavigation = false;

window.addEventListener("popstate", async () => {
  if (!shouldWarnBeforeExit() || allowNextNavigation) {
    allowNextNavigation = false;
    return;
  }

  history.pushState(
    { imposterGuard: true },
    "",
    window.location.href
  );

  const leave = await confirmDialog(
    "Your round is still active. Leave and end this round?"
  );

  if (leave) {
    allowNextNavigation = true;
    state.roundActive = false;
    pauseTimer();
    show("homeScreen");
  }
});

function enableNavigationGuard() {
  try {
    history.replaceState(
      { imposterGuard: true },
      "",
      window.location.href
    );

    history.pushState(
      { imposterGuard: true },
      "",
      window.location.href
    );
  } catch (error) {
    console.warn("Navigation guard couldn't initialize:", error);
  }
}

/* ---------- Database loading and startup ---------- */

async function initializeImposter() {
  applySettings();

  state.names = store.get("imposterPlayers", []);

  if (!Array.isArray(state.names)) {
    state.names = [];
  }

  state.names = state.names
    .filter(name => typeof name === "string")
    .map(name => name.trim())
    .filter(Boolean)
    .slice(0, 12);

  const loaded = await loadWordDatabase();

  if (loaded) {
    populateCategorySelect();
  } else {
    console.error(wordsLoadError);
    toast("Word database unavailable. Check words.json.");
  }

  renderSetup();
  renderHome();
  renderAchievements();
  updateInstallButton();
  enableNavigationGuard();

  if (navigator.serviceWorker) {
    registerServiceWorker();
  }

  /*
    Show the existing home screen. If the HTML uses a different
    initial screen, change "homeScreen" to the correct screen ID.
  */

  if ($("homeScreen")) {
    show("homeScreen");
  }

  console.info(
    loaded
      ? "IMPOSTER initialized successfully."
      : "IMPOSTER initialized without its word database."
  );
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeImposter,
    { once: true }
  );
} else {
  initializeImposter();
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then(() => console.log("PWA service worker registered"))
      .catch(error => console.warn("Service worker registration failed:", error));
  });
}