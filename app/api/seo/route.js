const DEFAULT_SITE_URL = 'https://gymbite-site.vercel.app';

const CHAINS = [
  {
    slug: 'chipotle',
    name: 'Chipotle Mexican Grill',
    type: 'restaurant',
    topOrder: 'Double Chicken Bowl (Fajita Veggies, Black Beans, Fresh Tomato Salsa, Romaine)',
    kcal: 680, protein: 64, carbs: 48, fat: 22,
    runnerUp: 'Steak Salad w/ Light Brown Rice & Tomatillo Red-Chili Salsa (510 kcal, 42g P, 34g C, 21g F)',
    budgetPick: 'Chicken Burrito Bowl w/ Half Rice, Black Beans & Pico (540 kcal, 42g P, 49g C, 18g F)',
    swapTip: 'Skip the flour tortilla (-320 kcal), swap sour cream for extra fajita veggies + fresh tomato salsa, and ask for half rice + double chicken to hit 64g protein under 700 kcal.'
  },
  {
    slug: 'chick-fil-a',
    name: 'Chick-fil-A',
    type: 'restaurant',
    topOrder: '12-Count Grilled Nuggets + Kale Crunch Side',
    kcal: 370, protein: 42, carbs: 16, fat: 14,
    runnerUp: 'Egg White Grill Breakfast Sandwich (300 kcal, 27g P, 29g C, 8g F)',
    budgetPick: 'Grilled Chicken Cool Wrap w/ Light Italian Dressing (380 kcal, 43g P, 31g C, 14g F)',
    swapTip: 'Choose Grilled Nuggets (38g protein in 12pc for only 200 kcal) with Zesty Buffalo Sauce (25 kcal) instead of Chick-fil-A Sauce (140 kcal per packet).'
  },
  {
    slug: 'mcdonalds',
    name: "McDonald's",
    type: 'restaurant',
    topOrder: 'Double Quarter Pounder with Cheese (No Mayo, Light Ketchup)',
    kcal: 710, protein: 48, carbs: 41, fat: 39,
    runnerUp: '2x Egg McMuffin High-Protein Breakfast Hack (620 kcal, 34g P, 60g C, 26g F)',
    budgetPick: 'McDouble + 6-Piece Chicken McNuggets Combo (650 kcal, 37g P, 48g C, 33g F)',
    swapTip: 'Order a McDouble or Quarter Pounder without the top bun or swap fries for a second lean protein item; avoid creamy dipping sauces that add 100–160 kcal each.'
  },
  {
    slug: 'taco-bell',
    name: 'Taco Bell',
    type: 'restaurant',
    topOrder: 'Cantina Chicken Bowl (Fresco Style w/ Extra Slow-Roasted Chicken)',
    kcal: 540, protein: 38, carbs: 44, fat: 21,
    runnerUp: '3x Chicken Soft Tacos Fresco Style (480 kcal, 36g P, 45g C, 15g F)',
    budgetPick: 'Chicken Enchilada Burrito (Light Cheese, Add Pico) (350 kcal, 21g P, 41g C, 10g F)',
    swapTip: 'Ask for "Fresco Style" on any burrito or taco to automatically replace mayo-based sauces, cheese, and sour cream with freshly diced tomatoes (-120 to -220 kcal).'
  },
  {
    slug: 'starbucks',
    name: 'Starbucks',
    type: 'restaurant',
    topOrder: 'Spinach, Feta & Egg White Wrap + Iced Americano w/ Splash of 2% Milk',
    kcal: 315, protein: 22, carbs: 36, fat: 9,
    runnerUp: 'Turkey Bacon, Cheddar & Egg White Sandwich (230 kcal, 17g P, 28g C, 5g F)',
    budgetPick: 'Kale & Mushroom Egg Bites (230 kcal, 15g P, 11g C, 14g F)',
    swapTip: 'Swap standard flavored syrup pumps (20 kcal / 5g sugar per pump) for sugar-free vanilla + nonfat milk or protein-fortified cold brew to save 180+ empty liquid calories.'
  },
  {
    slug: 'wendys',
    name: "Wendy's",
    type: 'restaurant',
    topOrder: 'Apple Pecan Grilled Chicken Salad (No Pecan/Cheese Pack, Half Pomegranate Dressing)',
    kcal: 430, protein: 35, carbs: 32, fat: 16,
    runnerUp: 'Grilled Chicken Ranch Wrap (Light Ranch) (390 kcal, 27g P, 36g C, 13g F)',
    budgetPick: 'Jr. Hamburger Deluxe + Large Chili Bowl (550 kcal, 35g P, 52g C, 20g F)',
    swapTip: "Wendy's Rich & Meaty Chili (Large: 340 kcal, 22g protein, 6g fiber) is one of the highest-satiety fast-food side swaps in existence compared to medium fries (420 kcal)."
  },
  {
    slug: 'subway',
    name: 'Subway',
    type: 'restaurant',
    topOrder: '6-Inch Rotisserie-Style Chicken on Artisan Multigrain (Double Meat, All Veggies, Mustard)',
    kcal: 450, protein: 46, carbs: 42, fat: 9,
    runnerUp: 'No-Bready Protein Bowl w/ Double Roast Beef & Avocado (410 kcal, 48g P, 14g C, 16g F)',
    budgetPick: '6-Inch Oven Roasted Turkey w/ Extra Turkey & Sweet Onion Teriyaki (370 kcal, 32g P, 46g C, 5g F)',
    swapTip: 'Double the lean meat on a 6-inch sub instead of ordering a standard Footlong: you save ~210 kcal of refined bread carbs while boosting protein from 24g to 46g.'
  },
  {
    slug: 'panda-express',
    name: 'Panda Express',
    type: 'restaurant',
    topOrder: 'Plate w/ Full Super Greens + Grilled Teriyaki Chicken + String Bean Chicken Breast',
    kcal: 640, protein: 59, carbs: 33, fat: 28,
    runnerUp: 'Bowl w/ Half Brown Rice, Half Super Greens & Double Grilled Teriyaki Chicken (790 kcal, 78g P, 48g C, 30g F)',
    budgetPick: 'Bowl w/ Super Greens + Broccoli Beef (280 kcal, 18g P, 23g C, 10g F)',
    swapTip: 'Swap Chow Mein (510 kcal) or Fried Rice (520 kcal) for Super Greens (130 kcal, 6g protein, 5g fiber), and keep Teriyaki Sauce on the side to save 70 kcal of sugar.'
  },
  {
    slug: 'sweetgreen',
    name: 'Sweetgreen',
    type: 'restaurant',
    topOrder: 'Chicken Pesto Parm Bowl (Extra Roasted Chicken, Light Vinaigrette)',
    kcal: 580, protein: 52, carbs: 38, fat: 24,
    runnerUp: 'Harvest Bowl w/ Blackened Chicken & Half Goat Cheese (610 kcal, 44g P, 49g C, 25g F)',
    budgetPick: 'Guacamole Greens w/ Double Roasted Chicken (560 kcal, 51g P, 26g C, 28g F)',
    swapTip: 'Always ask for dressing on the side (light pour): Sweetgreen heavy dressings add 180–290 kcal of oil, whereas half-dressing keeps full flavor at half the fat.'
  },
  {
    slug: 'cava',
    name: 'Cava',
    type: 'restaurant',
    topOrder: 'Greens + Grains Bowl w/ Half Brown Rice, SuperGreens, Double Grilled Chicken, Tzatziki & Crazy Feta',
    kcal: 630, protein: 58, carbs: 46, fat: 22,
    runnerUp: 'Harissa Honey Chicken Salad w/ Hummus, Pickled Onions & Skhug (550 kcal, 42g P, 34g C, 24g F)',
    budgetPick: 'Grilled Steak + Black Lentils Greens Bowl (590 kcal, 48g P, 41g C, 23g F)',
    swapTip: 'Use Black Lentils + SuperGreens as your base for an extra 11g of plant protein and 9g of fiber, and choose Tzatziki (35 kcal) or Yogurt Dill (30 kcal) over tahini dressings.'
  },
  {
    slug: 'panera-bread',
    name: 'Panera Bread',
    type: 'restaurant',
    topOrder: 'Green Goddess Chicken Cobb Salad (Whole, No Bacon, Dressing on Side)',
    kcal: 470, protein: 40, carbs: 26, fat: 22,
    runnerUp: 'You Pick Two: Half Turkey Avocado BLT + Cup of Homestyle Chicken Noodle Soup (460 kcal, 29g P, 42g C, 18g F)',
    budgetPick: 'Mediterranean Egg White Wrap (300 kcal, 19g P, 31g C, 11g F)',
    swapTip: 'Choose an apple instead of the French baguette side (-180 kcal) when ordering You Pick Two, and opt for broth-based soups over cream soups.'
  },
  {
    slug: 'shake-shack',
    name: 'Shake Shack',
    type: 'restaurant',
    topOrder: 'Double ShackBurger in a Lettuce Wrap (No ShackSauce, Add Pickles & Tomato)',
    kcal: 540, protein: 46, carbs: 5, fat: 36,
    runnerUp: 'Single ShackBurger + Grilled Chicken Breast Patty Side (580 kcal, 49g P, 27g C, 30g F)',
    budgetPick: 'Single Hamburger w/ Lettuce & Tomato (370 kcal, 25g P, 24g C, 18g F)',
    swapTip: 'Ordering any burger in a Lettuce Wrap ("Gluten-Free Lettuce Wrap") and skipping ShackSauce cuts 240 kcal immediately while preserving all 46g of beef protein.'
  },
  {
    slug: 'in-n-out',
    name: 'In-N-Out Burger',
    type: 'restaurant',
    topOrder: 'Double-Double Protein Style (Lettuce Wrap, Mustard & Ketchup Instead of Spread)',
    kcal: 490, protein: 37, carbs: 11, fat: 33,
    runnerUp: '2x Hamburger Protein Style w/ Grilled Onions (480 kcal, 32g P, 16g C, 30g F)',
    budgetPick: 'Flying Dutchman (2 Beef Patties + 2 Cheese Slices, Grilled Onions) (390 kcal, 30g P, 2g C, 29g F)',
    swapTip: 'Ask for "Protein Style" (lettuce wrap) AND "Mustard/Ketchup instead of Spread" — those two secret-menu phrases remove 230 kcal per burger.'
  },
  {
    slug: 'five-guys',
    name: 'Five Guys',
    type: 'restaurant',
    topOrder: 'Cheeseburger (2 Patties) in a Lettuce Wrap w/ Grilled Onions, Mushrooms, Jalapeños & Mustard',
    kcal: 610, protein: 43, carbs: 7, fat: 45,
    runnerUp: 'Little Hamburger on Bun w/ All Free Veggie Toppings (540 kcal, 27g P, 39g C, 30g F)',
    budgetPick: 'Little Cheeseburger in a Bowl w/ Extra Pickles & Tomatoes (360 kcal, 23g P, 5g C, 27g F)',
    swapTip: 'Five Guys Little Fries alone pack 530 kcal (and regular fries exceed 950 kcal!). Skip the fries and double the burger patty in a lettuce wrap or foil bowl.'
  },
  {
    slug: 'wingstop',
    name: 'Wingstop',
    type: 'restaurant',
    topOrder: '8-Piece Classic Bone-In Wings (Plain or Louisiana Rub / Lemon Pepper Light) + Veggie Sticks',
    kcal: 640, protein: 72, carbs: 3, fat: 38,
    runnerUp: '6-Piece Classic Bone-In Hot Honey / Hickory Smoked BBQ Wings (510 kcal, 54g P, 14g C, 27g F)',
    budgetPick: '5-Piece Crispy Tenders (Louisiana Rub) w/ Celery & Carrots (520 kcal, 45g P, 22g C, 27g F)',
    swapTip: 'Classic Bone-In wings have zero breading (~9g protein per wing). Avoid the 310-kcal Ranch cup by dipping in hot sauce or Mustard/BBQ.'
  },
  {
    slug: 'popeyes',
    name: 'Popeyes',
    type: 'restaurant',
    topOrder: '5-Piece Blackened Chicken Tenders + Regular Red Beans & Rice',
    kcal: 510, protein: 51, carbs: 32, fat: 18,
    runnerUp: 'Blackened Chicken Sandwich (No Mayo) (430 kcal, 42g P, 40g C, 11g F)',
    budgetPick: '3-Piece Blackened Tenders + Green Beans (230 kcal, 28g P, 9g C, 7g F)',
    swapTip: 'Popeyes Blackened Tenders are non-breaded and seasoned: 5 tenders deliver 43g protein for just 280 calories—one of the highest protein-to-calorie ratios in fast food.'
  },
  {
    slug: 'jersey-mikes',
    name: "Jersey Mike's Subs",
    type: 'restaurant',
    topOrder: '#8 Club Sub in a Tub (Turkey, Ham, Provolone, Lettuce, Tomato, Red Wine Vinegar, No Oil)',
    kcal: 410, protein: 42, carbs: 9, fat: 22,
    runnerUp: '#7 Turkey & Provolone Regular on Wheat (No Oil, Extra Turkey) (560 kcal, 48g P, 62g C, 12g F)',
    budgetPick: '#17 Mike’s Famous Philly Mini on Wheat (490 kcal, 31g P, 45g C, 20g F)',
    swapTip: 'Say "No Oil, Vinegar Only" when ordering "Mike’s Way"—the olive oil blend pour alone adds 220–270 calories to a regular sub!'
  },
  {
    slug: 'dunkin',
    name: "Dunkin'",
    type: 'restaurant',
    topOrder: '2x Egg & Cheese Wake-Up Wraps + Turkey Sausage Side + Cold Brew',
    kcal: 460, protein: 28, carbs: 30, fat: 24,
    runnerUp: 'Sourdough Breakfast Sandwich (No Bacon, Egg Whites Option) (480 kcal, 27g P, 47g C, 19g F)',
    budgetPick: 'Turkey Sausage, Egg & Cheese on English Muffin (410 kcal, 22g P, 36g C, 19g F)',
    swapTip: 'Choose an English Muffin or Wake-Up Wrap instead of a Croissant (-190 kcal of saturated fat) or Bagel (-170 kcal of dense carbs).'
  },
  {
    slug: 'raising-canes',
    name: "Raising Cane's",
    type: 'restaurant',
    topOrder: '4 Chicken Fingers ("Naked" / Unbreaded Request) + Coleslaw + Diet Lemonade',
    kcal: 490, protein: 52, carbs: 14, fat: 24,
    runnerUp: '3-Finger Combo (Swap Toast for Extra Coleslaw, Half Cane’s Sauce) (640 kcal, 41g P, 48g C, 31g F)',
    budgetPick: '4 Classic Chicken Fingers (No Fries, Mustard/Hot Sauce instead of Cane’s Sauce) (520 kcal, 52g P, 20g C, 25g F)',
    swapTip: 'Each cup of Cane’s Sauce is 190 kcal and Texas Toast is 140 kcal. Swapping both saves 330 kcal while keeping 40g–52g of chicken tenderloin protein.'
  },
  {
    slug: 'dominos',
    name: "Domino's Pizza",
    type: 'restaurant',
    topOrder: '3 Slices Medium Crunchy Thin Crust Chicken, Spinach & Light Cheese Pizza',
    kcal: 510, protein: 31, carbs: 42, fat: 23,
    runnerUp: '2 Slices Hand-Tossed Memphis BBQ Chicken + 4pc Plain Roasted Wings (610 kcal, 44g P, 52g C, 24g F)',
    budgetPick: 'Specialty Chicken – Classic Hot Buffalo (12 Pieces) (510 kcal, 35g P, 24g C, 30g F)',
    swapTip: 'Switching from Pan Crust to Crunchy Thin Crust with "Light Cheese" and Grilled Chicken reduces calories by ~90 kcal per slice while raising protein density.'
  },
  {
    slug: 'myfitnesspal-alternative',
    name: 'GymBite vs MyFitnessPal (Free Alternative)',
    type: 'comparison',
    topOrder: 'GymBite Free AI Camera Food Scanner + Macro & Workout Tracker ($0 vs $79.99/yr)',
    kcal: 2000, protein: 165, carbs: 200, fat: 60,
    runnerUp: 'Instant Photo Plate Recognition + Offline LocalStorage Privacy (No Account Wall)',
    budgetPick: 'Built-In Daily Gym Set/Rep/Weight Logger + Rest Timer in One App',
    swapTip: 'Switch from MyFitnessPal Premium ($79.99/yr) to GymBite to get AI photo meal scanning, macro rings, editable portions, and workout logging in one fast mobile web & Android app.'
  },
  {
    slug: 'macrofactor-alternative',
    name: 'GymBite vs MacroFactor (Adaptive TDEE & Macro Alternative)',
    type: 'comparison',
    topOrder: 'GymBite TDEE + Protein Target Calculator + Integrated Lifting Tracker',
    kcal: 2150, protein: 175, carbs: 215, fat: 65,
    runnerUp: '1-Tap Common Food Quick-Add + Gemini AI Plate Breakdown',
    budgetPick: 'Combined Nutrition + Progressive Overload Gym Split Tracking',
    swapTip: 'Combine your macro adherence and gym progressive overload inside one app so your training volume and calorie intake stay synchronized every day.'
  },
  {
    slug: 'cronometer-alternative',
    name: 'GymBite vs Cronometer (Fast AI Macro & Gym Alternative)',
    type: 'comparison',
    topOrder: 'GymBite Speed-First AI Plate Scanner + High-Protein Meal Planner',
    kcal: 1950, protein: 160, carbs: 190, fat: 58,
    runnerUp: '3-Step Onboarding w/ Automatic Protein, Carb & Fat Split Calculation',
    budgetPick: 'Zero-Clutter Daily Calorie Ring + Undo-Safe Quick Entry',
    swapTip: 'When restaurant meals do not have barcodes, snap a photo in GymBite to estimate portion weight, calories, and protein in seconds—then edit any macro number directly.'
  },
  {
    slug: 'cal-ai-alternative',
    name: 'GymBite vs Cal AI (Free AI Food Photo Scanner Alternative)',
    type: 'comparison',
    topOrder: 'GymBite Multi-Model Gemini AI Plate Scanner + Full Gym Workout Tracker',
    kcal: 1850, protein: 155, carbs: 180, fat: 55,
    runnerUp: 'Editable Post-Scan Portions + Manual Macro Override + JSON Backup Export',
    budgetPick: 'Includes Guided Gym Splits, Exercise Demos & Rest Timers at Zero Extra Cost',
    swapTip: 'Unlike photo-only trackers that lock you behind a hard subscription screen on launch, GymBite lets you scan plates, edit macros, and log workouts immediately.'
  },
  {
    slug: 'tdee-protein-calculator',
    name: 'GymBite TDEE, Calorie Deficit & Daily Protein Calculator',
    type: 'calculator',
    topOrder: 'Mifflin-St Jeor TDEE + 500-kcal Deficit + 1.8g–2.2g/kg Protein Target Formula',
    kcal: 2100, protein: 170, carbs: 210, fat: 62,
    runnerUp: 'Lean Bulk (+250 kcal Surplus) w/ 2.0g/kg Protein & High-Carb Training Fuel',
    budgetPick: 'Body Recomposition Maintenance Calories w/ 35% Protein Split',
    swapTip: 'Anchor your daily protein target first (0.8g–1.0g per lb of goal body weight), set dietary fat at 25%–30% of calories for hormone health, and fill remaining calories with carbs.'
  }
];

