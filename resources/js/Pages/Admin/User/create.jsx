import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import { Box, Button, Checkbox, FormControlLabel, FormControl, Select, Grid, Paper, TextField, Typography, InputLabel, MenuItem } from '@mui/material';
import InputError from '@/Components/InputError';

export default function CreateUser({ auth, roles }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        status: 0,
        roles: [],
    });
    const [userRoles, setUserRoles] = useState([])

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

    const onBtnCreateClick = (e) => {
        e.preventDefault()
        post(route('user.store'))
    }

    useEffect(() => {
        setData("roles", userRoles)
    }, [userRoles]);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create User</h2>}
        >
            <Head title="Create User" />

            <Paper elevation={24} sx={{ padding: 5, margin: 3 }}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div className='create_user_name'>
                        <TextField
                            value={data.name}
                            required
                            label="Name"
                            type="text"
                            sx={{
                                width: "97.5%"
                            }}
                            name='name'
                            onChange={e => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} className="ml-5 mb-4" />

                        <TextField
                            value={data.email}
                            required
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
                        <InputError message={errors.email} className="ml-5 mb-4" />

                        <TextField
                            value={data.password}
                            required
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            sx={{
                                width: "48%"
                            }}
                            name='password'
                            onChange={e => setData('password', e.target.value)}
                        />

                        <TextField
                            value={data.password_confirmation}
                            required
                            label="Password confirmation"
                            type="password"
                            sx={{
                                width: "48%"
                            }}
                            name='password_confirmation'
                            onChange={e => setData('password_confirmation', e.target.value)}
                        />
                        <InputError message={errors.password} className="ml-5 mb-4" />

                        <Grid sx={{ padding: 2 }}>
                            <Typography sx={{ fontWeight: 700, padding: 2, fontSize: 20 }}>Role*</Typography>
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
                        <InputError message={errors.roles} className="ml-5 mb-4" />
                    </div>
                </Box>
                <Button variant='contained' onClick={onBtnCreateClick}>Create</Button>
            </Paper>

        </AuthenticatedLayout>
    );
}
