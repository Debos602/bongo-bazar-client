/* Shapes returned by the API's dashboard endpoints. */
export type Id = number;
export type Status = string;

export type MonthlyPoint = { month: string; revenue: number; orders: number; };
export type TopProduct = { id?: number; name?: string; image?: string; sold: number; };

export type Address = { id: Id; fullName: string; phone: string; city: string; area: string; address: string; postalCode?: string | null; };
export type ProductLite = { id: Id; name: string; image: string; price?: number; slug?: string; sku?: string | null; stock?: number; };
export type OrderItem = { id: Id; quantity: number; price: number; vendorOrderId?: number | null; product: ProductLite; };
export type Payment = { method: string; status: string; amount?: number; refundedAmount?: number; };
export type ShopLite = { id: Id; shopName: string; slug: string; };

export type VendorOrderPart = {
    id: Id; orderId: Id; vendorId: Id; status: Status; subtotal: number; vendorDiscount: number; platformDiscount: number;
    total: number; commissionRate: number; commissionAmount: number; vendorEarning: number; trackingNumber?: string | null;
    createdAt: string; vendor?: ShopLite;
};
export type CustomerOrder = {
    id: Id; subtotal: number; discount: number; total: number; couponCode?: string | null; status: Status; createdAt: string;
    items: OrderItem[]; address: Address; payment?: Payment | null; vendorOrders: VendorOrderPart[];
    user?: { id: Id; name: string; email: string; phone: string; };
};
export type VendorSideOrder = VendorOrderPart & {
    items: OrderItem[];
    order: { id: Id; createdAt: string; address: Address; user: { id: Id; name: string; phone: string; }; payment?: Payment | null; };
};
export type ManagedProduct = {
    id: Id; name: string; slug: string; description?: string | null; price: number; oldPrice?: number | null; discount?: number | null;
    stock: number; sku?: string | null; image: string; images: string[]; tags: string[]; badgeType?: string | null; rating: number; reviewCount: number;
    isFeatured: boolean; isPublished: boolean; isBlocked: boolean; vendor?: ShopLite; categories: { category: { id: Id; name: string; }; }[];
};
export type Category = { id: Id; name: string; slug: string; Image?: string | null; };
export type Coupon = { id: Id; code: string; discount: number; expiresAt?: string | null; isActive: boolean; usageLimit?: number | null; usedCount: number; vendorId?: number | null; };
export type Balance = { totalEarned: number; totalPaid: number; pendingPayouts: number; available: number; };
export type Payout = { id: Id; amount: number; status: Status; method: string; accountDetails: string; note?: string | null; transactionRef?: string | null; createdAt: string; vendor?: ShopLite; };
export type Review = { id: Id; rating: number; comment?: string | null; createdAt: string; user?: { name: string; }; product?: { id: Id; name: string; image: string; }; };
export type Vendor = {
    id: Id; shopName: string; slug: string; description?: string | null; logo?: string | null; banner?: string | null; phone?: string | null; address?: string | null;
    status: Status; rejectionReason?: string | null; commissionRate?: number | null; createdAt: string;
    user?: { id: Id; email: string; name: string; phone: string; }; _count?: { products: number; vendorOrders: number; };
};
export type AppUser = { id: Id; email: string; name: string; phone: string; role: string; status: Status; createdAt: string; vendor?: { id: Id; shopName: string; status: Status; } | null; };
export type Post = { id: Id; title: string; content: string; views: number; isFeatured: boolean; tags: string[]; createdAt: string; author?: { name: string; }; };

export type Periods = { today: { sales: number; orders: number; }; thisMonth: { sales: number; orders: number; averageOrder: number; growthPct: number | null; }; };

export type AdminDashboard = {
    periods: Periods;
    totals: { users: number; customers: number; products: number; orders: number; sales: number; commissionEarned: number; platformDiscounts: number; pendingPayoutAmount: number; pendingPayoutCount: number; };
    vendorsByStatus: Record<string, number>; ordersByStatus: Record<string, number>; monthlySales: MonthlyPoint[]; topProducts: TopProduct[];
    recentOrders: { id: Id; total: number; status: Status; createdAt: string; user: { name: string; }; address: { city: string; }; }[];
    pendingVendors: { id: Id; shopName: string; createdAt: string; user: { name: string; email: string; }; }[];
};
export type VendorDashboard = {
    periods: Periods;
    shop: { id: Id; shopName: string; slug: string; status: Status; commissionRate: number | null; };
    totals: { products: number; publishedProducts: number; orders: number; sales: number; averageRating: number; reviews: number; };
    balance: Balance; ordersByStatus: Record<string, number>; monthlySales: MonthlyPoint[]; topProducts: TopProduct[];
    lowStock: { id: Id; name: string; image: string; stock: number; }[];
    recentOrders: { id: Id; orderId: Id; total: number; vendorEarning: number; status: Status; createdAt: string; order: { user: { name: string; }; address: { city: string; }; }; }[];
};
export type UserDashboard = {
    totals: { orders: number; spent: number; wishlist: number; addresses: number; reviews: number; };
    ordersByStatus: Record<string, number>;
    recentOrders: { id: Id; total: number; status: Status; createdAt: string; _count: { items: number; }; payment?: Payment | null; }[];
    vendorApplication: { id: Id; shopName: string; status: Status; rejectionReason?: string | null; } | null;
    toReview: { id: Id; name: string; image: string; }[];
};
export type Me = { id: Id; email: string; name: string; phone: string; role: string; vendor?: { id: Id; shopName: string; slug: string; status: Status; } | null; };
