<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
	<header class="site-header">
		<div class="container header-inner">
			<a href="/" class="logo">CreditBuddy UK</a>
			<nav class="nav">
				<a href="/">Home</a>
				<a href="/about">About</a>
				<a href="/tools/ccj-checker">CCJ Checker</a>
				<a href="/tools/credit-report-checker">Report Checker</a>
				<a href="/tools/30-day-planner">30-Day Planner</a>
				<a href="/privacy">Privacy</a>
				<a href="/terms">Terms</a>
			</nav>
		</div>
	</header>

	<main class="site-main">
		<div class="container">
			<slot />
		</div>
	</main>

	<footer class="site-footer">
		<div class="container footer-inner">
			<p class="disclaimer">
				CreditBuddy UK provides general information only and does not offer regulated financial advice.
				Always check details with official sources or a qualified adviser.
			</p>
			<p class="disclosure">
				We may earn a small commission if you use some of the links on this site. This doesn&apos;t
				affect our recommendations.
			</p>
			<div class="footer-services">
				<p><strong>Recommended Services</strong></p>

				<p>
					<a href="/tools/credit-report-checker">
						Get your credit report
					</a>
				</p>

				<p>
					<a href="/about">
						Dispute credit report errors
					</a>
				</p>
			</div>
			<p class="footer-links">
				<a href="/privacy">Privacy Policy</a>
				<span>•</span>
				<a href="/terms">Terms of Use</a>
				<span>•</span>
				<a href="/how-we-make-money">How we make money</a>
			</p>
			<p class="copyright">© {new Date().getFullYear()} CreditBuddy UK</p>
		</div>
	</footer>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
		background-color: #f7f7fb;
		color: #111827;
	}

	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.container {
		max-width: 960px;
		margin: 0 auto;
		padding: 1rem;
	}

	.site-header {
		background-color: #111827;
		color: white;
	}

	.header-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
	}

	.logo {
		font-weight: 700;
		font-size: 1.1rem;
		text-decoration: none;
		color: white;
	}

	.nav {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		font-size: 0.9rem;
	}

	.nav a {
		color: #e5e7eb;
		text-decoration: none;
	}

	.nav a:hover {
		color: white;
		text-decoration: underline;
	}

	.site-main {
		flex: 1;
		padding: 1.5rem 0 2rem;
	}

	.site-footer {
		background-color: #111827;
		color: #9ca3af;
		font-size: 0.8rem;
	}

	.footer-inner {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.footer-links {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.footer-links a {
		color: #e5e7eb;
		text-decoration: none;
	}

	.footer-links a:hover {
		text-decoration: underline;
	}

	.disclaimer {
		max-width: 48rem;
		margin: 0;
	}

	.disclosure {
		max-width: 48rem;
		margin: 0.25rem 0 0;
	}

	.site-footer p {
		margin: 0;
	}

	@media (max-width: 600px) {
		.header-inner {
			flex-direction: column;
			align-items: flex-start;
		}

		.nav {
			justify-content: flex-start;
		}
	}
</style>
