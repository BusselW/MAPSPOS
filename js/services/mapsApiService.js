const mapsApiBasisUrl = "https://ketenportaal.cjib.eminjenv.nl/cjib/ketenportaal/api/maps-service/api/1.0/beroepen/find";

async function fetchBeroepenCount(email, hoorfase = null, datumtijdHoorzittingVanaf = null, datumtijdHoorzittingTotEnMet = null) {
    const payload = {
        "beroeptype": {"value":"OVJ","filterType":"eq"},
        "beroepActief": {"value":true,"filterType":"eq"},
        "eigenaar": {"value":email,"filterType":"equalsIgnoreCase"},
        "openstaandeWachtstanden": {"filterType":"exists"},
        "wachtstand": {"value":"HOREN","filterType":"eq"},
        "beroepState": {"value":"BEROEP_BESLISSEN","filterType":"eq"},
        "hoorverzoek": {
            "datumtijdHoorzitting": {
                "filterType":"between"
            }
        }
    };

    if (hoorfase) {
        payload.hoorverzoek.hoorfase = {"value":hoorfase,"filterType":"eq"};
    }

    if (datumtijdHoorzittingVanaf) {
        payload.hoorverzoek.datumtijdHoorzitting.vanaf = datumtijdHoorzittingVanaf;
    }
    if (datumtijdHoorzittingTotEnMet) {
        payload.hoorverzoek.datumtijdHoorzitting.totEnMet = datumtijdHoorzittingTotEnMet;
    }

    try {
        const response = await fetch(mapsApiBasisUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.totalElements;
    } catch (error) {
        console.error("Fout bij ophalen van beroepen count:", error);
        return -1; // Indicate an error
    }
}

export { fetchBeroepenCount };
