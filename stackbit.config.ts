import { defineStackbitConfig } from '@stackbit/types';

export default defineStackbitConfig({
    "stackbitVersion": "~0.6.0",
    "nodeVersion": "18",
    "ssgName": "custom",
    "contentSources": [
        {
            type: 'files',
            name: 'content',
            modelTypeKey: 'type',
            models: {
                page: {
                    type: 'page',
                    urlPath: '/{slug}',
                    fields: [
                        { type: 'string', name: 'title', required: true },
                        { type: 'string', name: 'slug', required: true },
                        { type: 'markdown', name: 'content' }
                    ]
                },
                hero: {
                    type: 'object',
                    fields: [
                        { type: 'string', name: 'heading' },
                        { type: 'string', name: 'subheading' },
                        { type: 'string', name: 'buttonText' },
                        { type: 'string', name: 'buttonLink' }
                    ]
                },
                feature: {
                    type: 'object',
                    fields: [
                        { type: 'string', name: 'title' },
                        { type: 'string', name: 'description' },
                        { type: 'string', name: 'icon' }
                    ]
                }
            }
        }
    ],
    // Definiert, wie der Visual Editor die Seiten-URLs findet
    siteMap: async () => {
        return [
            { path: '/', lastModified: new Date(), priority: 1 },
            { path: '/features', lastModified: new Date(), priority: 0.8 },
            { path: '/about', lastModified: new Date(), priority: 0.8 },
            { path: '/contact', lastModified: new Date(), priority: 0.8 }
        ];
    },
    // Anpassung des Dev-Servers für den Visual Editor
    devServerCommand: 'npx serve',
    assets: {
        referenceType: 'static',
        publicPath: '/',
        staticDir: './'
    },
    "postInstallCommand": "npm i --no-save @stackbit/types"
})