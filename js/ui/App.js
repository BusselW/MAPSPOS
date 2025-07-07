import { links, mapsBasisUrl } from '../config/links.js';
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

    React.useEffect(() => {
        async function haalEmailOp() {
            const userEmail = await getCurrentUserEmail();
            setEmail(userEmail);
        }
        haalEmailOp();
    }, []);

    const openLink = (vasteParams) => {
        const dynamischeParams = {
            page: pagina,
            size: aantal,
            eigenaar: email
        };

        if (alleenOpen) {
            dynamischeParams.beroepActief = 'True';
        }

        const volledigeLink = bouwLink(mapsBasisUrl, { ...vasteParams, ...dynamischeParams });
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
            )
        ),
        h('div', { className: 'knoppen-container' },
            links.map((link, index) =>
                h('div', { 
                    key: index, 
                    className: 'knop',
                    onClick: () => openLink(link.vasteParameters)
                }, 
                    h('div', { className: 'knop-header' },
                        h(FolderIcon),
                        h('h3', null, link.titel)
                    ),
                    h('p', null, link.beschrijving),
                    h('div', { className: 'toggle-container' },
                        h('span', { className: 'toggle-label' }, alleenOpen ? 'Open' : 'Alle'),
                        h('label', { className: 'switch' },
                            h('input', { 
                                type: 'checkbox', 
                                checked: alleenOpen, 
                                onChange: () => setAlleenOpen(!alleenOpen) 
                            }),
                            h('span', { className: 'slider' })
                        )
                    )
                )
            )
        )
    );
}

export default App;


