<script lang="ts">
	import EmailSignup from '$lib/components/EmailSignup.svelte';
</script>

<svelte:head>
	<title>CreditBuddy UK – Simple UK credit tools and guides</title>
	<meta
		name="description"
		content="Free, UK-focused tools to help you understand your credit file, check for errors, and plan realistic steps to improve your credit health."
	/>
</svelte:head>

<section>
	<h1>Welcome to CreditBuddy UK</h1>
	<p>
		CreditBuddy UK is a simple, UK-focused financial education site. Our tools help you understand
		your credit situation and plan small, practical steps to improve it.
	</p>

	<div class="cards">
		<article class="card">
			<h2>CCJ Duration Checker</h2>
			<p>
				Find out how long a County Court Judgment (CCJ) stays on your credit file and when it
				might drop off.
			</p>
			<a href="/tools/ccj-checker" class="button">Open CCJ Checker</a>
		</article>

		<article class="card">
			<h2>Credit Report Error Checker</h2>
			<p>
				A guided checklist to spot common mistakes on your credit report and see what to do
				about them.
			</p>
			<a href="/tools/credit-report-checker" class="button">Open Error Checker</a>
		</article>

		<article class="card">
			<h2>30-Day Credit Boost Planner</h2>
			<p>
				A simple 30-day action plan with small, realistic steps you can take to improve your
				credit health.
			</p>
			<a href="/tools/30-day-planner" class="button">Open 30-Day Planner</a>
		</article>
	</div>

	<p class="note">
		We do not store sensitive financial data. All credit-related calculations run in your browser,
		and email sign-up (if you choose it) is optional and GDPR-friendly.
	</p>

	<EmailSignup />
</section>

<style>
	h1 {
		font-size: 2rem;
		margin-bottom: 0.75rem;
	}

	p {
		line-height: 1.5;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}

	.card {
		background: white;
		border-radius: 0.75rem;
		padding: 1.25rem;
		box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.card h2 {
		margin: 0;
		font-size: 1.1rem;
	}

	.card p {
		margin: 0;
		font-size: 0.95rem;
	}

	.button {
		display: inline-block;
		margin-top: 0.75rem;
		align-self: flex-start;
		padding: 0.5rem 0.9rem;
		border-radius: 999px;
		background: #2563eb;
		color: white;
		text-decoration: none;
		font-size: 0.9rem;
	}

	.button:hover {
		background: #1d4ed8;
	}

	.note {
		font-size: 0.9rem;
		color: #4b5563;
		margin-top: 1rem;
	}
</style>
