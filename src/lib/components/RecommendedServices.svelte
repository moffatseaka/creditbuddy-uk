<script lang="ts">
	import { AFFILIATE_LINKS } from '$lib/config/affiliate';
</script>

<div class="recommended-services">
	<h3>Recommended Services</h3>

	<div class="service">
		<p class="title">Check your credit report</p>
		<p class="desc">See your full credit profile and identify any issues.</p>
		<a 
			href={AFFILIATE_LINKS.creditReport} 
			target="_blank" 
			rel="noopener noreferrer"
			class="link"
		>
			Get your credit report →
		</a>
	</div>

	<div class="service">
		<p class="title">Fix errors on your report</p>
		<p class="desc">If something looks wrong, you can dispute it with a provider.</p>
		<a 
			href={AFFILIATE_LINKS.disputeHelp} 
			target="_blank" 
			rel="noopener noreferrer"
			class="link"
		>
			Dispute errors →
		</a>
	</div>
</div>

<style>
	.recommended-services {
		margin-top: 2rem;
		padding: 1.5rem;
		border-radius: 0.75rem;
		background: #0f172a;
		color: #e5e7eb;
	}

	h3 {
		margin-bottom: 1rem;
	}

	.service {
		margin-bottom: 1rem;
	}

	.title {
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	.desc {
		font-size: 0.9rem;
		margin-bottom: 0.3rem;
	}

	.link {
		color: #93c5fd;
		font-size: 0.9rem;
	}

	.link:hover {
		text-decoration: underline;
	}
</style>
