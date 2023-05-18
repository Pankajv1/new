import { useState } from 'react';
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
import AddressModel from './addressmodel'
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


export const ServiceListResults = ({ onEdit, onDelete, customers, ...rest }) => {
  
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
 
  return (

    <Card {...rest}>

      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>

            <TableHead>
              <TableRow>
               
               
                <TableCell>
                  First Name
                </TableCell>
                <TableCell>
                  Last Name
                </TableCell>
               
                <TableCell>
                  Phone/Email
                </TableCell>
                <TableCell>
                 User Name
                </TableCell>
                <TableCell>
                 Address
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers?.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer._id}
                  selected={selectedCustomerIds.indexOf(customer._id) !== -1}
                >
                
                  <TableCell>

                    {customer.first_name}
                  </TableCell>
                  <TableCell>

                    {customer.last_name}
                  </TableCell>
                  <TableCell>
                    {(customer.hasOwnProperty('phoneno'))?customer.phoneno:customer.email}
                  </TableCell>
                  <TableCell>
                    {customer.username}
                  </TableCell>
                  <Table>
                  <TableRow>
                  <TableCell>
                  <AddressModel key={customer?._id} {...customer} />
                  </TableCell>
                  </TableRow>
                  </Table>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton onClick={() => onEdit(customer)} aria-label="edit" color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => onDelete(customer?._id)} aria-label="delete" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers?.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <div>

      </div>
    
    </Card>


  );
};

ServiceListResults.propTypes = {
  customers: PropTypes.array.isRequired
};
