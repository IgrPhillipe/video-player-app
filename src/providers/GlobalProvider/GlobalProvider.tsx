import { ReactNode } from "react";

import { TanstackProvider } from "../TanstackProvider";
import { ThemeProvider } from "../ThemeProvider";
import { TransitionProvider, TransitionVariants } from "../TransitionProvider";

type GlobalProviderProps = Readonly<{
  children: ReactNode;
}>;

const transitionVariants: TransitionVariants = {
  enter: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.8, ease: "easeIn" },
  },
};

export const GlobalProvider = async ({ children }: GlobalProviderProps) => {
  return (
    <TransitionProvider variants={transitionVariants}>
      <TanstackProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </TanstackProvider>
    </TransitionProvider>
  );
};
