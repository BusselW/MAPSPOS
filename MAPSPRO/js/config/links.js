// Definitie van basis URL's om herhaling te voorkomen
const basisUrlGemeente = "https://ketenportaal.cjib.eminjenv.nl/cjib/ketenportaal/maps/beroepen?page=1&sort=audit.datumAangemaakt,asc&beroepActief=true&beroeptype=OVJ&beroepIndicatiesInclusief=HOREN&beroepIndicatiesInclusief=PROFESSIONEEL_GEMACHTIGDE&nietToegeeigend=true&feitcodegroepen=Verkeersborden&beroepIndicatiesExclusief=HUUR&datumAangemaaktTotEnMet=2025-09-19T00:00:00.000Z&datumAangemaaktVanaf=2025-07-14T00:00:00.000Z&size=25";
const basisUrlBeoordelingZonderEigenaar = "https://ketenportaal.cjib.eminjenv.nl/cjib/ketenportaal/maps/beroepen?page=1&sort=audit.datumAangemaakt,asc&beroepActief=true&beroeptype=OVJ&beroepIndicatiesInclusief=HOREN&beroepIndicatiesInclusief=PROFESSIONEEL_GEMACHTIGDE&nietToegeeigend=true&feitcodegroepen=Verkeersborden&beroepIndicatiesExclusief=HUUR&size=25&datumAangemaaktTotEnMet=2025-09-19T00:00:00.000Z&datumAangemaaktVanaf=2025-07-14T00:00:00.000Z&stateBeslissen=false";
const basisUrlBeoordelingVoorZitting = "https://ketenportaal.cjib.eminjenv.nl/cjib/ketenportaal/maps/beroepen?page=1&sort=audit.datumAangemaakt,asc&beroepActief=true&beroeptype=OVJ&beroepIndicatiesInclusief=HOREN&beroepIndicatiesInclusief=PROFESSIONEEL_GEMACHTIGDE&nietToegeeigend=false&feitcodegroepen=Verkeersborden&beroepIndicatiesExclusief=HUUR&size=25&datumAangemaaktTotEnMet=2025-09-19T00:00:00.000Z&datumAangemaaktVanaf=2025-07-14T00:00:00.000Z&stateBeslissen=false&hoorverzoek.hoorfase=WACHTSTAPEL_BEOORDELING_VOOR_ZITTING";
const basisUrlBurgerZonderEigenaar = "https://ketenportaal.cjib.eminjenv.nl/cjib/ketenportaal/maps/beroepen?page=1&size=25&sort=registratiedatum,asc&beroepActief=true&beroeptype=OVJ&beroepIndicatiesInclusief=HOREN&beroepIndicatiesExclusief=HUUR&beroepIndicatiesExclusief=PROFESSIONEEL_GEMACHTIGDE&nietToegeeigend=true&feitcodegroepen=Verkeersborden&datumAangemaaktVanaf=2025-07-14T00:00:00.000Z&datumAangemaaktTotEnMet=2025-09-19T00:00:00.000Z";
const basisUrlBurgerVoorZitting = "https://ketenportaal.cjib.eminjenv.nl/cjib/ketenportaal/maps/beroepen?page=1&size=25&sort=registratiedatum,asc&beroepActief=true&beroeptype=OVJ&beroepIndicatiesInclusief=HOREN&beroepIndicatiesExclusief=HUUR&beroepIndicatiesExclusief=PROFESSIONEEL_GEMACHTIGDE&nietToegeeigend=false&feitcodegroepen=Verkeersborden&hoorverzoek.hoorfase=WACHTSTAPEL_BEOORDELING_VOOR_ZITTING";
const mapsBasisUrl = "https://ketenportaal.cjib.eminjenv.nl/cjib/ketenportaal/maps/beroepen";

// Mapping van gemeentenamen naar hun codes
export const gemeenteCodes = {
    "Amsterdam": "0363", "Heerlen": "0917", "Alkmaar": "0361", "Breda": "0758",
    "Nijmegen": "0268", "Rotterdam": "0599", "Utrecht": "0344", "Den Haag": "0518",
    "Amersfoort": "0307"
};

