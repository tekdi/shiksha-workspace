interface SidebarProps {
  selectedKey: string;
  onSelect: any;
}

interface DashboardContentProps {
  selectedKey: any;
}

interface content {
  name: string;
  status: string;
  lastUpdatedOn: string;
  appIcon: string;
  contentType: string;
  description?: string;
  identifier?: string;
  mimeType?: string;
  primaryCategory: string;
  mode?: string;
}
