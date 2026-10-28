/* =====================================================
   Bella Vista Dining: script.js (Step 2)
   Only handles page switching for now.
   ===================================================== */

// ===== Scroll reveal =====
document.documentElement.classList.add('js');

function setupReveal() {
  // things that fade in one by one
  const single = [
    '.welcome .container',
    '.farmer',
    '.kitchen .container > :not(.dish-row)',
    '.story-photos',
    '.story-text',
    '.experience .container',
    '.waiting-text',
    '.waiting-img',
    '.footer-row'
  ];

  // groups that fade in with a small delay between each item
  const staggered = [
    '.dish-card',
    '.exp-photos img'
  ];

  single.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.classList.add('reveal');
    });
  });

  staggered.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.setProperty('--delay', (i * 0.15) + 's');
    });
  });

  var items = document.querySelectorAll('.reveal');

  // old browsers: just show everything
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('show'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);   // animate only once
      }
    });
  }, { threshold: 0.15 });

  items.forEach(function (el) { observer.observe(el); });
}

setupReveal();


   // Names of all the pages (each one is a <div id="page-NAME"> in index.html)
// ---------- Fit the whole website to the screen ----------
// Our CSS sizes were written for a screen 1280px wide.
// This code scales the page up or down so it fits any screen the same way.
var designWidth = 1280;

function fitToScreen() {
  var screenWidth = document.documentElement.clientWidth;   // width of the browser window
  var scale = screenWidth / designWidth;                    // example: 1536 / 1280 = 1.2
  document.body.style.zoom = scale;                         // makes the whole page bigger or smaller
}

fitToScreen();                    // run once when the page opens
window.onresize = fitToScreen;    // run again whenever the window size changes

var pages = ['home', 'menu', 'reserve', 'my', 'admin'];


// Show one page and hide the others
function showPage(name) {

  // 1. Hide every page
  for (var i = 0; i < pages.length; i++) {
    document.getElementById('page-' + pages[i]).style.display = 'none';
  }

  // 2. Show the page we want
  document.getElementById('page-' + name).style.display = 'block';

  // 3. Remove the "active" look from every nav link
  var navLinks = document.getElementsByClassName('nav-link');
  for (var j = 0; j < navLinks.length; j++) {
    navLinks[j].className = 'nav-link';
  }

  // 4. Highlight the nav link of the current page (if it has one)
  var activeLink = document.getElementById('nav-' + name);
  if (activeLink) {
    activeLink.className = 'nav-link active';
  }

  // 5. Go back to the top of the page
  window.scrollTo(0, 0);
}

// ===== Menu page =====
var menuItems = [
  { name: 'Slow-Braised Beef Kare-Kare', cat: 'main', label: 'Main Courses', price: 620, tags: ['Local Classic', 'Filipino'], img: 'karekare.jpg', desc: 'Tender oxtail and beef in rich peanut sauce, with garden vegetables and house bagoong.' },
  { name: 'Special Pork Humba', cat: 'main', label: 'Main Courses', price: 520, tags: ['Filipino', 'Spicy'], img: 'humba.jpg', desc: 'Tender pork belly slow-braised in a rich, sweet, and savory soy-vinegar glaze.' },
  { name: 'Lechon Belly Roulade', cat: 'main', label: 'Main Courses', price: 780, tags: ['House Favorite', 'Filipino'], img: 'lechonbelly.jpg', desc: 'Herb-stuffed pork belly roasted until golden, served with liver sauce and pickled papaya.' },
  { name: 'Grilled Salmon', cat: 'main', label: 'Main Courses', price: 640, tags: ['Continental'], img: 'salmon.jpg', desc: 'Pan-seared salmon with lemon butter, served over seasonal garden greens.' },
  { name: 'Prawn Sinigang in Tamarind Broth', cat: 'apps', label: 'Appetizers & Soups', price: 520, tags: ['Local Classic', 'Filipino'], img: 'sinigang.jpg', desc: 'Fresh prawns and seasonal vegetables in a light, tangy tamarind broth.' },
  { name: 'Grilled Beef Tenderloin', cat: 'main', label: 'Main Courses', price: 1150, tags: ['Continental'], img: 'steak.jpg', desc: 'Tender beef with red wine reduction, mushroom ragout, and seasonal greens' },
  { name: 'Creamy Mushroom Risotto', cat: 'main', label: 'Main Courses', price: 480, tags: ['House Favorite', 'Continental'], img: 'risotto.jpg', desc: 'Arborio rice with farm mushrooms, parmesan, and truffle oil.' },
  { name: 'Lumpiang Shanghai', cat: 'apps', label: 'Appetizers & Soups', price: 260, tags: ['House Favorite', 'Filipino'], img: 'lumpiashanghai.jpg', last: true, desc: 'Crisp hand-rolled spring rolls with sweet chili dipping sauce.' },
  { name: 'Ensaladang Mangga', cat: 'apps', label: 'Appetizers & Soups', price: 240, tags: ['Local Classic', 'Filipino'], img: 'mangasalad.jpg', desc: 'Green mango, tomato, and red onion with salted egg and a calamansi dressing.' },
  { name: 'Caesar Salad', cat: 'apps', label: 'Appetizers & Soups', price: 280, tags: ['House Favorite', 'Continental'], img: 'salad.jpg', desc: 'Crisp romaine, shaved parmesan, and garlic croutons in a classic creamy dressing.' },
  { name: 'Roasted Mushroom Soup', cat: 'apps', label: 'Appetizers & Soups', price: 240, tags: ['Vegetarian', 'Continental'], img: 'mushroom.jpg', desc: 'Velvety farm mushroom soup finished with cream and served with toasted bread.' },
  { name: 'Tomato Basil Bruschetta', cat: 'apps', label: 'Appetizers & Soups', price: 220, tags: ['Continental', 'Vegetarian'], img: 'bruschetta.jpg', desc: 'Toasted bread topped with ripe tomatoes, basil, garlic, and olive oil.' },
  { name: 'Fresh Fruit Shake', cat: 'dessert', label: 'Desserts & Drinks', price: 150, tags: ['House Favorite', 'Filipino'], img: 'fruitshake.jpg', desc: 'Blended seasonal fruit, thick, cold, and lightly sweetened.' },
  { name: 'Calamansi Cooler', cat: 'dessert', label: 'Desserts & Drinks', price: 110, tags: ['Local Classic', 'Filipino'], img: 'calamansi.jpg', desc: 'Freshly squeezed calamansi with a bright, tangy-sweet finish.' },
  { name: 'Halo-Halo Cheesecake', cat: 'dessert', label: 'Desserts & Drinks', price: 240, tags: ['Local Classic', 'Filipino'], img: 'cheesecake.jpg', desc: 'Creamy cheesecake layered with ube, sweet beans, and leche flan.' },
  { name: 'House Iced Tea', cat: 'dessert', label: 'Desserts & Drinks', price: 110, tags: ['Continental'], img: 'icetea.jpg', desc: 'House-brewed tea over ice, lightly sweetened with a hint of citrus.' },
  { name: 'Classic Tiramisu', cat: 'dessert', label: 'Desserts & Drinks', price: 260, tags: ['Continental'], img: 'tiramisu.jpg', desc: 'Espresso-soaked layers with mascarpone cream and cocoa.' },
  { name: 'Silky Leche Flan', cat: 'dessert', label: 'Desserts & Drinks', price: 150, tags: ['Filipino'], img: 'lecheplan.jpg', desc: 'Slow-steamed caramel custard with a golden syrup glaze.' }
];

var menuState = { cat: 'all', sort: 'rec', filters: [], maxPrice: 1200, avoid: [] };
var menuCart = {};   // { dishName: quantity }

function peso(n) {
  return '₱' + n.toLocaleString('en-US');
}

// Turns "Dairy, gluten, egg" into ['dairy', 'gluten', 'egg']
function dishAllergens(name) {
  var info = dishInfo[name];
  if (!info || info.allergens === 'None') return [];
  return info.allergens.split(',').map(function (a) {
    return a.trim().toLowerCase().replace('may contain ', '');
  });
}

function renderMenu() {
  var grid = document.getElementById('menuGrid');
  var list = menuItems.slice();

  // 1. tab
  if (menuState.cat !== 'all') {
    list = list.filter(function (d) { return d.cat === menuState.cat; });
    // inside a tab, Lumpiang Shanghai goes last (like the prototype)
    list.sort(function (a, b) { return (a.last ? 1 : 0) - (b.last ? 1 : 0); });
  }

  // 2. chips (a dish must match every selected chip)
  menuState.filters.forEach(function (f) {
    list = list.filter(function (d) {
      return f === 'under200' ? d.price < 200 : d.tags.indexOf(f) !== -1;
    });
  });
    // 2b. price slider (from the filter drawer)
  list = list.filter(function (d) { return d.price <= menuState.maxPrice; });

    // 2c. allergens to avoid (from the filter drawer)
  if (menuState.avoid.length) {
    list = list.filter(function (d) {
      var has = dishAllergens(d.name);
      return !menuState.avoid.some(function (a) { return has.indexOf(a) !== -1; });
    });
  }

  // 3. sort
  if (menuState.sort === 'low')  list.sort(function (a, b) { return a.price - b.price; });
  if (menuState.sort === 'high') list.sort(function (a, b) { return b.price - a.price; });
  if (menuState.sort === 'az')   list.sort(function (a, b) { return a.name.localeCompare(b.name); });
  

  // 4. draw
  grid.innerHTML = list.map(function (d, i) {
    var tags = d.tags.map(function (t) { return '<span class="menu-tag">' + t + '</span>'; }).join('');
    return '' +
        '<div class="menu-card" data-name="' + d.name + '" style="animation-delay:' + (i * 0.05) + 's">' +
        '<div class="menu-photo">' +
          '<img src="mgaImahe/' + d.img + '" alt="' + d.name + '">' +
          '<div class="menu-tags">' + tags + '</div>' +
        '</div>' +
        '<div class="menu-info">' +
          '<p class="menu-cat">' + d.label + '</p>' +
          '<h3 class="menu-name">' + d.name + '</h3>' +
          '<p class="menu-desc">' + d.desc + '</p>' +
          '<div class="menu-line"></div>' +
          '<div class="menu-bottom">' +
            '<span class="menu-price">' + peso(d.price) + '</span>' +
            '<button class="add-btn" data-name="' + d.name + '">Add to cart</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }).join('');

  document.getElementById('menuEmpty').style.display = list.length ? 'none' : 'block';
}

function updateCartCount() {
  var total = 0;
  for (var k in menuCart) total += menuCart[k];

  var badge = document.getElementById('cartCount');
  badge.textContent = total;
  badge.classList.toggle('empty', total === 0);

  renderCart();
}

function setupMenu() {
  // tabs
  document.querySelectorAll('.menu-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.menu-tab').forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      menuState.cat = tab.dataset.cat;
      renderMenu();
    });
  });

  // sort
  document.getElementById('menuSort').addEventListener('change', function (e) {
    menuState.sort = e.target.value;
    renderMenu();
  });

    // chips
  document.querySelectorAll('.chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      chip.classList.toggle('on');
      var f = chip.dataset.filter;
      var at = menuState.filters.indexOf(f);
      if (at === -1) menuState.filters.push(f); else menuState.filters.splice(at, 1);
      updateFilterLabel();
      renderMenu();
    });
  });

    // "Show Filters" opens the filter drawer
  document.getElementById('filterToggle').addEventListener('click', openFilters);

  // add to cart (one listener for all cards)
  document.getElementById('menuGrid').addEventListener('click', function (e) {
        // clicking the photo or the name opens the pop-up
    var openArea = e.target.closest('.menu-photo, .menu-name');
    if (openArea) {
      openDetail(openArea.closest('.menu-card').dataset.name);
      return;
    }
    var btn = e.target.closest('.add-btn');
    if (!btn) return;
    var name = btn.dataset.name;
    menuCart[name] = (menuCart[name] || 0) + 1;
    updateCartCount();

    btn.textContent = 'Added ✓';
    setTimeout(function () { btn.textContent = 'Add to cart'; }, 900);
  });

  renderMenu();
}

