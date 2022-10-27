import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import { Paper, Box, Typography, Select, Grid, MenuItem } from '@mui/material';
import { useForm } from '@inertiajs/inertia-react'


export default function User({ auth, errors, timezones }) {

    const [timeZone, setTimeZone] = useState('Asia/Ho_Chi_Minh');
    console.log(timeZone)

    return (
        <AuthenticatedLayout
            timeZone={timeZone}
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Settings</h2>}
        >
            <Head title="Settings" />

            <Paper elevation={24} sx={{ padding: 5, margin: 3 }}>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <Grid container padding={2}>
                        <Grid item sm={2}>
                            <Typography sx={{ margin: 2 }}>Time zone</Typography>
                        </Grid>
                        <Grid item>
                            <Select
                                value={timeZone}
                                onChange={(e) => { setTimeZone(e.target.value) }}
                            >
                                {timezones.map(timezone => <MenuItem value={timezone.value} key={timezone.value}>
                                    {timezone.text}
                                    </MenuItem>)}
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid container padding={2}>
                        <Grid item sm={2}>
                            <Typography sx={{ margin: 2 }}>Language</Typography>
                        </Grid>
                        <Grid item>
                            <Select></Select>
                        </Grid>
                    </Grid>
                    <Grid container padding={2}>
                        <Grid item sm={2}>
                            <Typography sx={{ margin: 2 }}>Theme</Typography>
                        </Grid>
                        <Grid item>
                            <Select></Select>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </AuthenticatedLayout>
    );
}
