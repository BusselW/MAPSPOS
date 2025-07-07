export function bouwLink(basisUrl, parameters) {
    const url = new URL(basisUrl);
    for (const key in parameters) {
        url.searchParams.append(key, parameters[key]);
    }
    return url.toString();
}
