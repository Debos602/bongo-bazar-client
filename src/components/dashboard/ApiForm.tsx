"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Dialog from "@radix-ui/react-dialog";
import { Loader2, X } from "lucide-react";
import { apiAction, apiUpload } from "@/actions/api";
import { cn } from "@/lib/utils";
import { buttonStyles } from "./ApiButton";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "password" | "number" | "url" | "date" | "textarea" | "select" | "checkbox" | "checkboxes" | "file";
  required?: boolean;
  numeric?: boolean; // send a select's value as a number
  placeholder?: string;
  help?: string;
  options?: { value: string; label: string; }[];
  min?: number;
  max?: number;
  step?: string;
  full?: boolean;
};

type Value = string | boolean | string[] | undefined;

type FormProps = {
  method: "POST" | "PUT" | "PATCH";
  path: string;
  fields: Field[];
  initial?: Record<string, Value>;
  submitLabel: string;
  multipart?: boolean;
  redirectTo?: string;
  resetOnSuccess?: boolean;
  fixed?: Record<string, unknown>;
  onDone?: () => void;
};

const inputClass = "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20";

export function ApiForm({ method, path, fields, initial, submitLabel, multipart, redirectTo, resetOnSuccess, fixed, onDone }: FormProps) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const raw = new FormData(formEl);
    setError("");

    start(async () => {
      let res;
      if (multipart) {
        const out = new FormData();
        for (const f of fields) {
          if (f.type === "checkboxes") out.set(f.name, JSON.stringify(raw.getAll(f.name)));
          else if (f.type === "checkbox") out.set(f.name, String(raw.has(f.name)));
          else if (f.type === "file") {
            const file = raw.get(f.name);
            if (file instanceof File && file.size > 0) out.set(f.name, file);
          } else {
            const value = String(raw.get(f.name) ?? "").trim();
            // On an edit, an emptied field is sent so that it gets cleared.
            if (value || method !== "POST") out.set(f.name, value);
          }
        }
        // A pasted photo link is sent as the text "image" field when no file was chosen.
        const link = out.get("imageUrl");
        out.delete("imageUrl");
        if (link && !out.has("image")) out.set("image", link);
        res = await apiUpload(method as "POST" | "PUT", path, out);
      } else {
        const body: Record<string, unknown> = { ...fixed };
        for (const f of fields) {
          const value = String(raw.get(f.name) ?? "").trim();
          if (f.type === "checkbox") body[f.name] = raw.has(f.name);
          else if (f.type === "checkboxes") body[f.name] = raw.getAll(f.name);
          else if (f.type === "number") { if (value) body[f.name] = Number(value); else if (method !== "POST") body[f.name] = null; }
          else if (value) body[f.name] = f.numeric ? Number(value) : value;
          else if (method !== "POST" && f.type === "date") body[f.name] = null;
        }
        res = await apiAction(method, path, body);
      }

      if (!res.success) {
        setError(res.message);
        return;
      }
      toast.success(res.message);
      if (resetOnSuccess) formEl.reset();
      onDone?.();
      if (redirectTo) router.push(redirectTo);
      router.refresh();
    });
  };

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      {fields.map((f) => (
        <div key={f.name} className={cn((f.full || f.type === "textarea" || f.type === "checkboxes") && "sm:col-span-2")}>
          <FieldInput field={f} value={initial?.[f.name]} />
        </div>
      ))}
      {error && <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800 sm:col-span-2">{error}</p>}
      <div className="sm:col-span-2">
        <button type="submit" disabled={pending} className={cn("inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold disabled:opacity-50", buttonStyles.primary)}>
          {pending && <Loader2 size={14} className="animate-spin" aria-hidden />}
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

function FieldInput({ field: f, value }: { field: Field; value: Value; }) {
  const id = `f-${f.name}`;
  const label = (
    <label htmlFor={id} className="mb-1 block text-[13px] font-semibold text-slate-700">
      {f.label}{f.required && <span className="text-red-600"> *</span>}
    </label>
  );
  const help = f.help && <p className="mt-1 text-xs leading-relaxed text-slate-500">{f.help}</p>;

  if (f.type === "checkbox") {
    return (
      <label className="flex items-center gap-2 pt-6 text-sm text-slate-700">
        <input type="checkbox" name={f.name} defaultChecked={value === true || value === "true"} className="size-4 accent-emerald-700" />
        {f.label}
      </label>
    );
  }
  if (f.type === "checkboxes") {
    const selected = Array.isArray(value) ? value : [];
    return (
      <fieldset>
        <legend className="mb-1 block text-xs font-medium text-slate-700">{f.label}</legend>
        <div className="flex flex-wrap gap-x-4 gap-y-2 rounded-md border border-slate-200 p-3">
          {f.options?.length ? f.options.map((o) => (
            <label key={o.value} className="flex items-center gap-1.5 text-sm text-slate-700">
              <input type="checkbox" name={f.name} value={o.value} defaultChecked={selected.includes(o.value)} className="size-4 accent-emerald-700" />
              {o.label}
            </label>
          )) : <span className="text-sm text-slate-500">None available yet</span>}
        </div>
      </fieldset>
    );
  }
  if (f.type === "textarea") {
    return <>{label}<textarea id={id} name={f.name} rows={4} required={f.required} defaultValue={value as string} placeholder={f.placeholder} className={inputClass} />{help}</>;
  }
  if (f.type === "select") {
    return (
      <>
        {label}
        <select id={id} name={f.name} required={f.required} defaultValue={value as string} className={inputClass}>
          {!f.required && <option value="">None</option>}
          {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        {help}
      </>
    );
  }
  if (f.type === "file") {
    return <>{label}<input id={id} type="file" name={f.name} accept="image/*" className={cn(inputClass, "py-1.5")} />{help}</>;
  }
  return (
    <>
      {label}
      <input id={id} type={f.type ?? "text"} name={f.name} required={f.required} defaultValue={value as string} placeholder={f.placeholder} min={f.min} max={f.max} step={f.step} className={inputClass} />
      {help}
    </>
  );
}

// A form that opens in a modal from a button. Clicking outside does not close it,
// so a half-filled form is not lost by accident; Esc and the X button do.
export function FormDialog({ trigger, title, description, icon, wide, variant = "ghost", ...form }: FormProps & {
  trigger: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  wide?: boolean;
  variant?: keyof typeof buttonStyles;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-[13px] font-semibold", buttonStyles[variant])}>
        {icon}
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 p-3 data-[state=open]:animate-in data-[state=open]:fade-in-0 sm:p-8">
          <Dialog.Content
            aria-describedby={undefined}
            onPointerDownOutside={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
            className={cn(
              "w-full rounded-xl bg-white text-left shadow-xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
              wide ? "max-w-3xl" : "max-w-xl",
            )}
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
              <div className="min-w-0">
                <Dialog.Title className="break-words text-lg font-bold tracking-tight text-slate-950">{title}</Dialog.Title>
                {description && <p className="mt-0.5 text-sm text-slate-600">{description}</p>}
              </div>
              <Dialog.Close aria-label="Close" className="flex-shrink-0 rounded-md p-1 text-slate-500 hover:bg-slate-100">
                <X size={18} aria-hidden />
              </Dialog.Close>
            </div>
            <div className="p-5">
              <ApiForm {...form} onDone={() => setOpen(false)} />
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
