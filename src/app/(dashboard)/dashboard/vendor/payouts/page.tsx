import { ArrowDownToLine, CheckCircle2, Clock, Coins, Wallet } from "lucide-react";
import { FormDialog } from "@/components/dashboard/ApiForm";
import { Badge, Empty, LoadError, PageHeader, Panel, Stat, Table, money, shortDate } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { Balance, Payout } from "@/types/dashboard";

export default async function VendorPayouts() {
  const res = await apiGet<{ balance: Balance; payouts: Payout[]; }>("/payout/mine");
  if (!res.data) return <LoadError message={res.message} />;
  const { balance, payouts } = res.data;

  return (
    <>
      <PageHeader
        title="Earnings"
        description="You earn when an order is delivered, after commission."
        action={balance.available > 0 ? (
          <FormDialog icon={<ArrowDownToLine size={14} aria-hidden />} trigger="Withdraw" title="Request a withdrawal" variant="primary" method="POST" path="/payout" submitLabel="Request withdrawal"
            initial={{ amount: String(balance.available) }}
            fields={[
              { name: "amount", label: `Amount (up to ${money(balance.available)})`, type: "number", required: true, min: 1, max: balance.available, step: "0.01" },
              { name: "method", label: "Method", type: "select", required: true, options: ["bKash", "Nagad", "Rocket", "Bank transfer"].map((v) => ({ value: v, label: v })) },
              { name: "accountDetails", label: "Account number or details", required: true, full: true },
              { name: "note", label: "Note", type: "textarea" },
            ]} />
        ) : undefined}
      />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat icon={Wallet} label="Available to withdraw" value={money(balance.available)} tone="accent" />
        <Stat icon={Clock} label="Requested" value={money(balance.pendingPayouts)} />
        <Stat icon={CheckCircle2} label="Paid to you" value={money(balance.totalPaid)} />
        <Stat icon={Coins} label="Total earned" value={money(balance.totalEarned)} />
      </div>
      <Panel icon={ArrowDownToLine} title="Withdrawals" className="mt-5">
        {payouts.length ? (
          <Table head={["Requested", "Amount", "Sent to", "Status", "Reference"]}>
            {payouts.map((p) => (
              <tr key={p.id}>
                <td className="whitespace-nowrap text-slate-500">{shortDate(p.createdAt)}</td>
                <td className="font-semibold tabular-nums">{money(p.amount)}</td>
                <td>{p.method} · {p.accountDetails}</td>
                <td><Badge status={p.status} />{p.status === "REJECTED" && p.note && <span className="mt-0.5 block text-xs text-slate-500">{p.note}</span>}</td>
                <td className="text-slate-500">{p.transactionRef ?? "—"}</td>
              </tr>
            ))}
          </Table>
        ) : <Empty title="No withdrawals yet" icon={ArrowDownToLine} />}
      </Panel>
    </>
  );
}
