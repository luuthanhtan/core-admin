import { useForm } from '@inertiajs/inertia-react';
import { Paper, Box, Typography, Select, Grid, MenuItem, Button, Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import changeLanguage from '../../../../../lang/index';
import { useDispatch, useSelector } from 'react-redux';
import { settingsSetLoadedActions } from '@/redux/actions/settingsActions';


export default function Content({ timezones }) {
    const { timezone, language, theme, isLoaded } = useSelector((state) => state.settingsReducer);
    const [timezoneSelected, setTimezoneSelected] = useState({
        firstLetter: 'Asia',
        text: 'Asia/Ho_Chi_Minh (UTC+07:00)',
        value: 'Asia/Ho_Chi_Minh'
    })
    const { data, setData, post } = useForm({
        timezone: timezone,
        language: 'en',
        theme: theme,
    })
    const [showDropdown, setShowDropdown] = useState(false);

    const [languageUser, setLanguageUser] = useState(changeLanguage('en'));
    const dispatch = useDispatch();

    const options = timezones.map((option) => {
        const firstLetter = option.value.split("/")[0];
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

    function getValueDefault(param) {
        return timezones.find((item => item.value == param)) ?? {}
    }

    useEffect(() => {
        setLanguageUser(changeLanguage(language))
    }, [language])


    const onBtnSaveClick = (e) => {
        e.preventDefault()
        post(route('setting.store'));
        dispatch(settingsSetLoadedActions());
    }

    useEffect(() => {
        if (isLoaded) {
            setData({
                timezone,
                language: language ? language : 'en',
                theme: theme ? theme : '#eeeeee',
            })
            setTimezoneSelected({ ...getValueDefault(timezone) });
        }
    }, [isLoaded])

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
                        <Autocomplete
                            value={timezoneSelected}
                            options={options}
                            groupBy={(option) => option.firstLetter}
                            getOptionLabel={(option) => option.text}
                            onChange={(e, value) => {
                                value && setData("timezone", value.value);
                                setTimezoneSelected(value)
                            }}
                            sx={{ width: 400 }}
                            renderInput={(params) => <TextField {...params} label="Timezone" />}
                        />
                        <div>
                            <input
                                onChange={(e) => {
                                    setShowDropdown(e.target.value.length > 0)
                                }}
                                placeholder='Timezone' />
                            {showDropdown && <div>
                                <ul>
                                    <li>1</li>
                                    <li>2</li>
                                    <li>3</li>
                                </ul>
                            </div>}
                        </div>
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
                        <TextField
                            type="color"
                            sx={{ width: '100px' }}
                            value={data.theme}
                            onChange={(e) => { setData("theme", e.target.value) }} />
                    </Grid>
                </Grid>
            </Box>
            <Button variant='contained' onClick={onBtnSaveClick}>Save</Button>
        </Paper>
    </>
}