import { Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ClockSideBar() {
    const { timezone } = useSelector((state) => state.settingsReducer);
    const [time, setTime] = useState(new Date().toLocaleString("en-US"));

    useEffect(() => {
        const time = () => {
            const event = new Date();
            setTime(event.toLocaleString('en-US', { timeZone: timezone }));
        };
        const intervalId = setInterval(time, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [timezone]);

    return (
        <>
            <Divider />
            <Grid padding={2} sx={{ textAlign: "center" }}>
                <p>{timezone}</p>
                <Typography sx={{ fontSize: 15, fontWeight: 500 }} >{time}</Typography>
            </Grid>
            <Divider />
        </>
    )
}