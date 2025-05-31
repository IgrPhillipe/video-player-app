import { cva, VariantProps } from 'class-variance-authority';

export type ToastVariants = VariantProps<typeof toastVariants>;

export const toastVariants = cva(
  'relative flex h-[6.5rem] w-full items-center justify-between gap-10 border border-solid border-neutral-0 rounded-3xl p-6 backdrop-blur-md overflow-hidden group pointer-events-auto transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full max-2xl:h-24 max-2xl:p-4',
  {
    variants: {
      variant: {
        warning: 'bg-linear-to-r from-violet-50/50 from-0% to-lightblue/10 to-[71.7%]',
        success: 'bg-linear-to-r from-violet-50/50 from-0% to-lightgreen/30 to-[71.7%]',
        error: 'bg-linear-to-r from-violet-50/50 from-0% to-red/20 to-[71.7%]',
      },
    },
    defaultVariants: {
      variant: 'warning',
    },
  },
);
