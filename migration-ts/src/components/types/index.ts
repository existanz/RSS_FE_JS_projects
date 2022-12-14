enum Category {
    business,
    entertainment,
    general,
    health,
    science,
    sports,
    technology,
}

interface Options {
    category?: Category;
    language?: string;
    country?: string;
}

interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: Category;
    language: string;
    country: string;
}

interface Response {
    status: string;
    sources: Source[];
    articles: Articles[];
}

interface Articles {
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

interface Resp {
    endpoint: string;
    options?: object;
}

type Endpoint = 'sources' | 'everything';
type Method = 'GET' | 'POST';
type Callback<Type> = (arg?: Type) => void;

interface ErrorResp {
    ok: boolean;
    status: number;
    statusText: string;
    json(): void;
}

export { Options, Response, Resp, ErrorResp, Endpoint, Method, Callback, Articles, Source };
export type Test = { Options: string };
