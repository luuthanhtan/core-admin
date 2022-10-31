import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import { Box, TableCell, TableRow, Button, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from '@inertiajs/inertia-react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import changeLanguage from '../../../../lang/index';
import { useSelector } from 'react-redux';


export default function ReadRole({ auth, errors, roles, can_create, can_delete, can_edit }) {

    const { delete: destroy } = useForm();
    const { language } = useSelector((state) => state.settingsReducer);
    const [languageUser, setLanguageUser] = useState(changeLanguage('en'));

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
            editable: true,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            editable: true,
            headerAlign: 'center',
            renderCell: (params) => (
                <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell align="center">
                        <Button href={route('role.status', params.row.id)}>
                            {params ? 'Enable' : 'Disable'}
                        </Button>
                    </TableCell>
                </TableRow>
            ),
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
                        can_edit || can_delete ?
                            <TableCell align="center">
                                {
                                    can_edit ?
                                        <Button href={route('role.edit', params.row.id)}>
                                            <EditIcon />
                                        </Button>
                                        : null
                                }
                                {
                                    can_delete ?
                                        <Button
                                            onClick={() => {
                                                if (confirm('Are you sure?'))
                                                    destroy(route('role.destroy', params.row.id))
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

    useEffect(() => {
        setLanguageUser(changeLanguage(language ? language : 'en'))
    }, [language])

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Role List</h2>}
        >
            <Head title="Role List" />
            {
                can_create ?
                    <Button variant='contained' sx={{ margin: 2 }} href={route('role.create')}>
                        {languageUser.create_role}
                    </Button>
                    : null
            }
            <Paper elevation={24} sx={{ padding: 5, margin: 3 }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={roles}
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
