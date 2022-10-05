<script lang="ts">
	export let link: string;
	export let text: string;
	export let icon: string;
	export let color: string;

	let darkerColor = ColorLuminance(color, -0.2);

	/**
	 * @param {string} hex - Hex color code input
	 * @param {number} lum - Luminosity value (can be -1 to 1)
	 * @returns {string} - The hex color code with the luminosity applied
	 * @see https://www.sitepoint.com/javascript-generate-lighter-darker-color/
	 * @description Returns a hex color string that is lighter or darker than the input color.
	 */
	function ColorLuminance(hex: string, luminance: number) {
		hex = String(hex).replace(/[^0-9a-f]/gi, '');
		if (hex.length < 6) {
			hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
		}
		luminance = luminance || 0;

		var rgb = '#',
			c,
			i;
		for (i = 0; i < 3; i++) {
			c = parseInt(hex.substr(i * 2, 2), 16);
			c = Math.round(Math.min(Math.max(0, c + c * luminance), 255)).toString(16);
			rgb += ('00' + c).substr(c.length);
		}

		return rgb;
	}
</script>

<li style="--color: {color}; --darkerColor: {darkerColor};">
	<a href={link}>
		<button>
			<img src={icon} alt={text} />
			{text}
		</button>
	</a>
</li>

<style>
	button {
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-gap: 1rem;
		justify-content: center;
		align-items: center;
		padding: 1.2rem 4rem;
		border: none;
		border-radius: 10px;

		background-color: var(--color);
		background-image: linear-gradient(to right, var(--color), var(--darkerColor));

		cursor: pointer;

		font-size: 1rem;
		font-weight: 600;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		color: white;
	}

	button:hover,
	button:active {
		box-shadow: 0 0 25px 1px var(--darkerColor);
	}

	a {
		text-decoration: none;
	}
</style>
