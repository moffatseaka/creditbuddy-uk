import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

const ROUTES = [
	'/', // home
	'/about',
	'/privacy',
	'/terms',
	'/tools/ccj-checker',
	'/tools/credit-report-checker',
	'/tools/30-day-planner'
];

export const prerender = true;

export const GET: RequestHandler = async () => {
	const base = (env.PUBLIC_SITE_URL || 'http://localhost:5173').replace(/\/+$/, '');

	const urls = ROUTES.map((path) => {
		const loc = `${base}${path}`;
		return `<url><loc>${loc}</loc></url>`;
	}).join('');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};

