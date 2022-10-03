<script lang="ts">
    export let link: string;
    export let text: string;
</script>

<style>
    .border {
        display: flex;
        justify-content: center;
        padding: 1rem;
        border: 1px solid white;
    }

    a {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: white;
        text-decoration: none;
    }
</style>

<a href="{link}">
    <div class="border">
        {text}
    </div>
</a>