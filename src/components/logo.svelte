<script>
    import { config } from '../stores.js';

    const logoImg = $config.screenMode === 'dark-mode' ? "tridev-logo.jpg" : "tridev-logo-light-mode.png"
</script>
<style lang="scss">
    // todo move to variables.scss
    $white: #fff;
    $black: #000;

    .logo {
        max-width: 300px;
        display: flex;
        justify-content: center;
        padding: 1rem;
        border: 1px solid $white;

        &.light-mode {
            border-color: $black;
        }
    }
</style>
<img class={`logo ${ $config.screenMode }`} src={logoImg} alt="TriDev Logo" />