import { useForm } from '@inertiajs/inertia-react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


export default function SelectTimezone({ timezones, value, setValue }) {
    const { timezone, language, theme, isLoaded } = useSelector((state) => state.settingsReducer);
    const { setData } = useForm({
        timezone: timezone,
        language: 'en',
        theme: theme,
    })

    useEffect(() => {
        if (isLoaded) {
            setData({
                timezone: timezone ? timezone : 'Asia/Ho_Chi_Minh',
                language: language ? language : 'en',
                theme: theme ? theme : '#eeeeee',
            })
        }
    }, [isLoaded])

    return <>
        <div>
            <input list="brow"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={{
                    padding: 15,
                    border: 1,
                    borderStyle: 'solid',
                    borderRadius: '5px',
                    borderColor: 'rgb(196,196,196,1)',
                    width: 310,
                }} />
            <datalist id="brow">
                {
                    timezones.map((item, index) => (
                        <option key={index} value={item.value}>{item.text}</option>
                    ))
                }
            </datalist>
        </div>
    </>
}