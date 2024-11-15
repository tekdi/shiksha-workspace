import { DataType, SortDirection } from "ka-table";

interface ColumnConfig {
  key: string;
  titleKey: string;
  width?: number;
  sortDirection?: SortDirection;
  isSortable?: boolean;
}

const generateColumns = (
  configs: ColumnConfig[],
  isMobile: boolean
) => {
  return configs.map((config) => ({
    key: config.key,
    title: (config.titleKey).toUpperCase(),
    dataType: DataType.String,
    sortDirection: config.sortDirection,
    width: isMobile && config.width ? config.width : config.width || undefined,
    isSortable: config.isSortable,
  }));
};

export const getDraftTableColumns = ( isMobile: boolean) => {
 


  const configs: ColumnConfig[] = [
    { key: 'title_and_description', titleKey: 'Title & Description',width:700 },
    { key: 'contentType', titleKey: 'Content Type',width:700 },
    { key: 'status', titleKey: 'Status',  width:90},
    { key: 'lastUpdatedOn', titleKey: 'Last Modified', width:90},
    { key: 'action', titleKey: 'Action',  width:300},
  
  ];
  // Conditionally add the "actions" column if isActiveYear is true
 
  

  return generateColumns( configs, isMobile);
};

