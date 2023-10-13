import { writable, get, derived } from "svelte/store";

// Check if localStorage is available
const isLocalStorageAvailable = typeof localStorage !== 'undefined';

const currentTheme =  isLocalStorageAvailable ? localStorage.getItem('currentTheme') || 'dark' : 'dark';

const themeStore = writable(currentTheme);
const menuStore = writable(false);


// Subscribe to changes and save to local storage if available
if (isLocalStorageAvailable) {
  themeStore.subscribe(($themeData) => {
    localStorage.setItem('currentTheme', $themeData);
  });
}

export { themeStore, menuStore };
