import { LinkIcon } from '@/components/ui/link';
import { CustomIconHandle } from '@/types';
import { useRef } from 'react';
import { toast } from 'sonner';

export const ShareButton = () => {
  const iconRef = useRef<CustomIconHandle>(null);

  const handleMouseEnter = () => {
    iconRef.current?.startAnimation();
  };

  const handleMouseLeave = () => {
    iconRef.current?.stopAnimation();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('O link foi copiado!');
  };

  return (
    <button
      className="p-2 flex items-center justify-center rounded-full bg-neutral-200 aspect-square group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCopy}
    >
      <LinkIcon
        ref={iconRef}
        size={20}
        className="group-hover:text-neutral-900 animate group-hover:fill-neutral-900 text-neutral-500 fill-neutral-500"
      />
    </button>
  );
};
