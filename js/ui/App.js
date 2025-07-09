import { secties, hoorverzoekHoorfaseOpties } from '../config/links.js';
import { bouwLink } from '../services/linkService.js';
import { getCurrentUserEmail } from '../services/spService.js';

const h = React.createElement;

// Simple SVG Icon for the button
const FolderIcon = () => h('svg', { 
    className: 'knop-icoon', 
    xmlns: 'http://www.w3.org/2000/svg', 
    viewBox: '0 0 24 24', 
    fill: 'currentColor' 
}, 
    h('path', { d: 'M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z' })
);

function App() {
    const [email, setEmail] = React.useState('');
    const [pagina, setPagina] = React.useState(0);
    const [aantal, setAantal] = React.useState(25);
    const [alleenOpen, setAlleenOpen] = React.useState(true);
    const [geselecteerdeHoorfase, setGeselecteerdeHoorfase] = React.useState('');
    
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
        const dynamischeParams = {
            page: pagina,
            size: aantal
        };

        // Add user email for links that require it
        if (linkConfig.requiresUserEmail) {
            if (email) {
                const paramName = linkConfig.userEmailParameter || 'eigenaar';
                dynamischeParams[paramName] = email;
            } else {
                console.warn('User email not yet loaded for link that requires it:', linkConfig.titel);
            }
        }

        if (alleenOpen && linkConfig.basisUrl === "https://ketenportaal.cjib.eminjenv.nl/cjib/ketenportaal/maps/beroepen") {
            dynamischeParams.beroepActief = 'True';
        }

        if (geselecteerdeHoorfase) {
            dynamischeParams['hoorverzoek.hoorfase'] = geselecteerdeHoorfase;
        }

        // Handle dynamic dates
        const vandaag = new Date();
        if (linkConfig.dynamischeDatumTotVandaag) {
            dynamischeParams['hoorverzoek.datumtijdHoorzittingTotEnMet'] = `${formatDate(vandaag)}T09:00`;
        }
        if (linkConfig.dynamischeDatumVandaag) {
            dynamischeParams['hoorverzoek.datumtijdHoorzittingVanaf'] = `${formatDate(vandaag)}T09:00`;
            dynamischeParams['hoorverzoek.datumtijdHoorzittingTotEnMet'] = `${formatDate(vandaag)}T09:00`;
        }
        if (linkConfig.dynamischeDatumVandaagTotTweeJaar) {
            const tweeJaarLater = new Date();
            tweeJaarLater.setFullYear(vandaag.getFullYear() + 2);
            dynamischeParams['hoorverzoek.datumtijdHoorzittingVanaf'] = `${formatDate(vandaag)}T09:00`;
            dynamischeParams['hoorverzoek.datumtijdHoorzittingTotEnMet'] = `${formatDate(tweeJaarLater)}T09:00`;
        }

        const volledigeLink = bouwLink(linkConfig.basisUrl, { ...linkConfig.vasteParameters, ...dynamischeParams });
        window.open(volledigeLink, '_blank');
    };

    return h('div', null,
        h('h1', { className: 'titel' }, 'MAPS Snelkoppelingen'),
        h('div', { className: 'instellingen-container' },
            h('div', { className: 'instelling' },
                h('label', { htmlFor: 'pagina-input' }, 'Pagina:'),
                h('input', { 
                    type: 'number', 
                    id: 'pagina-input', 
                    value: pagina, 
                    onChange: (e) => setPagina(parseInt(e.target.value, 10)),
                    min: 0
                })
            ),
            h('div', { className: 'instelling' },
                h('label', { htmlFor: 'aantal-input' }, 'Resultaten per pagina:'),
                h('select', { 
                    id: 'aantal-input', 
                    value: aantal, 
                    onChange: (e) => setAantal(parseInt(e.target.value, 10))
                },
                    h('option', { value: 25 }, '25'),
                    h('option', { value: 50 }, '50'),
                    h('option', { value: 100 }, '100'),
                    h('option', { value: 200 }, '200')
                )
            ),
            h('div', { className: 'instelling' },
                h('label', { htmlFor: 'hoorfase-select' }, 'Hoorfase:'),
                h('select', { 
                    id: 'hoorfase-select', 
                    value: geselecteerdeHoorfase, 
                    onChange: (e) => setGeselecteerdeHoorfase(e.target.value)
                },
                    hoorverzoekHoorfaseOpties.map(optie => 
                        h('option', { key: optie.waarde, value: optie.waarde }, optie.tekst)
                    )
                )
            )
        ),
        Object.keys(secties).map(sectieNaam => 
            h('div', { key: sectieNaam, className: 'sectie' },
                h('h2', { className: 'sectie-titel' }, sectieNaam),
                h('div', { className: 'knoppen-container' },
                    secties[sectieNaam].map((link, index) =>
                        h('div', { 
                            key: index, 
                            className: 'knop',
                            onClick: () => openLink(link)
                        }, 
                            h('div', { className: 'knop-header' },
                                h(FolderIcon),
                                h('h3', null, link.titel)
                            ),
                            h('p', null, link.beschrijving),
                            link.basisUrl === "https://ketenportaal.cjib.eminjenv.nl/cjib/ketenportaal/maps/beroepen" &&
                            h('div', { 
                                className: 'toggle-container',
                                onClick: (e) => e.stopPropagation() // Prevent click from bubbling to the parent
                            },
                                h('span', { className: 'toggle-label' }, alleenOpen ? 'Open' : 'Alle'),
                                h('label', { className: 'switch' },
                                    h('input', { 
                                        type: 'checkbox', 
                                        checked: alleenOpen, 
                                        onChange: () => setAlleenOpen(!alleenOpen) // State change is handled here
                                    }),
                                    h('span', { className: 'slider' })
                                )
                            )
                        )
                    )
                )
            )
        )
    );
}

export default App;


