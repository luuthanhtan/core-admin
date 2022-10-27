import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import { Box, Button, Paper, TextField } from '@mui/material';
import InputError from '@/Components/InputError';

export default function Password({ auth }) {

    const { data, setData, put, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const onBtnUpdateClick = (e) => {
        e.preventDefault()
        put(route('user.password-update'))
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Change password</h2>}
        >
            <Head title="Change password" />



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
                            value={data.current_password}
                            required
                            label="Current password"
                            type="password"
                            sx={{
                                width: "97.5%"
                            }}
                            name='current_password'
                            onChange={e => setData('current_password', e.target.value)}
                        />
                        <InputError message={errors.current_password} className="mb-4 ml-2" />
                        
                        <TextField
                            value={data.password}
                            required
                            label="New password"
                            type="password"
                            autoComplete="password"
                            sx={{
                                width: "97.5%"
                            }}
                            name='password'
                            onChange={e => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className='mb-4 ml-2'/>

                        <TextField
                            value={data.password_confirmation}
                            required
                            label="Password confirmation"
                            type="password"
                            sx={{
                                width: "97.5%"
                            }}
                            name='password_confirmation'
                            onChange={e => setData('password_confirmation', e.target.value)}
                        />
                        <InputError message={errors.password_confirmation} className='ml-2'/>

                    </div>
                </Box>
                <Button variant='contained' sx={{ margin: 2 }} onClick={onBtnUpdateClick}>Change</Button>
            </Paper>
        </AuthenticatedLayout>
    );
}
