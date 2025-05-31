import { cva, VariantProps } from 'class-variance-authority';

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all rounded-md p-1 cursor-pointer focus:outline-0 focus-within:outline-0 focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none',
  {
    variants: {
      variant: {
        solid:
          'bg-neutral-0 text-darkblue-100 rounded-lg shadow-[8.64px_8.64px_34.5504px_0px_rgba(65,50,90,0.12)] backdrop-blur-[3.1875rem]',
        outline:
          'bg-transparent text-neutral-700 border border-solid border-darkblue-0/10 rounded-lg shadow-[8.64px_8.64px_34.5504px_0px_rgba(65,50,90,0.12)] backdrop-blur-[3.1875rem]',
        'circle-solid':
          'bg-radial-[194.74%_658.17%_at_8.85%_10.53%] from-neutral-0/25 from-0% to-purple-300/[0.0384] to-100% text-darkblue-100 rounded-full shadow-[4px_4px_16px_0px_rgba(0,0,0,0.16)]',
        'circle-outline':
          'bg-transparent text-darkblue-100 border border-solid border-neutral-700 rounded-full',
        'square-outline':
          'bg-transparent text-neutral-700/30 border border-solid border-neutral-700/30 rounded-lg',
        'rounded-outline':
          'bg-transparent text-violet-600 border border-solid border-violet-600 rounded-full',
        'circle-elevated':
          'relative flex items-center justify-center rounded-full bg-radial-[194.74%_658.17%_at_8.85%_10.53%] from-neutral-0/25 from-0% to-purple-300/[0.0384] to-100% shadow-[8px_8px_24px_0px_rgba(0,0,0,0.16)] before:absolute before:inset-3 before:rounded-full before:bg-neutral-0/75 before:shadow-[4px_4px_16px_0px_rgba(0,0,0,0.16)] before:-z-10',
        'rounded-red':
          'bg-red text-neutral-0 rounded-2xl p-4 shadow-[8.64px_8.64px_34.55px_0px_rgba(65,50,90,0.12)] backdrop-blur-[3.2rem] font-medium text-base tracking-[0.03em]',
        'neutral-outline':
          'bg-transparent border border-neutral-400 rounded-2xl p-3 font-medium text-base tracking-[0.03em] text-neutral-500',
        'black-outline':
          'flex justify-start gap-4 px-2 py-3 font-medium text-base leading-4 tracking-[0.03em] hover:bg-lightpurple-0',
        'red-outline':
          'flex justify-start gap-4 px-2 py-3 font-medium text-base leading-4 tracking-[0.03em] hover:bg-lightpurple-0 text-red',
        neutral: 'bg-neutral-200 hover:bg-neutral-300 py-1 px-2 rounded-md text-xs',
        'gray-outline':
          'bg-white/20 rounded-2xl shadow-[8.64px_8.64px_34.55px_0px_rgba(65,50,90,0.12)] backdrop-blur-[51.83px] p-3 font-medium text-base tracking-[0.03em] text-neutral-700',
      },
      size: {
        '3xs/30': 'h-[1.875rem]',
        '2xs/35': 'h-[2.1875rem] px-6',
        'sm/44': 'h-[2.75rem] px-[1rem]',
        '2xl/120': 'h-[7.5rem]',
        'md/48': 'h-[3rem]',
        'icon-2xs/24': 'h-[1.5rem] w-[1.5rem] min-w-[1.5rem]',
        'icon-sm/32': 'h-8 w-8',
        'icon-xs/40': 'h-[2.5rem] w-[2.5rem] min-w-[2.5rem]',
        'icon-sm/44': 'h-[2.75rem] w-[2.75rem] min-w-[2.75rem]',
        'icon-md/48': 'h-[3rem] w-[3rem] min-w-[3rem]',
        'icon-lg/56': 'h-[3.5rem] w-[3.5rem] min-w-[3.5rem]',
        'icon-xl/70': 'h-[4.375rem] w-[4.375rem] min-w-[4.375rem]',
        'icon-2xl/72': 'h-[4.5rem] w-[4.5rem] min-w-[4.5rem]',
        'icon-3xl/120': 'h-[7.5rem] w-[7.5rem] min-w-[7.5rem] min-h-[7.5rem]',
      },
    },
  },
);
