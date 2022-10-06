<script lang="ts">
	export let link: string;
	export let text: string;
	export let icon: string;
	export let cssClass: string = '';
    import { config } from '../stores.js';
</script>

<style lang="scss">
    // todo move to variables.scss
    $white: #fff;
    $black: #000;

	li {
		a {
			text-decoration: none;
            display: flex;
			justify-content: center;
			align-items: center;
			gap: 1rem;
			padding: 1rem;
			color: $white;
			background: none;
			border: 1px solid $white;
			cursor: pointer;
			filter: none;
			transition: all 0.3s ease-in-out;

			img {
				width: 35px;
				height: 35px;
			}

			p {
				font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
				font-size: 1rem;
				font-weight: 600;
				background: transparent;
				margin: 0;
			}
			&:hover {
				background: $white;
				img {
					filter: invert(1);
				}
			}
			&.text-center {
				text-align: center;
			}
			&:hover {
				background: $white;
				color: $black;
			}
			&.light-mode {
				filter: invert(1);
				&:hover {
					filter: unset;
				}
			}
		}
    }
</style>

<li class={cssClass}>
	<a href={link} class={`border ${cssClass} ${$config.screenMode}`} target="_blank">
		<img src={icon} alt={text} />
		<p>{text}</p>
	</a>
</li>