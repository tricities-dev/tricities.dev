<script lang="ts">
  import type { Type } from "../../app.d";
  import { QRCodeImage } from "svelte-qrcode-image";
  const advertiser: Type.Advertiser = {
    link: "http://google.com",
    logo: "/bitsum-logo-light.webp",
    title: "Bitsum",
    description: "Describe what it it is",
  };
</script>

<div class="container">
  <div class="full-screen-ad">
    <div class="sides advertiser-logo">
      <img class="center image-size" src={advertiser.logo} />
    </div>
    <div class="sides advertiser-info">
      <p class="title-text">{advertiser.title}</p>

      <div class="content-info">
        <p>{advertiser.link}</p>
        <p>{advertiser.description}</p>
      </div>
      <div>
        <div class="qr-code">
          <QRCodeImage text={advertiser.link} />
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .qr-code {
    display: flex;
    justify-content: center;
  }

  .content-info {
    margin-left: 20%;
    margin-right: 20%;
    color: aliceblue;
  }

  p {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    font-weight: 600;
  }

  .title-text {
    font-size: 5rem;
    color: white;
    text-align: center;
    text-transform: uppercase;
  }

  .center {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 25%;
    transform: translate(-50%, -50%);
  }

  .image-size {
    width: 25%;
    height: auto;
  }

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
