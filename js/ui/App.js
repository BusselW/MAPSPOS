import { links, mapsBasisUrl } from '../config/links.js';
import { bouwLink } from '../services/linkService.js';
import { getCurrentUserEmail } from '../services/spService.js';

const h = React.createElement;

function App() {
    const [email, setEmail] = React.useState('');
    const [pagina, setPagina] = React.useState(0);
    const [aantal, setAantal] = React.useState(25);

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
                    h('h3', null, link.titel),
                    h('p', null, link.beschrijving)
                )
            )
        )
    );
}

export default App;

