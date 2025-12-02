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

/**
 * Enhanced link builder that handles dynamic parameters and context-aware URL construction
 * @param {Object} linkConfig - Link configuration object from tabbladen
 * @param {Object} context - Context object with user info and current state
 * @param {string} context.email - Current user's email
 * @param {string} context.actiefTab - Currently active tab name
 * @param {string} [gemeenteCode] - Optional gemeente code for gemeente-specific links
 * @param {Object} [customParams] - Optional custom parameters for special links
 * @returns {string} Complete URL ready for navigation
 */
export function bouwDynamischeLink(linkConfig, context, gemeenteCode = null, customParams = {}) {
    let dynamischeParams = {};
    const { email, actiefTab } = context;

    // Eigenaar toevoegen voor persoonlijke tabbladen, tenzij anders aangegeven
    if ((actiefTab === 'Eigen werkvoorraad' || actiefTab === 'Zittingen') && email && !linkConfig.isNietPersoonlijk) {
        dynamischeParams.eigenaar = email;
    }

    // Gemeente code toevoegen indien opgegeven
    if (gemeenteCode) {
        dynamischeParams.codePleeggemeente = gemeenteCode;
    }

    const vandaag = new Date();
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatDateTime = (date) => {
        return date.toISOString();
    };

    const getNextFriday = () => {
        const date = new Date(vandaag);
        const daysUntilNextWeek = 7 - date.getDay(); // Days until next Sunday
        const daysUntilFriday = daysUntilNextWeek + 5; // Then add days to Friday
        date.setDate(date.getDate() + daysUntilFriday);
        date.setHours(23, 59, 59, 999);
        return date;
    };

    // Dynamische datum tot vandaag
    if (linkConfig.dynamischeDatumTotVandaag) {
        dynamischeParams['hoorverzoek.datumtijdHoorzittingVanaf'] = '1970-01-01T00:00';
        dynamischeParams['hoorverzoek.datumtijdHoorzittingTotEnMet'] = `${formatDate(vandaag)}T23:59`;
    }

    // Dynamische datums - configurable ranges
    if (linkConfig.dynamischeDatumBereik) {
        const config = linkConfig.dynamischeDatumBereik;
        
        // Start date
        if (config.vanaf === 'historisch') {
            dynamischeParams['datumAangemaaktVanaf'] = '1990-01-01T01:00:00.000Z';
        } else if (config.vanaf) {
            const startDate = new Date(vandaag);
            startDate.setMonth(startDate.getMonth() + (config.vanaf.maanden || 0));
            startDate.setDate(startDate.getDate() + (config.vanaf.dagen || 0));
            dynamischeParams['datumAangemaaktVanaf'] = formatDateTime(startDate);
        }
        
        // End date
        if (config.totEnMet === 'nextFriday') {
            dynamischeParams['datumAangemaaktTotEnMet'] = formatDateTime(getNextFriday());
        } else if (config.totEnMet) {
            const endDate = new Date(vandaag);
            endDate.setMonth(endDate.getMonth() + (config.totEnMet.maanden || 0));
            endDate.setDate(endDate.getDate() + (config.totEnMet.dagen || 0));
            dynamischeParams['datumAangemaaktTotEnMet'] = formatDateTime(endDate);
        }
    }

    // Dynamische hoorzitting datums
    if (linkConfig.dynamischeHoorzittingBereik) {
        const config = linkConfig.dynamischeHoorzittingBereik;
        
        if (config.vanaf === 'historisch') {
            dynamischeParams['hoorverzoek.datumtijdHoorzittingVanaf'] = '1990-01-01T00:00';
        }
        
        if (config.totEnMet === 'nextFriday') {
            const friday = getNextFriday();
            dynamischeParams['hoorverzoek.datumtijdHoorzittingTotEnMet'] = `${formatDate(friday)}T23:59`;
        }
    }
    
    // Specifieke logica voor zittingen
    if (linkConfig.isZittingenLink) {
        const vandaagStr = formatDate(vandaag);
        dynamischeParams['hoorverzoek.datumtijdHoorzittingVanaf'] = `${vandaagStr}T09:00`;
        dynamischeParams['hoorverzoek.datumtijdHoorzittingTotEnMet'] = `${vandaagStr}T17:00`;
    }

    // Custom eigenaar logic
    if (linkConfig.isCustomEigenaarLink && customParams.eigenaar) {
        dynamischeParams.eigenaar = `*${customParams.eigenaar}*`;
    }

    // Custom date range logic
    if (linkConfig.isCustomDateRangeLink && customParams.startDateTime && customParams.endDateTime) {
        dynamischeParams['hoorverzoek.datumtijdHoorzittingVanaf'] = customParams.startDateTime;
        dynamischeParams['hoorverzoek.datumtijdHoorzittingTotEnMet'] = customParams.endDateTime;
    }

    // Combineer vaste, dynamische en custom parameters
    const alleParameters = { ...linkConfig.vasteParameters, ...dynamischeParams, ...customParams.extraParams };
    
    return bouwLink(linkConfig.basisUrl, alleParameters);
}