<script lang="ts">
	export let link: string;
	export let text: string;
	export let icon: string;
	export let liClasses: string = "";
	export let aClasses: string = "";
	import { config } from "../stores.js";
</script>

<li class={liClasses}>
	<a
		href={link}
		class={`border ${aClasses} ${$config.screenMode}`}
		target="_blank"
		rel="noreferrer noopener"
	>
		<img src={icon} alt={text} />
		<p>{text}</p>
	</a>
</li>

<style lang="scss">
	// todo move to variables.scss
	// Theme colors
	$white: #fff;
	$black: #000;

	// specific link colors
	$discord: #7289da;
	$meetup: #ec1d40;

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
			border: solid 1px $white;
			cursor: pointer;
			filter: none;
			transition: all 0.5s ease-in-out;

			&:hover {
				background: $white;
				color: $black;

				img {
					filter: invert(1);
				}
			}

			&.discord:hover {
				background: $discord;
			}

			&.meetup:hover {
				background: $meetup;
			}

			img {
				width: 35px;
				height: 35px;
				filter: invert(0);
				transition: all 0.5s ease-in-out;
			}

			p {
				font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
				font-size: 1rem;
				font-weight: 600;
				margin: 0;
			}

			&.light-mode {
				color: $black;
				border: 1px solid $black;

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

				&.discord:hover {
					background: $discord;
				}

				&.meetup:hover {
					background: $meetup;
				}
			}
		}
	}
</style>
