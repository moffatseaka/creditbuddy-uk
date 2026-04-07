<script lang="ts">
	import { onMount } from 'svelte';
	import { plannerDays, type PlannerDay } from '$lib/logic/credit-boost-planner';
	
	import RecommendedServices from '$lib/components/RecommendedServices.svelte';

	const STORAGE_KEY = 'credit-boost-planner-done-days';

	let completedDays: number[] = [];

	onMount(() => {
		if (typeof localStorage === 'undefined') return;

		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const parsed = JSON.parse(stored);
				if (Array.isArray(parsed)) {
					completedDays = parsed.filter((value) => typeof value === 'number');
				}
			}
		} catch (error) {
			console.error('Failed to read saved planner progress', error);
		}
	});

	function isDayDone(day: number): boolean {
		return completedDays.includes(day);
	}

	function toggleDay(day: number) {
		const alreadyDone = isDayDone(day);
		completedDays = alreadyDone
			? completedDays.filter((value) => value !== day)
			: [...completedDays, day].sort((a, b) => a - b);

		if (typeof localStorage !== 'undefined') {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(completedDays));
			} catch (error) {
				console.error('Failed to save planner progress', error);
			}
		}
	}

	$: totalDays = plannerDays.length;
	$: completedCount = completedDays.length;
	$: progressPercent = totalDays ? Math.round((completedCount / totalDays) * 100) : 0;
</script>

<section>
	<h1>30-Day Credit Boost Planner</h1>
	<p>
		This planner gives you one small, focused action for each of the next 30 days. The aim is to
		help you understand and improve your credit health in slow, realistic steps.
	</p>

	<p>
		The plan runs entirely in your browser. When you mark a day as done, that progress is stored
		locally on your device using local storage, not on our servers.
	</p>

	
		<div class="affiliate-callout">
			<p>
				Many of these actions work best when you have a recent copy of your credit report. You can
				get one from our partner using the link below.
			</p>
			<a
				class="affiliate-link"
				href="#"
				target="_blank"
				rel="noopener noreferrer nofollow"
			>
				Get your credit report
			</a>
			<p class="affiliate-note">
				We may earn a small commission if you use this link. This doesn&apos;t affect our
				recommendations.
			</p>
		</div>
	{/if}

	<div class="summary">
		<p>
			Progress: <strong>{completedCount}</strong> of <strong>{totalDays}</strong> days marked as
			done ({progressPercent}%).
		</p>
	</div>

	<ol class="days">
		{#each plannerDays as dayItem}
			<li class:done={isDayDone(dayItem.day)}>
				<div class="day-header">
					<div>
						<h2>Day {dayItem.day}: {dayItem.title}</h2>
					</div>
					<button type="button" class="toggle" on:click={() => toggleDay(dayItem.day)}>
						{isDayDone(dayItem.day) ? 'Mark as not done' : 'Mark as done'}
					</button>
				</div>
				<p>{dayItem.description}</p>
			</li>
		{/each}
	</ol>

	<p class="note">
		This 30-day plan is general guidance only. If you are struggling with debt or repayments, it may
		help to speak to a free UK debt advice charity or another trusted adviser.
	</p>

<p>
  Start by getting your full credit report:
  <a 
    href="#"
    target="_blank" 
    rel="noopener noreferrer"
  >
    Get your free credit report
  </a>
</p>

<RecommendedServices />

</section>

<style>
	h1 {
		font-size: 1.75rem;
		margin-bottom: 0.75rem;
	}

	p {
		line-height: 1.6;
		margin-bottom: 0.75rem;
	}

	.summary {
		margin: 0.5rem 0 1rem;
		font-size: 0.95rem;
		color: #374151;
	}

	.days {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.days li {
		background: white;
		border-radius: 0.75rem;
		padding: 0.9rem 1rem;
		box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
	}

	.days li.done {
		border-left: 4px solid #16a34a;
	}

	.day-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.75rem;
	}

	h2 {
		margin: 0 0 0.25rem;
		font-size: 1rem;
	}

	.toggle {
		border: none;
		background: #2563eb;
		color: white;
		cursor: pointer;
		font-size: 0.85rem;
		padding: 0.35rem 0.7rem;
		border-radius: 999px;
		white-space: nowrap;
	}

	.toggle:hover {
		background: #1d4ed8;
	}

	.days p {
		margin: 0.25rem 0 0;
		font-size: 0.9rem;
	}

	.affiliate-callout {
		margin: 1rem 0 1.25rem;
		padding: 0.9rem 1rem;
		border-radius: 0.75rem;
		background: #eff6ff;
		border: 1px solid #bfdbfe;
		font-size: 0.9rem;
	}

	.affiliate-link {
		display: inline-block;
		margin-top: 0.5rem;
		padding: 0.4rem 0.9rem;
		border-radius: 999px;
		background: #2563eb;
		color: #f9fafb;
		text-decoration: none;
		font-size: 0.9rem;
	}

	.affiliate-link:hover {
		background: #1d4ed8;
	}

	.affiliate-note {
		margin-top: 0.4rem;
		font-size: 0.8rem;
		color: #4b5563;
	}

	.note {
		margin-top: 1rem;
		font-size: 0.85rem;
		color: #4b5563;
	}

	@media (max-width: 640px) {
		.day-header {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>

