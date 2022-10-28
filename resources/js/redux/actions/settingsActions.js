export const SETTINGS_SET_SETTINGS_ACTIONS = 'SETTINGS_SET_SETTINGS_ACTIONS';
export const SETTINGS_SET_LOADED_ACTIONS = 'SETTINGS_SET_LOADED_ACTIONS';

export const settingsSetSettingsActions = data => ({
    type: SETTINGS_SET_SETTINGS_ACTIONS,
    payload: data,
});

export const settingsSetLoadedActions = (data = false) => ({
    type: SETTINGS_SET_LOADED_ACTIONS,
    payload: data,
});
