
type FrontMatter = {
    title: string;
    category: string;
    writtenAt: string;
};

export interface Article {
    slug: string;
    data: FrontMatter;
}

// export async function bundlePost(slug: string) {

//     const path = `${process.cwd()}/app/routes/blog/${slug}`;

//     return await bundleMDX({
//         file: `${path}/page.mdx`,
//         cwd: path,

//         esbuildOptions: (options) => {
//             // Configuration to allow image loading
//             // https://github.com/kentcdodds/mdx-bundler#image-bundling
//             options.loader = {
//                 ...options.loader,
//                 ".png": "dataurl",
//                 ".jpg": "dataurl",
//                 ".svg": "dataurl",
//                 ".gif": "dataurl",
//             };
//             return options;
//         },
//         mdxOptions(options, frontmatter) {
//             options.rehypePlugins = [
//                 ...(options.rehypePlugins ?? []),
//                 // 👇 you can set your own theme from vscode themes
//                 // [rehypePrettyCode, { theme: "nord" }],
//             ];
//             return options;
//         },
//     });
// }


export async function getAllArticlesSlug() {

    const modules = import.meta.glob<{ frontmatter: FrontMatter }>("./routes/blog", {
        eager: true,
    });

    return Object.keys(modules); // .map((path) => path.split('/')[3])
}



export async function listAllArticle(): Promise<Article[]> {

    const modules = import.meta.glob<{ frontmatter: FrontMatter }>("./routes/blog/**", {
        eager: true,
    });

    const articles = await Promise.all(
        Object.entries(modules).map(([path, module]) => {
            const slug = path.split('/').pop()!.replace(".mdx", "");
            return { slug, data: module.frontmatter };
        })
    );

    // // @ts-expect-error
    // const build = await import('virtual:react-router/server-build');

    // const articles = Object.entries(modules).map(([path, module]) => {
    //     const id = path.split("/").pop()?.replace(".mdx", "");
    //     let slug = build.routes[id!].path;
    //     if (slug === undefined) throw new Error(`No route for ${id}`);

    //     console.log(module)
    //     return slug;
    // })


    return sortBy(articles, (a) => a.data.writtenAt);
}




function sortBy<T>(
    arr: T[],
    key: (item: T) => any,
    dir: 'asc' | 'desc' = 'asc',
) {
    return arr.sort((a, b) => {
        const res = compare(key(a), key(b));
        return dir === 'asc' ? res : -res;
    });
}

function compare<T>(a: T, b: T): number {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}