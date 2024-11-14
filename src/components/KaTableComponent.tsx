import React from 'react';
import { Table as KaTable } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { Typography, useTheme, IconButton, Box } from '@mui/material';
import UpReviewTinyImage from '@mui/icons-material/LibraryBooks';
import "ka-table/style.css";
import DeleteIcon from "@mui/icons-material/Delete";
import router from "next/router";
import { MIME_TYPE } from "@/utils/app.config";
import Image from "next/image";

interface CustomTableProps {
  data: any[]; // Define a more specific type for your data if needed
  columns: Array<{
    key: string;
    title: string;
    dataType: DataType;
  }>;
  handleDelete?: any;
  tableTitle?: string
}

const KaTableComponent: React.FC<CustomTableProps> = ({ data, columns, handleDelete, tableTitle }) => {
  const theme = useTheme<any>();


  const openEditor = (content: any) => {
    const identifier = content?.identifier;
    let mode = content?.mode; // default mode from content, can be overwritten by tableTitle
    switch (tableTitle) {
      case 'draft':
        // Use draft-specific routing
        if (content?.mimeType === MIME_TYPE.QUESTIONSET_MIME_TYPE) {
          router.push({ pathname: `/editor`, query: { identifier, mode } });
        } else if (
          content?.mimeType &&
          MIME_TYPE.GENERIC_MIME_TYPE.includes(content?.mimeType)
        ) {
          router.push({ pathname: `/upload-editor`, query: { identifier } });
        } else if (
          content?.mimeType &&
          MIME_TYPE.COLLECTION_MIME_TYPE.includes(content?.mimeType)
        ) {
          router.push({ pathname: `/collection`, query: { identifier, mode } });
        }
        return; // Exit early since draft has specific routing logic

      case 'publish':
        mode = "read";
        break;
      case 'submitted':
        mode = "review";
        break;
      // Default case for "all-content" or any other values if mode is already defined in content
      default:
        mode = mode || content?.mode;
        break;
    }

    // Generic routing for cases other than 'draft'
    if (content?.mimeType === MIME_TYPE.QUESTIONSET_MIME_TYPE) {
      router.push({ pathname: `/editor`, query: { identifier, mode } });
    } else if (content?.mimeType && MIME_TYPE.GENERIC_MIME_TYPE.includes(content?.mimeType)) {
      const pathname = tableTitle === 'submitted' ? `/workspace/content/review` : `/upload-editor`;
      router.push({ pathname, query: { identifier, mode } });
    } else if (content?.mimeType && MIME_TYPE.COLLECTION_MIME_TYPE.includes(content?.mimeType)) {
      router.push({ pathname: `/collection`, query: { identifier, mode } });
    }
  };



  return (
    <KaTable
      columns={columns}
      data={data}
      // editingMode={EditingMode.Cell}
      rowKeyField={'id'}
      sortingMode={SortingMode.Single}
      childComponents={{
        cellText: {
          content: (props) => {
            if (props.column.key === 'name' || props.column.key === "title_and_description") {
              return (
                <div style={{ display: 'flex', alignItems: 'center', cursor: "pointer" }} onClick={() => openEditor(props.rowData)} >
                  {props.rowData.image ? (
                    <img
                      src={props.rowData.image || '/logo.png'}
                      height="25px"
                      alt="Image"
                      style={props.column.key === 'name' ? { marginRight: '8px' } : {
                        width: 60,
                        height: 40,
                        borderRadius: "8px",
                        marginRight: "10px",
                      }}
                    />
                  ) : props.column.key === 'name' ? (
                    <UpReviewTinyImage fontSize="small" style={{ marginRight: '20px' }} />
                  ) : (
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
                        {props.column.key === 'name' ? props.rowData.primaryCategory : props.rowData.description}
                      </Typography>
                    </div>
                  </div>
                </div>
              );
            }
            else if (props.column.key === "status") {
              if (props.rowData.status === "Draft") {
                return (
                  <Typography variant="body2" color={'#987100'}>
                    {props.rowData.status}
                  </Typography>
                )
              }
              if (props.rowData.status === "Review") {
                return (
                  <Typography variant="body2" color={'#BA1A1A'}>
                    {props.rowData.status}
                  </Typography>
                )
              }
              if (props.rowData.status === "Live") {
                return (
                  <Typography variant="body2" color={'#06A816'}>
                    {props.rowData.status}
                  </Typography>
                )
              }
            }
            else if (props.column.key === 'contentAction') {
              if (props.rowData.status === "Draft") {
                return (
                  <Box
                    onClick={handleDelete}

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

                      {/* <Image src={'/logo.png'} alt="" /> */}
                      <img
                        src={'/delete.png'}
                        height="25px"
                        alt="Image"

                      />

                    </Box>
                  </Box>
                );
              }
            }
            else if (props.column.key === 'action') {


              return (
                <Box
                  onClick={handleDelete}

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

                    <img
                      src={'/delete.png'}
                      height="25px"
                      alt="Image"

                    />
                  </Box>
                </Box>
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
