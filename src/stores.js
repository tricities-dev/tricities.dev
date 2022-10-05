import { writable, get, derived } from "svelte/store";

export const config = writable(
    {
        screenMode: 'light-mode'
    }
);

