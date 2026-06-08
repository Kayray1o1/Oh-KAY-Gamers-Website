import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const gaming = (await getCollection('gaming')).map((post) => ({ post, section: 'gaming' }));
	const writing = (await getCollection('writing')).map((post) => ({ post, section: 'writing' }));
	const items = [...gaming, ...writing]
		.sort((a, b) => b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf());

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: items.map(({ post, section }) => ({
			...post.data,
			link: `/blog/${section}/${post.id}/`,
		})),
	});
}
