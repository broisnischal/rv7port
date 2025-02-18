// import { listAllArticles } from "~/blog.server";
import { listAllArticle } from "#app/blog.server.js";
import { Link } from "react-router";
import type { Route } from "./+types/_blog";

export async function loader() {

    return await listAllArticle();
};



export default function Page({ loaderData }: Route.ComponentProps) {
    return (
        <>
            <h1>Blog list</h1>
            <ul>
                {loaderData.map((article) => (
                    <li key={article.slug}>
                        <Link to={article.slug}>{article.data.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
};
