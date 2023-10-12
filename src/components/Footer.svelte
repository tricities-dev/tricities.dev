<script lang="ts">
	import { themeStore } from '../stores.js';

	let startSeconds:number;
	let endSeconds:number;
	let dur:number;

	function updateTheme() {
		let newTheme:string = $themeStore === 'light' ? 'dark' : 'light';
		$themeStore = newTheme;
	}

	function watchForLongPress(e:any) {
		startSeconds = new Date().getTime() / 1000;

		e.target.onmouseup = () => {
			endSeconds = new Date().getTime() / 1000;
			dur = endSeconds - startSeconds;
			if (dur >= 1.5) {
				$themeStore = 'exp'
			} else {
				updateTheme()
			}
		}
	}
</script>

<footer>
	<div class="footer-content">
		<p class="site-note">
			Tri-Cities Dev, non-profit CC0 on <a href="https://github.com/tricities-dev">Github</a>
		</p>
		<img src="./lightbulb.svg" alt="lightbulb used to toggle theme" on:mousedown={watchForLongPress}/>
	</div>
</footer>

<style>
footer {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 4rem;
	padding: 2rem 0;
	background-color: var(--primary-bg-color);
}

.footer-content {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 1rem;
}

.site-note,
.site-note > a
{
	font-family: var(--body-font-family);
	color: var(--primary-text-color);
}

.footer-content > img {
	width: 2rem;
	height: auto;
	filter: var(--filter-invert);
	transition: ease-in-out .15s;
}

.footer-content > img:hover {
	cursor: pointer;
	transform: rotate(15deg);
	transition: ease-in-out .15s;
}
</style>
