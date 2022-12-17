enum Category {
    business,
    entertainment,
    general,
    health,
    science,
    sports,
    technology,
}

type Options = {
    [key: string]: string;
};

interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: Category;
    language: string;
    country: string;
}

interface RespArticles {
    status: string;
    articles: Article[];
}

interface RespSources {
    status: string;
    sources: Source[];
}

interface Article {
    source: {
        id: string;
        name: string;
    };
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    title: string;
    url: string;
    urlToImage: string;
}

type Endpoint = 'sources' | 'everything';
type Method = 'GET' | 'POST';
type Callback<Type> = (arg?: Type) => void;
type ResponseNews = RespArticles | RespSources;

interface ErrorResp {
    ok: boolean;
    status: number;
    statusText: string;
    json(): Promise<ResponseNews>;
}

export { Options, ErrorResp, Endpoint, Method, Callback, RespArticles, RespSources, Article, Source, ResponseNews };