setupMenu();

// Go to the Home page, then scroll down to a section (used by About Us / Contact)
function goToSection(sectionId) {
  showPage('home');
  document.getElementById(sectionId).scrollIntoView();
}


// When the website first opens, show the Home page
showPage('home');

// ===== Page switch transition (slide) =====
(function () {
  var originalShowPage = showPage;
  var currentPage = 'home';
  var order = ['home', 'menu', 'reserve', 'my', 'admin'];

  showPage = function (name) {
    originalShowPage(name);

    // same page clicked again: no replay
    if (name === currentPage) return;

    var goingRight = order.indexOf(name) > order.indexOf(currentPage);
    currentPage = name;

    var page = document.getElementById('page-' + name);
    if (!page) return;

    window.scrollTo({ top: 0, behavior: 'instant' });

    page.classList.remove('slide-from-right', 'slide-from-left');
    void page.offsetWidth;        // restarts the animation
    page.classList.add(goingRight ? 'slide-from-right' : 'slide-from-left');
  };
})();

// =====================================================
// ===== Dish detail pop-up + Filter drawer (new) =====
// =====================================================

// Extra information for the pop-up (the key must be the same as the dish name)
// nut = [grams per serving, Cal, protein g, fat g, saturated g, carbs g, sugars g, fibre g, sodium mg]
var dishInfo = {
  'Slow-Braised Beef Kare-Kare': {
    serves: '1–2', prep: '25 min', allergens: 'Peanuts, shellfish',
    nut: [450, 720, 38, 48, 14, 30, 6, 6, 1100],
    about: 'A Filipino celebration classic. Beef shank and oxtail are braised for hours until fall-apart tender, then draped in a thick, nutty peanut sauce. Served with garden vegetables and a side of house bagoong for that salty-savory kick.',
    full: 'Beef Shank, Oxtail, Peanut Sauce [Ground Peanuts, Toasted Rice Flour, Annatto, Garlic, Onion, Beef Stock], Eggplant, String Beans, Bok Choy, Banana Heart, Bagoong [Fermented Shrimp Paste, Garlic, Sugar].',
    key: [['Beef shank & oxtail', 'Slow-braised until the collagen melts, giving the sauce its rich body and the meat its tenderness.'], ['Peanut sauce', 'Ground roasted peanuts thickened with toasted rice and colored with annatto. It is the heart of the dish.'], ['Garden vegetables', 'Eggplant, string beans and bok choy add freshness and a bit of bite against the creamy sauce.'], ['Bagoong', 'Fermented shrimp paste served on the side. Add a little at a time to season each bite.']]
  },
  'Special Pork Humba': {
    serves: '1–2', prep: '20 min', allergens: 'Soy',
    nut: [350, 680, 34, 46, 16, 28, 18, 1, 1300],
    about: 'Pork belly slow-braised in soy, vinegar and brown sugar until it is glossy, sticky and melt-in-the-mouth. Sweet, savory and a little tangy, it is best eaten with a mountain of steamed rice.',
    full: 'Pork Belly, Soy Sauce [Water, Soybeans, Wheat, Salt], Cane Vinegar, Brown Sugar, Star Anise, Bay Leaf, Garlic, Black Peppercorns, Fermented Black Beans, Banana Blossom, Chili.',
    key: [['Pork belly', 'Layers of meat and fat that turn silky and tender after a long, gentle braise.'], ['Soy and cane vinegar', 'The classic Visayan base. Salty and sharp, balanced by the sugar.'], ['Brown sugar', 'Caramelizes into the sticky glaze that coats every piece.'], ['Star anise', 'A warm, faintly sweet spice that gives humba its signature aroma.']]
  },
  'Lechon Belly Roulade': {
    serves: '2', prep: '30 min', allergens: 'Soy, gluten',
    nut: [380, 790, 42, 60, 22, 12, 4, 2, 1250],
    about: 'Pork belly rolled around lemongrass, garlic and herbs, then roasted until the skin crackles. Sliced into thick rounds and served with a rich liver sauce and tangy pickled papaya.',
    full: 'Pork Belly, Lemongrass, Garlic, Spring Onion, Black Pepper, Salt, Liver Sauce [Pork Liver, Vinegar, Breadcrumbs (Wheat), Sugar, Soy Sauce, Garlic], Pickled Papaya [Green Papaya, Cane Vinegar, Carrot, Sugar, Salt].',
    key: [['Pork belly', 'Roasted until the skin is crisp and the meat stays juicy inside.'], ['Lemongrass & herbs', 'Stuffed in the center to perfume the meat from the inside out.'], ['Liver sauce', 'The traditional lechon sauce. Sweet, tangy and deeply savory.'], ['Pickled papaya', 'Cuts through the richness with a bright, crunchy acidity.']]
  },
  'Grilled Salmon': {
    serves: '1', prep: '20 min', allergens: 'Fish, dairy',
    nut: [320, 520, 38, 36, 12, 8, 3, 3, 620],
    about: 'A thick salmon fillet pan-seared until the skin is crisp and the center stays tender and flaky. Finished with a lemon butter sauce and served over fresh seasonal greens.',
    full: 'Salmon Fillet, Butter [Cream, Salt], Lemon Juice, Garlic, Dill, Olive Oil, Sea Salt, Black Pepper, Seasonal Garden Greens, Cherry Tomatoes.',
    key: [['Salmon fillet', 'Rich in omega-3 fats, with a buttery texture that cooks quickly and stays moist.'], ['Lemon butter', 'A light pan sauce that adds brightness without overpowering the fish.'], ['Dill', 'A fresh herb that pairs naturally with salmon.'], ['Garden greens', 'Lightly dressed leaves that make the plate feel fresh and balanced.']]
  },
  'Prawn Sinigang in Tamarind Broth': {
    serves: '1–2', prep: '20 min', allergens: 'Shellfish',
    nut: [450, 310, 28, 8, 2, 28, 7, 5, 1400],
    about: 'Plump prawns simmered in a light, sour tamarind broth with crisp vegetables. A comforting Filipino favorite that is tangy, warm and refreshing in every spoonful.',
    full: 'Prawns, Tamarind, Tomato, Onion, Radish, Water Spinach (Kangkong), Okra, Long Green Chili, Fish Sauce [Anchovy, Salt], Ginger, Water.',
    key: [['Prawns', 'Cooked briefly so they stay sweet and springy. The heads flavor the broth.'], ['Tamarind', 'Gives sinigang its signature clean sourness.'], ['Tomato & onion', 'Soften into the broth and round out the sour notes.'], ['Water spinach & okra', 'Tender greens that soak up the tamarind broth.']]
  },
  'Grilled Beef Tenderloin': {
    serves: '1', prep: '25 min', allergens: 'Dairy, sulfites',
    nut: [350, 640, 48, 38, 15, 22, 6, 4, 780],
    about: 'A premium tenderloin cut grilled to your liking and finished with a glossy red wine reduction. Served with a savory mushroom ragout and seasonal greens.',
    full: 'Beef Tenderloin, Red Wine Reduction [Red Wine, Beef Stock, Shallots, Thyme, Butter (Cream)], Mushroom Ragout [Mushrooms, Garlic, Butter, Parsley, Cream], Seasonal Greens, Olive Oil, Sea Salt, Black Pepper.',
    key: [['Beef tenderloin', 'The most tender cut of beef, lean and fine-grained, with a mild flavor.'], ['Red wine reduction', 'Wine simmered down with stock and shallots into a deep, glossy sauce.'], ['Mushroom ragout', 'Earthy sautéed mushrooms that bring umami to the plate.'], ['Seasonal greens', 'A fresh, lightly cooked side to balance the richness.']]
  },
  'Creamy Mushroom Risotto': {
    serves: '1', prep: '25 min', allergens: 'Dairy',
    nut: [380, 640, 16, 26, 12, 78, 3, 4, 900],
    about: 'Arborio rice stirred slowly with farm mushrooms until creamy and tender. Finished with parmesan and a drizzle of truffle oil for a deep, earthy aroma.',
    full: 'Arborio Rice, Mushrooms, Vegetable Stock, Onion, Garlic, White Wine, Parmesan [Milk, Salt, Rennet], Butter [Cream], Truffle Oil, Parsley, Black Pepper.',
    key: [['Arborio rice', 'A short-grain Italian rice that releases starch for a naturally creamy texture.'], ['Farm mushrooms', 'Sautéed until golden to bring out their savory, earthy flavor.'], ['Parmesan', 'Aged cheese that adds salt and depth.'], ['Truffle oil', 'Just a few drops for a fragrant, luxurious finish.']]
  },
  'Lumpiang Shanghai': {
    serves: '2–3', prep: '15 min', allergens: 'Gluten, egg',
    nut: [220, 480, 18, 30, 9, 34, 6, 2, 640],
    about: 'Thin, crisp rolls filled with seasoned ground pork and vegetables, fried until golden. Served hot with a sweet chili dipping sauce. A fixture at every Filipino gathering.',
    full: 'Ground Pork, Carrot, Onion, Garlic, Egg, Spring Roll Wrapper [Wheat Flour, Water, Salt], Black Pepper, Cooking Oil, Sweet Chili Sauce [Sugar, Chili, Vinegar, Garlic, Salt].',
    key: [['Ground pork', 'Seasoned and mixed with finely chopped vegetables for a juicy filling.'], ['Spring roll wrapper', 'Rolled thin so it fries up light and shatteringly crisp.'], ['Carrot & onion', 'Add a touch of sweetness and moisture to the filling.'], ['Sweet chili sauce', 'A sticky, mildly spicy dip that cuts the richness.']]
  },
  'Ensaladang Mangga': {
    serves: '2', prep: '10 min', allergens: 'Egg',
    nut: [220, 190, 5, 9, 3, 24, 16, 4, 520],
    about: 'Tart green mango with ripe tomato and red onion, topped with salted egg and tossed in a bright calamansi dressing. Fresh, sour and a little salty.',
    full: 'Green Mango, Tomato, Red Onion, Salted Egg, Calamansi Juice, Cane Vinegar, Sugar, Salt, Black Pepper, Cilantro.',
    key: [['Green mango', 'Unripe and crisp, with a sharp sourness that wakes up the palate.'], ['Salted egg', 'Adds a rich, salty contrast to the sour fruit.'], ['Tomato & red onion', 'Juicy and sharp, they make the salad feel fresh.'], ['Calamansi dressing', 'A local citrus that is brighter and more floral than lemon.']]
  },
  'Caesar Salad': {
    serves: '1–2', prep: '10 min', allergens: 'Dairy, gluten, egg, fish',
    nut: [250, 380, 13, 28, 8, 18, 3, 3, 820],
    about: 'Crisp romaine tossed in a classic creamy dressing, topped with shaved parmesan and golden garlic croutons. Simple, savory and always satisfying.',
    full: 'Romaine Lettuce, Caesar Dressing [Egg Yolk, Olive Oil, Anchovy, Garlic, Lemon Juice, Dijon Mustard, Parmesan], Garlic Croutons [Bread (Wheat), Olive Oil, Garlic], Shaved Parmesan [Milk, Salt, Rennet], Black Pepper.',
    key: [['Romaine lettuce', 'Sturdy, crunchy leaves that hold up well to a creamy dressing.'], ['Caesar dressing', 'Egg, garlic and anchovy blended into a savory, tangy sauce.'], ['Garlic croutons', 'Baked until crunchy and rubbed with garlic.'], ['Shaved parmesan', 'Salty, nutty shavings added just before serving.']]
  },
  'Roasted Mushroom Soup': {
    serves: '1', prep: '15 min', allergens: 'Dairy, gluten',
    nut: [300, 280, 6, 20, 11, 18, 5, 3, 760],
    about: 'Farm mushrooms roasted until deeply golden, then blended with cream into a velvety soup. Served with toasted bread for dipping.',
    full: 'Mushrooms, Cream, Onion, Garlic, Vegetable Stock, Butter, Thyme, Black Pepper, Salt, Toasted Bread [Wheat Flour, Yeast, Salt].',
    key: [['Roasted mushrooms', 'Roasting concentrates their flavor and gives the soup its earthy depth.'], ['Cream', 'Gives the soup its smooth, rich body.'], ['Thyme', 'A light herb that brings out the mushroom flavor.'], ['Toasted bread', 'Crisp slices for scooping up every last drop.']]
  },
  'Tomato Basil Bruschetta': {
    serves: '2', prep: '10 min', allergens: 'Gluten',
    nut: [180, 260, 6, 11, 2, 34, 5, 3, 480],
    about: 'Grilled rustic bread topped with ripe diced tomatoes, fresh basil and garlic, finished with a drizzle of olive oil. Light, fresh and perfect for sharing.',
    full: 'Grilled Bread [Wheat Flour, Water, Yeast, Salt], Tomato, Basil, Garlic, Extra Virgin Olive Oil, Balsamic Vinegar, Sea Salt, Black Pepper.',
    key: [['Grilled bread', 'Charred and crunchy outside, so it stays crisp under the topping.'], ['Ripe tomatoes', 'Diced and lightly salted so their natural sweetness comes through.'], ['Fresh basil', 'Adds a sweet, peppery fragrance.'], ['Olive oil', 'Ties the topping together with a fruity richness.']]
  },
  'Fresh Fruit Shake': {
    serves: '1', prep: '5 min', allergens: 'May contain dairy',
    nut: [350, 230, 5, 4, 2, 46, 38, 4, 60],
    about: 'Seasonal fruit blended thick and cold with just a touch of sweetness. A refreshing way to cool down, made fresh to order.',
    full: 'Seasonal Fruit [Mango, Banana, or Papaya], Ice, Milk, Honey.',
    key: [['Seasonal fruit', 'Picked at peak ripeness, so the flavor changes with the season.'], ['Milk', 'Makes the shake smooth and creamy.'], ['Honey', 'A light touch of natural sweetness.'], ['Ice', 'Blended in for a thick, frosty texture.']]
  },
  'Calamansi Cooler': {
    serves: '1', prep: '5 min', allergens: 'None',
    nut: [300, 110, 0.5, 0, 0, 28, 26, 0.5, 15],
    about: 'Freshly squeezed calamansi with honey and sparkling water. Bright, tangy and sweet, and one of the most refreshing drinks on the menu.',
    full: 'Calamansi Juice, Honey, Sparkling Water, Ice, Mint.',
    key: [['Calamansi', 'A small Philippine citrus with a tart, floral flavor.'], ['Honey', 'Softens the sourness with gentle sweetness.'], ['Sparkling water', 'Adds a lively fizz.'], ['Mint', 'A fresh garnish for a cool finish.']]
  },
  'Halo-Halo Cheesecake': {
    serves: '1–2', prep: '5 min', allergens: 'Dairy, gluten, egg',
    nut: [160, 460, 8, 28, 16, 44, 32, 1, 320],
    about: 'A creamy cheesecake layered with ube and topped with sweet beans and leche flan. All the flavors of halo-halo in one slice.',
    full: 'Cream Cheese [Milk, Cream, Salt], Ube Halaya [Purple Yam, Condensed Milk, Butter], Sugar, Egg, Biscuit Crust [Wheat Flour, Butter, Sugar], Sweet Beans, Leche Flan [Egg, Milk, Sugar].',
    key: [['Cream cheese', 'The smooth, tangy base of the cake.'], ['Ube', 'A purple yam with a mellow, vanilla-like sweetness.'], ['Sweet beans', 'A classic halo-halo topping with a soft, sweet bite.'], ['Leche flan', 'A silky caramel custard layer on top.']]
  },
  'House Iced Tea': {
    serves: '1', prep: '5 min', allergens: 'None',
    nut: [350, 90, 0, 0, 0, 23, 22, 0, 12],
    about: 'House-brewed black tea poured over ice and lightly sweetened with a hint of citrus. Crisp, clean and refreshing.',
    full: 'Brewed Black Tea, Lemon, Sugar, Ice, Mint.',
    key: [['Black tea', 'Brewed fresh and chilled for a clean, slightly malty flavor.'], ['Lemon', 'A hint of citrus keeps it bright.'], ['Sugar', 'Just enough to take the edge off the tea.'], ['Mint', 'A sprig for aroma.']]
  },
  'Classic Tiramisu': {
    serves: '1–2', prep: '5 min', allergens: 'Dairy, gluten, egg, caffeine',
    nut: [150, 420, 7, 26, 15, 38, 26, 1, 130],
    about: 'Espresso-soaked ladyfingers layered with whipped mascarpone cream and dusted with cocoa. Light, creamy and just bitter enough.',
    full: 'Mascarpone [Cream, Citric Acid], Egg, Sugar, Ladyfingers [Wheat Flour, Egg, Sugar], Espresso, Cocoa Powder, Vanilla.',
    key: [['Mascarpone', 'A soft Italian cream cheese that makes the filling rich and airy.'], ['Espresso', 'Soaks the ladyfingers with a deep coffee flavor.'], ['Ladyfingers', 'Light sponge biscuits that turn soft and cake-like.'], ['Cocoa', 'A bitter dusting that balances the sweetness.']]
  },
  'Silky Leche Flan': {
    serves: '1', prep: '5 min', allergens: 'Dairy, egg',
    nut: [140, 340, 8, 12, 6, 52, 50, 0, 120],
    about: 'A dense, silky custard slow-steamed and finished with a golden caramel syrup. A Filipino dessert staple.',
    full: 'Egg Yolk, Condensed Milk, Evaporated Milk, Sugar, Vanilla, Lemon Zest.',
    key: [['Egg yolks', 'Give the custard its rich color and dense, silky texture.'], ['Condensed milk', 'Adds sweetness and creaminess.'], ['Caramel', 'Cooked until golden for a gentle bittersweet finish.'], ['Lemon zest', 'A little zest keeps the flavor from getting too heavy.']]
  }
};

