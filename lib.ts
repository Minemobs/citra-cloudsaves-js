type HttpErrorDetails = {
    code: number;
    message: string;
};

type HttpError = {
    title: string;
    status: number;
    type: string;
    details: HttpErrorDetails | Record<string, never>;
};

type HttpResponse = {
    message: string;
};

type Result = HttpResponse | HttpError;

type Token = { token: string };

export async function login(username: string, password: string, apiURL: URL = new URL("https://citra.thesimpleteam.net")) {
    const response = await fetch(new URL("/login", new URL("login", apiURL)), {
        method: "POST",
        headers: {
            username: username,
            password: password,
        }
    }).then(it => it.json<Result>(), undefined);
    if(response === undefined) return undefined;
    if("title" in response) return response;
    return { token: response.message } as Token;
}

function tokenToAuth(token: Token) : [string, string] {
    return ["Authorization", `Bearer ${token.token}` ];
}

// TODO: gameID should be a string
export async function addSaveFile(token: Token, gameID: number, blob: Blob, apiURL: URL = new URL("https://citra.thesimpleteam.net")) {
    const formData = new FormData();
    formData.append("save", blob);
    return await fetch(new URL("save/" + gameID, apiURL), {
        method: "POST",
        headers: [ tokenToAuth(token) ],
        body: formData,
    }).then(it => it.json<Result>(), undefined);
}

export async function deleteSaveFile(token: Token, gameID: number, apiURL: URL = new URL("https://citra.thesimpleteam.net")) {
    return await fetch(new URL("save/" + gameID, apiURL), {
        method: "DELETE",
        headers: [ tokenToAuth(token) ]
    }).then(it => it.json<Result>(), undefined);
}

export async function getSaveFile(token: Token, gameID: number, apiURL: URL = new URL("https://citra.thesimpleteam.net")) {
    return await fetch(new URL("save/" + gameID, apiURL), {
        headers: [ tokenToAuth(token) ]
    }).then(it => (it.ok ? it.text() : it.json<HttpError>) as Promise<HttpError | string>, undefined);
}