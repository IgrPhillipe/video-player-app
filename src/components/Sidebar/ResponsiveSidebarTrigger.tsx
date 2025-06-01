import { PanelLeftCloseIcon } from '@/components/ui/panel-left-close';
import { PanelLeftOpenIcon } from '@/components/ui/panel-left-open';
import { useSidebar } from '@/components/ui/sidebar';

export const ResponsiveSidebarTrigger = () => {
  const { toggleSidebar, state } = useSidebar();

  const isExpanded = state === 'expanded';

  const Icon = isExpanded ? PanelLeftCloseIcon : PanelLeftOpenIcon;

  return (
    <button
      onClick={toggleSidebar}
      className="flex h-12 w-12 items-center justify-center fixed bottom-4 left-4 aspect-square rounded-xl dark:bg-neutral-900 bg-neutral-100 shadow-md text-accent-foreground"
    >
      <Icon size={26} />
    </button>
  );
};