// What the pop-up is showing right now
var detail = { name: '', qty: 1, tab: 'details' };


// Find a dish by its name
function findDish(name) {
  for (var i = 0; i < menuItems.length; i++) {
    if (menuItems[i].name === name) {
      return menuItems[i];
    }
  }
}


// Open the pop-up for one dish
function openDetail(name) {
  detail.name = name;
  detail.qty = 1;
  detail.tab = 'details';
  drawDetail();
  document.getElementById('dishModal').classList.add('open');
  document.body.style.overflow = 'hidden';      // stops the page behind from scrolling
}


function closeDetail() {
  document.getElementById('dishModal').classList.remove('open');
  document.body.style.overflow = '';
}

// The nutrition table (per serving + per 100 g)
function nutritionTable(n) {
  var g = n[0];
  function per100(v) { return (v * 100 / g).toFixed(1); }
  var kj = Math.round(n[1] * 4.184);

  function row(label, a, unit, b) {
    return '<tr><td>' + label + '</td><td>' + a + '</td><td>' + unit + '</td><td>' + b + '</td><td>' + unit + '</td></tr>';
  }

  return '<table class="dm-nut">' +
    '<tr class="dm-nut-grey"><td colspan="4">Serving size</td><td>' + g + ' g</td></tr>' +
    '<tr class="dm-nut-head"><td></td><td colspan="2">Per serving</td><td colspan="2">Per 100 g</td></tr>' +
    row('Energy', kj, 'kJ', Math.round(kj * 100 / g)) +
    row('', n[1], 'Cal', Math.round(n[1] * 100 / g)) +
    row('Protein', n[2], 'g', per100(n[2])) +
    row('Fat, total', n[3], 'g', per100(n[3])) +
    row('– saturated', n[4], 'g', per100(n[4])) +
    row('Carbohydrate', n[5], 'g', per100(n[5])) +
    row('– sugars', n[6], 'g', per100(n[6])) +
    row('Dietary fibre', n[7], 'g', per100(n[7])) +
    row('Sodium', n[8], 'mg', Math.round(n[8] * 100 / g)) +
    '</table>';
}

