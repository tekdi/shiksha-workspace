import React from 'react';
import { Table as KaTable } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { Typography, useTheme, IconButton , Box} from '@mui/material';
import UpReviewTinyImage from '@mui/icons-material/LibraryBooks';
import "ka-table/style.css";
import DeleteIcon from "@mui/icons-material/Delete";

interface CustomTableProps {
  data: any[]; // Define a more specific type for your data if needed
  columns: Array<{
    key: string;
    title: string;
    dataType: DataType;
  }>;
  handleDelete?:any
}

const KaTableComponent: React.FC<CustomTableProps> = ({ data, columns , handleDelete}) => {
  const theme = useTheme<any>();

  return (
    <KaTable
      columns={columns}
      data={data}
      editingMode={EditingMode.Cell}
      rowKeyField={'id'}
      sortingMode={SortingMode.Single}
      childComponents={{
        cellText: {
          content: (props) => {
            if (props.column.key === 'name' || props.column.key==="title_and_description") {
              return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {props.rowData.image ? (
                    <img
                      src={props.rowData.image || '/logo.png'}
                      height="25px"
                      alt="Image"
                      style={props.column.key === 'name'?{ marginRight: '8px' }: {width: 60,
                      height: 40,
                      borderRadius: "8px",
                      marginRight: "10px",}}
                    />
                  ) :props.column.key === 'name'? (
                    <UpReviewTinyImage fontSize="small" style={{ marginRight: '20px' }} />
                  ):(
                    <img
                    src={'/logo.png'}
                    height="25px"
                    alt="Image"
                  style={{
                    width: 60,
                      height: 40,
                      borderRadius: "8px",
                      marginRight: "10px"
                  }}
                      
                      />
                  )}
                  <div>
                    <div>
                      <Typography variant="body1">{props.rowData.name}</Typography>
                    </div>
                    <div>
                      <Typography variant="body2" color={theme.palette.warning['A200']}>
                        {props.column.key === 'name'?props.rowData.primaryCategory:props.rowData.description}
                      </Typography>
                    </div>
                  </div>
                </div>
              );
            }
            if(props.column.key === 'contentAction'){
console.log(props.rowData.status)
              if(props.rowData.status === "Draft")
              {
                return (
                  <IconButton
                  onClick={ handleDelete}
                  color="error"
                >
                  <Box sx={{
                                  background: '#FAEEEC',
                                  height: '42px',
                                  width: '42px',
                                  borderRadius: '12px',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}>
  
                                  <DeleteIcon sx={{ fontSize: '18px' }} />
                                </Box>
                </IconButton>
                );
              }
            }
            if(props.column.key === 'action'){

              
              return (
                <IconButton
                onClick={ handleDelete}
                color="error"
              >
                <Box sx={{
                                background: '#FAEEEC',
                                height: '42px',
                                width: '42px',
                                borderRadius: '12px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}>

                                <DeleteIcon sx={{ fontSize: '18px' }} />
                              </Box>
              </IconButton>
              );
            }
            return props.children; // Default content for other columns
          },
        },
      }}
    />
  );
};

export default KaTableComponent;
