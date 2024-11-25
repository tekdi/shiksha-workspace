import React, { useState } from 'react';
import { Table as KaTable } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { Typography, useTheme, IconButton, Box } from '@mui/material';
import UpReviewTinyImage from '@mui/icons-material/LibraryBooks';
import "ka-table/style.css";
import DeleteIcon from "@mui/icons-material/Delete";
import router from "next/router";
import { MIME_TYPE } from "@/utils/app.config";
import Image from "next/image";
import ActionIcon from './ActionIcon';
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

const KaTableComponent: React.FC<CustomTableProps> = ({ data, columns, tableTitle }) => {
  const theme = useTheme<any>();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => setOpen(true);

  const openEditor = (content: any) => {
    console.log("content", content)
    const identifier = content?.identifier;
    let mode = content?.mode; // default mode from content, can be overwritten by tableTitle
    switch (tableTitle) {
      case 'draft':
        mode = !mode ? "edit" : mode;


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
        case 'discover-contents':
        mode = "read";
        break;
      case 'submitted':
        mode = "read";
        break;
        case 'upForReview':
        mode = "review";
        break;
        case 'all-content':
          mode=content?.status==="Draft"|| content?.status==="Live" ?"edit":"review"
          break;
          case 'contents':
            mode=content?.status==="Draft"|| content?.status==="Live" ?"edit":"review"
            break;
      // Default case for "all-content" or any other values if mode is already defined in content
      default:
        mode = mode ||"read" ;
        break;
    }

    // Generic routing for cases other than 'draft'
   
    if (content?.mimeType === MIME_TYPE.QUESTIONSET_MIME_TYPE ) {
      router.push({ pathname: `/editor`, query: { identifier, mode } });
    }
    else if ( tableTitle==='submitted')  {
      router.push({ pathname: `/workspace/content/review`, query: { identifier, mode } });
    }
     else if (content?.mimeType && MIME_TYPE.GENERIC_MIME_TYPE.includes(content?.mimeType)) {
      localStorage.setItem('contentCreatedBy', content?.createdBy);
      console.log(content)
      const pathname = tableTitle === 'upForReview' ? `/workspace/content/review` : `/upload-editor`;
      router.push({ pathname, query: { identifier, mode } });
    } else if (content?.mimeType && MIME_TYPE.COLLECTION_MIME_TYPE.includes(content?.mimeType)) {
      router.push({ pathname: `/collection`, query: { identifier, mode } });
    }
  };
 return (
    <>
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
                      height="50px"
                      alt="Image"
                      style={props.column.key === 'name' ? { marginRight: '8px' } : {
                        width: 60,
                        height: 40,
                        borderRadius: "8px",
                        marginRight: "10px",
                      }}
                    />
                  ) : props.column.key === 'name' ? (
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
                      <Typography variant="body1" sx={{ fontWeight: 500, color: '#1F1B13', fontSize: '14px' }} className='one-line-text'>{props.rowData.name}</Typography>
                    </div>
                    <div>
                      <Typography variant="body2" sx={{ fontWeight: 400, color: '#635E57', fontSize: '12px' }} className='two-line-text' color={theme.palette.warning['A200']}>
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
                  <Typography sx={{ fontSize: '14px', fontWeight: 500 }} variant="body2" color={'#987100'}>
                    {props.rowData.status}
                  </Typography>
                )
              }
              if (props.rowData.status === "Review") {
                return (
                  <Typography sx={{ fontSize: '14px', fontWeight: 500 }} variant="body2" color={'#BA1A1A'}>
                    {props.rowData.status}
                  </Typography>
                )
              }
              if (props.rowData.status === "Live") {
                return (
                  <Typography sx={{ fontSize: '14px', fontWeight: 500 }} variant="body2" color={'#06A816'}>
                    {props.rowData.status}
                  </Typography>
                )
              }
            }
            else if(props.column.key === "create-by")
            {
              return (
                <Typography sx={{ fontSize: '14px', fontWeight: 500 }} variant="body2" color={'#987100'}>
                  {props.rowData.creator}
                </Typography>
              )
            }
            else if (props.column.key === 'contentAction') {
               {
                return (
                  <>
                  
                  
                  
                   <ActionIcon
                   rowData={props.rowData}
                 /></>
                  
                );
              }
            }
            else if (props.column.key === 'action') {


              return (
                <Box
                  onClick={handleOpen}

                >
                  
                         <ActionIcon
                   rowData={props.rowData}
                 
                 />

                </Box>
              );
            }
            return props.children; 
          },
        },
      }}
      noData={{
        text: "No data found",
      }}
    />
    </>
   
  );
};

export default KaTableComponent;
