
import { useToast } from "@/hooks/use-toast";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import { CustomToast } from "./custom-toast";

export function CustomToaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, open, onOpenChange, ...props }) {
        return (
          <CustomToast 
            key={id} 
            id={id}
            open={open}
            onOpenChange={onOpenChange}
            variant={variant}
            title={title}
            description={description}
            {...props}
          >
            {action}
          </CustomToast>
        );
      })}
      <ToastViewport className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
    </ToastProvider>
  );
}
