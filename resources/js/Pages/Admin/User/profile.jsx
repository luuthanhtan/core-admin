import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import { Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography, Switch, FormLabel } from '@mui/material';
import InputError from '@/Components/InputError';

export default function Profile({ auth, roles, dataRoles, user }) {

    const { data, setData, put, errors, reset } = useForm({
        name: user.name,
        birthday: user.birthday,
        address: user.address,
        phone: user.phone,
    });

    const onBtnUpdateClick = (e) => {
        e.preventDefault()
        put(route('user.profile-update', user.id))
    }

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);


    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />
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
                        <InputError message={errors.name} className="mt-2" />

                        <div style={{ padding: 10, paddingBottom: 2 }}>
                            <FormLabel component="legend">Birthday</FormLabel>
                        </div>
                        <TextField
                            value={data.birthday}
                            required
                            type="date"
                            name='birthday'
                            onChange={e => setData('birthday', e.target.value)}
                        />
                        <InputError message={errors.birthday} className="mt-2" />

                        <TextField
                            value={data.phone}
                            required
                            type='number'
                            label="Phone"
                            sx={{
                                width: "81%"
                            }}
                            name='phone'
                            onChange={e => setData('phone', e.target.value)}
                        />
                        <InputError message={errors.phone} className="mt-2" />

                        <TextField
                            value={data.address}
                            required
                            label="Address"
                            sx={{
                                width: "97.5%"
                            }}
                            name='address'
                            onChange={e => setData('address', e.target.value)}
                        />
                        <InputError message={errors.address} className="mt-2" />

                        <FormControlLabel
                            sx={{ margin: 2 }}
                            control={<Switch color="primary" checked={user.status} />}
                            label="Status"
                            labelPlacement="start"
                        />


                        <Grid sx={{ padding: 2 }}>
                            <Typography sx={{ fontWeight: 700, padding: 2, fontSize: 20 }}>Role</Typography>
                            {
                                user.is_admin ?
                                    <FormControlLabel
                                        control={<Checkbox checked />}
                                        label='Super Admin'
                                    />
                                    :
                                    roles.map((role, index) => {
                                        return (
                                            <FormControlLabel
                                                key={index}
                                                control={<Checkbox checked={dataRoles.includes(role.id)} />}
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
