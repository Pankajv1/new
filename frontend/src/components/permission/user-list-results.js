import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getInitials } from '../../utils/get-initials';
import { API_BASE_URL } from '../../utils/Constant';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export const ServiceListResults = ({...props}) => {
  const [userpermission,setusermenupermission] = useState([]);
  const usertype = props.usertype;
  console.log('hiii');
  if(props.usertype == "")
  {
    return(<></>)
  }

  //useEffect(() => {
   // setusermenupermission(props.permissionusers[usertype]);
 // },[]);
  
  const operation = (cus,operation,event)=>{
   event.target.checked = true;
   console.log(cus,operation,event);
   props.permissionassign(cus,operation,event)
  }
  return (

    <Card>

      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>

            <TableHead>
              <TableRow>
               
               
                <TableCell>
                  Pages
                </TableCell>
                <TableCell>
                 Add
                </TableCell>
               
                <TableCell>
                  Edit
                </TableCell>
                <TableCell>
                Delete
                </TableCell>
              
              </TableRow>
            </TableHead>
            <TableBody>
            {props.pages?.map((cus) => (
              
              <TableRow>
                <TableCell>
                 {cus[0].toUpperCase() + cus.slice(1)}
                </TableCell>
                
                <TableCell >
                    <Checkbox 
                      checked={userpermission?.[cus]?.add == 1}
                      onClick={(e)=>{operation(cus,'add',e)}}
                      value="true"
                    />
                    
                  </TableCell>
                  <TableCell >
                    <Checkbox
                     checked={userpermission?.[cus]?.edit == 1}
                       onClick={(e)=>{props.permissionassign(cus,'edit',e)}}
                    />
                  </TableCell>
                  <TableCell >
                    <Checkbox
                     checked={userpermission?.[cus]?.delete == 1}
                       onClick={(e)=>{props.permissionassign(cus,'delete',e)}}
                    />
                  </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
       
      />
      <div>

      </div>
    
    </Card>


  );
};

ServiceListResults.propTypes = {
  customers: PropTypes.array.isRequired
};
