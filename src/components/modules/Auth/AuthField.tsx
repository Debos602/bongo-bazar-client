"use client";

import { ReactNode } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface AuthFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  rightSlot?: ReactNode;
}

export function AuthField({
  control,
  name,
  label,
  placeholder,
  type = "text",
  rightSlot,
}: AuthFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500"
            style={{}}
          >
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <input
                {...field}
                type={type}
                placeholder={placeholder}
                className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50
                           px-3.5 text-[14px] text-slate-900 placeholder:text-slate-400
                           transition-all duration-200
                           hover:border-slate-300 hover:bg-white
                           focus:outline-none focus:border-emerald-500 focus:bg-white
                           focus:ring-4 focus:ring-emerald-500/15
                           disabled:opacity-60"
                style={{}}
              />
              {rightSlot}
            </div>
          </FormControl>
          <FormMessage className="text-rose-600 text-xs font-semibold" />
        </FormItem>
      )}
    />
  );
}
