'use client';

import { HTMLAttributes, useCallback, useId, useState } from 'react';

import { useCallbackRef } from './useCallbackRef';

export interface UseDisclosureProps {
  open?: boolean;
  defaultOpen?: boolean;
  onClose?: VoidFunction;
  onOpen?: VoidFunction;
  id?: string;
}

type HTMLProps = HTMLAttributes<HTMLElement>;

export function useDisclosure(props: UseDisclosureProps = {}) {
  const { onClose: onCloseProp, onOpen: onOpenProp, open: openProp, id: idProp } = props;

  const handleOpen = useCallbackRef(onOpenProp);
  const handleClose = useCallbackRef(onCloseProp);

  const [openState, setOpen] = useState(props.defaultOpen || false);

  const open = openProp !== undefined ? openProp : openState;

  const isControlled = openProp !== undefined;

  const uid = useId();
  const id = idProp ?? `disclosure-${uid}`;

  const onClose = useCallback(() => {
    if (!isControlled) {
      setOpen(false);
    }
    handleClose?.();
  }, [isControlled, handleClose]);

  const onOpen = useCallback(() => {
    if (!isControlled) {
      setOpen(true);
    }
    handleOpen?.();
  }, [isControlled, handleOpen]);

  const onToggle = useCallback(() => {
    if (open) {
      onClose();
    } else {
      onOpen();
    }
  }, [open, onOpen, onClose]);

  const getButtonProps = (props: HTMLProps = {}): HTMLProps => ({
    ...props,
    'aria-expanded': open,
    'aria-controls': id,
    onClick(event) {
      props.onClick?.(event);
      onToggle();
    },
  });

  const getDisclosureProps = (props: HTMLProps = {}): HTMLProps => ({
    ...props,
    hidden: !open,
    id,
  });

  return {
    isOpen: open,
    onOpen,
    onClose,
    onToggle,
    isControlled,
    getButtonProps,
    getDisclosureProps,
  };
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>;
