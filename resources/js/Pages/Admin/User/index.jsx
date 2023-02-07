import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from '@inertiajs/inertia-react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

export default function User({ auth, errors, users, can_create, can_delete, can_edit }) {
    const { delete: destroy } = useForm()
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
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
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 180,
            headerAlign: 'center',
            renderCell: (params) => (
                <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    {
                        can_edit || can_delete ?
                            <TableCell align="center">
                                {
                                    can_edit ?
                                        <Button href={route('user.edit', params.row.id)}>
                                            <EditIcon />
                                        </Button>
                                        : null
                                }
                                {
                                    can_delete ?
                                        <Button
                                            onClick={() => {
                                                if (confirm('Are you sure?'))
                                                    destroy(route('user.destroy', params.row.id))
                                            }}
                                            sx={{ color: 'red' }}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                        : null
                                }
                            </TableCell>
                            : null
                    }
                </TableRow>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User List</h2>}
        >
            <Head title="User List" />
            {
                can_create ?
                    <Button variant='contained' sx={{ margin: 2 }} href={route('user.create')}>Create User</Button>
                    : null
            }
            
            <Paper elevation={24} sx={{ padding: 5, margin: 3 }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={users.data}
                        columns={columns}
                        disableSelectionOnClick
                        isCellEditable={(params) => false}
                        experimentalFeatures={{ newEditingApi: true }}
                        components={{ Toolbar: GridToolbar }}
                        pageSize={10}
                    />
                </Box>
            </Paper>
        </AuthenticatedLayout>
    );
}
