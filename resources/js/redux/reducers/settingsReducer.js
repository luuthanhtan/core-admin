import { SETTINGS_SET_LOADED_ACTIONS, SETTINGS_SET_SETTINGS_ACTIONS } from "../actions/settingsActions"

const initialState = {
    timezone:'',
    language:'',
    theme:'',
    isLoaded: false,
}

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETTINGS_SET_SETTINGS_ACTIONS:
            {
                return {
                    ...state,
                    timezone: action.payload.timezone,
                    language: action.payload.language,
                    theme: action.payload.theme,
                    isLoaded: action.payload.isLoaded,
                }
            }
        case SETTINGS_SET_LOADED_ACTIONS:
            return {
                ...state,
                isLoaded: action.payload,
            };
        default:
            return state
    }
}


export default settingsReducer