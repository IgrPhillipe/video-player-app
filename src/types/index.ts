import { PropsWithChildren, ReactNode } from 'react';

export type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export type LayoutProps<T = unknown> = PropsWithChildren<T>;

export type Option = {
  label: string;
  value: string;
};
