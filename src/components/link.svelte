<script lang="ts">
	export let link: string;
	export let text: string;
	export let icon: string;
</script>

<li>
	<a href={link} target="_blank">
		<button>
			<img src={icon} alt={text} />
			<p>{text}</p>
		</button>
	</a>
</li>

<style lang="scss">
	// todo move to variables.scss
	$white: #fff;
	$black: #000;

	a {
		text-decoration: none;

		button {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 1rem;
			width: 100%;
			padding: 1rem;
			background: none;
			border: 1px solid $white;
			cursor: pointer;
			transition: all 0.3s ease-in-out;

			img {
				width: 35px;
				height: 35px;
			}

			p {
				font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
				font-size: 1rem;
				font-weight: 600;
				color: $white;
				background: transparent;
				margin: 0;
				transition: all 0.3s ease-in-out;
				&.block {
					display: block;
					width: 100%;
				}

				&.text-center {
					text-align: center;
				}
			}

			&:hover {
				background: $white;
				img {
					filter: invert(1);
				}
				p {
					color: $black;
				}
			}
		}
	}
</style>
