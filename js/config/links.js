export const mapsBasisUrl = "https://ketenportaal.cjib.eminjenv.nl/cjib/ketenportaal/maps/beroepen";
export const mapsZittingenBasisUrl = "https://ketenportaal.cjib.eminjenv.nl/cjib/ketenportaal/maps/zittingen/raadplegen-hoorzittingen";
export const mapsApiBeroepenFindUrl = "https://ketenportaal.cjib.eminjenv.nl/cjib/ketenportaal/api/maps-service/api/1.0/beroepen/find";

export const hoorverzoekHoorfaseOpties = [
    { waarde: "", tekst: "Alles" },
    { waarde: "HOORKLAAR", tekst: "Hoorklaar" },
    { waarde: "HOORZITTING", tekst: "Hoorzitting" },
    { waarde: "RETOUR_VERZUIM_HOREN", tekst: "Retour Verzuim Horen" },
    { waarde: "UITSTUREN_STUKKEN", tekst: "Uitsturen Stukken" },
    { waarde: "VASTHOUDEN", tekst: "Vasthouden" },
    { waarde: "WACHTSTAPEL_BEOORDELING_NA_ZITTING", tekst: "Wachtstapel Beoordeling Na Zitting" },
    { waarde: "WACHTSTAPEL_BEOORDELING_VOOR_ZITTING", tekst: "Wachtstapel Beoordeling Voor Zitting" },
    { waarde: "WACHT_OP_PKV_VERZOEK", tekst: "Wacht op PKV Verzoek" }
];

export const secties = {
    "Mijn Zaken": [
        {
            titel: "Zaken op naam",
            beschrijving: "Bekijk alle beroepen die op jouw naam staan.",
            basisUrl: mapsBasisUrl,
            vasteParameters: {
                "sort": "datumBeslistermijnDeadline,asc",
                "registratienummer": "asc"
            }
        },
        {
            titel: "Zaken zonder open wachtstanden",
            beschrijving: "Bekijk alle beroepen zonder open wachtstanden.",
            basisUrl: mapsBasisUrl,
            vasteParameters: {
                "beroeptype": "OVJ",
                "geenWachtstand": "true"
            }
        },
        {
            titel: "Zaken met open notificaties",
            beschrijving: "Toon alle beroepen met open notificaties.",
            basisUrl: mapsBasisUrl,
            vasteParameters: {
                "beroeptype": "OVJ",
                "openNotificaties": "true"
            }
        },
        {
            titel: "Actieve beroepen > 14 dagen buiten beslistermijn",
            beschrijving: "Toon actieve beroepen zonder wachtstand die langer dan 14 dagen buiten de beslistermijn zijn.",
            basisUrl: mapsBasisUrl,
            vasteParameters: {
                "beroeptype": "OVJ",
                "datumUitersteBeslissingVanaf": "1970-01-01",
                "datumUitersteBeslissingTotEnMet": "2025-07-21",
                "geenWachtstand": "true"
            }
        },
        {
            titel: "Toekomstige zittingen",
            beschrijving: "Bekijk alle toekomstige zittingen.",
            basisUrl: mapsBasisUrl,
            vasteParameters: {
                "beroeptype": "OVJ",
                "openWachtstand": "HOREN",
                "beroepIndicatiesInclusief": "HOREN",
                "hoorverzoek.datumtijdHoorzittingVanaf": "2025-07-07T20:25",
                "hoorverzoek.datumtijdHoorzittingTotEnMet": "2030-07-07T20:25"
            }
        }
    ],
    "Zittingen": [
        {
            titel: "Zittingen tot vandaag",
            beschrijving: "Toon alle zittingen tot en met vandaag.",
            basisUrl: mapsZittingenBasisUrl,
            vasteParameters: {
                "hoorverzoek.datumtijdHoorzittingVanaf": "1990-01-01T09:00",
                "page": "1",
                "size": "10",
                "sort": "hoorverzoek.datumtijdHoorzitting,asc",
                "beroeptype": "OVJ",
                "beroepActief": "true",
                "openWachtstand": "HOREN",
                "stateBeslissen": "true"
            },
            dynamischeDatumTotVandaag: true
        },
        {
            titel: "Zittingen vandaag",
            beschrijving: "Toon alle zittingen van vandaag.",
            basisUrl: mapsZittingenBasisUrl,
            vasteParameters: {
                "page": "1",
                "size": "10",
                "sort": "hoorverzoek.datumtijdHoorzitting,asc",
                "beroeptype": "OVJ",
                "beroepActief": "true",
                "openWachtstand": "HOREN",
                "stateBeslissen": "true"
            },
            dynamischeDatumVandaag: true
        },
        {
            titel: "Toekomstige zittingen",
            beschrijving: "Toon alle toekomstige zittingen vanaf vandaag tot 2 jaar vooruit.",
            basisUrl: mapsZittingenBasisUrl,
            vasteParameters: {
                "page": "1",
                "size": "10",
                "sort": "hoorverzoek.datumtijdHoorzitting,asc",
                "beroeptype": "OVJ",
                "beroepActief": "true",
                "openWachtstand": "HOREN",
                "stateBeslissen": "true"
            },
            dynamischeDatumVandaagTotTweeJaar: true
        }
    ]
};
