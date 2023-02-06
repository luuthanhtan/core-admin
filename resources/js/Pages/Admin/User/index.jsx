import React from 'react';
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
    
    return (
        <div id = "user_table_index">
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
                <Paper elevation={24} sx={{ padding: 5, margin: 3}}>
                {
                    users.data.length ? <>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className='tbody_table_user'>
                            {
                                (users.data).map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                {
                                                    user.status ? 
                                                        <p className="status_column_table_user" style={{ color: "green"}}>Enable</p> 
                                                    :   <p className="status_column_table_user" style={{ color: "red"}}>Disable</p> 
                                                }
                                            </td>
                                            <td>
                                                {
                                                    can_edit ?
                                                        <Button href={route('user.edit', user.id)}>
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
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                        <Pagination links={users.links}/>
                    </>
                    :   <div class="mainbox404">
                            <div class="err">4</div>
                            <i class="far fa-question-circle fa-spin"></i>
                            <div class="err2">4</div>
                            <div class="msg">
                                Maybe this page moved? Got deleted? Is hiding out in quarantine? 
                                Never existed in the first place?<p>Let's go 
                                <a href="/admin/user">home</a> and try from there.</p>
                            </div>
                        </div>
                }
                </Paper>
            </AuthenticatedLayout>
        </div>
    );
}
