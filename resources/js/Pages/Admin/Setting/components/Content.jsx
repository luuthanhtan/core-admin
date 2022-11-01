import { useForm } from '@inertiajs/inertia-react';
import { Paper, Box, Typography, Select, Grid, MenuItem, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import changeLanguage from '../../../../../lang/index';
import { useDispatch, useSelector } from 'react-redux';
import { settingsSetLoadedActions } from '@/redux/actions/settingsActions';
import SelectTimezone from './SelectTimezone';


export default function Content({ timezones }) {
    const { timezone, language, theme, isLoaded } = useSelector((state) => state.settingsReducer);
    const { data, setData, post } = useForm({
        timezone: timezone,
        language: 'en',
        theme: theme,
    })

    const [languageUser, setLanguageUser] = useState(changeLanguage('en'));
    const dispatch = useDispatch();

    const onBtnSaveClick = (e) => {
        e.preventDefault()
        post(route('setting.store'));
        dispatch(settingsSetLoadedActions());
    }

    useEffect(() => {
        if (isLoaded) {
            setData({
                timezone: timezone ? timezone : 'Asia/Ho_Chi_Minh',
                language: language ? language : 'en',
                theme: theme ? theme : '#eeeeee',
            })
        }
    }, [isLoaded])

    useEffect(() => {
        setLanguageUser(changeLanguage(language))
    }, [language])

    return <>
        <Paper elevation={24} sx={{ padding: 5, margin: 3 }}>
            <Box
                component="form"
                noValidate
                autoComplete="off"
            >
                <Grid container padding={2}>
                    <Grid item sm={2}>
                        <Typography sx={{ margin: 2 }}>{languageUser.timezone}</Typography>
                    </Grid>
                    <Grid item>
                        <SelectTimezone
                            timezones={timezones}
                            value={data.timezone}
                            setValue={(param) => setData('timezone', param)}
                        />
                    </Grid>
                </Grid>
                <Grid container padding={2}>
                    <Grid item sm={2}>
                        <Typography sx={{ margin: 2 }}>{languageUser.language}</Typography>
                    </Grid>
                    <Grid item>
                        <Select
                            value={data.language}
                            onChange={(e) => { { setData("language", e.target.value) } }}
                        >
                            <MenuItem value='en'>
                                {'English'}
                            </MenuItem>
                            <MenuItem value='vi'>
                                {'Tiếng Việt'}
                            </MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Grid container padding={2}>
                    <Grid item sm={2}>
                        <Typography sx={{ margin: 2 }}>{languageUser.theme}</Typography>
                    </Grid>
                    <Grid item>
                        <input
                            type="color"
                            style={{
                                padding: 5,
                                marginTop:6,
                                border: 1,
                                borderStyle: 'solid',
                                borderRadius: '5px',
                                borderColor: 'rgb(196,196,196,1)',
                                backgroundColor:'white',
                                width: 60,
                                height:40
                            }} 
                            value={data.theme}
                            onChange={(e) => { setData("theme", e.target.value) }} />
                    </Grid>
                </Grid>
            </Box>
            <Button variant='contained' onClick={onBtnSaveClick}>Save</Button>
        </Paper>
    </>
}