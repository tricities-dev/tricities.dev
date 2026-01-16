import { writable } from "svelte/store";
import { browser } from "$app/environment";

const currentTheme = browser ? localStorage.getItem("currentTheme") || "dark" : "dark";

export const themeStore = writable(currentTheme);
export const menuStore = writable(false);

// Subscribe to changes and save to local storage if available
if (browser) {
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
