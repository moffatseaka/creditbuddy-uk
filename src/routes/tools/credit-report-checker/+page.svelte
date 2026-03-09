<script lang="ts">
	import { onMount } from 'svelte';
	import { creditReportChecklist, type CreditReportCheckItem } from '$lib/logic/credit-report-checker';
	import { AFFILIATE_REPORT_URL } from '$lib/config/affiliate';

	const STORAGE_KEY = 'credit-report-checker-checked';

	let expandedId: string | null = null;
	let checkedIds: string[] = [];

	onMount(() => {
		if (typeof localStorage === 'undefined') return;

		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const parsed = JSON.parse(stored);
				if (Array.isArray(parsed)) {
					checkedIds = parsed.filter((id) => typeof id === 'string');
				}
			}
		} catch (error) {
			console.error('Failed to read saved progress', error);
		}
	});

	function toggleExpanded(id: string) {
		expandedId = expandedId === id ? null : id;
	}

	function isChecked(id: string): boolean {
		return checkedIds.includes(id);
	}

	function toggleChecked(item: CreditReportCheckItem) {
		const alreadyChecked = isChecked(item.id);
		checkedIds = alreadyChecked ? checkedIds.filter((id) => id !== item.id) : [...checkedIds, item.id];

		if (typeof localStorage !== 'undefined') {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIds));
			} catch (error) {
				console.error('Failed to save progress', error);
			}
		}
	}

	$: totalItems = creditReportChecklist.length;
	$: completedCount = checkedIds.length;
</script>

<section>
	<h1>Credit Report Error Checker</h1>
	<p>
		This tool gives you a simple checklist of common things to look for on your UK credit report.
		Use it while you are viewing your report from your chosen provider in another tab or window.
	</p>

	<p>
		We will not ask you to upload your credit report or enter account numbers. Any progress you mark
		as "checked" is stored only in your browser using local storage, not on our servers.
	</p>

	{#if AFFILIATE_REPORT_URL}
		<div class="affiliate-callout">
			<p>
				If you need a fresh copy of your credit report, you can get one from our partner using the
				link below.
			</p>
			<a
				class="affiliate-link"
				href={AFFILIATE_REPORT_URL}
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
			Progress: <strong>{completedCount}</strong> of <strong>{totalItems}</strong> checks marked as
			done on this device.
		</p>
	</div>

	<ul class="checklist">
		{#each creditReportChecklist as item}
			<li class="item">
				<div class="item-header">
					<div class="item-title">
						<h2>{item.title}</h2>
						<span class="badge">{item.category}</span>
					</div>
					<div class="item-actions">
						<label class="checkbox-label">
							<input
								type="checkbox"
								checked={isChecked(item.id)}
								on:change={() => toggleChecked(item)}
							/>
							<span>I've checked this</span>
						</label>
						<button type="button" class="toggle" on:click={() => toggleExpanded(item.id)}>
							{expandedId === item.id ? 'Hide details' : 'Show details'}
						</button>
					</div>
				</div>

				{#if expandedId === item.id}
					<div class="item-body">
						<h3>What to look for</h3>
						<p>{item.whatToLookFor}</p>

						<h3>What to do</h3>
						<p>{item.whatToDo}</p>
					</div>
				{/if}
			</li>
		{/each}
	</ul>

	<p class="note">
		This checklist is general guidance only and cannot cover every situation. If you are worried
		about information on your credit report, consider speaking to a free UK debt advice charity or a
		qualified adviser.
	</p>
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

	.checklist {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.item {
		background: white;
		border-radius: 0.75rem;
		padding: 0.9rem 1rem;
		box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
	}

	.item-header {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 0.75rem;
	}

	.item-title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.item h2 {
		margin: 0;
		font-size: 1rem;
	}

	.badge {
		background: #e5e7eb;
		color: #4b5563;
		font-size: 0.75rem;
		padding: 0.1rem 0.4rem;
		border-radius: 999px;
	}

	.item-actions {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.9rem;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.35rem;
	}

	.toggle {
		border: none;
		background: transparent;
		color: #2563eb;
		cursor: pointer;
		font-size: 0.9rem;
		padding: 0;
	}

	.toggle:hover {
		text-decoration: underline;
	}

	.item-body {
		margin-top: 0.75rem;
	}

	.item-body h3 {
		font-size: 0.95rem;
		margin: 0.25rem 0;
	}

	.item-body p {
		margin: 0 0 0.5rem;
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
		.item-header {
			align-items: flex-start;
		}

		.item-actions {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>

