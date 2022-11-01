import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import { useSelector } from 'react-redux';
import Content from './components/Content';
import changeLanguage from '../../../../lang/index';

export default function Settings({ auth, errors, timezones }) {

    const { language } = useSelector((state) => state.settingsReducer);

    const [languageUser, setLanguageUser] = useState(changeLanguage('en'));

    useEffect(() => {
        setLanguageUser(changeLanguage(language))
    }, [language])

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{languageUser.settings}</h2>}
        >
            <Head title={languageUser.settings} />

            <Content timezones={timezones} />

        </AuthenticatedLayout>
    );
}
