<script>
    // iport link from './link.svelte';
    import { onMount } from 'svelte';
    import { config } from '../stores.js';
    import Link from '../components/link.svelte';
    import Logo from '../components/logo.svelte';
    
    import { fade } from 'svelte/transition';
    console.log($config.screenMode);

    let onLoad = false

    onMount(() => {
		setTimeout(() => onLoad = true, 50)
	})
    
</script>

<style lang="scss">
    // todo move to variables.scss
    $white: #fff;
    $black: #000;

    .app {
        // a full screen overlay with a black background
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: $black;
        color: $white;
        transition: color .3s ease-in-out;
        transition: background-color .3s ease-in-out;
    }
    .light-mode {
        background: $white;
        color: $black;
    }
    .main-container {
        display: flex;
        gap: 20px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 300px;
        margin: auto;
         
    }
</style>

<!-- full page div making the whole screen dark mode -->
<div class={`app ${$config.screenMode}`}>
    {#if onLoad }
        <div class="main-container" transition:fade={{delay:500, duration:500}}>
            <Logo/>
            <Link text="Meetup" link="http://meetup.com/TriDev" cssClass="block text-center" />
            <Link text="On Discord" link="https://discord.gg/rrKTYdKq33" cssClass="block text-center" />
        </div>
    {/if}
</div>