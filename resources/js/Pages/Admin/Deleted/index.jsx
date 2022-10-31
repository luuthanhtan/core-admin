import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useForm } from '@inertiajs/inertia-react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


export default function User({ auth, errors, users_deleted, can_create, can_delete, can_edit }) {

    const { put, delete: destroy } = useForm()
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            width: 150,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 150,
            editable: true,
        },
        {
            field: 'birthday',
            headerName: 'Birthday',
            width: 150,
            editable: true,
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 150,
            editable: true,
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 150,
            editable: true,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 90,
            editable: true,
            headerAlign: 'center',
            renderCell: (params) => (
                <TableCell align="center">
                    {params ? 'Enable' : 'Disable'}
                </TableCell>
            )
        },
        {
            field: 'deleted_at',
            headerName: 'Deleted at',
            width: 150,
            editable: true,
            headerAlign: 'center',
            renderCell: (params) => (new Date(params.value).toLocaleString())
        },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            headerAlign: 'center',
            width: 180,
            renderCell: (params) => (
                <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    {
                        <TableCell align="center">
                            <Button onClick={() => {
                                if (confirm('Restore it?'))
                                    put(route('deleted.update', params.row.id))
                            }}>
                                <RestoreIcon />
                            </Button>
                            <Button
                                onClick={() => {
                                    if (confirm('Delete it forever?'))
                                        destroy(route('deleted.destroy', params.row.id))
                                }}
                                sx={{ color: 'red' }}
                            >
                                <DeleteForeverIcon />
                            </Button>
                        </TableCell>
                    }
                </TableRow>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User Deleted List</h2>}
        >
            <Head title="User Deleted List" />

            <Paper elevation={24} sx={{ padding: 5, margin: 3 }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={users_deleted.data}
                        columns={columns}
                        disableSelectionOnClick
                        isCellEditable={(params) => false}
                        experimentalFeatures={{ newEditingApi: true }}
                        components={{ Toolbar: GridToolbar }}
                    />
                </Box>
            </Paper>
        </AuthenticatedLayout>
    );
}
