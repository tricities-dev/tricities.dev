<script>
    // iport link from './link.svelte';
    import Link from '../components/link.svelte';
    import Logo from '../components/logo.svelte';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    // let onLoad = false

    onMount(() => {
		// setTimeout(() => onLoad = true, 50)
        console.log('hit');
	})
</script>

<style lang="scss">
    .dark-mode {
        // a full screen overlay with a black background
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 1);
        color: white;
    }

    .main-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
</style>

<!-- full page div making the whole screen dark mode -->
<div class="dark-mode">
    <!-- { onload &&
        <div class="main-container" transition:fade>
            <Logo/>
            <Link text="Meetup" link="http://meetup.com/TriDev" />
        </div>
    } -->

    {#if onload }
        <div class="main-container" transition:fade>
            <Logo/>
            <Link text="Meetup" link="http://meetup.com/TriDev" />
        </div>
    {/if}
    
</div>