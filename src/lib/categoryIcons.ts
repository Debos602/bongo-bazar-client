export default function getCategoryIcon(name?: string): string {
    const n = (name || "").toLowerCase().trim();
    if (!n) return "🗂️";

    // ── Footwear ──────────────────────────────────────
    if (n.includes("shoe") || n.includes("sneaker") || n.includes("sandal") || n.includes("boot") || n.includes("footwear")) return "👟";
    if (n.includes("heel") || n.includes("slipper") || n.includes("loafer")) return "👡";
    if (n.includes("baby shoe")) return "🥿";

    // ── Clothing & Fashion ────────────────────────────
    if (n.includes("baby cloth") || n.includes("kids cloth") || n.includes("children cloth")) return "🧒";
    if (n.includes("cloth") || n.includes("shirt") || n.includes("t-shirt") || n.includes("tshirt")) return "👕";
    if (n.includes("dress") || n.includes("gown") || n.includes("frock")) return "👗";
    if (n.includes("pant") || n.includes("trouser") || n.includes("jeans") || n.includes("denim")) return "👖";
    if (n.includes("jacket") || n.includes("coat") || n.includes("hoodie") || n.includes("sweater") || n.includes("sweatshirt")) return "🧥";
    if (n.includes("saree") || n.includes("sari") || n.includes("salwar") || n.includes("kurta") || n.includes("panjabi")) return "🥻";
    if (n.includes("underwear") || n.includes("innerwear") || n.includes("lingerie")) return "🩲";
    if (n.includes("scarf") || n.includes("hijab") || n.includes("dupatta")) return "🧣";
    if (n.includes("hat") || n.includes("cap") || n.includes("topi") || n.includes("helmet")) return "🧢";
    if (n.includes("glove") || n.includes("mitten")) return "🧤";
    if (n.includes("sock") || n.includes("stocking")) return "🧦";
    if (n.includes("fashion") || n.includes("style") || n.includes("wardrobe")) return "✨";

    // ── Electronics & Gadgets ─────────────────────────
    if (n.includes("phone") || n.includes("mobile") || n.includes("smartphone")) return "📱";
    if (n.includes("laptop") || n.includes("notebook") || n.includes("computer") || n.includes("pc")) return "💻";
    if (n.includes("tablet") || n.includes("ipad")) return "📟";
    if (n.includes("tv") || n.includes("television") || n.includes("monitor") || n.includes("display")) return "📺";
    if (n.includes("camera") || n.includes("photo") || n.includes("dslr")) return "📷";
    if (n.includes("headphone") || n.includes("earphone") || n.includes("earbud") || n.includes("airpod")) return "🎧";
    if (n.includes("speaker") || n.includes("sound") || n.includes("audio")) return "🔊";
    if (n.includes("charger") || n.includes("cable") || n.includes("adapter") || n.includes("power bank")) return "🔋";
    if (n.includes("keyboard") || n.includes("mouse") || n.includes("peripheral")) return "⌨️";
    if (n.includes("game") || n.includes("gaming") || n.includes("console") || n.includes("playstation") || n.includes("xbox")) return "🎮";
    if (n.includes("electro")) return "📱";

    // ── Home & Appliances ─────────────────────────────
    if (n.includes("refrigerator") || n.includes("fridge") || n.includes("freezer")) return "🧊";
    if (n.includes("washing") || n.includes("washer") || n.includes("dryer")) return "🫧";
    if (n.includes("ac") || n.includes("air condition") || n.includes("fan") || n.includes("cooler")) return "❄️";
    if (n.includes("oven") || n.includes("microwave") || n.includes("toaster")) return "🍳";
    if (n.includes("blender") || n.includes("mixer") || n.includes("grinder")) return "🍵";
    if (n.includes("iron") || n.includes("steam")) return "🫙";
    if (n.includes("vacuum") || n.includes("cleaner")) return "🧹";
    if (n.includes("home decor") || n.includes("furniture") || n.includes("sofa") || n.includes("chair") || n.includes("table")) return "🛋️";
    if (n.includes("lamp") || n.includes("light") || n.includes("bulb") || n.includes("led")) return "💡";
    if (n.includes("curtain") || n.includes("pillow") || n.includes("blanket") || n.includes("bedding") || n.includes("sheet")) return "🛏️";
    if (n.includes("kitchen") || n.includes("cookware") || n.includes("utensil") || n.includes("vessel")) return "🍽️";
    if (n.includes("home") || n.includes("appliance") || n.includes("household")) return "🏠";

    // ── Baby & Kids ───────────────────────────────────
    if (n.includes("diaper") || n.includes("nappy")) return "🍼";
    if (n.includes("stroller") || n.includes("pram") || n.includes("cradle") || n.includes("crib")) return "🛺";
    if (n.includes("feeding") || n.includes("bottle") || n.includes("nipple") || n.includes("formula")) return "🍼";
    if (n.includes("toy") || n.includes("doll") || n.includes("lego") || n.includes("block") || n.includes("puzzle")) return "🧸";
    if (n.includes("baby") || n.includes("infant") || n.includes("newborn")) return "👶";
    if (n.includes("kid") || n.includes("child") || n.includes("children") || n.includes("toddler")) return "🧒";

    // ── Beauty, Health & Personal Care ───────────────
    if (n.includes("skincare") || n.includes("skin care") || n.includes("moisturizer") || n.includes("serum") || n.includes("face wash")) return "🧴";
    if (n.includes("makeup") || n.includes("lipstick") || n.includes("foundation") || n.includes("mascara") || n.includes("eyeliner")) return "💄";
    if (n.includes("perfume") || n.includes("fragrance") || n.includes("cologne") || n.includes("deodorant")) return "🌸";
    if (n.includes("hair") || n.includes("shampoo") || n.includes("conditioner") || n.includes("wig")) return "💇";
    if (n.includes("nail") || n.includes("manicure") || n.includes("pedicure")) return "💅";
    if (n.includes("medicine") || n.includes("supplement") || n.includes("vitamin") || n.includes("pharmacy")) return "💊";
    if (n.includes("fitness") || n.includes("gym") || n.includes("yoga") || n.includes("exercise") || n.includes("workout")) return "🏋️";
    if (n.includes("beauty") || n.includes("cosmetic") || n.includes("health") || n.includes("care")) return "💄";

    // ── Bags & Accessories ────────────────────────────
    if (n.includes("backpack") || n.includes("rucksack") || n.includes("school bag")) return "🎒";
    if (n.includes("handbag") || n.includes("purse") || n.includes("clutch")) return "👜";
    if (n.includes("wallet") || n.includes("cardholder")) return "👛";
    if (n.includes("luggage") || n.includes("suitcase") || n.includes("travel bag")) return "🧳";
    if (n.includes("bag")) return "👜";

    // ── Watches & Jewelry ─────────────────────────────
    if (n.includes("watch") || n.includes("smartwatch") || n.includes("time")) return "⌚";
    if (n.includes("ring") || n.includes("necklace") || n.includes("bracelet") || n.includes("earring") || n.includes("jewel")) return "💍";
    if (n.includes("sunglass") || n.includes("eyewear") || n.includes("glass") || n.includes("lens")) return "🕶️";

    // ── Sports & Outdoors ─────────────────────────────
    if (n.includes("cricket") || n.includes("football") || n.includes("soccer") || n.includes("sport") || n.includes("ball")) return "⚽";
    if (n.includes("bicycle") || n.includes("bike") || n.includes("cycle")) return "🚲";
    if (n.includes("swimming") || n.includes("swim")) return "🏊";
    if (n.includes("camping") || n.includes("outdoor") || n.includes("tent")) return "⛺";

    // ── Food & Grocery ────────────────────────────────
    if (n.includes("rice") || n.includes("flour") || n.includes("grain") || n.includes("cereal")) return "🌾";
    if (n.includes("vegetable") || n.includes("veggie") || n.includes("sabzi")) return "🥦";
    if (n.includes("fruit") || n.includes("mango") || n.includes("banana") || n.includes("apple")) return "🍎";
    if (n.includes("fish") || n.includes("seafood") || n.includes("prawn") || n.includes("shrimp")) return "🐟";
    if (n.includes("meat") || n.includes("chicken") || n.includes("beef") || n.includes("mutton")) return "🍖";
    if (n.includes("dairy") || n.includes("milk") || n.includes("butter") || n.includes("cheese") || n.includes("ghee")) return "🥛";
    if (n.includes("snack") || n.includes("chips") || n.includes("biscuit") || n.includes("cookie")) return "🍪";
    if (n.includes("sweet") || n.includes("candy") || n.includes("chocolate") || n.includes("mithai")) return "🍬";
    if (n.includes("spice") || n.includes("masala") || n.includes("herbs")) return "🌶️";
    if (n.includes("oil") || n.includes("cooking oil") || n.includes("ghee")) return "🫙";
    if (n.includes("drink") || n.includes("beverage") || n.includes("juice") || n.includes("water") || n.includes("soft drink")) return "🥤";
    if (n.includes("tea") || n.includes("cha") || n.includes("coffee")) return "☕";
    if (n.includes("food") || n.includes("grocery") || n.includes("market") || n.includes("bazar") || n.includes("bazar")) return "🛒";

    // ── Stationery & Books ───────────────────────────
    if (n.includes("book") || n.includes("novel") || n.includes("textbook") || n.includes("academic")) return "📚";
    if (n.includes("stationery") || n.includes("pen") || n.includes("pencil") || n.includes("notebook") || n.includes("paper")) return "✏️";
    if (n.includes("art") || n.includes("craft") || n.includes("paint") || n.includes("canvas")) return "🎨";

    // ── Automotive ────────────────────────────────────
    if (n.includes("car") || n.includes("auto") || n.includes("vehicle") || n.includes("motorcycle") || n.includes("bike part")) return "🚗";
    if (n.includes("tire") || n.includes("wheel") || n.includes("rim")) return "🔧";

    // ── Tools & Hardware ──────────────────────────────
    if (n.includes("tool") || n.includes("hardware") || n.includes("drill") || n.includes("wrench") || n.includes("hammer")) return "🔧";
    if (n.includes("paint") || n.includes("wall")) return "🖌️";

    // ── Pet & Animals ─────────────────────────────────
    if (n.includes("pet") || n.includes("dog") || n.includes("cat") || n.includes("bird") || n.includes("fish food")) return "🐾";

    // ── Travel & Tourism ─────────────────────────────
    if (n.includes("travel") || n.includes("tour") || n.includes("hotel") || n.includes("flight") || n.includes("ticket")) return "✈️";

    // ── Hot Deals & Offers ────────────────────────────
    if (n.includes("deal") || n.includes("offer") || n.includes("sale") || n.includes("discount") || n.includes("promo")) return "🔥";

    // ── Fallback ──────────────────────────────────────
    return "🗂️";
}