// Build the pop-up content
function drawDetail() {
  var d = findDish(detail.name);
  var info = dishInfo[d.name] || { serves: '1', prep: '15 min', ingredients: 'Ask our staff.', allergens: 'Ask our staff.' };

  // dishes in the same category (used by Previous / Next)
  var same = menuItems.filter(function (x) { return x.cat === d.cat; });
  var pos = same.indexOf(d);

  // tag pills (Filipino, Spicy, ...)
  var pills = '';
  for (var i = 0; i < d.tags.length; i++) {
    pills += '<span class="dm-pill">' + d.tags[i] + '</span>';
  }

   // tabs
  var tabNames = [['details', 'Details'], ['ingredients', 'Ingredients'], ['nutrition', 'Nutritional Info']];
  var tabs = '';
  for (var t = 0; t < tabNames.length; t++) {
    var on = (detail.tab === tabNames[t][0]) ? ' active' : '';
    tabs += '<button class="dm-tab' + on + '" onclick="setTab(\'' + tabNames[t][0] + '\')">' + tabNames[t][1] + '</button>';
  }

  // allergen pills (used in Details)
  var allergenHtml = '';
  if (info.allergens === 'None') {
    allergenHtml = '<p class="dm-text">No major allergens declared.</p>';
  } else {
    var alist = info.allergens.split(', ');
    for (var a = 0; a < alist.length; a++) {
      allergenHtml += '<span class="dm-allergen">' + alist[a] + '</span>';
    }
  }

  // content under the tabs
  var content = '';
  if (detail.tab === 'details') {
    content = '<div class="dm-card">' +
      '<p class="dm-text">' + (info.about || d.desc) + '</p>' +
      '<p class="dm-sub">Allergens</p>' + allergenHtml +
      '<p class="dm-meta"><b>Serves:</b> ' + info.serves + '&nbsp;&nbsp;&nbsp;<b>Prep time:</b> ' + info.prep + '</p>' +
      '</div>';
  } else if (detail.tab === 'ingredients') {
    content = '<div class="dm-card"><p class="dm-sub">Key Ingredients</p>' +
      '<p class="dm-text">' + (info.full || 'Ask our staff.') + '</p>';
    var keys = info.key || [];
    for (var k = 0; k < keys.length; k++) {
      content += '<h4 class="dm-key-name">' + keys[k][0] + '</h4><p class="dm-text">' + keys[k][1] + '</p>';
    }
    content += '</div>';
  } else {
    content = '<div class="dm-card">' +
      (info.nut ? nutritionTable(info.nut) : '<p class="dm-text">Nutritional information is not available for this dish.</p>') +
      '<p class="dm-sub">Allergen Advice:</p>' +
      '<p class="dm-text dm-small">Prepared in a kitchen that also handles gluten, peanuts, tree nuts, soy, sesame, egg, milk, fish, shellfish and sulphites. We take great care in preparing our dishes, however we cannot guarantee the absence of these allergens. Please tell our staff about any allergies before ordering.</p>' +
      '<p class="dm-text dm-small">Nutritional values are estimates and may vary slightly.</p>' +
      '</div>';
  }

  var prevOff = (pos === 0) ? ' disabled' : '';
  var nextOff = (pos === same.length - 1) ? ' disabled' : '';

  document.getElementById('dishModalBox').innerHTML = '' +
    '<button class="dm-close" onclick="closeDetail()" aria-label="Close">✕</button>' +
    '<p class="dm-crumb"><span class="dm-crumb-link" onclick="closeDetail()">Menu</span> › ' + d.label + ' › ' + d.name + '</p>' +
    '<div class="dm-row">' +

      // left side: photo + tabs
      '<div class="dm-left">' +
        '<img class="dm-photo" src="mgaImahe/' + d.img + '" alt="' + d.name + '">' +
        '<div class="dm-tabs">' + tabs + '</div>' +
        '<div class="dm-tabcontent">' + content + '</div>' +
      '</div>' +

      // right side: name, description, price box
      '<div class="dm-right">' +
        '<p class="dm-cat">' + d.label + '</p>' +
        '<h2 class="dm-name">' + d.name + '</h2>' +
        '<div class="dm-pills">' + pills + '</div>' +
        '<p class="dm-desc">' + d.desc + '</p>' +
        '<div class="dm-highlights">' +
          '<div class="dm-hl"><span class="dm-hl-icon"></span>Farm-fresh</div>' +
          '<div class="dm-hl"><span class="dm-hl-icon"></span>Made to order</div>' +
          '<div class="dm-hl"><span class="dm-hl-icon"></span>Locally sourced</div>' +
          '<div class="dm-hl"><span class="dm-hl-icon"></span>Good for sharing</div>' +
        '</div>' +
        '<div class="dm-pricebox">' +
          '<div class="dm-pricerow">' +
            '<span class="dm-price">' + peso(d.price) + '</span>' +
            '<button class="dm-qty-btn" onclick="changeQty(-1)" aria-label="Less">−</button>' +
            '<span class="dm-qty">' + detail.qty + '</span>' +
            '<button class="dm-qty-btn" onclick="changeQty(1)" aria-label="More">+</button>' +
            '<button class="dm-add" id="dmAddBtn" onclick="addFromDetail()">Add to cart · ' + peso(d.price * detail.qty) + '</button>' +
          '</div>' +
          '<p class="dm-note">Made to order · Served fresh · Prepared in-house</p>' +
        '</div>' +
        '<div class="dm-navrow">' +
          '<button class="dm-nav" onclick="goDish(-1)"' + prevOff + '>← Previous</button>' +
          '<button class="dm-nav" onclick="goDish(1)"' + nextOff + '>Next →</button>' +
        '</div>' +
      '</div>' +

    '</div>';
}


// Switch between Details / Ingredients / Allergens
function setTab(name) {
  detail.tab = name;
  drawDetail();
}


// + and - buttons
function changeQty(amount) {
  detail.qty = detail.qty + amount;
  if (detail.qty < 1) detail.qty = 1;
  if (detail.qty > 20) detail.qty = 20;
  drawDetail();
}


// Add to cart button inside the pop-up
function addFromDetail() {
  menuCart[detail.name] = (menuCart[detail.name] || 0) + detail.qty;
  updateCartCount();

  var btn = document.getElementById('dmAddBtn');
  btn.textContent = 'Added ✓';
  detail.qty = 1;
  setTimeout(function () {
    if (document.getElementById('dmAddBtn')) drawDetail();    // put the normal button back
  }, 900);
}


// Previous (-1) / Next (+1) dish in the same category
function goDish(step) {
  var d = findDish(detail.name);
  var same = menuItems.filter(function (x) { return x.cat === d.cat; });
  var next = same[same.indexOf(d) + step];
  if (!next) return;
  detail.name = next.name;
  detail.qty = 1;
  detail.tab = 'details';
  drawDetail();
  document.getElementById('dishModal').scrollTop = 0;
}


// ===== Filter drawer =====

// Open the drawer and tick the boxes that match the current filters
function openFilters() {
  var boxes = document.querySelectorAll('#filterDrawer input[type="checkbox"]:not(.fd-allergen)');
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].checked = (menuState.filters.indexOf(boxes[i].value) !== -1);
  }
  var avoidBoxes = document.querySelectorAll('#filterDrawer .fd-allergen');
  for (var j = 0; j < avoidBoxes.length; j++) {
    avoidBoxes[j].checked = (menuState.avoid.indexOf(avoidBoxes[j].value) !== -1);
  }
  document.getElementById('priceRange').value = menuState.maxPrice;
  showPriceText();
  document.getElementById('filterDrawer').classList.add('open');
  document.getElementById('drawerBack').classList.add('open');
}


function closeFilters() {
  document.getElementById('filterDrawer').classList.remove('open');
  document.getElementById('drawerBack').classList.remove('open');
}


// "up to ₱1,200" text next to the slider
function showPriceText() {
  var value = Number(document.getElementById('priceRange').value);
  document.getElementById('priceNow').textContent = 'up to ' + peso(value);
}


// Make the chips under the tabs match menuState.filters
function syncChips() {
  var chips = document.querySelectorAll('.chip');
  for (var i = 0; i < chips.length; i++) {
    var isOn = (menuState.filters.indexOf(chips[i].dataset.filter) !== -1);
    chips[i].classList.toggle('on', isOn);
  }
}


// "Show Filters (2)" button text
function updateFilterLabel() {
  var count = menuState.filters.length + menuState.avoid.length;
  if (menuState.maxPrice < 1200) count = count + 1;
  document.getElementById('filterLabel').textContent = count ? 'Show Filters (' + count + ')' : 'Show Filters';
}

// "Apply filters" button
function applyFilters() {
  var newFilters = [];
  var boxes = document.querySelectorAll('#filterDrawer input[type="checkbox"]:not(.fd-allergen)');
  for (var i = 0; i < boxes.length; i++) {
    if (boxes[i].checked) newFilters.push(boxes[i].value);
  }
  // "Under ₱200" is only a chip, so keep it if it was on
  if (menuState.filters.indexOf('under200') !== -1) newFilters.push('under200');

  var newAvoid = [];
  var avoidBoxes = document.querySelectorAll('#filterDrawer .fd-allergen');
  for (var j = 0; j < avoidBoxes.length; j++) {
    if (avoidBoxes[j].checked) newAvoid.push(avoidBoxes[j].value);
  }

  menuState.filters = newFilters;
  menuState.avoid = newAvoid;
  menuState.maxPrice = Number(document.getElementById('priceRange').value);

  syncChips();
  updateFilterLabel();
  renderMenu();
  closeFilters();
}


// "Clear all" button
function clearFilters() {
  menuState.filters = [];
  menuState.avoid = [];
  menuState.maxPrice = 1200;

  var boxes = document.querySelectorAll('#filterDrawer input[type="checkbox"]');
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].checked = false;
  }
  document.getElementById('priceRange').value = 1200;
  showPriceText();

  syncChips();
  updateFilterLabel();
  renderMenu();
}


// Close the pop-up / drawer with the Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeDetail();
    closeFilters();
  }
});

// Close the pop-up when the dark area around it is clicked
document.getElementById('dishModal').addEventListener('click', function (e) {
  if (e.target === this) closeDetail();
});

