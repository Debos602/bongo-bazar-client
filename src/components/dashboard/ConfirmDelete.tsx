"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import * as AlertDialog from "@radix-ui/react-dialog";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { apiAction } from "@/actions/api";
import { buttonStyles } from "./ApiButton";
import { cn } from "@/lib/utils";

export default function ConfirmDelete({ path, title, message }: { path: string; title: string; message: string; }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();

  const run = () => start(async () => {
    const res = await apiAction("DELETE", path);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
    setOpen(false);
    router.refresh();
  });

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-[13px] font-semibold", buttonStyles.danger)}>
        <Trash2 size={13} aria-hidden /> Delete
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <AlertDialog.Content role="alertdialog" className="w-full max-w-md rounded-xl bg-white p-5 text-left shadow-xl">
            <AlertDialog.Title className="break-words text-lg font-bold tracking-tight text-slate-950">{title}</AlertDialog.Title>
            <AlertDialog.Description className="mt-2 text-sm leading-relaxed text-slate-600">{message}</AlertDialog.Description>
            <div className="mt-5 flex justify-end gap-2">
              <AlertDialog.Close className={cn("rounded-md px-3 py-2 text-[13px] font-semibold", buttonStyles.ghost)}>Keep product</AlertDialog.Close>
              <button type="button" onClick={run} disabled={pending} className="inline-flex items-center gap-1.5 rounded-md bg-red-700 px-3 py-2 text-[13px] font-semibold text-white hover:bg-red-800 disabled:opacity-50">
                {pending ? <Loader2 size={13} className="animate-spin" aria-hidden /> : <Trash2 size={13} aria-hidden />}
                Delete product
              </button>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Overlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
