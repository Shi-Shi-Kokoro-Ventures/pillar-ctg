
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-redcross to-redcross-light text-white shadow-[0_4px_10px_rgba(30,174,219,0.3)] hover:shadow-[0_6px_15px_rgba(30,174,219,0.5)] hover:translate-y-[-2px] hover:from-redcross-dark hover:to-redcross after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-white/20 after:opacity-0 hover:after:opacity-100 after:transition-opacity shimmer",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-[0_4px_10px_rgba(248,113,113,0.3)] hover:shadow-[0_6px_15px_rgba(248,113,113,0.5)] hover:translate-y-[-2px] hover:from-red-600 hover:to-red-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-white/20 after:opacity-0 hover:after:opacity-100 after:transition-opacity shimmer",
        outline:
          "border-2 border-input bg-background hover:bg-accent/10 hover:text-accent-foreground hover:shadow-[0_0_15px_rgba(30,174,219,0.15)] hover:border-redcross/50 hover:translate-y-[-2px] transition-all focus:bg-redcross/10 focus:text-redcross focus:border-redcross focus:ring-2 focus:ring-redcross/40",
        secondary:
          "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300 shadow-[0_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.1)] hover:translate-y-[-2px] transition-all",
        ghost: "hover:bg-accent/20 hover:text-accent-foreground hover:shadow-[0_0_5px_rgba(30,174,219,0.1)] focus:bg-accent/80 focus:text-accent-foreground focus:ring-1 focus:ring-accent",
        link: "text-redcross underline-offset-4 hover:underline focus:text-redcross/80 focus:underline relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-redcross hover:after:w-full after:transition-all after:duration-300",
        whiteButton: "bg-white text-redcross-dark shadow-[0_4px_10px_rgba(255,255,255,0.3)] hover:shadow-[0_6px_15px_rgba(255,255,255,0.4)] hover:translate-y-[-2px] hover:bg-gray-50 font-semibold focus:ring-2 focus:ring-redcross focus:ring-offset-2 transition-all shimmer",
        neoGlass: "backdrop-blur-md bg-white/20 border border-white/30 shadow-xl text-white hover:bg-white/30 hover:shadow-[0_8px_20px_rgba(255,255,255,0.2)] hover:translate-y-[-2px] transition-all",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 py-1.5 text-xs",
        lg: "h-11 rounded-md px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