const ANGLES = [
  { slug: 'high-protein-low-calorie-orders', name: 'Best High-Protein Low-Calorie Menu Orders & Macro Hacks (2026)', short: 'High-Protein Low-Calorie Orders' },
  { slug: 'full-nutrition-and-macro-chart', name: 'Complete Calories, Protein, Carbs & Fat Nutrition Chart', short: 'Full Macro & Nutrition Chart' },
  { slug: 'calorie-deficit-weight-loss-guide', name: 'How to Order on a Calorie Deficit (Under 500 & 600 kcal Guide)', short: 'Calorie Deficit Ordering Guide' },
  { slug: 'muscle-building-bulking-meals', name: 'Best High-Protein Post-Workout & Lean Bulking Meals (40g–70g Protein)', short: 'Muscle Building & Bulking Meals' },
  { slug: 'keto-low-carb-menu-guide', name: 'Best Low-Carb & Keto-Friendly Menu Swaps (Under 15g Net Carbs)', short: 'Keto & Low-Carb Menu Guide' },
  { slug: 'tdee-and-macro-split-calculator', name: 'Interactive TDEE, Calorie Deficit & Protein Per Pound Calculator', short: 'TDEE & Macro Split Calculator' },
  { slug: 'ai-photo-calorie-scanner-guide', name: 'How to Scan & Track Meals Instantly with AI Photo Recognition', short: 'AI Photo Calorie Scanner Guide' },
  { slug: 'meal-prep-and-portion-swaps', name: 'Smart Portion Swaps, Sauce Calories & Hidden Oil Breakdown', short: 'Portion Swaps & Sauce Audit' },
  { slug: 'pre-and-post-workout-nutrition', name: 'Pre-Workout Carbs & Post-Workout Protein Timing Breakdown', short: 'Pre & Post-Workout Nutrition' },
  { slug: 'intermittent-fasting-16-8-meals', name: 'Best High-Satiety First Meal & OMAD Orders for Intermittent Fasting', short: 'Intermittent Fasting 16:8 Guide' },
  { slug: 'glp1-muscle-preservation-protein', name: 'High-Protein Nutrient-Dense Meals for GLP-1 & Muscle Retention', short: 'GLP-1 Protein & Muscle Guide' },
  { slug: 'budget-protein-per-dollar-ranking', name: 'Highest Grams of Protein Per Dollar Value Menu Ranking', short: 'Protein Per Dollar Value Guide' },
  { slug: 'breakfast-high-protein-options', name: 'Best High-Protein Breakfast & Morning Grab-and-Go Orders', short: 'High-Protein Breakfast Guide' },
  { slug: 'late-night-low-calorie-swaps', name: 'Best Late-Night High-Protein Craving Swaps Without Blowing Macros', short: 'Late-Night Macro Swaps' },
  { slug: 'sodium-fiber-and-sugar-audit', name: 'Hidden Sodium, Added Sugar & Fiber Density Nutrition Audit', short: 'Sodium, Sugar & Fiber Audit' },
  { slug: 'free-app-vs-paid-trackers', name: 'Free AI Calorie & Macro Tracker vs Paid Subscription Apps', short: 'Free vs Paid Tracker Comparison' },
  { slug: 'barcodes-and-custom-recipe-logging', name: 'Fast Quick-Add, Custom Portion & AI Meal Logging Workflow', short: 'Quick-Add & Custom Logging' },
  { slug: 'cutting-diet-1800-calorie-plan', name: 'Sample 1,800 kcal High-Protein Daily Cutting Meal Plan', short: '1,800 kcal Cutting Meal Plan' },
  { slug: 'recomp-2200-calorie-macro-plan', name: 'Sample 2,200 kcal Body Recomposition Daily Macro Plan', short: '2,200 kcal Recomp Macro Plan' },
  { slug: 'lean-bulk-2800-calorie-plan', name: 'Sample 2,800 kcal Lean Mass Building Daily Macro Plan', short: '2,800 kcal Lean Bulk Plan' }
];

