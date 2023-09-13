<script lang="ts">
  import Advertiser from "../../components/advertiser.svelte";
  import type { Type } from "../../app";
  import { sponsors } from "../../sponsors.json";
  let currentSlideIndex = 0;
  let nextSlide: number | undefined;
  let direction = -1;
  let slides: Type.Advertiser[] = sponsors;
  let lengthSlides = slides.length;
  let moved = false;
  let transitionable = true;

  const nextIndex = () => {
    if (direction + currentSlideIndex >= lengthSlides) {
      return 0;
    }
    if (direction + currentSlideIndex < 0) {
      return lengthSlides - 1;
    }
    return direction + currentSlideIndex;
  };

  const transitionImage = (event: KeyboardEvent) => {
    const keyPressed = event.key;
    if ((keyPressed === "a" || keyPressed === "d") && transitionable) {
      transitionable = false;
      keyPressed === "a" ? (direction = -1) : (direction = 1);
      nextSlide = nextIndex();
      moved = true;
      setTimeout(() => {
        moved = false;
        currentSlideIndex = nextSlide!;
        nextSlide = undefined;
        transitionable = true;
      }, 1500);
    }
  };
</script>

{#if slides}
  <div class="overflow-hidden container">
    <div class="width-screen flex" on:keydown={transitionImage} tabindex="0">
      {#if moved === false && transitionable}
        <Advertiser advertiser={slides[currentSlideIndex]} />
      {:else if moved && direction === 1 && nextSlide != undefined}
        <div class="flex next-image-right">
          <Advertiser advertiser={slides[currentSlideIndex]} />
          <Advertiser advertiser={slides[nextSlide]} />
        </div>
      {:else if moved && direction === -1 && nextSlide != undefined}
        <div class="flex next-image-left">
          <Advertiser advertiser={slides[nextSlide]} />
          <Advertiser advertiser={slides[currentSlideIndex]} />
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  @keyframes moveRight {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-50%);
    }
  }

  @keyframes moveLeft {
    from {
      transform: translateX(-50%);
    }
    to {
      transform: translateX(0%);
    }
  }

  .flex {
    display: flex;
  }

  .container {
    position: fixed;
    inset: 0;
  }

  .overflow-hidden {
    overflow: hidden;
  }
  .width-screen {
    width: 100vw;
  }

  .next-image-right {
    animation-name: moveRight;
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }

  .next-image-left {
    animation-name: moveLeft;
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }
</style>
