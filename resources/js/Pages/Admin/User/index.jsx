import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from '@inertiajs/inertia-react'


export default function User({ auth, errors, users }) {

    const { delete: destroy } = useForm()

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User</h2>}
        >
            <Head title="User" />

            <Button variant='contained' sx={{ margin: 2 }} href={route('user.create')}>Create User</Button>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Birthday</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Phone</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.data.map((user, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{user.id}</TableCell>
                                <TableCell align="center">{user.name}</TableCell>
                                <TableCell align="center">{user.birthday}</TableCell>
                                <TableCell align="center">{user.email}</TableCell>
                                <TableCell align="center">{user.phone}</TableCell>
                                <TableCell align="center">{user.address}</TableCell>
                                <TableCell align="center">
                                    {user.status ? 'Enable' : 'Disable'}
                                </TableCell>
                                <TableCell align="center">
                                    <Button href={route('user.edit', user.id)}><EditIcon /></Button>
                                    <Button
                                        onClick={() => {
                                            if (confirm('Are you sure?'))
                                                destroy(route('user.destroy', user.id))
                                        }}
                                        sx={{ color: 'red' }}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </AuthenticatedLayout>
    );
}
