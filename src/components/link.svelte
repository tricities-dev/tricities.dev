<script lang="ts">
    export let link: string;
    export let text: string;
    export let cssClass: string = '';
</script>

<style lang="scss">
    // todo move to variables.scss
    $white: #fff;
    $black: #000;

    .border {
        display: flex;
        justify-content: center;
        padding: 1rem;
        border: 1px solid $white;
    }
    a {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: $white;
        background: transparent;
        text-decoration: none;
        transition: all .3s ease-in-out;
        &.block {
            display: block;
            width: 100%;
        }

        &.text-center {
            text-align: center;
        }
        &:hover {
            background: $white;
            color: $black;
        }
    }
</style>

<a href="{link}" class="border {cssClass}">
    {text}
</a>