// Definitie van basis URL's om herhaling te voorkomen
const basisUrlGemeente = "https://ketenportaal.cjib.eminjenv.nl/cjib/ketenportaal/maps/beroepen?page=1&sort=audit.datumAangemaakt,asc&beroepActief=true&beroeptype=OVJ&beroepIndicatiesInclusief=HOREN&beroepIndicatiesInclusief=PROFESSIONEEL_GEMACHTIGDE&nietToegeeigend=true&feitcodegroepen=Verkeersborden&beroepIndicatiesExclusief=HUUR&size=25";
const basisUrlBeoordelingZonderEigenaar = "https://ketenportaal.cjib.eminjenv.nl/cjib/ketenportaal/maps/beroepen?page=1&sort=audit.datumAangemaakt,asc&beroepActief=true&beroeptype=OVJ&beroepIndicatiesInclusief=HOREN&beroepIndicatiesInclusief=PROFESSIONEEL_GEMACHTIGDE&nietToegeeigend=true&feitcodegroepen=Verkeersborden&beroepIndicatiesExclusief=HUUR&size=25&stateBeslissen=false";
const basisUrlBeoordelingVoorZitting = "https://ketenportaal.cjib.eminjenv.nl/cjib/ketenportaal/maps/beroepen?page=1&sort=audit.datumAangemaakt,asc&beroepActief=true&beroeptype=OVJ&beroepIndicatiesInclusief=HOREN&beroepIndicatiesInclusief=PROFESSIONEEL_GEMACHTIGDE&nietToegeeigend=false&feitcodegroepen=Verkeersborden&beroepIndicatiesExclusief=HUUR&size=25&stateBeslissen=false&hoorverzoek.hoorfase=WACHTSTAPEL_BEOORDELING_VOOR_ZITTING";
const basisUrlBurgerZonderEigenaar = "https://ketenportaal.cjib.eminjenv.nl/cjib/ketenportaal/maps/beroepen?page=1&size=25&sort=registratiedatum,asc&beroepActief=true&beroeptype=OVJ&beroepIndicatiesInclusief=HOREN&beroepIndicatiesExclusief=HUUR&beroepIndicatiesExclusief=PROFESSIONEEL_GEMACHTIGDE&nietToegeeigend=true&feitcodegroepen=Verkeersborden";
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
        "Persoonlijke werkbakken - OvJ": {
            isWerkbak: false, // Gebruikt de 'details' view
            links: [
                {
                    titel: "Actieve zaken met een notificatie",
                    beschrijving: "Opent een link naar actieve Ovj-zaken met een notificatie.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "size": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "beroepActief": "true", "beroeptype": "OVJ", "openNotificaties": "true" }
                },
                {
                    titel: "Actieve zaken zonder wachtstand",
                    beschrijving: "Opent een link naar actieve Ovj-zaken zonder wachtstand (uitgezonderd zaken die vastgehouden moeten worden).",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "size": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "beroepActief": "true", "beroeptype": "OVJ", "geenWachtstand": "true" }
                },
                {
                    titel: "Actieve zaken met de fase 'Retour verzuim horen' met één wachtstand",
                    beschrijving: "Opent een link naar actieve Ovj-zaken in de fase 'Retour verzuim horen'.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "size": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "beroepActief": "true", "beroeptype": "OVJ", "hoorverzoek.hoorfase": "RETOUR_VERZUIM_HOREN", "beroepIndicatiesInclusief": "HOREN" }
                },
                {
                    titel: "Actieve zaken op de fase hoorzitting/beoordeling na de zitting na de zittingsdatum",
                    beschrijving: "Zaken die wachten op beoordeling na de zitting, waarbij de zittingsdatum is gepasseerd.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "size": "25", "beroepActief": "true", "beroeptype": "OVJ", "hoorverzoek.hoorfase": "WACHTSTAPEL_BEOORDELING_NA_ZITTING", "sort": "hoorverzoek.datumtijdHoorzitting,asc" },
                    dynamischeDatumTotVandaag: true
                },
                {
                    titel: "Actieve zaken op de fase 'Vasthouden'",
                    beschrijving: "Zaken die in de wacht zijn gezet. Controleer minimaal elke twee weken.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "size": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "beroepActief": "true", "beroeptype": "OVJ", "hoorverzoek.hoorfase": "VASTHOUDEN" }
                }
            ]
        },
        "Persoonlijke werkbakken - Kanton": {
            isWerkbak: false, // Gebruikt de 'details' view
            links: [
                {
                    titel: "Actieve zaken met een notificatie",
                    beschrijving: "Bekijk alle actieve Kanton zaken met een openstaande notificatie.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "size": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "beroepActief": "true", "beroeptype": "KANTON", "openNotificaties": "true" }
                },
                {
                    titel: "Actieve zaken zonder wachtstand",
                    beschrijving: "Actieve Kanton zaken zonder wachtstand.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "size": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "beroepActief": "true", "beroeptype": "KANTON", "geenWachtstand": "true" }
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
                    vasteParameters: { "page": "0", "pageSize": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "beroepActief": "true", "beroeptype": "OVJ", "beroepIndicatiesInclusief": "HOREN", "beroepIndicatiesExclusief": "HUUR", "size": "25", "hoorverzoek.hoorfase": "RETOUR_VERZUIM_HOREN", "openNotificaties": "true", "feitcodegroepen": "Verkeersborden" },
                    dynamischeDatumBereik: { vanaf: { maanden: -5 }, totEnMet: 'nextFriday' }
                },
                {
                    titel: "Retour verzuim horen (één wachtstand)",
                    beschrijving: "Zaken in 'Retour verzuim horen' met slechts één wachtstand.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "pageSize": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "beroepActief": "true", "beroeptype": "OVJ", "beroepIndicatiesInclusief": "HOREN", "beroepIndicatiesExclusief": "HUUR", "size": "25", "hoorverzoek.hoorfase": "RETOUR_VERZUIM_HOREN", "enigeWachtstand": "true", "feitcodegroepen": "Verkeersborden" },
                    dynamischeDatumBereik: { vanaf: { maanden: -5 }, totEnMet: 'nextFriday' }
                },
                {
                    titel: "Vasthouden",
                    beschrijving: "Zaken die in de wacht zijn gezet.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "pageSize": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "beroepActief": "true", "beroeptype": "OVJ", "beroepIndicatiesInclusief": "HOREN", "beroepIndicatiesExclusief": "HUUR", "size": "25", "hoorverzoek.hoorfase": "VASTHOUDEN", "feitcodegroepen": "Verkeersborden" },
                    dynamischeDatumBereik: { vanaf: { maanden: -5 }, totEnMet: { maanden: 10 } }
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
                    vasteParameters: { "page": "0", "pageSize": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "beroepActief": "true", "beroeptype": "OVJ", "beroepIndicatiesInclusief": "HOREN", "beroepIndicatiesExclusief": "HUUR", "size": "25", "hoorverzoek.hoorfase": "WACHTSTAPEL_BEOORDELING_NA_ZITTING" },
                    dynamischeDatumBereik: { vanaf: { maanden: -5 }, totEnMet: 'nextFriday' }
                },
                {
                    titel: "Wachtstapel beoordeling na zitting (werkbak 2)",
                    beschrijving: "Historische zaken die wachten op beoordeling na een zitting.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "pageSize": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "beroepActief": "true", "beroeptype": "OVJ", "beroepIndicatiesInclusief": "HOREN", "beroepIndicatiesExclusief": "HUUR", "size": "25", "hoorverzoek.hoorfase": "WACHTSTAPEL_BEOORDELING_NA_ZITTING", "feitcodegroepen": "Verkeersborden" },
                    dynamischeDatumBereik: { vanaf: 'historisch', totEnMet: { maanden: -5 } },
                    dynamischeHoorzittingBereik: { vanaf: 'historisch', totEnMet: 'nextFriday' }
                },
                {
                    titel: "Overige notificaties",
                    beschrijving: "Zaken met openstaande notificaties die niet onder een andere categorie vallen.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "pageSize": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "beroepActief": "true", "beroeptype": "OVJ", "beroepIndicatiesExclusief": "HUUR", "size": "25", "beroepIndicatiesInclusief": "HOREN", "openNotificaties": "true", "feitcodegroepen": "Verkeersborden" },
                    dynamischeDatumBereik: { vanaf: { maanden: -5 }, totEnMet: 'nextFriday' }
                },
                {
                    titel: "Geen eigenaar",
                    beschrijving: "Zaken die nog niet zijn toegewezen aan een behandelaar.",
                    isNietPersoonlijk: true, // Speciale markering om 'eigenaar' niet toe te voegen
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "pageSize": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "beroepActief": "true", "beroeptype": "OVJ", "beroepIndicatiesExclusief": "HOREN", "beroepIndicatiesExclusief": "HUUR", "nietToegeeigend": "true", "size": "25", "feitcodegroepen": "Verkeersborden" },
                    dynamischeDatumBereik: { vanaf: { maanden: -5 }, totEnMet: 'nextFriday' }
                },
                {
                    titel: "Notificaties",
                    beschrijving: "Alle persoonlijke zaken met een openstaande notificatie.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "pageSize": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "beroepActief": "true", "beroeptype": "OVJ", "beroepIndicatiesExclusief": "HOREN", "beroepIndicatiesExclusief": "HUUR", "size": "25", "openNotificaties": "true", "feitcodegroepen": "Verkeersborden" },
                    dynamischeDatumBereik: { vanaf: { maanden: -5 }, totEnMet: 'nextFriday' }
                },
                {
                    titel: "Zaken zonder wachtstand",
                    beschrijving: "Actieve zaken die geen wachtstand hebben.",
                    basisUrl: mapsBasisUrl,
                    vasteParameters: { "page": "0", "pageSize": "25", "sort": ["datumBeslistermijnDeadline,asc", "registratienummer,asc"], "beroepActief": "true", "beroeptype": "OVJ", "beroepIndicatiesExclusief": "HOREN", "beroepIndicatiesExclusief": "HUUR", "size": "25", "geenWachtstand": "true", "feitcodegroepen": "Verkeersborden" },
                    dynamischeDatumBereik: { vanaf: { maanden: -5 }, totEnMet: 'nextFriday' }
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