// ===== Photo lightbox =====
(function () {
  var photos = document.querySelectorAll('.exp-photos img');
  var box = document.getElementById('lightbox');
  var big = document.getElementById('lbImg');
  var count = document.getElementById('lbCount');
  var current = 0;

  function show(i) {
    // wrap around: after the last photo comes the first
    current = (i + photos.length) % photos.length;
    big.src = photos[current].src;
    big.alt = photos[current].alt;
    count.textContent = (current + 1) + ' / ' + photos.length;
  }

  function open(i) {
    show(i);
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    box.classList.remove('open');
    document.body.style.overflow = '';
  }

  photos.forEach(function (img, i) {
    img.addEventListener('click', function () { open(i); });
  });

  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', function (e) { e.stopPropagation(); show(current - 1); });
  document.getElementById('lbNext').addEventListener('click', function (e) { e.stopPropagation(); show(current + 1); });

  // click the dark area (not the photo) to close
  box.addEventListener('click', function (e) {
    if (e.target === box) close();
  });

  // keyboard: Esc closes, arrow keys switch photos
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
})();

// ===== Cart drawer =====
var MIN_ORDER = 1000;     // change this number to change the minimum order

var menuNotes = {};   // { dishName: "extra gravy please" }
var openNotes = {};   // which dishes have their note box open
var orderNote = '';          // the note for the whole order
var orderNoteOpen = false;   // is its text box open?

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartBack').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartBack').classList.remove('open');
  document.body.style.overflow = '';
}

function cartToReservation() {
  closeCart();
  showPage('reserve');
}

function keepBrowsing() {
  closeCart();
  // if we're not on the menu page, take the customer there
  if (document.getElementById('page-menu').style.display !== 'block') {
    showPage('menu');
  }
}

// Draw everything inside the drawer
function renderCart() {
  var names = Object.keys(menuCart).filter(function (n) { return menuCart[n] > 0; });
  var subtotal = 0;
  var html = '';

  names.forEach(function (name) {
    var d = findDish(name);
    if (!d) return;
    var qty = menuCart[name];
    subtotal += d.price * qty;

    // note: a text box if it's open or already has text, otherwise a small link
    var note = menuNotes[name] || '';
    var noteHtml;
    if (openNotes[name] || note !== '') {
      noteHtml = '<textarea class="cd-note" data-name="' + d.name + '" maxlength="150" rows="2" placeholder="Special instructions (e.g. extra gravy, no onions)">' + escapeHtml(note) + '</textarea>';
    } else {
      noteHtml = '<button class="cd-addnote" data-act="note" data-name="' + d.name + '">+ Add a note</button>';
    }

    html += '' +
      '<div class="cd-item">' +
        '<img class="cd-thumb" src="mgaImahe/' + d.img + '" alt="' + d.name + '">' +
        '<div class="cd-mid">' +
          '<p class="cd-name">' + d.name + '</p>' +
          '<p class="cd-cat">' + d.label + '</p>' +
          '<div class="cd-qty">' +
            '<button data-act="minus" data-name="' + d.name + '" aria-label="Less">−</button>' +
            '<span>' + qty + '</span>' +
            '<button data-act="plus" data-name="' + d.name + '" aria-label="More">+</button>' +
          '</div>' +
          noteHtml +
        '</div>' +
        '<span class="cd-price">' + peso(d.price * qty) + '</span>' +
      '</div>';
  });

  document.getElementById('cdItems').innerHTML = html;
  document.getElementById('cdEmpty').style.display = names.length ? 'none' : 'block';
  document.getElementById('cdSubtotal').textContent = peso(subtotal);
  document.getElementById('cdTotal').textContent = peso(subtotal);

  // minimum order message + progress bar
  var text;
  if (subtotal === 0) {
    text = 'A minimum order of ' + peso(MIN_ORDER) + ' applies upon seating.';
  } else if (subtotal < MIN_ORDER) {
    text = 'You’re ' + peso(MIN_ORDER - subtotal) + ' away from the ' + peso(MIN_ORDER) + ' minimum order.';
  } else {
    text = 'You’ve reached the ' + peso(MIN_ORDER) + ' minimum order. ✓';
  }
  document.getElementById('cdNoticeText').textContent = text;
  document.getElementById('cdFill').style.width = Math.min(100, subtotal / MIN_ORDER * 100) + '%';

    // note for the whole order (only shown when the cart has dishes)
  if (!names.length) {
    orderNote = '';
    orderNoteOpen = false;
  }
  var noteWrap = document.getElementById('cdOrderNote');
  var noteBox = document.getElementById('cdOrderNoteBox');
  var noteBtn = document.getElementById('cdOrderNoteBtn');
  var showBox = (orderNote !== '' || orderNoteOpen);

  noteWrap.style.display = names.length ? 'block' : 'none';
  noteBox.style.display = showBox ? 'block' : 'none';
  noteBtn.style.display = showBox ? 'none' : 'block';
  if (noteBox.value !== orderNote) noteBox.value = orderNote;

}

// + and − and "Add a note" inside the drawer (one listener for all items)
document.getElementById('cdItems').addEventListener('click', function (e) {
  var btn = e.target.closest('button');
  if (!btn) return;
  var name = btn.dataset.name;

  if (btn.dataset.act === 'note') {
    openNotes[name] = true;
    renderCart();
    if (rsvRender) rsvRender();
    var box = document.querySelector('#cdItems .cd-note[data-name="' + name + '"]');
    if (box) box.focus();
    return;
  }

  if (btn.dataset.act === 'plus') {
    menuCart[name] = (menuCart[name] || 0) + 1;
  } else {
    menuCart[name] = (menuCart[name] || 0) - 1;
    if (menuCart[name] <= 0) {
      delete menuCart[name];     // going below 1 removes the dish
      delete menuNotes[name];    // ...and its note
      delete openNotes[name];
    }
  }
  updateCartCount();
});

// "Add a note for the whole order"
document.getElementById('cdOrderNoteBtn').addEventListener('click', function () {
  orderNoteOpen = true;
  renderCart();
  document.getElementById('cdOrderNoteBox').focus();
});

// save it while typing
document.getElementById('cdOrderNoteBox').addEventListener('input', function (e) {
  orderNote = e.target.value;
});

// save the note while the customer types (no redraw, so the cursor never jumps)
document.getElementById('cdItems').addEventListener('input', function (e) {
  if (e.target.classList.contains('cd-note')) {
    menuNotes[e.target.dataset.name] = e.target.value;
  }
});

// Esc closes the cart
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeCart();
});

// draw the empty cart once when the page opens (also hides the badge)
updateCartCount();

// =====================================================
// ===== Reservation page =====
// =====================================================

// ---- Rules (change the numbers here) ----
var RSV_TYPES = {
  standard: { short: 'Standard', sub: 'Standard',      label: 'Standard Tables',     min: 1, max: 4,  fee: 0,    cap: 'Up to 4' },
  family:   { short: 'Family',   sub: 'Family',        label: 'Family Tables',       min: 5, max: 8,  fee: 500,  cap: 'Up to 8' },
  vip:      { short: 'VIP',      sub: 'Function Room', label: 'VIP Function Rooms',  min: 5, max: 20, fee: 2500, cap: 'Up to 15 (max 20)', extraFrom: 15, extraFee: 300 }
};

var RSV_TABLES = [
  { id: 'S1', type: 'standard', shape: 'round', chairs: 2 },
  { id: 'S2', type: 'standard', shape: 'round', chairs: 2 },
  { id: 'S3', type: 'standard', shape: 'round', chairs: 2 },
  { id: 'S4', type: 'standard', shape: 'round', chairs: 2 },
  { id: 'F1', type: 'family', shape: 'long', chairs: 4 },
  { id: 'F2', type: 'family', shape: 'long', chairs: 4 },
  { id: 'F3', type: 'family', shape: 'long', chairs: 4 },
  { id: 'V1', type: 'vip', shape: 'room', chairs: 6 },
  { id: 'V2', type: 'vip', shape: 'room', chairs: 6 }
];

var RSV_PAY = {
  card: 'Credit / Debit card',
  full: 'Full online payment',
  onsite: 'Cash or card, after your meal'
};

var RSV_FIRST = 10;   // first start time (10:00 AM)
var RSV_LAST = 20;    // last start time (8:00 PM), so the 2-hour block ends by 10:00 PM

var RSV_CHECK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

// ---- State ----
function rsvBlank() {
  return {
    step: 1, name: '', email: '', phone: '', guests: 2, date: '', time: '',
    table: '', tab: 'standard', requests: '', pay: '', agree: false,
    tried: {}, done: null
  };
}

var rsv = rsvBlank();
var rsvBookings = [];     // tables already booked: { table, date, time, code }
var rsvReady = false;

// ---- Small helpers ----
function rsvPad(n) { return n < 10 ? '0' + n : '' + n; }

function rsvIso(d) {
  return d.getFullYear() + '-' + rsvPad(d.getMonth() + 1) + '-' + rsvPad(d.getDate());
}

function rsvToday() { return rsvIso(new Date()); }

function rsvAddDays(n) {
  var d = new Date();
  d.setDate(d.getDate() + n);
  return rsvIso(d);
}

function rsvParse(s) {
  var p = s.split('-');
  return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
}

