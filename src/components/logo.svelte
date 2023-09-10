<script>
  import { config } from "../stores.js";

  const logoImg = "tridev-logo.svg";
  console.log("logo $config.screenMode", $config.screenMode);
</script>

<img class={`logo ${$config.screenMode}`} src={logoImg} alt="TriDev Logo" />

<style lang="scss">
  // todo move to variables.scss
  $white: #fff;
  $black: #000;

  .logo {
    max-width: 300px;
    display: flex;
    border: 1px solid $white;
    padding: 1.5rem;
    filter: none;
    transition: all 0.3s ease-in-out;

    &.dark-mode {
      filter: invert(1);
    }
  }
</style>
