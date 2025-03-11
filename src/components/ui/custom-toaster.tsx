
import { useToast } from "@/hooks/use-toast";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import { CustomToast } from "./custom-toast";

export function CustomToaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <CustomToast 
            key={id} 
            variant={variant as any}
            {...props}
            title={title}
            description={description}
          >
            {action}
          </CustomToast>
        );
      })}
      <ToastViewport className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
    </ToastProvider>
  );
}