function rsvFmtDate(s) {
  return rsvParse(s).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function rsvFmtTime(t) {
  var h = parseInt(t, 10);
  return (h % 12 || 12) + ':00 ' + (h >= 12 ? 'PM' : 'AM');
}

function rsvRange(t) {
  var h = parseInt(t, 10);
  return rsvFmtTime(t) + ' – ' + rsvFmtTime(rsvPad(h + 2) + ':00');
}

function rsvTableById(id) {
  for (var i = 0; i < RSV_TABLES.length; i++) {
    if (RSV_TABLES[i].id === id) return RSV_TABLES[i];
  }
  return null;
}

function rsvTable() { return rsv.table ? rsvTableById(rsv.table) : null; }

function rsvTableLabel(t) {
  return t.type === 'vip' ? 'VIP Room · ' + t.id : RSV_TYPES[t.type].short + ' · ' + t.id;
}

function rsvSuggest(g) {
  if (g <= 4) return 'standard';
  if (g <= 8) return 'family';
  return 'vip';
}

function rsvFeeFor(type, guests) {
  var ty = RSV_TYPES[type];
  var fee = ty.fee;
  if (ty.extraFrom && guests > ty.extraFrom) fee += (guests - ty.extraFrom) * ty.extraFee;
  return fee;
}

function rsvFood() {
  var sum = 0;
  Object.keys(menuCart).forEach(function (n) {
    var d = findDish(n);
    if (d && menuCart[n] > 0) sum += d.price * menuCart[n];
  });
  return sum;
}

function rsvNote(type) {
  if (RSV_TYPES[type].fee > 0) return 'This reservation fee is consumable and goes toward your food bill.';
  return 'Minimum food order of ' + peso(MIN_ORDER) + ' applies upon seating.';
}

// ---- Availability ----
// DEMO ONLY: pretends some tables are booked so you can see the colors.
// When the database is ready, delete rsvDemoTaken and ask the database instead.
/* function rsvDemoTaken(id, date, hour) {
  var s = id + date + hour, n = 7;
  for (var i = 0; i < s.length; i++) n = (n * 31 + s.charCodeAt(i)) % 1009;
  return n % 9 === 0;
} */

function rsvTaken(id, date, time) {
  var h = parseInt(time, 10);
  for (var i = 0; i < rsvBookings.length; i++) {
    var b = rsvBookings[i];
    // two-hour blocks overlap when the start times are less than 2 hours apart
    if (b.table === id && b.date === date && Math.abs(parseInt(b.time, 10) - h) < 2) return true;
  }
  /* for (var off = -1; off <= 1; off++) {
    if (rsvDemoTaken(id, date, h + off)) return true;
  } */
  return false;
}

// ---- Validation ----
function rsvDateError() {
  if (!rsv.date) return 'Choose a reservation date.';
  var d = rsvParse(rsv.date);
  if (isNaN(d.getTime())) return 'Choose a valid date.';
  if (rsv.date < rsvToday()) return 'That date has already passed.';
  if (rsv.date > rsvAddDays(90)) return 'We take bookings up to 90 days ahead.';
  if (d.getDay() === 1) return 'We’re closed on Mondays. Please pick Tuesday to Sunday.';
  return '';
}

function rsvTimeError() {
  if (!rsv.time) return 'Choose a time.';
  if (rsv.date === rsvToday() && parseInt(rsv.time, 10) <= new Date().getHours()) {
    return 'That time has already passed.';
  }
  return '';
}

function rsvGuestsError() {
  var g = rsv.guests;
  if (!g || g < 1 || g > 20) return 'Guests must be between 1 and 20. For bigger groups, please call us.';
  return '';
}

function rsvStatus(t) {
  var ty = RSV_TYPES[t.type];
  if (rsvDateError() || rsvTimeError() || rsvGuestsError()) return 'wait';
  if (rsv.guests < ty.min || rsv.guests > ty.max) return 'nofit';
  if (rsvTaken(t.id, rsv.date, rsv.time)) return 'taken';
  return 'free';
}

function rsvValidate(step) {
  var e = {};
  if (step === 1) {
    if (rsv.name.trim().length < 2) e.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rsv.email.trim())) e.email = 'Please enter a valid email address.';
    if (!/^\+?[0-9]{10,13}$/.test(rsv.phone.replace(/[\s\-()]/g, ''))) e.phone = 'Enter a valid number, like 0912 345 6789.';
  }
  if (step === 1 || step === 2) {
    var g = rsvGuestsError(), t = rsvTimeError(), d = rsvDateError();
    if (g) e.guests = g;
    if (t) e.time = t;
    if (d) e.date = d;
  }
  if (step === 2) {
    var tb = rsvTable();
    if (!tb) e.table = 'Please choose an available table on the floor plan.';
    else if (rsvStatus(tb) !== 'free') e.table = 'Sorry, that table is no longer available. Please pick another.';
  }
  if (step === 3) {
    if (!rsv.pay) e.pay = 'Please choose how you would like to pay.';
    if (!rsv.agree) e.agree = 'Please accept the Terms and Conditions to continue.';
  }
  return e;
}

function rsvShowErrors(errs) {
  document.querySelectorAll('#page-reserve [data-err]').forEach(function (el) {
    el.textContent = errs[el.dataset.err] || '';
  });
  document.querySelectorAll('#page-reserve [data-rsv]').forEach(function (el) {
    el.classList.toggle('bad', !!errs[el.dataset.rsv]);
  });
}

