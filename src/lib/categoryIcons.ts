export default function getCategoryIcon(name?: string) {
    const n = (name || "").toLowerCase();
    if (!n) return "🗂️";
    if (n.includes("shoe") || n.includes("shoes")) return "👟";
    if (n.includes("home") || n.includes("appliance") || n.includes("appliances")) return "🏠";
    if (n.includes("cloth") || n.includes("clothes") || n.includes("shirt") || n.includes("dress")) return "👗";
    if (n.includes("toy") || n.includes("games")) return "🧸";
    if (n.includes("electro") || n.includes("phone") || n.includes("mobile") || n.includes("electronics")) return "📱";
    if (n.includes("beauty") || n.includes("health") || n.includes("cosmetic")) return "💄";
    if (n.includes("baby") || n.includes("care")) return "🍼";
    if (n.includes("bag") || n.includes("purse")) return "👜";
    if (n.includes("watch") || n.includes("time")) return "⌚";
    if (n.includes("food") || n.includes("grocery")) return "🍲";
    return "🗂️";
}
