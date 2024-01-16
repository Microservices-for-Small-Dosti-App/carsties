import { getTokenWorkaround } from "@/app/actions/authActions";

const baseUrl = process.env.API_URL;

async function get(url: string) {
    const response = await getFetchResponse(url, 'GET');

    return await handleResponse(response);
}


async function post(url: string, body: {}) {
    const response = await getFetchResponse(url, 'POST', body);

    return await handleResponse(response);
}

async function put(url: string, body: {}) {
    const response = await getFetchResponse(url, 'PUT', body);

    return await handleResponse(response);
}

async function del(url: string) {
    const response = await getFetchResponse(url, 'DELETE');

    return await handleResponse(response);
}

async function getHeaders() {
    const token = await getTokenWorkaround();

    const headers = { 'Content-type': 'application/json' } as any;

    if (token) { headers.Authorization = `Bearer ${token?.access_token}` }

    return headers;
}

async function getRequestOptions(method: string, body?: {}) {
    const requestOptions = { method: method, headers: await getHeaders(), } as any;

    if (typeof body !== 'undefined') { requestOptions.body = JSON.stringify(body); }

    return requestOptions;
}

async function getFetchResponse(url: string, method: string, body?: {}) {
    const requestOptions = await getRequestOptions(method, body);
    // console.log('getFetchResponse(). requestOptions:', requestOptions, 'url:', url, 'method:', method, 'body:', body);

    return await fetch(`${baseUrl}${url}`, requestOptions);
}

async function handleResponse(response: Response) {
    const text = await response.text();

    let data;
    try {
        data = JSON.parse(text);
    } catch (error) {
        data = text;
    }

    if (response.ok) {
        return data || response.statusText;
    } else {
        const error = {
            status: response.status,
            message: typeof data === 'string' && data.length > 0 ? data : response.statusText
        }
        
        return { error };
    }
}

export const fetchWrapper = { get, post, put, del };
