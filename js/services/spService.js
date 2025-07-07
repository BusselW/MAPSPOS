async function getCurrentUserEmail() {
    try {
        // SharePoint pages have a global object _spPageContextInfo which holds context
        if (window._spPageContextInfo && window._spPageContextInfo.userEmail) {
            return window._spPageContextInfo.userEmail;
        }

        // Fallback to REST API if the context object is not available
        const response = await fetch('/_api/web/currentuser', {
            headers: {
                'Accept': 'application/json;odata=verbose'
            }
        });

        if (!response.ok) {
            throw new Error('Kon de huidige gebruiker niet ophalen.');
        }

        const data = await response.json();
        return data.d.Email;
    } catch (error) {
        console.error('Fout bij ophalen van e-mailadres:', error);
        // Return a placeholder or handle the error as needed
        return 'gebruiker@onbekend.nl';
    }
}

export { getCurrentUserEmail };
