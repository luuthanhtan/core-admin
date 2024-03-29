import React, { useEffect, useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import SideBar from '@/Components/Sidebar';
import { Grid } from '@mui/material';
import { fetchUserSettings } from '@/Services/ServicesAPI';
import { useDispatch, useSelector } from 'react-redux';
import { settingsSetSettingsActions } from '@/redux/actions/settingsActions';
import changeLanguage from '../../../lang/index';

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { language, theme, isLoaded } = useSelector((state) => state.settingsReducer);
    const [languageUser, setLanguageUser] = useState(changeLanguage('en'));
    const dispatch = useDispatch();

    useEffect(() => {
        setLanguageUser(changeLanguage(language))
    }, [language])

    useEffect(() => {
        if (!isLoaded) {
            fetchUserSettings(auth.user.id).then(data => {
                dispatch(settingsSetSettingsActions({ ...data, isLoaded: true }))
            })
        }
    }, [isLoaded]);

    return (
        <div className="min-h-screen" style={{ backgroundColor: theme }}>
            <Grid container>
                <Grid item xs={2}>
                    <SideBar />
                </Grid>
                <Grid item xs={10}>
                    <nav className="bg-white border-b border-gray-100"
                        style={{ position: 'fixed', width: '85%', zIndex:10 }}
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-16">
                                <div className="flex">
                                </div>

                                <div className="hidden sm:flex sm:items-center sm:ml-6">
                                    <div className="ml-3 relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        {auth.user.name}

                                                        <svg
                                                            className="ml-2 -mr-0.5 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <a
                                                    className='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out'
                                                    href={route('user.profile')}>
                                                    {languageUser.profile}
                                                </a>
                                                <a
                                                    className='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out'
                                                    href={route('user.password')}>
                                                    {languageUser.change_password}
                                                </a>
                                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                                    {languageUser.log_out}
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>

                                <div className="-mr-2 flex items-center sm:hidden">
                                    <button
                                        onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                    >
                                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path
                                                className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                            <path
                                                className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                            <div className="pt-2 pb-3 space-y-1">
                                <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </ResponsiveNavLink>
                            </div>

                            <div className="pt-4 pb-1 border-t border-gray-200">
                                <div className="px-4">
                                    <div className="font-medium text-base text-gray-800">{auth.user.name}</div>
                                    <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
                                </div>

                                <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink method='get' href={route('user.profile')} as="button">
                                        {'Profile'}
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink method='get' href={route('user.password')} as="button">
                                        {'Change password'}
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                        {'Log Out'}
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                        </div>
                    </nav>
                    {
                        header && (
                            <header className="bg-white shadow" style={{ paddingTop: 60 }}>
                                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                            </header>
                        )}

                    <main>{children}</main>
                </Grid>
            </Grid>
        </div>
    );
}