function rsvScrollToError() {
  var els = document.querySelectorAll('#page-reserve .rv-panel.on .rv-err');
  for (var i = 0; i < els.length; i++) {
    if (els[i].textContent) {
      els[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
  }
}

function rsvScroll() {
  var el = document.getElementById('rvStepper');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ---- Inputs ----
function rsvFillTimes() {
  var today = (rsv.date === rsvToday());
  var nowH = new Date().getHours();
  var html = '<option value="">Select a time</option>';
  for (var h = RSV_FIRST; h <= RSV_LAST; h++) {
    var v = rsvPad(h) + ':00';
    var past = today && h <= nowH;
    html += '<option value="' + v + '"' + (past ? ' disabled' : '') + '>' + rsvFmtTime(v) + (past ? ' (passed)' : '') + '</option>';
  }
  document.querySelectorAll('#page-reserve select[data-rsv="time"]').forEach(function (s) {
    s.innerHTML = html;
    s.value = rsv.time;
  });
}

function rsvSyncInputs(skip) {
  document.querySelectorAll('#page-reserve [data-rsv]').forEach(function (el) {
    if (el === skip || el === document.activeElement) return;
    var k = el.dataset.rsv;
    if (el.type === 'checkbox') el.checked = !!rsv[k];
    else if (k === 'guests') el.value = rsv.guests || '';
    else el.value = rsv[k];
  });
}

// keeps the chosen table valid when the date, time or guests change
function rsvCheckTable() {
  if (!rsvGuestsError()) {
    var ty = RSV_TYPES[rsv.tab];
    if (rsv.guests < ty.min || rsv.guests > ty.max) rsv.tab = rsvSuggest(rsv.guests);
  }
  var t = rsvTable();
  if (t && rsvStatus(t) !== 'free') rsv.table = '';
}

function rsvOnInput(e) {
  var el = e.target.closest('[data-rsv]');
  if (!el) return;
  var k = el.dataset.rsv;

  if (el.type === 'checkbox') rsv[k] = el.checked;
  else if (k === 'guests') rsv.guests = parseInt(el.value, 10) || 0;
  else rsv[k] = el.value;

  if (k === 'date') rsvFillTimes();
  if (k === 'date' || k === 'time' || k === 'guests') rsvCheckTable();
  rsvSyncInputs(el);
  rsvRender();
}

// ---- Drawing ----
function rsvRenderStepper() {
  var names = ['Your details', 'Choose your table', 'Review &amp; Confirm'];
  var cur = rsv.done ? 4 : rsv.step;
  var html = '';
  names.forEach(function (n, i) {
    var num = i + 1;
    var state = cur > num ? 'done' : (cur === num ? 'now' : 'next');
    var go = (state === 'done' && !rsv.done) ? ' data-go="' + num + '"' : '';
    html += '<div class="rv-step ' + state + '"' + go + '>' +
      '<span class="rv-dot">' + (state === 'done' ? RSV_CHECK : num) + '</span><span>' + n + '</span></div>';
    if (num < 3) html += '<span class="rv-line"></span>';
  });
  document.getElementById('rvStepperBox').innerHTML = html;
}

function rsvRenderSummary() {
  var t = rsvTable();
  var type = t ? t.type : rsvSuggest(rsv.guests);
  var ty = RSV_TYPES[type];
  var fee = rsvFeeFor(type, rsv.guests);
  var food = rsvFood();
  var credit = Math.min(fee, food);
  var total = fee + food - credit;

  var when = 'Not Selected';
  if (!rsvDateError()) {
    when = rsvFmtDate(rsv.date) + '<small>' + (rsv.time ? rsvRange(rsv.time) : 'Time not selected') + '</small>';
  }

  var party = (rsv.guests ? rsv.guests + (rsv.guests === 1 ? ' guest' : ' guests') : '—') +
    '<small>' + (t ? rsvTableLabel(t) : 'Table not chosen yet') + '</small>';

  var names = Object.keys(menuCart).filter(function (n) { return menuCart[n] > 0 && findDish(n); });
  var foodHtml = '';
  if (names.length) {
    names.forEach(function (n) {
      var d = findDish(n);
      var note = menuNotes[n] ? '<span class="rv-item-note">Note: ' + escapeHtml(menuNotes[n]) + '</span>' : '';
      foodHtml += '<div class="rv-sum-row"><span>' + menuCart[n] + '× ' + n + note + '</span><b>' + peso(d.price * menuCart[n]) + '</b></div>';
    });
    if (orderNote) foodHtml += '<p class="rv-sum-note">Order note: ' + escapeHtml(orderNote) + '</p>';
  } else {
    foodHtml = '<p class="rv-sum-empty">No pre-order yet. <button type="button" class="rv-link" data-act="menu">Browse the menu</button></p>';
  }

  var extra = (ty.extraFrom && rsv.guests > ty.extraFrom)
    ? '<small>includes ' + (rsv.guests - ty.extraFrom) + ' extra guests × ' + peso(ty.extraFee) + '</small>' : '';

  var html = '' +
    '<p class="rv-sum-brand">BELLA VISTA DINING</p>' +
    '<p class="rv-sum-addr">67 AJAM Avenue, Sto. Tomas City<br>Batangas</p>' +
    '<div class="rv-sum-hr"></div>' +
    '<p class="rv-sum-label">BOOKING SUMMARY</p>' +
    '<h3 class="rv-sum-title">' + ty.short + '</h3>' +
    '<div class="rv-sum-hr"></div>' +
    '<p class="rv-sum-k">Date &amp; Time</p><p class="rv-sum-v">' + when + '</p>' +
    '<p class="rv-sum-k">Party &amp; Table</p><p class="rv-sum-v">' + party + '</p>' +
    '<div class="rv-sum-hr"></div>' +
    '<div class="rv-sum-h"><span>Food Pre-order</span>' +
      (names.length ? '<button type="button" class="rv-link" data-act="cart">Edit</button>' : '') + '</div>' +
    foodHtml +
    '<div class="rv-sum-hr"></div>' +
    '<div class="rv-sum-row"><span>Reservation fee' + extra + '</span><b>' + peso(fee) + '</b></div>' +
    '<div class="rv-sum-row"><span>Food pre-order</span><b>' + peso(food) + '</b></div>' +
    (credit > 0 ? '<div class="rv-sum-row"><span>Fee credited to your food bill</span><b>−' + peso(credit) + '</b></div>' : '') +
    '<div class="rv-sum-hr"></div>' +
    '<div class="rv-sum-row rv-sum-total"><span>Estimated Total</span><b>' + peso(total) + '</b></div>' +
    '<p class="rv-sum-note">' + rsvNote(type) + '</p>' +
    '<div class="rv-sum-hr"></div>' +
    '<p class="rv-sum-thanks">*** THANK YOU ***</p>' +
    '<div class="rv-sum-barcode"></div>';

  document.getElementById('rvSummary1').innerHTML = html;
  document.getElementById('rvSummary3').innerHTML = html;
}

function rsvTabNote(type) {
  var ty = RSV_TYPES[type];
  var list = RSV_TABLES.filter(function (t) { return t.type === type; });
  var st = list.map(rsvStatus);
  if (st[0] === 'wait') return list.length + (type === 'vip' ? ' rooms' : ' tables');
  if (st[0] === 'nofit') return ty.min + '–' + ty.max + ' guests';
  var free = st.filter(function (s) { return s === 'free'; }).length;
  if (!free) return 'Fully booked';
  return free === 1 ? 'Only 1 Left' : free + ' Left';
}

function rsvRenderTabs() {
  document.getElementById('rvTabs').innerHTML = ['standard', 'family', 'vip'].map(function (k) {
    return '<button type="button" class="rv-tab rv-tab-' + k + (rsv.tab === k ? ' on' : '') + '" data-tab="' + k + '">' +
      '<span>' + RSV_TYPES[k].label + '</span><span>' + rsvTabNote(k) + '</span></button>';
  }).join('');
}

function rsvChairs(n) {
  var out = '<span class="rv-chairs">';
  for (var i = 0; i < n; i++) out += '<i></i>';
  return out + '</span>';
}

function rsvRenderPlan() {
  var waiting = !!(rsvDateError() || rsvTimeError() || rsvGuestsError());
  var html = waiting
    ? '<p class="rv-plan-msg">Pick a date, time and number of guests above to see which tables are free.</p>' : '';

  ['standard', 'family', 'vip'].forEach(function (k) {
    var ty = RSV_TYPES[k];
    html += '<div class="rv-zone rv-zone-' + k + (rsv.tab === k ? '' : ' dim') + '">' +
      '<p class="rv-zone-title">' + ty.label + '</p><div class="rv-zone-tables">';

    RSV_TABLES.filter(function (t) { return t.type === k; }).forEach(function (t) {
      var s = rsvStatus(t);
      var sel = (rsv.table === t.id && s === 'free');
      var sub = '';
      if (s === 'free') sub = sel ? 'Selected' : 'Available';
      else if (s === 'taken') sub = 'Booked';
      else if (s === 'nofit') sub = rsv.guests > ty.max ? 'Too small' : 'Too big';

    html += '<button type="button" class="rv-table rv-' + t.shape + ' is-' + s + (sel ? ' sel' : '') + '" data-id="' + t.id + '"' +
        (s === 'free' ? '' : ' disabled') + '>' +
        rsvChairs(t.chairs) +
        '<span class="rv-face"><span class="rv-t-id">' + t.id + '</span><span class="rv-t-sub">' + sub + '</span></span>' +
        rsvChairs(t.chairs) +
        '</button>';
    });

    html += '</div></div>';
  });

  document.getElementById('rvPlan').innerHTML = html;
}

function rsvRenderSelect() {
  var t = rsvTable();
  var html = '<p class="rv-sel-label">YOUR SELECTION</p>';

  if (!t) {
    html += '<p class="rv-sel-empty">No table selected yet. Tap an available table on the floor plan.</p>';
  } else {
    var ty = RSV_TYPES[t.type];
    var extra = (ty.extraFrom && rsv.guests > ty.extraFrom) ? rsv.guests - ty.extraFrom : 0;
    var row = function (a, b) { return '<div class="rv-sel-row"><span>' + a + '</span><span>' + b + '</span></div>'; };

    html += '<p class="rv-sel-id">' + t.id + '</p><p class="rv-sel-type">' + ty.sub + '</p>' +
      '<div class="rv-sel-rows">' +
        row('Guest', rsv.guests) +
        row('Capacity', ty.cap) +
        (extra ? row('Extra guests', extra + ' × ' + peso(ty.extraFee)) : '') +
        row('Reservation fee', peso(rsvFeeFor(t.type, rsv.guests))) +
      '</div>' +
      '<p class="rv-sel-note">' + rsvNote(t.type) + '</p>';
  }

  html += '<button type="button" class="rv-btn" data-go="3">Continue</button>' +
    '<span class="rv-err" data-err="table"></span>';

  document.getElementById('rvSelect').innerHTML = html;
}

function rsvRenderReview() {
  var t = rsvTable();
  if (!t) return;

  var tile = function (label, go, body) {
    return '<div class="rv-tile"><div class="rv-tile-top"><span>' + label + '</span>' +
      '<button type="button" class="rv-link" data-go="' + go + '">Edit</button></div>' +
      '<div class="rv-tile-body">' + body + '</div></div>';
  };

  var html =
    tile('Guest', 1,
      '<span class="rv-tile-big">' + escapeHtml(rsv.name.trim()) + '</span>' +
      '<span class="rv-tile-small">' + escapeHtml(rsv.phone.trim()) + '</span>' +
      '<span class="rv-tile-small">' + escapeHtml(rsv.email.trim()) + '</span>') +
    tile('Date &amp; Time', 2,
      '<span class="rv-tile-big">' + rsvFmtDate(rsv.date) + '</span>' +
      '<span class="rv-tile-big">' + rsvFmtTime(rsv.time) + '</span>' +
      '<span class="rv-tile-small">Two-hour dining block, until ' + rsvFmtTime(rsvPad(parseInt(rsv.time, 10) + 2) + ':00') + '</span>') +
    tile('Party', 2,
      '<span class="rv-tile-big">' + rsv.guests + (rsv.guests === 1 ? ' guest' : ' guests') + '</span>' +
      '<span class="rv-tile-small">' + rsvTableLabel(t) + '</span>');

  if (rsv.requests.trim()) {
    html += '<div class="rv-reqshow"><b>Special requests:</b> ' + escapeHtml(rsv.requests.trim()) + '</div>';
  }
  document.getElementById('rvReview').innerHTML = html;

  // payment buttons + helper text
  document.querySelectorAll('#page-reserve .rv-pay').forEach(function (b) {
    b.classList.toggle('on', b.dataset.pay === rsv.pay);
  });

  var fee = rsvFeeFor(t.type, rsv.guests);
  var food = rsvFood();
  var total = fee + food - Math.min(fee, food);
  var help = '';
  if (rsv.pay === 'card') {
    help = fee > 0
      ? 'You will pay the ' + peso(fee) + ' reservation fee by card to secure your table. The rest of your bill is settled after your meal.'
      : 'There is no reservation fee for this table, so nothing is charged now. Your bill is settled after your meal.';
  } else if (rsv.pay === 'full') {
    help = total > 0
      ? 'You will pay ' + peso(total) + ' online now. Any extra orders are settled after your meal.'
      : 'Add dishes to your pre-order if you want to pay in full online.';
  } else if (rsv.pay === 'onsite') {
    help = 'Pay with cash or card after your meal. Any reservation fee is collected when you arrive.';
  }
  document.getElementById('rvPayHelp').textContent = help;
}

function rsvReceipt(r, mode) {
  var t = rsvTableById(r.table);
  var tableText = t ? rsvTableLabel(t) : r.table;
  var credit = Math.min(r.fee, r.food);
  var cancelled = (r.status === 'cancelled');
  var row = function (a, b) { return '<div class="rc-row"><span>' + a + '</span><b>' + b + '</b></div>'; };

  var itemsHtml = '';
  if (r.items.length) {
    r.items.forEach(function (i) {
      itemsHtml += row(i.qty + '× ' + escapeHtml(i.name), peso(i.price * i.qty));
      if (i.note) itemsHtml += '<p class="rc-small">Note: ' + escapeHtml(i.note) + '</p>';
    });
    if (r.orderNote) itemsHtml += '<p class="rc-small">Order note: ' + escapeHtml(r.orderNote) + '</p>';
  } else {
    itemsHtml = '<p class="rc-small">No food pre-order.</p>';
  }

  var title = mode === 'my' ? (cancelled ? 'Reservation cancelled' : 'Your reservation') : 'Reservation confirmed!';
  var sub = mode === 'my'
    ? (cancelled ? 'This booking has been cancelled.' : 'Show this code when you arrive.')
    : 'Thank you, ' + escapeHtml(r.name.trim().split(' ')[0]) + '. Your table is reserved.';

  return '' +
    '<div class="rc-paper' + (cancelled ? ' is-cancelled' : '') + '">' +
      (cancelled ? '<div class="rc-stamp">CANCELLED</div>' : '') +
      '<svg class="rc-check" width="48" height="48" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="' + (cancelled ? '#B3402A' : '#2A5B21') + '"/><path d="' + (cancelled ? 'M22 22l20 20M42 22L22 42' : 'M19 33l9 9 17-19') + '" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '<p class="rc-brand">BELLA VISTA DINING</p>' +
      '<p class="rc-addr">67 AJAM Avenue, Sto. Tomas City<br>Batangas</p>' +
      '<div class="rc-hr"></div>' +
      '<h2 class="rc-title">' + title + '</h2>' +
      '<p class="rc-sub">' + sub + '</p>' +
      '<div class="rc-code">' + r.code + '</div>' +
      '<div class="rc-hr"></div>' +
      row('Guest', escapeHtml(r.name.trim())) +
      row('Contact', escapeHtml(r.phone.trim())) +
      row('Date', rsvFmtDate(r.date)) +
      row('Time', rsvRange(r.time)) +
      row('Party', r.guests + (r.guests === 1 ? ' guest' : ' guests')) +
      row('Table', tableText) +
      (r.requests ? '<p class="rc-small">Request: ' + escapeHtml(r.requests) + '</p>' : '') +
      '<div class="rc-hr"></div>' +
      '<p class="rc-head">FOOD PRE-ORDER</p>' +
      itemsHtml +
      '<div class="rc-hr"></div>' +
      row('Reservation fee', peso(r.fee)) +
      row('Food pre-order', peso(r.food)) +
      (credit > 0 ? row('Fee credited to food bill', '−' + peso(credit)) : '') +
      row('Payment', RSV_PAY[r.pay]) +
      '<div class="rc-hr"></div>' +
      '<div class="rc-row rc-total"><span>Estimated Total</span><b>' + peso(r.total) + '</b></div>' +
      '<div class="rc-hr"></div>' +
      '<p class="rc-note">A confirmation will be sent to <b>' + escapeHtml(r.email.trim()) + '</b>. Please keep your reference code.</p>' +
      '<p class="rc-thanks">*** THANK YOU ***</p>' +
      '<div class="rc-barcode"></div>' +
    '</div>';
}

function rsvArrive() {
  return '<div class="rc-arrive">' +
    '<svg class="rc-arrive-ico" viewBox="0 0 24 24" fill="none" stroke="#234536" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><path d="M12 6.5V12l3.5 2"/></svg>' +
    '<div><p class="rc-arrive-title">Please arrive on or before your reservation time</p>' +
    '<p class="rc-arrive-text">We will hold your table for 15 minutes after your scheduled reservation.</p></div>' +
  '</div>';
}

function rsvRenderDone() {
  document.getElementById('rvDone').innerHTML =
    '<div class="rc-wrap">' +
      rsvReceipt(rsv.done, 'done') +
      rsvArrive() +
      '<div class="rv-done-actions">' +
        '<button type="button" class="rv-btn" data-act="view">View my reservation</button>' +
        '<button type="button" class="rv-back" data-act="print">Print confirmation</button>' +
        '<button type="button" class="rv-back" data-act="home">Back to home</button>' +
        '<button type="button" class="rv-back" data-act="again">Book another table</button>' +
      '</div>' +
    '</div>';
}

function rsvRender() {
  var show = rsv.done ? 'rvDone' : 'rvStep' + rsv.step;
  ['rvStep1', 'rvStep2', 'rvStep3', 'rvDone'].forEach(function (id) {
    document.getElementById(id).classList.toggle('on', id === show);
  });

  rsvRenderStepper();
  if (rsv.done) { rsvRenderDone(); return; }

  rsvRenderSummary();
  if (rsv.step === 2) { rsvRenderTabs(); rsvRenderPlan(); rsvRenderSelect(); }
  if (rsv.step === 3) rsvRenderReview();

  // after a failed "Continue", keep errors in sync while the customer fixes them
  if (rsv.tried[rsv.step]) rsvShowErrors(rsvValidate(rsv.step));
}

// ---- Navigation ----
function rsvGo(n) {
  rsvCheckTable();

  if (n > rsv.step) {
    for (var s = rsv.step; s < n; s++) {
      if (Object.keys(rsvValidate(s)).length) {
        rsv.step = s;
        rsv.tried[s] = true;
        rsvRender();
        rsvScrollToError();
        return;
      }
    }
  }
  rsv.step = n;
  rsvRender();
  rsvScroll();
}

function rsvReset() {
  rsv = rsvBlank();
  rsvFillTimes();
  rsvSyncInputs();
  rsvRender();
}

function rsvCode() {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', out = 'BV-';
  for (var i = 0; i < 6; i++) out += chars.charAt(Math.floor(Math.random() * chars.length));
  return out;
}

function rsvSave(res) {
  try {
    localStorage.setItem('bvBookings', JSON.stringify(rsvBookings));
    var list = JSON.parse(localStorage.getItem('bvReservations') || '[]');
    list.push(res);
    localStorage.setItem('bvReservations', JSON.stringify(list));
  } catch (err) { /* storage unavailable: ignore */ }
}

function rsvConfirm() {
  rsv.tried[3] = true;

  // re-check every step, in case a date passed or a table was taken meanwhile
  for (var s = 1; s <= 3; s++) {
    if (Object.keys(rsvValidate(s)).length) {
      rsv.step = s;
      rsv.tried[s] = true;
      rsvRender();
      rsvScrollToError();
      return;
    }
  }

  var t = rsvTable();
  var fee = rsvFeeFor(t.type, rsv.guests);
  var food = rsvFood();

  var items = Object.keys(menuCart).filter(function (n) { return menuCart[n] > 0 && findDish(n); }).map(function (n) {
    return { name: n, qty: menuCart[n], price: findDish(n).price, note: menuNotes[n] || '' };
  });

  var res = {
    code: rsvCode(),
    name: rsv.name.trim(), email: rsv.email.trim(), phone: rsv.phone.trim(),
    guests: rsv.guests, date: rsv.date, time: rsv.time,
    table: t.id, tableType: t.type,
    fee: fee, food: food, total: fee + food - Math.min(fee, food),
    pay: rsv.pay, requests: rsv.requests.trim(),
    orderNote: orderNote, items: items,
    createdAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    status: 'confirmed'
  };

  rsvBookings.push({ table: t.id, date: res.date, time: res.time, code: res.code });
  rsvSave(res);
  rsv.done = res;

  // the pre-order is now part of the reservation, so empty the cart
  menuCart = {};
  menuNotes = {};
  openNotes = {};
  updateCartCount();

  rsvRender();
  rsvScroll();
}

function rsvAct(a) {
  if (a === 'cancel') { rsvReset(); showPage('home'); }
  else if (a === 'confirm') rsvConfirm();
  else if (a === 'cart') openCart();
  else if (a === 'menu') showPage('menu');
  else if (a === 'home') showPage('home');
  else if (a === 'view') { my.res = rsv.done; my.error = ''; showPage('my'); }
  else if (a === 'again') { rsvReset(); rsvScroll(); }
  else if (a === 'policies') openPolicies();
  else if (a === 'print') window.print();
}

// ---- Wiring ----
var rsvPage = document.getElementById('page-reserve');

rsvPage.addEventListener('input', rsvOnInput);
rsvPage.addEventListener('change', rsvOnInput);

rsvPage.addEventListener('click', function (e) {
  var go = e.target.closest('[data-go]');
  if (go) { rsvGo(Number(go.dataset.go)); return; }

  var act = e.target.closest('[data-act]');
  if (act) { e.preventDefault(); rsvAct(act.dataset.act); return; }

  var tab = e.target.closest('[data-tab]');
  if (tab) { rsv.tab = tab.dataset.tab; rsvRender(); return; }

  var tb = e.target.closest('.rv-table');
  if (tb && !tb.disabled) {
    rsv.table = (rsv.table === tb.dataset.id) ? '' : tb.dataset.id;
    if (rsv.table) rsv.tab = rsvTableById(rsv.table).type;
    rsvRender();
    return;
  }

  var pay = e.target.closest('[data-pay]');
  if (pay) { rsv.pay = pay.dataset.pay; rsvRender(); }
});

// leaving the page after a confirmed booking starts a fresh form next time
(function () {
  var prev = showPage;
  showPage = function (name) {
    if (name !== 'reserve' && rsv.done) rsvReset();
    prev(name);
  };
})();

// ---- Start ----
(function rsvInit() {
  try { rsvBookings = JSON.parse(localStorage.getItem('bvBookings') || '[]'); } catch (err) { rsvBookings = []; }

  document.querySelectorAll('#page-reserve input[data-rsv="date"]').forEach(function (el) {
    el.min = rsvToday();
    el.max = rsvAddDays(90);
  });

  rsvFillTimes();
  rsvSyncInputs();
  rsvRender();
  rsvReady = true;
})();

// ===== Policies pop-up =====
function openPolicies() {
  document.getElementById('polModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePolicies() {
  document.getElementById('polModal').classList.remove('open');
  document.body.style.overflow = '';
}

// click the dark area to close
document.getElementById('polModal').addEventListener('click', function (e) {
  if (e.target === this) closePolicies();
});

// Esc closes it too
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closePolicies();
});

// =====================================================
// ===== My Reservation page =====
// =====================================================
var my = { res: null, error: '', code: '', email: '' };

function myList() {
  try { return JSON.parse(localStorage.getItem('bvReservations') || '[]'); } catch (err) { return []; }
}

function mySaveList(list) {
  try { localStorage.setItem('bvReservations', JSON.stringify(list)); } catch (err) { /* ignore */ }
}

function myRender() {
  var box = document.getElementById('myBody');

  if (!my.res) {
    box.innerHTML = '' +
      '<div class="my-card">' +
        '<p class="my-kicker">MY RESERVATION</p>' +
        '<h2 class="my-title">Find your booking.</h2>' +
        '<p class="my-sub">Enter the reference code from your confirmation and the email you booked with.</p>' +
        '<label class="rv-field"><span class="rv-lab">Reference code</span>' +
          '<input type="text" id="myCode" placeholder="BV-ABC123" autocomplete="off" value="' + escapeHtml(my.code) + '"></label>' +
        '<label class="rv-field" style="margin-top:14px;"><span class="rv-lab">Email address</span>' +
          '<input type="email" id="myEmail" placeholder="you@example.com" value="' + escapeHtml(my.email) + '"></label>' +
        '<span class="rv-err">' + my.error + '</span>' +
        '<button type="button" class="rv-btn my-find" data-my="find">Find my reservation</button>' +
      '</div>';
    return;
  }

  var r = my.res;
  var cancelled = (r.status === 'cancelled');
  box.innerHTML = '' +
    '<div class="rc-wrap">' +
      rsvReceipt(r, 'my') +
      (cancelled ? '' : rsvArrive()) +
      (my.error ? '<p class="rv-err my-msg">' + my.error + '</p>' : '') +
      '<div class="rv-done-actions">' +
        '<button type="button" class="rv-btn" data-my="print">Print confirmation</button>' +
        (cancelled ? '' : '<button type="button" class="rv-back rv-danger" data-my="cancel">Cancel reservation</button>') +
        '<button type="button" class="rv-back" data-my="another">Look up another</button>' +
        '<button type="button" class="rv-back" data-my="home">Back to home</button>' +
      '</div>' +
    '</div>';
}

function myFind() {
  var code = document.getElementById('myCode').value.trim().toUpperCase();
  var email = document.getElementById('myEmail').value.trim().toLowerCase();
  my.code = code;
  my.email = email;

  var found = null;
  myList().forEach(function (r) {
    if (r.code === code && r.email.toLowerCase() === email) found = r;
  });

  if (!found) {
    my.error = 'We couldn’t find a reservation with those details. Please check and try again.';
  } else {
    my.res = found;
    my.error = '';
  }
  myRender();
}

function myCancel() {
  var r = my.res;
  if (!r) return;

  var start = rsvParse(r.date);
  start.setHours(parseInt(r.time, 10), 0, 0, 0);
  if (start.getTime() - Date.now() < 24 * 60 * 60 * 1000) {
    my.error = 'Cancellations must be made at least 24 hours in advance. Please call us at +63 912 3456 789.';
    myRender();
    return;
  }
  if (!confirm('Cancel this reservation? This cannot be undone.')) return;

  var list = myList();
  list.forEach(function (x) { if (x.code === r.code) x.status = 'cancelled'; });
  mySaveList(list);

  // free the table again
  rsvBookings = rsvBookings.filter(function (b) { return b.code !== r.code; });
  try { localStorage.setItem('bvBookings', JSON.stringify(rsvBookings)); } catch (err) { /* ignore */ }

  r.status = 'cancelled';
  my.error = '';
  myRender();
}

document.getElementById('page-my').addEventListener('click', function (e) {
  var b = e.target.closest('[data-my]');
  if (!b) return;
  var a = b.dataset.my;
  if (a === 'find') myFind();
  else if (a === 'print') window.print();
  else if (a === 'cancel') myCancel();
  else if (a === 'another') { my.res = null; my.error = ''; my.code = ''; my.email = ''; myRender(); }
  else if (a === 'home') showPage('home');
});

// Enter key in the lookup form
document.getElementById('page-my').addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !my.res && e.target.tagName === 'INPUT') myFind();
});

// draw the page whenever it is opened; clear it when leaving
(function () {
  var prev = showPage;
  showPage = function (name) {
    if (name !== 'my') { my.res = null; my.error = ''; my.code = ''; my.email = ''; }
    prev(name);
    if (name === 'my') myRender();
  };
})();
