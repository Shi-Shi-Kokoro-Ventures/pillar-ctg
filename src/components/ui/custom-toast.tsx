
import * as React from "react";
import { Toast, ToastClose, ToastDescription, ToastTitle } from "@/components/ui/toast";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const toastVariants = cva(
  "group relative flex w-full items-center justify-between overflow-hidden rounded-xl border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border-border bg-white backdrop-blur-sm",
        destructive: "border-red-300 bg-red-50 text-red-800",
        success: "border-green-300 bg-green-50 text-green-800",
        error: "border-red-300 bg-red-50 text-red-800",
        warning: "border-amber-300 bg-amber-50 text-amber-800",
        info: "border-blue-300 bg-blue-50 text-blue-800",
        primary: "border-redcross/30 bg-gradient-to-r from-blue-50 to-white text-redcross-dark",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const IconMap = {
  default: null,
  destructive: AlertCircle,
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  primary: Info,
};

export type ToastVariant = "default" | "destructive" | "success" | "error" | "warning" | "info" | "primary";

export interface CustomToastProps {
  className?: string;
  variant?: ToastVariant;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  id?: string;
}

export function CustomToast({
  className,
  variant = "default",
  title,
  description,
  children,
  open,
  onOpenChange,
  ...props
}: CustomToastProps) {
  const Icon = IconMap[variant as keyof typeof IconMap];

  // Map our custom variants to the base Toast variants
  const baseVariant = variant === "destructive" || variant === "error" ? "destructive" : "default";

  return (
    <Toast 
      className={cn(toastVariants({ variant }), className)} 
      open={open}
      onOpenChange={onOpenChange}
      {...props}
      variant={baseVariant}
    >
      <div className="flex w-full items-start gap-3">
        {Icon && (
          <div className="mt-1 flex-shrink-0">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div className="grid flex-1 gap-1">
          {title && <ToastTitle className="font-medium">{title}</ToastTitle>}
          {description && (
            <ToastDescription className={cn("text-sm opacity-90", variant === "default" && "text-muted-foreground")}>
              {description}
            </ToastDescription>
          )}
          {children}
        </div>
      </div>
      <ToastClose className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-70 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none" />
    </Toast>
  );
}
