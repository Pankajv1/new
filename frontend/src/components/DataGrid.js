import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { PropaneSharp } from '@mui/icons-material';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function DataGridDemo(props) {
    return (
        <Box sx={{ height: props.tableHeight, width: props.tableWidth }}>
            <DataGrid
                rows={props.rows}
                columns={props.columns}
                pageSize={props.pageSize}
                rowsPerPageOptions={props.rowsPerPageOptions}
                checkboxSelection={props.checkboxSelection}
                disableSelectionOnClick={props.disableSelectionOnClick}
                experimentalFeatures={props.experimentalFeatures}
            />
        </Box>
    );
}

DataGridDemo.prototype = {
    columns: PropTypes.array,
    rows: PropTypes.array,
    classes: PropTypes.object,
    filterMode: PropTypes.bool,
    getCellClassName: PropTypes.func,
    getEstimatedRowHeight: PropTypes.func,
    getRowId: PropTypes.func,
    getRowHeight: PropTypes.func,
    headerHeight: PropTypes.number,
    tableHeight: PropTypes.number,
    tableWidth: PropTypes.number,
    loading: PropTypes.bool,
    pageSize: PropTypes.number,
    rowsPerPageOptions: PropTypes.array,
    checkboxSelection: PropTypes.bool,
    disableSelectionOnClick: PropTypes.bool,
    experimentalFeatures: PropTypes.object
};

DataGridDemo.defaultProps = {
    loading: false,

};

export default DataGridDemo;