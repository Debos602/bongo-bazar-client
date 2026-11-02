import Image from "next/image";
import { Star } from "lucide-react";
import ApiButton from "./ApiButton";
import { FormDialog, type Field } from "./ApiForm";
import { Empty, Panel, Table, shortDate, Badge } from "./ui";
import type { Coupon, Review, TopProduct } from "@/types/dashboard";

export function Thumb({ src, alt }: { src?: string | null; alt: string; }) {
  // Vendors can enter any URL, so only remote http(s) and site paths go to next/image.
  const valid = !!src && (src.startsWith("https://") || src.startsWith("http://") || src.startsWith("/"));
  return (
    <span className="relative block size-10 flex-shrink-0 overflow-hidden rounded-md bg-slate-100">
      {valid && <Image src={src} alt={alt} fill sizes="40px" className="object-cover" unoptimized />}
    </span>
  );
}

export function Stars({ value }: { value: number; }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm tabular-nums text-slate-700">
      <Star size={13} className="fill-amber-400 text-amber-400" aria-hidden /> {value.toFixed(1)}
    </span>
  );
}

export function TopProducts({ products }: { products: TopProduct[]; }) {
  return (
    <Panel title="Top products">
      {products.length ? (
        <ul className="divide-y divide-slate-100">
          {products.map((p) => (
            <li key={p.id} className="flex items-center gap-3 px-5 py-3 text-sm">
              <Thumb src={p.image} alt="" />
              <span className="min-w-0 flex-1 truncate text-slate-800">{p.name}</span>
              <span className="tabular-nums text-slate-500">{p.sold} sold</span>
            </li>
          ))}
        </ul>
      ) : <Empty title="No sales yet" />}
    </Panel>
  );
}

const couponFields: Field[] = [
  { name: "code", label: "Code", required: true, placeholder: "EID20" },
  { name: "discount", label: "Discount %", type: "number", required: true, min: 1, max: 100 },
  { name: "usageLimit", label: "Usage limit", type: "number", min: 1, help: "Leave empty for no limit" },
  { name: "expiresAt", label: "Expires on", type: "date", help: "Leave empty for no expiry" },
  { name: "isActive", label: "Active", type: "checkbox" },
];

export function CouponManager({ coupons, scopeNote }: { coupons: Coupon[]; scopeNote: string; }) {
  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">{scopeNote}</p>
        <FormDialog trigger="New coupon" title="New coupon" variant="primary" method="POST" path="/coupon" fields={couponFields} initial={{ isActive: true }} submitLabel="Create coupon" />
      </div>
      <Panel>
        {coupons.length ? (
          <Table head={["Code", "Discount", "Used", "Expires", "Status", ""]}>
            {coupons.map((c) => (
              <tr key={c.id}>
                <td className="font-mono text-xs font-semibold text-slate-800">{c.code}</td>
                <td className="tabular-nums">{c.discount}%</td>
                <td className="tabular-nums">{c.usedCount}{c.usageLimit ? ` / ${c.usageLimit}` : ""}</td>
                <td>{c.expiresAt ? shortDate(c.expiresAt) : "Never"}</td>
                <td><Badge status={c.isActive ? "ACTIVE" : "INACTIVE"} /></td>
                <td>
                  <span className="flex justify-end gap-1.5">
                    <FormDialog
                      trigger="Edit" title={`Edit ${c.code}`} method="PUT" path={`/coupon/${c.id}`} fields={couponFields} submitLabel="Save"
                      initial={{ code: c.code, discount: String(c.discount), usageLimit: c.usageLimit ? String(c.usageLimit) : "", expiresAt: c.expiresAt?.slice(0, 10) ?? "", isActive: c.isActive }}
                    />
                    <ApiButton method="DELETE" path={`/coupon/${c.id}`} variant="danger" confirm="Delete?">Delete</ApiButton>
                  </span>
                </td>
              </tr>
            ))}
          </Table>
        ) : <Empty title="No coupons yet" />}
      </Panel>
    </>
  );
}

export function ReviewList({ reviews, canDelete }: { reviews: Review[]; canDelete?: boolean; }) {
  return (
    <Panel>
      {reviews.length ? (
        <ul className="divide-y divide-slate-100">
          {reviews.map((r) => (
            <li key={r.id} className="flex items-start gap-3 px-5 py-4 text-sm">
              <Thumb src={r.product?.image} alt="" />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-800">{r.product?.name}</p>
                <p className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <Stars value={r.rating} /> {r.user?.name && <span>{r.user.name}</span>} <span>{shortDate(r.createdAt)}</span>
                </p>
                {r.comment && <p className="mt-1.5 text-slate-600">{r.comment}</p>}
              </div>
              {canDelete && <ApiButton method="DELETE" path={`/review/${r.id}`} variant="danger" confirm="Delete?">Delete</ApiButton>}
            </li>
          ))}
        </ul>
      ) : <Empty title="No reviews yet" />}
    </Panel>
  );
}
