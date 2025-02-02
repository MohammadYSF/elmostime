import { writable } from 'svelte/store';

export const authStore = writable({
    isAuthenticated: false,
    token: null
});

export function login(token) {
    localStorage.setItem('token', token); // Store token in localStorage (or sessionStorage)
    authStore.set({
        isAuthenticated: true,
        token
    });
}

export function logout() {
    localStorage.removeItem('token');
    authStore.set({
        isAuthenticated: false,
        token: null
    });
}

// To check if user is logged in on app start
export function checkAuthentication() {
    const token = localStorage.getItem('token');
    if (token) {
        // Here, you can also decode JWT token or fetch user data
        authStore.set({
            isAuthenticated: true,
            token
        });
    }
}
