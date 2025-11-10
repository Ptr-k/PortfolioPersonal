import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

import './css/base.css'
import './css/layout.css'
import './css/skills.css'
import './css/contacto.css'
import './css/inicio.css'
import './css/about.css'

import App from './components/App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
