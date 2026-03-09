<script lang="ts">
	import { calculateCcjOutcome, type CcjOutcome } from '$lib/logic/ccj';

	let judgmentDate = '';
	let paidWithinOneMonth: 'unknown' | 'yes' | 'no' = 'unknown';
	let outcome: CcjOutcome | null = null;
	let errorMessage = '';

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		errorMessage = '';
		outcome = null;

		if (!judgmentDate) {
			errorMessage = 'Please choose the date of the judgment.';
			return;
		}

		if (paidWithinOneMonth === 'unknown') {
			errorMessage = 'Please tell us whether the CCJ was paid in full within one calendar month.';
			return;
		}

		try {
			outcome = calculateCcjOutcome(judgmentDate, paidWithinOneMonth === 'yes');
		} catch (error) {
			console.error(error);
			errorMessage = 'Something went wrong when calculating the result. Please check the date and try again.';
		}
	}
</script>

<section>
	<h1>CCJ Duration Checker</h1>
	<p>
		Use this tool to see how long a County Court Judgment (CCJ) would usually stay on your UK credit
		file, based on the date of judgment. All calculations run in your browser. We do not store the
		dates you enter.
	</p>

	<form on:submit|preventDefault={handleSubmit} class="form">
		<div class="field">
			<label for="judgment-date">Date of judgment</label>
			<input
				id="judgment-date"
				type="date"
				bind:value={judgmentDate}
				max={new Date().toISOString().slice(0, 10)}
				required
			/>
			<p class="hint">This is the date the court made the judgment, not the date you received a letter.</p>
		</div>

		<fieldset class="field">
			<legend>Was the CCJ paid in full within one calendar month of the judgment date?</legend>
			<div class="options">
				<label>
					<input
						type="radio"
						name="paidWithinOneMonth"
						value="yes"
						bind:group={paidWithinOneMonth}
					/>
					Yes, it was paid in full within one calendar month
				</label>
				<label>
					<input
						type="radio"
						name="paidWithinOneMonth"
						value="no"
						bind:group={paidWithinOneMonth}
					/>
					No, it was not paid in full within one calendar month
				</label>
				<label>
					<input
						type="radio"
						name="paidWithinOneMonth"
						value="unknown"
						bind:group={paidWithinOneMonth}
					/>
					I'm not sure
				</label>
			</div>
		</fieldset>

		{#if errorMessage}
			<p class="error" role="alert">{errorMessage}</p>
		{/if}

		<button type="submit" class="button">Calculate</button>
	</form>

	{#if outcome}
		<section class="result">
			<h2>Result based on your answers</h2>
			<p>{outcome.summary}</p>

			<ul>
				<li>
					If the CCJ is not paid in full within one calendar month, it would normally stay on your
					credit file until <strong>{outcome.dropOffDateString}</strong>.
				</li>
				<li>
					Paying the CCJ in full within one calendar month (by around
					<strong>{outcome.payWithinMonthDeadlineString}</strong>) and asking the court to record this
					can usually have it removed from public records, rather than waiting the full six years.
				</li>
			</ul>

			<p class="note">
				This tool is a general guide only. It does not replace advice from the court, a qualified debt
				adviser, or your chosen credit reference agency.
			</p>
		</section>
	{/if}
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

	.form {
		margin-top: 1rem;
		margin-bottom: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 480px;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	label,
	legend {
		font-weight: 600;
		font-size: 0.95rem;
	}

	input[type='date'] {
		max-width: 220px;
		padding: 0.4rem 0.5rem;
		border-radius: 0.4rem;
		border: 1px solid #d1d5db;
		font-size: 0.95rem;
	}

	.hint {
		font-size: 0.85rem;
		color: #6b7280;
		margin: 0;
	}

	.options {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		margin-top: 0.4rem;
		font-size: 0.9rem;
	}

	.button {
		align-self: flex-start;
		padding: 0.5rem 0.9rem;
		border-radius: 999px;
		background: #2563eb;
		color: white;
		border: none;
		font-size: 0.95rem;
		cursor: pointer;
	}

	.button:hover {
		background: #1d4ed8;
	}

	.error {
		color: #b91c1c;
		font-size: 0.9rem;
	}

	.result {
		background: white;
		border-radius: 0.75rem;
		padding: 1.25rem;
		box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
		max-width: 640px;
	}

	.result h2 {
		margin-top: 0;
		margin-bottom: 0.5rem;
		font-size: 1.25rem;
	}

	.result ul {
		margin: 0.75rem 0;
		padding-left: 1.2rem;
	}

	.result li {
		margin-bottom: 0.35rem;
		line-height: 1.5;
	}

	.note {
		font-size: 0.85rem;
		color: #4b5563;
		margin-top: 0.5rem;
	}
</style>