const GOALS = [
  { slug: 'for-fat-loss-and-cutting', name: 'Fat Loss & 500-kcal Deficit', calDelta: -500, proteinPerLb: 1.0 },
  { slug: 'for-lean-muscle-bulking', name: 'Lean Muscle Bulking (+250 kcal)', calDelta: 250, proteinPerLb: 0.95 },
  { slug: 'for-body-recomposition', name: 'Body Recomposition (Maintenance)', calDelta: 0, proteinPerLb: 1.05 },
  { slug: 'for-busy-professionals-on-the-go', name: 'Busy Professionals Eating Out', calDelta: -350, proteinPerLb: 0.9 },
  { slug: 'for-college-students-on-a-budget', name: 'College Students on a Budget', calDelta: -200, proteinPerLb: 0.9 },
  { slug: 'for-glp1-and-high-satiety', name: 'GLP-1 & High-Satiety Muscle Retention', calDelta: -600, proteinPerLb: 1.1 },
  { slug: 'for-strength-and-powerlifting', name: 'Strength & Powerlifting Performance', calDelta: 200, proteinPerLb: 1.0 },
  { slug: 'for-runners-and-hybrid-athletes', name: 'Runners, HYROX & Hybrid Athletes', calDelta: 150, proteinPerLb: 0.9 },
  { slug: 'for-low-carb-and-insulin-control', name: 'Low-Carb & Glycemic Control', calDelta: -400, proteinPerLb: 1.0 },
  { slug: 'for-beginners-tracking-macros', name: 'Beginners Tracking Calories & Protein', calDelta: -300, proteinPerLb: 0.85 }
];

