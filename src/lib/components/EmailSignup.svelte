<script lang="ts">
	import { addSubscriber } from '$lib/firebase/client';

	let email = '';
	let consent = false;
	let status: 'idle' | 'submitting' | 'success' | 'error' = 'idle';
	let message = '';

	const CONSENT_TEXT =
		'I agree to receive occasional credit tips and updates from CreditBuddy UK and I have read the Privacy Policy.';

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (!email) {
			status = 'error';
			message = 'Please enter your email address.';
			return;
		}

		if (!consent) {
			status = 'error';
			message = 'Please tick the box to confirm your consent.';
			return;
		}

		status = 'submitting';
		message = '';

		try {
			await addSubscriber(email.trim(), CONSENT_TEXT);
			status = 'success';
			message = 'Thank you. You are now signed up for occasional tips and updates.';
			email = '';
			consent = false;
		} catch (error) {
			console.error(error);
			status = 'error';
			message = 'Sorry, something went wrong. Please try again later.';
		}
	}
</script>

<form class="email-signup" on:submit|preventDefault={handleSubmit}>
	<h2>Optional tips by email</h2>
	<p>
		If you would like, you can sign up for occasional emails with simple credit tips and updates.
		This is completely optional and not required to use any of the tools.
	</p>

	<label class="field">
		<span>Email address</span>
		<input
			type="email"
			bind:value={email}
			placeholder="you@example.com"
			autocomplete="email"
		/>
	</label>

	<label class="consent">
		<input type="checkbox" bind:checked={consent} />
		<span>
			{CONSENT_TEXT}
			<a href="/privacy">Privacy Policy</a>.
		</span>
	</label>

	<button type="submit" class="button" disabled={status === 'submitting'}>
		{status === 'submitting' ? 'Signing you up…' : 'Sign up (optional)'}
	</button>

	{#if message}
		<p class:success={status === 'success'} class:error={status === 'error'}>{message}</p>
	{/if}
</form>

<style>
	.email-signup {
		margin-top: 2rem;
		padding: 1.25rem;
		border-radius: 0.75rem;
		background: #111827;
		color: #e5e7eb;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	h2 {
		margin: 0;
		font-size: 1.1rem;
	}

	p {
		margin: 0;
		font-size: 0.9rem;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		font-size: 0.9rem;
	}

	input[type='email'] {
		border-radius: 0.4rem;
		border: 1px solid #4b5563;
		padding: 0.45rem 0.6rem;
		font-size: 0.9rem;
		background: #020617;
		color: #e5e7eb;
	}

	input[type='email']::placeholder {
		color: #6b7280;
	}

	.consent {
		display: flex;
		align-items: flex-start;
		gap: 0.45rem;
		font-size: 0.8rem;
	}

	.consent input[type='checkbox'] {
		margin-top: 0.15rem;
	}

	.consent a {
		color: #93c5fd;
	}

	.consent a:hover {
		text-decoration: underline;
	}

	.button {
		align-self: flex-start;
		padding: 0.45rem 0.9rem;
		border-radius: 999px;
		background: #f97316;
		color: #111827;
		border: none;
		font-size: 0.9rem;
		cursor: pointer;
	}

	.button[disabled] {
		opacity: 0.7;
		cursor: default;
	}

	.button:hover:enabled {
		background: #ea580c;
	}

	.success {
		color: #bbf7d0;
		font-size: 0.8rem;
	}

	.error {
		color: #fecaca;
		font-size: 0.8rem;
	}

	@media (max-width: 640px) {
		.email-signup {
			margin-top: 1.5rem;
		}
	}
</style>

