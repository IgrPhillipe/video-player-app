import {
  ForwardRefExoticComponent,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  RefAttributes,
} from 'react';

export type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export type LayoutProps<T = unknown> = PropsWithChildren<T>;

export type Option = {
  label: string;
  value: string;
};

export type CustomIcon = ForwardRefExoticComponent<
  HTMLAttributes<HTMLDivElement> & {
    size?: number;
  } & RefAttributes<any>
>;
