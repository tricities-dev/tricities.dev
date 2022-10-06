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
			background: transparent;
			border: 1px solid $white;
			cursor: pointer;
			filter: none;
			transition: all 0.3s ease-in-out;

			&:hover {
				background: $white;
				color: $black;
				img {
					filter: invert(1);
				}
			}

			img {
				width: 35px;
				height: 35px;
			}

			p {
				font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
				font-size: 1rem;
				font-weight: 600;
				margin: 0;
			}

			&.light-mode {
				border: 1px solid $black;
				color: $black;

				img {
					filter: invert(1);
				}
				&:hover {
					background: $black;
					color: $white;

					img {
						filter: unset;
					}
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