import { writable } from "svelte/store";

// Check if localStorage is available
const isLocalStorageAvailable = typeof localStorage !== "undefined";

const currentTheme =  isLocalStorageAvailable ? localStorage.getItem("currentTheme") || "dark" : "dark";

export const themeStore = writable(currentTheme);
export const menuStore = writable(false);

// Subscribe to changes and save to local storage if available
if (isLocalStorageAvailable) {
	themeStore.subscribe(($themeData) => {
		localStorage.setItem("currentTheme", $themeData);
	});
}

export const menuOpen = writable(false);
export const menuItems = writable([
	{
		name: "Home",
		href: "/",
		current: true
	}
]);

export const feedItems = writable([]);

export const setMenuItemActive = (href) => {
	menuItems.update((items) => {
		items.forEach((item) => {
			item.current = item.href === href;
		});
		return items;
	});
};

export const feedLoading = writable(false);
