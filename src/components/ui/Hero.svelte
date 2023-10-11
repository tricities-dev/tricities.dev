<script lang="ts">
	import CtaLink from "./CtaLink.svelte";
</script>

<div class="hero">
	<div class="hero-body">
		<div class="hero-img">
		</div>
		<div class="hero-content">
			<h2 class="hero-content-title">
				Eyetracking, using a Tobii Eyetracker, C#/.NET, Blazor, SignalR
			</h2>
			<p class="hero-content-description">
				A local startup in JC uses Eyetracking technology to power mental health evaluation software. For the last 2 years I've been modernizing their software stack piece by piece. For this latest project, the interface to the eyetracker itself, I've chosen C# and .NET for my implementation. Take a deep dive into the .NET platform with me as I talk about the project, how things are going so far, and what I've learned about.
			</p>
			<CtaLink title="RSVP" link="#" icon="meetup"/>
		</div>
		<div class="hero-bg-img"></div>
	</div>
</div>

<style>
.hero {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
	height: 34.25rem;
	z-index: 1;
}

.hero-body {
	position: relative;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-start;
	gap: 2rem;
	width: calc(100% - 12rem);
	height: 34.25rem;
	background: var(--gradient-bg-vert);
	border: 2px solid var(--border-color);
}

.hero-bg-img {
	position: absolute;
	opacity: var(--triforce-opacity);
	width: 100%;
	height: 100%;
	background-image: url('./triforce.svg');
  background-repeat: no-repeat;
  background-position: right center;
}

.hero-body::after {
  content: "";
  position: absolute;
	right: -56px;
	top: -56px;
  width: 100px;
  height: 100px;
  transform: rotate(45deg);
  background-color: var(--primary-bg-color);
	border: 4px solid var(--primary-bg-color);
}

.hero-img {
	width: 32rem;
	height: 32rem;
	background-color: var(--gray);
	z-index: 1;
}

.hero-content {
	flex: 1;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: flex-start;
	gap: 2rem;
	height: 32rem;
	padding: 0 5rem 0 5rem;
	z-index: 1;
}

.hero-content-title {
	font-family: var(--header-font-family);
	font-size: 3rem;
	color: var(--primary-text-color);
}

.hero-content-description {
	font-family: var(--body-font-family);
	color: var(--primary-text-color);
	line-height: 1.6rem;
}
</style>
