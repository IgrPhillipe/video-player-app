import { PanelLeftCloseIcon } from '@/components/ui/panel-left-close';
import { PanelLeftOpenIcon } from '@/components/ui/panel-left-open';
import { useSidebar } from '@/components/ui/sidebar';
import { SidebarButton } from './SidebarButton';

export const SidebarTrigger = () => {
  const { toggleSidebar, state } = useSidebar();

  const isExpanded = state === 'expanded';

  const Icon = isExpanded ? PanelLeftCloseIcon : PanelLeftOpenIcon;

  return (
    <SidebarButton
      name={isExpanded ? 'Esconder' : 'Expandir'}
      icon={Icon}
      onClick={toggleSidebar}
    />
  );
};
