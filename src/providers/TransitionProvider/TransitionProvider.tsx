'use client';

import { AnimationControls, motion, Target, useAnimation, Variant } from 'framer-motion';
import { usePathname } from 'next/navigation';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

type TransitionContextProps = {
  isPresent: boolean;
  setIsPresent: Dispatch<SetStateAction<boolean>>;
  controls: AnimationControls;
};

const TransitionContext = createContext<TransitionContextProps | null>(null);

export type TransitionVariants = {
  enter: Variant;
  exit: Variant;
};

type TransitionProviderProps = PropsWithChildren<{
  initial?: boolean | Target;
  variants: TransitionVariants;
}>;

export const TransitionProvider = ({ initial, variants, children }: TransitionProviderProps) => {
  const controls = useAnimation();
  const pathname = usePathname();
  const [isPresent, setIsPresent] = useState(true);

  useEffect(() => {
    controls.start('enter');
    setIsPresent(true);
  }, [controls, pathname]);

  return (
    <TransitionContext.Provider value={{ isPresent, setIsPresent, controls }}>
      <motion.body initial={initial} variants={variants} animate={controls}>
        {children}
      </motion.body>
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);

  if (!context) {
    throw new Error('useTransition should be used within <TransitionProvider>');
  }

  return context;
};
