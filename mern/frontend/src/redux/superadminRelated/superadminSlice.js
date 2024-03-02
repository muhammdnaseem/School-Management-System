import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'idle',
    superadminDetails: [],
    tempDetails: [],
    loading: false,
    currentsuperadmin: JSON.parse(localStorage.getItem('superadmin')) || null,
    currentRole: (JSON.parse(localStorage.getItem('superadmin')) || {}).role || null,
    error: null,
    response: null,
    darkMode: true
};

const superadminSlice = createSlice({
    name: 'superadmin',
    initialState,
    reducers: {
        authRequest: (state) => {
            state.status = 'loading';
        },
        underControl: (state) => {
            state.status = 'idle';
            state.response = null;
        },
        stuffAdded: (state, action) => {
            state.status = 'added';
            state.response = null;
            state.error = null;
            state.tempDetails = action.payload;
        },
        authSuccess: (state, action) => {
            state.status = 'success';
            state.currentsuperadmin = action.payload;
            state.currentRole = action.payload.role;
            localStorage.setItem('superadmin', JSON.stringify(action.payload));
            state.response = null;
            state.error = null;
        },
        authFailed: (state, action) => {
            state.status = 'failed';
            state.response = action.payload.message; // Assuming action.payload contains an error object
        },
        authError: (state, action) => {
    state.status = 'error';
    state.error = action.payload.message; // Store only the error message
},

        authLogout: (state) => {
            localStorage.removeItem('superadmin');
            state.currentsuperadmin = null;
            state.status = 'idle';
            state.error = null;
            state.currentRole = null
        },

        doneSuccess: (state, action) => {
            state.superadminDetails = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getDeleteSuccess: (state) => {
            state.loading = false;
            state.error = null;
            state.response = null;
        },

        getRequest: (state) => {
            state.loading = true;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload.message; // Assuming action.payload contains an error object
        },
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        }
    },
});

console.log(superadminSlice.actions);

export const {
    authRequest,
    underControl,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
    toggleDarkMode
} = superadminSlice.actions;

export const superadminReducer = superadminSlice.reducer;
