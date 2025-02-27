import { defineStackbitConfig, SiteMapEntry } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

export default defineStackbitConfig({
    stackbitVersion: "~0.6.0",
    nodeVersion: "18",
    ssgName: "custom",
    contentSources: [
        new GitContentSource({
            rootPath: __dirname,
            contentDirs: ["content"],
            models: [
                {
                    name: "page",
                    type: "page",
                    urlPath: "/{slug}",
                    filePath: "content/{slug}.md",
                    fields: [
                        { name: "title", type: "string", required: true },
                        { name: "slug", type: "string", required: true },
                        { name: "type", type: "string", required: true },
                        { name: "content", type: "markdown" }
                    ]
                },
                {
                    name: "hero",
                    type: 'object',
                    fields: [
                        { type: 'string', name: 'heading' },
                        { type: 'string', name: 'subheading' },
                        { type: 'string', name: 'buttonText' },
                        { type: 'string', name: 'buttonLink' }
                    ]
                },
                {
                    name: "feature",
                    type: 'object',
                    fields: [
                        { type: 'string', name: 'title' },
                        { type: 'string', name: 'description' },
                        { type: 'string', name: 'icon' }
                    ]
                }
            ]
        })
    ],
    // SiteMap-Funktion für dynamische URLs
    siteMap: ({ documents, models }) => {
        // Filter für Page-Models
        const pageModels = models.filter((m) => m.type === "page");
        
        return documents
            // Filter für Dokumente, die Page-Models sind
            .filter((d) => pageModels.some(m => m.name === d.modelName))
            // Jeden Eintrag in eine SiteMap-Entry umwandeln
            .map((document) => {
                const slug = document.fields.slug?.toString() || '';
                return {
                    stableId: document.id,
                    urlPath: `/${slug}`,
                    document,
                    isHomePage: slug === "index"
                };
            })
            .filter(Boolean) as SiteMapEntry[];
    },
    // Dev-Server-Konfiguration
    buildCommand: "npm run build || echo 'No build command'",
    devCommand: "npm run dev",
    assets: {
        referenceType: "static",
        publicPath: "/",
        staticDir: "./"
    },
    postInstallCommand: "npm i --no-save @stackbit/types @stackbit/cms-git"
})