import { tabbladen, gemeenteCodes } from '../config/links.js';
import { bouwLink } from '../services/linkService.js';
import { getCurrentUserEmail } from '../services/spService.js';

const h = React.createElement;

// SVG Icoon voor de standaard knoppen
const FolderIcon = () => h('svg', {
    className: 'knop-icoon',
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'currentColor'
},
    h('path', { d: 'M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z' })
);

// SVG Icoon voor de notitie-blokken
const InfoIcon = () => h('svg', {
    className: 'knop-icoon',
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'currentColor'
},
    h('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z' })
);

function App() {
    const [email, setEmail] = React.useState('');
    const [selecties, setSelecties] = React.useState({});
    const [actiefTab, setActiefTab] = React.useState(Object.keys(tabbladen)[0]); // Start met het eerste tabblad

    const handleSelectChange = (key, value) => {
        setSelecties(prev => ({ ...prev, [key]: value }));
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    React.useEffect(() => {
        async function haalEmailOp() {
            const userEmail = await getCurrentUserEmail();
            setEmail(userEmail);
        }
        haalEmailOp();
    }, []);

    const openLink = (linkConfig) => {
        let volledigeLink;
        let dynamischeParams = {};

        // Eigenaar toevoegen voor persoonlijke tabbladen, tenzij anders aangegeven
        if ((actiefTab === 'Eigen werkvoorraad' || actiefTab === 'Zittingen') && email && !linkConfig.isNietPersoonlijk) {
            dynamischeParams.eigenaar = email;
        }

        const vandaag = new Date();
        if (linkConfig.dynamischeDatumTotVandaag) {
            dynamischeParams['hoorverzoek.datumtijdHoorzittingVanaf'] = '1970-01-01T00:00';
            dynamischeParams['hoorverzoek.datumtijdHoorzittingTotEnMet'] = `${formatDate(vandaag)}T23:59`;
        }
        
        // Specifieke logica voor de nieuwe zittingen-knop
        if (linkConfig.isZittingenLink) {
            const vandaagStr = formatDate(vandaag);
            dynamischeParams['hoorverzoek.datumtijdHoorzittingVanaf'] = `${vandaagStr}T09:00`;
            dynamischeParams['hoorverzoek.datumtijdHoorzittingTotEnMet'] = `${vandaagStr}T17:00`;
        }

        volledigeLink = bouwLink(linkConfig.basisUrl, { ...linkConfig.vasteParameters, ...dynamischeParams });
        window.open(volledigeLink, '_blank');
    };
   
    const openGemeenteLink = (linkConfig, selectieKey) => {
        const geselecteerdeGemeente = selecties[selectieKey];
        if (!geselecteerdeGemeente) {
            alert("Selecteer eerst een gemeente.");
            return;
        }
        const gemeenteCode = gemeenteCodes[geselecteerdeGemeente];
        const volledigeLink = `${linkConfig.basisUrl}&codePleeggemeente=${gemeenteCode}`;
        window.open(volledigeLink, '_blank');
    };

    const renderSectie = (sectieNaam, sectieConfig) => {
        if (sectieConfig.isWerkbak) {
            // Render de "WERKBAKKEN" grid-layout
            return h('div', { key: sectieNaam, className: 'werkbak-sectie' },
                h('h2', { className: 'sectie-titel' }, sectieNaam),
                h('h3', { className: 'sectie-subtitel'}, '1e beoordeling'),
                h('div', { className: 'werkbak-grid' },
                    Object.entries(sectieConfig.groepen).map(([groepNaam, items]) =>
                        h('div', { key: groepNaam, className: 'werkbak-groep' },
                            h('h4', { className: 'groep-titel' }, groepNaam),
                            items.map((item, index) => {
                                const key = `${sectieNaam}-${groepNaam}-${index}`;
                                if (item.type === 'gemeente') {
                                    return h('div', { key: key, className: 'werkbak-item' },
                                        h('select', {
                                            className: 'werkbak-select',
                                            value: selecties[key] || '',
                                            onChange: (e) => handleSelectChange(key, e.target.value)
                                        },
                                            h('option', { value: '' }, 'Kies gemeente...'),
                                            item.opties.map(optie => h('option', { key: optie, value: optie }, optie))
                                        ),
                                        h('button', { className: 'werkbak-knop', onClick: () => openGemeenteLink(item, key) }, 'Go')
                                    );
                                }
                                return h('button', { key: key, className: 'werkbak-knop', onClick: () => openLink(item) }, item.titel);
                            })
                        )
                    )
                )
            );
        } else {
            // Render de "Persoonlijke werkbakken" als een uitklapbaar paneel
            const isTimeline = sectieConfig.isTimeline || false;
            let stepCounter = 1;
            return h('details', { key: sectieNaam, className: 'sectie-details', open: true },
                h('summary', { className: 'sectie-titel' }, sectieNaam),
                h('div', { className: `knoppen-container ${isTimeline ? 'timeline' : ''}` },
                    sectieConfig.links.map((link, index) => {
                        if (link.type === 'note' && isTimeline) {
                            return h('div', { key: index, className: 'knop knop-notitie' },
                                h('div', { className: 'knop-header' },
                                    h(InfoIcon),
                                    h('h3', null, link.titel)
                                ),
                                h('p', null, link.beschrijving)
                            );
                        } else {
                            const titel = isTimeline ? `${stepCounter}. ${link.titel}` : link.titel;
                            const button = h('div', { key: index, className: 'knop', onClick: () => openLink(link) },
                                h('div', { className: 'knop-header' },
                                    h(FolderIcon),
                                    h('h3', null, titel)
                                ),
                                h('p', null, link.beschrijving)
                            );
                            if(isTimeline) stepCounter++;
                            return button;
                        }
                    })
                )
            );
        }
    };

    return h('div', null,
        h('h1', { className: 'titel' }, 'MAPS Snelkoppelingen'),
        h('div', { className: 'tab-container' },
            Object.keys(tabbladen).map(tabNaam =>
                h('button', {
                    key: tabNaam,
                    className: `tab-knop ${actiefTab === tabNaam ? 'actief' : ''}`,
                    onClick: () => setActiefTab(tabNaam)
                }, tabNaam)
            )
        ),
        !email
            ? h('p', { className: 'laad-bericht' }, 'E-mailadres ophalen...')
            : h('div', { className: 'tab-inhoud' },
                Object.entries(tabbladen[actiefTab]).map(([sectieNaam, sectieConfig]) =>
                    renderSectie(sectieNaam, sectieConfig)
                )
            )
    );
}

export default App;
