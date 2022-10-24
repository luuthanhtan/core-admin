import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { useForm } from '@inertiajs/inertia-react'
import InputError from '@/Components/InputError';


export default function UpdateRole({ auth, permissions, dataPermissions, role }) {

    const { data, setData, put, errors } = useForm({
        name: role.name,
        status: role.status,
        permissions: [],
    })
    const [rolePermissions, setRolePermissions] = useState(dataPermissions)

    const onBtnUpdateClick = (e) => {
        e.preventDefault()
        put(route('role.update', role.id))
    }

    const handleCheck = (id) => {
        setRolePermissions(prev => {
            const isChecked = rolePermissions.includes(id)
            if (isChecked) {
                return rolePermissions.filter(permission => permission !== id)
            } else {
                return [...prev, id]
            }
        })
    }

    useEffect(() => {
        setData("permissions", rolePermissions);
    }, [rolePermissions]);

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Role</h2>}
        >
            <Head title="Edit Role" />

            <Paper elevation={24} sx={{ padding: 5, margin: 3 }}>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            required
                            label="Name"
                            sx={{
                                width: "70%",
                                paddingRight: 2
                            }}
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            name='name'
                        />
                        <InputError message={errors.name} className="mt-2" />
                        
                        <FormControl>
                            <InputLabel>Status</InputLabel>
                            <Select
                                name='status'
                                value={data.status}
                                label="Status"
                                onChange={e => setData('status', e.target.value)}
                            >
                                <MenuItem value={1}>Enable</MenuItem>
                                <MenuItem value={0}>Disable</MenuItem>
                            </Select>
                        </FormControl>
                        <Grid sx={{ padding: 2 }}>
                            <Typography sx={{ fontWeight: 700, padding: 2, fontSize: 20 }}>Permissions</Typography>
                            <FormGroup name='permissions'>
                                {
                                    permissions.map((permission, index) => {
                                        return (
                                            <FormControlLabel
                                                key={index}
                                                control={<Checkbox checked={data.permissions?.includes(permission.id)} />}
                                                onChange={() => handleCheck(permission.id)}
                                                label={permission.name}
                                            />
                                        )
                                    })
                                }
                            </FormGroup>
                        <InputError message={errors.permissions} className="mt-2" />

                        </Grid>
                    </div>
                </Box>
                <Button variant='contained' onClick={onBtnUpdateClick}>Update</Button>
            </Paper>

        </AuthenticatedLayout>
    );
}
