export function bouwLink(basisUrl, parameters) {
    const url = new URL(basisUrl);
    for (const key in parameters) {
        const value = parameters[key];
        if (Array.isArray(value)) {
            // Als de waarde een array is, voeg elke item apart toe.
            // Dit is voor parameters zoals 'sort' die meerdere keren kunnen voorkomen.
            value.forEach(item => {
                url.searchParams.append(key, item);
            });
        } else {
            url.searchParams.append(key, value);
        }
    }
    return url.toString();
}
