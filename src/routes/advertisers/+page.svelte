<script lang="ts">
  import type { Type } from "../../app.d";

  const supporters: Type.Advertiser[] = [];
</script>

<div class="container">
  <div class="full-screen-ad">
    <div class="sides advertiser-logo" />
    <div class="sides advertiser-info" />
  </div>
</div>

<style>
  .container {
    position: fixed;
    inset: 0;
  }

  .full-screen-ad {
    width: 100vw;
    display: flex;
  }

  .sides {
    width: 100%;
    height: 100vh;
    background-color: black;
  }

  .advertiser-logo {
    border-right: 0.5rem solid white;
  }

  .advertiser-info {
    border-left: 0.5rem solid white;
    background-color: black;
  }
</style>