// Hoofdstructuur van de applicatie, nu opgedeeld per tabblad
export const tabbladen = {
    "Werklijsten": {
        "WERKBAKKEN NA STORING": {
            isWerkbak: true,
            groepen: {
                "Groep E": [
                    { type: 'gemeente', opties: ["Amsterdam", "Heerlen", "Alkmaar"], basisUrl: basisUrlGemeente },
                    { type: 'link', titel: "1e beoordeling zonder eigenaar", basisUrl: basisUrlBeoordelingZonderEigenaar },
                    { type: 'link', titel: "1e beoordeling voor zitting", basisUrl: basisUrlBeoordelingVoorZitting }
                ],
                "Groep A": [
                    { type: 'gemeente', opties: ["Breda", "Nijmegen", "Rotterdam"], basisUrl: basisUrlGemeente },
                    { type: 'link', titel: "1e beoordeling zonder eigenaar", basisUrl: basisUrlBeoordelingZonderEigenaar },
                    { type: 'link', titel: "1e beoordeling voor zitting", basisUrl: basisUrlBeoordelingVoorZitting }
                ],
                "Groep B": [
                    { type: 'gemeente', opties: ["Utrecht", "Den Haag", "Amersfoort"], basisUrl: basisUrlGemeente },
                    { type: 'link', titel: "1e beoordeling zonder eigenaar", basisUrl: basisUrlBeoordelingZonderEigenaar },
                    { type: 'link', titel: "1e beoordeling voor zitting", basisUrl: basisUrlBeoordelingVoorZitting }
                ],
                "Groep C": [
                    { type: 'link', titel: "Burger (geen eigenaar)", basisUrl: basisUrlBurgerZonderEigenaar },
                    { type: 'link', titel: "Burger (voor zitting, verkeersborden)", basisUrl: basisUrlBurgerVoorZitting },
                    { type: 'link', titel: "PM (geen eigenaar, verkeersborden)", basisUrl: basisUrlBeoordelingZonderEigenaar },
                    { type: 'link', titel: "PM (voor zitting, verkeersborden)", basisUrl: basisUrlBeoordelingVoorZitting },
                ],
                "Groep D": [
                     { type: 'link', titel: "PM 1e beoordeling (geen eigenaar)", basisUrl: basisUrlBeoordelingZonderEigenaar },
                     { type: 'link', titel: "PM 1e beoordeling (voor zitting)", basisUrl: basisUrlBeoordelingVoorZitting },
                ]
            }
        }
    },
    "Eigen werkvoorraad": {
        "Persoonlijke werkbakken": {
            isWerkbak: false, // Gebruikt de 'details' view
            links: [
                {
                    titel: "Actieve zaken met een notificatie (Ovj)",
                    beschrijving: "Opent een link naar actieve Ovj-zaken met een notificatie.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "size": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "beroepActief": "true", "beroeptype": "OVJ", "openNotificaties": "true" }
                },
                {
                    titel: "Actieve zaken zonder wachtstand (Ovj)",
                    beschrijving: "Opent een link naar actieve Ovj-zaken zonder wachtstand (uitgezonderd zaken die vastgehouden moeten worden).",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "size": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "beroepActief": "true", "beroeptype": "OVJ", "geenWachtstand": "true" }
                },
                {
                    titel: "Actieve zaken met de fase ‘Retour verzuim horen’ met één wachtstand (OvJ)",
                    beschrijving: "Opent een link naar actieve Ovj-zaken in de fase 'Retour verzuim horen'.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "size": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "beroepActief": "true", "beroeptype": "OVJ", "hoorverzoek.hoorfase": "RETOUR_VERZUIM_HOREN", "beroepIndicatiesInclusief": "HOREN" }
                },
                {
                    titel: "Actieve zaken met een notificatie (Kanton)",
                    beschrijving: "Bekijk alle actieve Kanton zaken met een openstaande notificatie.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "size": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "beroepActief": "true", "beroeptype": "KANTON", "openNotificaties": "true" }
                },
                {
                    titel: "Actieve zaken zonder wachtstand (Kanton)",
                    beschrijving: "Actieve Kanton zaken zonder wachtstand.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "size": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "beroepActief": "true", "beroeptype": "KANTON", "geenWachtstand": "true" }
                },
                {
                    titel: "Actieve zaken op de fase hoorzitting/beoordeling na de zitting na de zittingsdatum (OvJ)",
                    beschrijving: "Zaken die wachten op beoordeling na de zitting, waarbij de zittingsdatum is gepasseerd.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "size": "25", "beroepActief": "true", "beroeptype": "OVJ", "hoorverzoek.hoorfase": "WACHTSTAPEL_BEOORDELING_NA_ZITTING", "sort": "hoorverzoek.datumtijdHoorzitting,asc" },
                    dynamischeDatumTotVandaag: true
                },
                {
                    titel: "Actieve zaken op de fase ‘Vasthouden’ (OvJ)",
                    beschrijving: "Zaken die in de wacht zijn gezet. Controleer minimaal elke twee weken.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "size": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "beroepActief": "true", "beroeptype": "OVJ", "hoorverzoek.hoorfase": "VASTHOUDEN" }
                }
            ]
        },
        "Aanvullende Werkvoorraad": {
            isWerkbak: false,
            isTimeline: true, // Markeer deze sectie als een tijdlijn
            links: [
                {
                    titel: "Retour verzuim horen",
                    beschrijving: "Alle zaken in de fase 'Retour verzuim horen'.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "pageSize": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "datumAangemaaktVanaf": "2025-07-14T02:00:00.000Z", "datumAangemaaktTotEnMet": "2026-01-01T01:00:00.000Z", "beroepActief": "true", "beroeptype": "OVJ", "beroepIndicatiesInclusief": "HOREN", "beroepIndicatiesExclusief": "HUUR", "size": "25", "hoorverzoek.hoorfase": "RETOUR_VERZUIM_HOREN", "openNotificaties": "true", "feitcodegroepen": "Verkeersborden" }
                },
                {
                    titel: "Retour verzuim horen (één wachtstand)",
                    beschrijving: "Zaken in 'Retour verzuim horen' met slechts één wachtstand.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "pageSize": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "datumAangemaaktVanaf": "2025-07-14T04:00:00.000Z", "datumAangemaaktTotEnMet": "2026-01-01T02:00:00.000Z", "beroepActief": "true", "beroeptype": "OVJ", "beroepIndicatiesInclusief": "HOREN", "beroepIndicatiesExclusief": "HUUR", "size": "25", "hoorverzoek.hoorfase": "RETOUR_VERZUIM_HOREN", "enigeWachtstand": "true", "feitcodegroepen": "Verkeersborden" }
                },
                {
                    titel: "Vasthouden",
                    beschrijving: "Zaken die in de wacht zijn gezet.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "pageSize": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "datumAangemaaktVanaf": "2025-07-14T02:00:00.000Z", "datumAangemaaktTotEnMet": "2026-10-01T02:00:00.000Z", "beroepActief": "true", "beroeptype": "OVJ", "beroepIndicatiesInclusief": "HOREN", "beroepIndicatiesExclusief": "HUUR", "size": "25", "hoorverzoek.hoorfase": "VASTHOUDEN", "feitcodegroepen": "Verkeersborden" }
                },
                {
                    type: 'note',
                    titel: "Hoorverslagen maken",
                    beschrijving: "Deze niet direct af doen!"
                },
                {
                    titel: "Wachtstapel beoordeling na zitting (werkbak 1)",
                    beschrijving: "Zaken die wachten op beoordeling na een zitting.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "pageSize": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "datumAangemaaktVanaf": "2025-07-14T04:00:00.000Z", "datumAangemaaktTotEnMet": "2026-01-01T02:00:00.000Z", "beroepActief": "true", "beroeptype": "OVJ", "beroepIndicatiesInclusief": "HOREN", "beroepIndicatiesExclusief": "HUUR", "size": "25", "hoorverzoek.hoorfase": "WACHTSTAPEL_BEOORDELING_NA_ZITTING" }
                },
                {
                    titel: "Wachtstapel beoordeling na zitting (werkbak 2)",
                    beschrijving: "Historische zaken die wachten op beoordeling na een zitting.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "pageSize": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "datumAangemaaktVanaf": "1990-01-01T01:00:00.000Z", "datumAangemaaktTotEnMet": "2025-07-13T02:00:00.000Z", "beroepActief": "true", "beroeptype": "OVJ", "beroepIndicatiesInclusief": "HOREN", "beroepIndicatiesExclusief": "HUUR", "size": "25", "hoorverzoek.hoorfase": "WACHTSTAPEL_BEOORDELING_NA_ZITTING", "hoorverzoek.datumtijdHoorzittingTotEnMet": "2025-09-10T23:59", "hoorverzoek.datumtijdHoorzittingVanaf": "1990-01-01T00:00", "feitcodegroepen": "Verkeersborden" }
                },
                {
                    titel: "Overige notificaties",
                    beschrijving: "Zaken met openstaande notificaties die niet onder een andere categorie vallen.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "pageSize": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "datumAangemaaktVanaf": "2025-07-14T04:00:00.000Z", "datumAangemaaktTotEnMet": "2026-01-01T02:00:00.000Z", "beroepActief": "true", "beroeptype": "OVJ", "beroepIndicatiesExclusief": "HUUR", "size": "25", "beroepIndicatiesInclusief": "HOREN", "openNotificaties": "true", "feitcodegroepen": "Verkeersborden" }
                },
                {
                    titel: "Geen eigenaar",
                    beschrijving: "Zaken die nog niet zijn toegewezen aan een behandelaar.",
                    isNietPersoonlijk: true, // Speciale markering om 'eigenaar' niet toe te voegen
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "pageSize": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "datumAangemaaktVanaf": "2025-07-14T02:00:00.000Z", "datumAangemaaktTotEnMet": "2026-01-01T01:00:00.000Z", "beroepActief": "true", "beroeptype": "OVJ", "beroepIndicatiesExclusief": "HOREN", "beroepIndicatiesExclusief": "HUUR", "nietToegeeigend": "true", "size": "25", "feitcodegroepen": "Verkeersborden" }
                },
                {
                    titel: "Notificaties",
                    beschrijving: "Alle persoonlijke zaken met een openstaande notificatie.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "pageSize": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "datumAangemaaktVanaf": "2025-07-14T02:00:00.000Z", "datumAangemaaktTotEnMet": "2026-01-01T01:00:00.000Z", "beroepActief": "true", "beroeptype": "OVJ", "beroepIndicatiesExclusief": "HOREN", "beroepIndicatiesExclusief": "HUUR", "size": "25", "openNotificaties": "true", "feitcodegroepen": "Verkeersborden" }
                },
                {
                    titel: "Zaken zonder wachtstand",
                    beschrijving: "Actieve zaken die geen wachtstand hebben.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "pageSize": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "datumAangemaaktVanaf": "2025-07-14T04:00:00.000Z", "datumAangemaaktTotEnMet": "2026-01-01T02:00:00.000Z", "beroepActief": "true", "beroeptype": "OVJ", "beroepIndicatiesExclusief": "HOREN", "beroepIndicatiesExclusief": "HUUR", "size": "25", "geenWachtstand": "true", "feitcodegroepen": "Verkeersborden" }
                }
            ]
        }
    },
    "Zittingen": {
        "Hoorzittingen Vandaag": {
            isWerkbak: false,
            links: [
                {
                    titel: "Mijn Zittingen Vandaag",
                    beschrijving: "Opent een overzicht van alle actieve hoorzittingen die voor vandaag gepland staan en aan u zijn toegewezen.",
                    basisUrl: "https://ketenportaal.cjib.eminjenv.nl/cjib/ketenportaal/maps/zittingen/raadplegen-hoorzittingen",
                    vasteParameters: {
                        "beroeptype": "OVJ",
                        "beroepActief": "true",
                        "openWachtstand": "HOREN",
                        "stateBeslissen": "true",
                        "page": "0",
                        "size": "10",
                        "sort": "hoorverzoek.datumtijdHoorzitting,asc",
                        "pageSize": "25"
                    },
                    isZittingenLink: true // Custom flag for specific logic
                },
                {
                    titel: "Zittingen voor Eigenaar",
                    beschrijving: "Zoek zittingen voor een specifieke eigenaar door de naam in te vullen.",
                    basisUrl: "https://ketenportaal.cjib.eminjenv.nl/cjib/ketenportaal/maps/zittingen/raadplegen-hoorzittingen",
                    vasteParameters: {
                        "beroeptype": "OVJ",
                        "beroepActief": "true",
                        "openWachtstand": "HOREN",
                        "stateBeslissen": "true",
                        "page": "0",
                        "size": "10",
                        "sort": "hoorverzoek.datumtijdHoorzitting,asc",
                        "pageSize": "25"
                    },
                    isCustomEigenaarLink: true // Custom flag voor eigenaar input
                },
                {
                    titel: "Zittingen voor Datumbereik",
                    beschrijving: "Zoek zittingen binnen een specifiek datumbereik door start- en einddatum/tijd in te vullen.",
                    basisUrl: "https://ketenportaal.cjib.eminjenv.nl/cjib/ketenportaal/maps/zittingen/raadplegen-hoorzittingen",
                    vasteParameters: {
                        "beroeptype": "OVJ",
                        "beroepActief": "true",
                        "openWachtstand": "HOREN",
                        "stateBeslissen": "true",
                        "page": "0",
                        "size": "10",
                        "sort": "hoorverzoek.datumtijdHoorzitting,asc",
                        "pageSize": "25"
                    },
                    isCustomDateRangeLink: true // Custom flag voor datum input
                }
            ]
        }
    }
};