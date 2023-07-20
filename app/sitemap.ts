import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://voltchart-alpha.vercel.app/',
			lastModified: new Date(),
		},
		{
			url: 'https://app.voltchart-alpha.vercel.app/',
			lastModified: new Date(),
		},
		{
			url: 'https://app.voltchart-alpha.vercel.app//signin',
			lastModified: new Date(),
		},
		{
			url: 'https://app.voltchart-alpha.vercel.app//siginup',
			lastModified: new Date(),
		},
		{
			url: 'https://app.voltchart-alpha.vercel.app//expenses',
			lastModified: new Date(),
		},
		{
			url: 'https://app.voltchart-alpha.vercel.app//income',
			lastModified: new Date(),
		},
		{
			url: 'https://app.voltchart-alpha.vercel.app//investments',
			lastModified: new Date(),
		},
		{
			url: 'https://app.voltchart-alpha.vercel.app//settings',
			lastModified: new Date(),
		},
	];
}
