import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import { Box, Button, Checkbox, FormControlLabel, FormControl, Select, Grid, Paper, TextField, Typography, InputLabel, MenuItem } from '@mui/material';
import InputError from '@/Components/InputError';

export default function EditUser({ auth, roles, dataRoles, user }) {

    const { data, setData, put, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        status: user.status,
        roles: [],
    });
    const [userRoles, setUserRoles] = useState(dataRoles)
    const [message, setMessage] = useState('')
    const [changePassword, setChangePassword] = useState(false)

    const handleCheck = (id) => {
        setUserRoles(prev => {
            const isChecked = userRoles.includes(id)
            if (isChecked) {
                return userRoles.filter(role => role !== id)
            } else {
                return [...prev, id]
            }
        })
    }

    const onBtnUpdateClick = (e) => {
        e.preventDefault()
        if (changePassword) {
            if (data.password < 8) {
                setMessage("Password length must be atleast 8 characters");
                return false;
            }
        }
        put(route('user.update', user.id))
    }

    useEffect(() => {
        setData("roles", userRoles)
    }, [userRoles]);

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit User</h2>}
        >
            <Head title="Edit User" />

            <Paper elevation={24} sx={{ padding: 5, margin: 3 }}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            value={data.name}
                            required
                            label="Name"
                            sx={{
                                width: "97.5%"
                            }}
                            name='name'
                            onChange={e => setData('name', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />

                        <TextField
                            value={data.email}
                            disabled
                            type="email"
                            label="Email"
                            sx={{
                                width: "86.5%"
                            }}
                            name='email'
                            onChange={e => setData('email', e.target.value)}
                        />
                        <FormControl sx={{ margin: 1 }}>
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
                        <FormControlLabel
                            control={<Checkbox checked={changePassword} />}
                            onChange={() => setChangePassword(!changePassword)}
                            label='Change password'
                            sx={{ margin: 1 }}
                        />
                        {
                            changePassword ?
                                <TextField
                                    value={data.password}
                                    required
                                    label="Password"
                                    type="password"
                                    autoComplete="new-password"
                                    sx={{
                                        width: "97.5%"
                                    }}
                                    name='password'
                                    onChange={e => setData('password', e.target.value)}
                                />
                                : null
                        }
                        <InputError message={message} className="mt-2" />

                        <Grid sx={{ padding: 2 }}>
                            <Typography sx={{ fontWeight: 700, padding: 2, fontSize: 20 }}>Role</Typography>
                            {
                                roles.map((role, index) => {
                                    return (
                                        <FormControlLabel
                                            key={index}
                                            control={<Checkbox checked={data.roles?.includes(role.id)} />}
                                            onChange={() => handleCheck(role.id)}
                                            label={role.name}
                                        />
                                    )
                                })
                            }
                        </Grid>
                    </div>
                </Box>
                <Button variant='contained' onClick={onBtnUpdateClick}>Update</Button>
            </Paper>

        </AuthenticatedLayout>
    );
}