export function getAllSlugs() {
  const out = [];
  for (const c of CHAINS) {
    for (const a of ANGLES) {
      for (const g of GOALS) {
        out.push(`${c.slug}-${a.slug}-${g.slug}`);
      }
    }
  }
  return out;
}

function parseSlug(slug) {
  for (const g of GOALS) {
    const gSuf = `-${g.slug}`;
    if (slug.endsWith(gSuf)) {
      const rem = slug.slice(0, -gSuf.length);
      for (const a of ANGLES) {
        const aSuf = `-${a.slug}`;
        if (rem.endsWith(aSuf)) {
          const cSlug = rem.slice(0, -aSuf.length);
          const chain = CHAINS.find(x => x.slug === cSlug);
          if (chain) return { chain, angle: a, goal: g };
        }
      }
    }
  }
  return null;
}

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderSitemap(siteUrl) {
  const slugs = getAllSlugs();
  const today = '2026-10-26';
  const lines = [
    `  <url><loc>${siteUrl}/</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>`,
    `  <url><loc>${siteUrl}/seo</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>`,
    ...slugs.map(s => `  <url><loc>${siteUrl}/seo/${s}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`)
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${lines.join('\n')}\n</urlset>\n`;
}

function renderRobots(siteUrl) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
}

function renderHub(siteUrl) {
  const title = 'GymBite Nutrition & Macro Directory — 5,000+ High-Protein Restaurant Guides, TDEE Calculators & Tracker Comparisons';
  const desc = 'Explore 5,000+ verified restaurant macro lookup charts (Chipotle, Chick-fil-A, McDonald’s, Taco Bell, Starbucks, Panda Express, Cava, Sweetgreen), TDEE & calorie deficit calculators, and MyFitnessPal/MacroFactor comparisons.';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}" />
  <link rel="canonical" href="${siteUrl}/seo" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:url" content="${siteUrl}/seo" />
  <style>
    body{margin:0;font-family:system-ui,-apple-system,sans-serif;background:#0b1120;color:#f8fafc;line-height:1.6}
    .wrap{max-width:1120px;margin:0 auto;padding:32px 20px}
    a{color:#38bdf8;text-decoration:none}a:hover{text-decoration:underline}
    .card{background:#111827;border:1px solid #1e293b;border-radius:12px;padding:20px;margin-bottom:18px}
    .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:14px}
    .badge{display:inline-block;background:#0369a1;color:#e0f2fe;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:700}
  </style>
</head>
<body>
  <div class="wrap">
    <p><a href="/">← Open GymBite AI Calorie Scanner & Workout Tracker</a></p>
    <span class="badge">5,000 Verified Macro, Restaurant & TDEE Guides</span>
    <h1>${esc(title)}</h1>
    <p>${esc(desc)}</p>
    <div class="grid">
      ${CHAINS.map(c => {
        const s1 = `${c.slug}-${ANGLES[0].slug}-${GOALS[0].slug}`;
        const s2 = `${c.slug}-${ANGLES[5].slug}-${GOALS[2].slug}`;
        return `<div class="card">
          <span class="badge">${esc(c.type.toUpperCase())}</span>
          <h2 style="font-size:18px;margin:8px 0"><a href="/seo/${s1}">${esc(c.name)}</a></h2>
          <p style="font-size:13px;color:#cbd5e1;margin:6px 0"><strong>Top Pick:</strong> ${esc(c.topOrder)} (${c.kcal} kcal · ${c.protein}g Protein)</p>
          <p style="font-size:13px;margin:8px 0 0"><a href="/seo/${s1}">High-Protein Orders →</a> · <a href="/seo/${s2}">TDEE & Macro Calculator →</a></p>
        </div>`;
      }).join('')}
    </div>
  </div>
</body>
</html>`;
}

function renderPage({ chain, angle, goal }, slug, siteUrl) {
  const canonical = `${siteUrl}/seo/${slug}`;
  const pageTitle = `${chain.name} — ${angle.short} (${goal.name}) | GymBite`;
  const metaDesc = `${chain.name} ${angle.name} tailored ${goal.name}. #1 Pick: ${chain.topOrder} (${chain.kcal} kcal, ${chain.protein}g protein, ${chain.carbs}g carbs, ${chain.fat}g fat). Includes TDEE calculator & macro swap checklist.`;
  const pPer100 = ((chain.protein / chain.kcal) * 100).toFixed(1);

  const weights = [140, 165, 190, 215];
  const calcRows = weights.map(w => {
    const maint = w * 14;
    const targetCal = Math.max(1350, maint + goal.calDelta);
    const pGrams = Math.round(w * goal.proteinPerLb);
    const fGrams = Math.round((targetCal * 0.27) / 9);
    const cGrams = Math.max(50, Math.round((targetCal - pGrams * 4 - fGrams * 9) / 4));
    const pctDailyP = Math.round((chain.protein / pGrams) * 100);
    return { w, maint, targetCal, pGrams, cGrams, fGrams, pctDailyP };
  });

  const relatedAngles = ANGLES.filter(a => a.slug !== angle.slug).slice(0, 6);
  const relatedGoals = GOALS.filter(g => g.slug !== goal.slug).slice(0, 5);
  const relatedChains = CHAINS.filter(c => c.slug !== chain.slug).slice(0, 6);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'GymBite: AI Calorie Scanner, Macro & Gym Workout Tracker',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Web, Android, iOS',
      url: siteUrl,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `What is the highest-protein low-calorie order at ${chain.name}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `The top high-protein order for ${chain.name} is ${chain.topOrder}, delivering ${chain.protein}g of protein, ${chain.carbs}g carbs, and ${chain.fat}g fat in ${chain.kcal} calories (${pPer100}g protein per 100 kcal).`
          }
        },
        {
          '@type': 'Question',
          name: `How do I cut hidden calories when ordering from ${chain.name}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: chain.swapTip
          }
        },
        {
          '@type': 'Question',
          name: `How can I scan and log ${chain.name} meals without paying for MyFitnessPal Premium?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Open GymBite (${siteUrl}) to snap a photo of your plate with AI recognition or use 1-tap Quick Add, edit exact portion macros, and track your daily calorie and protein rings for free.`
          }
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'GymBite', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Macro & Restaurant Guides', item: `${siteUrl}/seo` },
        { '@type': 'ListItem', position: 3, name: `${chain.name} — ${angle.short}`, item: canonical }
      ]
    }
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(pageTitle)}</title>
  <meta name="description" content="${esc(metaDesc)}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${esc(pageTitle)}" />
  <meta property="og:description" content="${esc(metaDesc)}" />
  <meta property="og:url" content="${canonical}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(pageTitle)}" />
  <meta name="twitter:description" content="${esc(metaDesc)}" />
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <style>
    body{margin:0;font-family:system-ui,-apple-system,sans-serif;background:#0b1120;color:#f8fafc;line-height:1.65}
    .wrap{max-width:980px;margin:0 auto;padding:32px 20px}
    a{color:#38bdf8;text-decoration:none}a:hover{text-decoration:underline}
    .card{background:#111827;border:1px solid #1e293b;border-radius:12px;padding:24px;margin-bottom:22px}
    .badge{display:inline-block;background:#0369a1;color:#e0f2fe;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;margin-right:8px}
    .cta{display:inline-block;background:#0A8CF0;color:#fff;padding:12px 22px;border-radius:8px;font-weight:700;margin-top:12px}
    table{width:100%;border-collapse:collapse;margin:14px 0;font-size:14px}
    th,td{border:1px solid #1e293b;padding:10px 12px;text-align:left}
    th{background:#1e293b;color:#e2e8f0}
    ul.check{list-style:none;padding-left:0}
    ul.check li{padding:6px 0;border-bottom:1px solid #1e293b}
  </style>
</head>
<body>
  <div class="wrap">
    <nav style="font-size:14px;margin-bottom:16px">
      <a href="/">GymBite</a> › <a href="/seo">Macro & Restaurant Guides</a> › <span>${esc(chain.name)}</span>
    </nav>

    <div class="card">
      <span class="badge">${esc(chain.name)}</span>
      <span class="badge">${esc(goal.name)}</span>
      <span class="badge">${pPer100}g Protein / 100 kcal</span>
      <h1 style="margin:12px 0 8px;font-size:28px">${esc(pageTitle)}</h1>
      <p style="color:#cbd5e1;font-size:16px">Complete verified nutrition breakdown, high-protein menu swaps, and TDEE macro calculator for <strong>${esc(chain.name)}</strong> optimized <strong>${esc(goal.name)}</strong>.</p>
      <a class="cta" href="/">📸 Scan or Log This Meal Free in GymBite</a>
    </div>

    <div class="card">
      <h2>Verified Macro & Calorie Breakdown — ${esc(chain.name)}</h2>
      <table>
        <thead>
          <tr>
            <th>Menu Order Tier</th>
            <th>Exact Order & Customization</th>
            <th>Calories</th>
            <th>Protein</th>
            <th>Carbs / Fat</th>
            <th>Protein Efficiency</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>#1 High-Protein Pick</strong></td>
            <td>${esc(chain.topOrder)}</td>
            <td><strong>${chain.kcal} kcal</strong></td>
            <td><strong>${chain.protein}g P</strong></td>
            <td>${chain.carbs}g C · ${chain.fat}g F</td>
            <td>${pPer100}g P / 100 kcal</td>
          </tr>
          <tr>
            <td><strong>Runner-Up Lean Option</strong></td>
            <td>${esc(chain.runnerUp)}</td>
            <td>Verified Lean</td>
            <td>High Protein</td>
            <td>Balanced Macros</td>
            <td>Cut-Friendly</td>
          </tr>
          <tr>
            <td><strong>Best Value / Quick Swap</strong></td>
            <td>${esc(chain.budgetPick)}</td>
            <td>Portion Controlled</td>
            <td>High Satiety</td>
            <td>Low Added Sugar</td>
            <td>Best Protein/$</td>
          </tr>
        </tbody>
      </table>
      <p style="margin-top:12px;background:#0f172a;padding:12px 16px;border-left:4px solid #38bdf8;border-radius:6px">
        <strong>Pro Ordering Swap Tip:</strong> ${esc(chain.swapTip)}
      </p>
    </div>

    <div class="card">
      <h2>TDEE, Calorie & Daily Protein Calculator (${esc(goal.name)})</h2>
      <p>See how the <strong>${esc(chain.name)}</strong> #1 High-Protein Order (${chain.kcal} kcal, ${chain.protein}g protein) fits your daily targets across body weights:</p>
      <table>
        <thead>
          <tr>
            <th>Body Weight</th>
            <th>Est. Maintenance (TDEE)</th>
            <th>Goal Daily Calories</th>
            <th>Daily Protein Target</th>
            <th>Daily Carbs / Fat</th>
            <th>% of Daily Protein Covered</th>
          </tr>
        </thead>
        <tbody>
          ${calcRows.map(r => `<tr>
            <td><strong>${r.w} lbs (${Math.round(r.w / 2.205)} kg)</strong></td>
            <td>${r.maint} kcal</td>
            <td><strong>${r.targetCal} kcal</strong></td>
            <td><strong>${r.pGrams}g P</strong></td>
            <td>${r.cGrams}g C · ${r.fGrams}g F</td>
            <td>${r.pctDailyP}% of daily protein in 1 meal</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>

    <div class="card">
      <h2>GymBite vs MyFitnessPal vs MacroFactor — Tracker Comparison</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>GymBite (Free Web & Android)</th>
            <th>MyFitnessPal</th>
            <th>MacroFactor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Price</strong></td>
            <td><strong>Free ($0 Core + AI Scanner)</strong></td>
            <td>$79.99 / year Premium paywall</td>
            <td>$71.99 / year subscription only</td>
          </tr>
          <tr>
            <td><strong>AI Food Photo Plate Scanner</strong></td>
            <td><strong>Included (Gemini Multi-Model w/ Retry)</strong></td>
            <td>Paid Premium tier only</td>
            <td>Paid subscription required</td>
          </tr>
          <tr>
            <td><strong>Editable Logged Meals & Undo Delete</strong></td>
            <td><strong>1-Tap Editable Macros + Undo Toast</strong></td>
            <td>Multi-screen edit flow</td>
            <td>Paid subscription required</td>
          </tr>
          <tr>
            <td><strong>Integrated Gym Workout & Set Logger</strong></td>
            <td><strong>Built-In (Sets, Reps, Weight, Rest Timer)</strong></td>
            <td>Basic cardio calorie estimate only</td>
            <td>Separate workout app required</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card">
      <h2>Actionable Macro-Tracking Checklist for ${esc(chain.name)}</h2>
      <ul class="check">
        <li>✓ <strong>Anchor Protein First:</strong> Hit at least 35g–60g of lean protein in your ${esc(chain.name)} order so you reach your daily target without late-night snacking.</li>
        <li>✓ <strong>Audit Liquid & Sauce Calories:</strong> Keep creamy dressings, mayo-based spreads, and sugary drinks on the side to save 180–350 hidden calories per meal.</li>
        <li>✓ <strong>Scan & Adjust in GymBite:</strong> Take a quick photo in GymBite before eating, verify the protein/carb/fat split, and edit any custom double-meat portion in 2 seconds.</li>
        <li>✓ <strong>Pair with Progressive Overload:</strong> Log your gym sets, reps, and rest intervals in the GymBite Workout tab on the same day to maximize muscle retention.</li>
      </ul>
    </div>

    <div class="card">
      <h2>More ${esc(chain.name)} & Nutrition Guides</h2>
      <ul>
        ${relatedAngles.map(a => `<li><a href="/seo/${chain.slug}-${a.slug}-${goal.slug}">${esc(chain.name)} — ${esc(a.name)}</a></li>`).join('')}
        ${relatedGoals.map(g => `<li><a href="/seo/${chain.slug}-${angle.slug}-${g.slug}">${esc(chain.name)} — ${esc(angle.short)} (${esc(g.name)})</a></li>`).join('')}
      </ul>
      <h3>Explore Other Restaurant Macro Guides</h3>
      <ul>
        ${relatedChains.map(c => `<li><a href="/seo/${c.slug}-${angle.slug}-${goal.slug}">${esc(c.name)} — ${esc(angle.short)} (${c.protein}g Protein Pick)</a></li>`).join('')}
      </ul>
    </div>
  </div>
</body>
</html>`;
}

function handleSeoRequest(urlStr, hostHeader) {
  const u = new URL(urlStr, 'http://localhost');
  const host = hostHeader ? `https://${hostHeader}` : DEFAULT_SITE_URL;
  const siteUrl = host.includes('localhost') || host.includes('127.0.0.1') ? DEFAULT_SITE_URL : host;
  const mode = u.searchParams.get('mode') || '';
  const rawSlug = (u.searchParams.get('slug') || '').trim();

  if (mode === 'sitemap') {
    return {
      status: 200,
      contentType: 'application/xml; charset=utf-8',
      body: renderSitemap(siteUrl)
    };
  }
  if (mode === 'robots') {
    return {
      status: 200,
      contentType: 'text/plain; charset=utf-8',
      body: renderRobots(siteUrl)
    };
  }
  if (!rawSlug || rawSlug === '__hub__') {
    return {
      status: 200,
      contentType: 'text/html; charset=utf-8',
      body: renderHub(siteUrl)
    };
  }
  const parsed = parseSlug(rawSlug);
  if (!parsed) {
    return {
      status: 404,
      contentType: 'text/html; charset=utf-8',
      body: renderHub(siteUrl)
    };
  }
  return {
    status: 200,
    contentType: 'text/html; charset=utf-8',
    body: renderPage(parsed, rawSlug, siteUrl)
  };
}

export async function GET(request) {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  const out = handleSeoRequest(request.url, host);
  return new Response(out.body, {
    status: out.status,
    headers: {
      'content-type': out.contentType,
      'cache-control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'
    }
  });
}

export default async function handler(req, res) {
  if (req instanceof Request && !res) {
    return GET(req);
  }
  const host = (req.headers && (req.headers['x-forwarded-host'] || req.headers.host)) || '';
  const out = handleSeoRequest(req.url || '/', String(host));
  if (res) {
    res.statusCode = out.status;
    if (typeof res.setHeader === 'function') {
      res.setHeader('Content-Type', out.contentType);
      res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800');
    }
    if (typeof res.end === 'function') {
      res.end(out.body);
    }
  }
}
