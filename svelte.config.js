import adapterVercel from '@sveltejs/adapter-vercel';
import adapterNode from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: (() => {
			const isLocalWindows = process.platform === 'win32' && !process.env.VERCEL;

			return isLocalWindows ? adapterNode() : adapterVercel();
		})()
	}
};

export default config;
