import {useCallback, useEffect, useMemo, useState} from 'react'
import Head from './Head.jsx'
import crying from '../assets/usagi_crying.png'
import glasses from '../assets/usagi_glasses.png'
import thumb from '../assets/usagi_thumb.png'
import usagi from '../assets/usagi.png'
import java from '../../public/java.svg'
import javascript from '../../public/javascript.svg'
import react from '../../public/react.svg'
import kotlin from '../../public/kotlin.svg'
import ubuntu from '../../public/ubuntu.svg'
import html from '../../public/html.svg'
import sql from '../../public/sql.svg'
import css from '../../public/css.svg'
import atos from '../../public/atos.png'
import spain from '../../public/spain.svg'
import english from '../../public/english.svg'

/*
  Componentes de página (rutas): Inicio, SobreMi, Habilidades, Contacto
*/
function Inicio() {
    return <div className="inicio">
        <div id="txt">
            <h1 id="name">Patricia Camargo</h1>
            <p>Estudiante de desarrollo web, actualmente en prácticas.</p>
        </div>
        <div id="img">
            <img src={usagi} alt="usagi"/>
        </div>
    </div>
}

function SobreMi() {
    return <div className="about">
        <div className="texto">
            <div></div>
            <p>Soy una estudiante procedente de España, donde actualmente estoy haciendo el grado superior de desarrollo de aplicaciones web.
            Trato de estar aprendiendo constantemente y me motivo por eso. Soy alguien comprensible y paciente.</p>
            <p>Me intereso por todo lo que tiene que ver con el diseño, aunque me especializo tanto en front-end como back-end.</p>
            <p>En un futuro espero poder expandir mis conocimientos al campo de la ciberseguridad, ya que es un tema que ha captado
            mi atención desde hace ya tiempo.</p>
            <div className="experiencia">
                <div className="exp-card">
                    <img src={atos} width="100px"/>
                    <p id="date">19/03/2025 – 30/05/2025</p>
                    <p>Desarrollo back-end. Especialización en SpringBoot</p>
                </div>
            </div>
        </div>
        <div className="img">
            <img src={thumb} alt="usagi_thumb" width="200px"/>
        </div>
    </div>
}

function Habilidades() {
    return <div className="skills">
        <div className="skills-card">
            <h2>Skills</h2>
            <table className="skills-table">
                <tbody>
                <tr>
                    <td className="skill-label">Lenguajes</td>
                    <td className="skill-items">
                        <img src={java} alt="Java" className="skill-icon"/>
                        <img src={kotlin} alt="kotlin" className="skill-icon"/>
                        <img src={sql} alt="kotlin" className="skill-icon"/>
                    </td>
                </tr>
                <tr>
                    <td className="skill-label">Web Dev</td>
                    <td className="skill-items">
                        {/* Corrección de accesibilidad: alt correcto para JavaScript */}
                        <img src={javascript} alt="JavaScript" className="skill-icon"/>
                        <img src={react} alt="React" className="skill-icon"/>
                        <img src={css} alt="tailwind" className="skill-icon"/>
                        <img src={html} alt="tailwind" className="skill-icon"/>
                    </td>
                </tr>
                <tr>
                    <td className="skill-label">Otras habilidades</td>
                    <td className="skill-items">
                        <img src={ubuntu} alt="ubuntu_linux" className="skill-icon"/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div className="skills-card">
            <h2>Idiomas</h2>
            <table className="skills-table">
                <tbody>
                <tr>
                    <td className="skill-label">Nativo</td>
                    <td className="skill-items">
                        <img src={spain} alt="spain" className="skill-icon"/>
                    </td>
                </tr>
                <tr>
                    <td className="skill-label">B2</td>
                    <td className="skill-items">
                        <img src={english} alt="spain" className="skill-icon"/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div id="img">
            <img src={glasses} alt="usagi_glasses" width="200px"/>
        </div>
    </div>
}

function Contacto() {
    return <div className="contacto">
        <p>correo@falso.com</p>
        <p>+34 666 666 666</p>
        <img src={crying} alt="usagi_crying" width="150px"/>
    </div>
}

// Rutas por hash para el índice a arriba
const ROUTES = {
    inicio: 'inicio',
    sobre: 'sobre-mi',
    habilidades: 'habilidades',
    contacto: 'contacto',
}

const DEFAULT_ROUTE = ROUTES.inicio
const TRANSITION_DURATION = 300 // ms

function conseguirRuta() {
    const hash = window.location.hash.replace(/^#\/?/, '')
    if (!hash) return DEFAULT_ROUTE
    const clean = hash.split('?')[0].split('#')[0]
    const known = Object.values(ROUTES)
    return known.includes(clean) ? clean : DEFAULT_ROUTE
}

export default function App() {
    // Estado de la ruta actual (para decidir qué componente mostrar)
    const [route, setRoute] = useState(DEFAULT_ROUTE)
    // Esto es para la animación de FadeOut
    const [isFadingOut, setIsFadingOut] = useState(false)
    // Cambia el tema de la página
    const [theme, setTheme] = useState('dark')

    // Lee tema guardado o preferencia del sistema
    useEffect(() => {
        const saved = localStorage.getItem('theme')
        if (saved === 'light' || saved === 'dark') {
            setTheme(saved)
        } else {
            const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
            setTheme(prefersLight ? 'light' : 'dark')
        }
    }, [])

    // Aplicar al <html data-theme> y todo el rollo del LocalStorage
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    // Al iniciar la app: forzar la ruta por defecto (inicio)
    useEffect(() => {
        const desiredHash = `/${DEFAULT_ROUTE}`
        if (window.location.hash !== `#${desiredHash}`) {
            window.location.hash = desiredHash
        }
        setRoute(DEFAULT_ROUTE)
    }, [])

    // Suscribirnos a cambios de hash para navegar
    useEffect(() => {
        const onHashChange = () => {
            setRoute(conseguirRuta())
            setIsFadingOut(false)
        }
        window.addEventListener('hashchange', onHashChange)
        return () => window.removeEventListener('hashchange', onHashChange)
    }, [])

    // Navegación programática con pequeña animación de fade
    const navigate = useCallback((target) => {
        const targetRoute = typeof target === 'string' ? target : DEFAULT_ROUTE
        if (targetRoute === route) return
        setIsFadingOut(true)
        window.setTimeout(() => {
            window.location.hash = `/${targetRoute}`
        }, TRANSITION_DURATION)
    }, [route])

    // Cambiar tema visual
    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
    }, [])

    // Elegir qué componente de página mostrar según la ruta
    const Page = useMemo(() => {
        switch (route) {
            case ROUTES.inicio:
                return <Inicio/>
            case ROUTES.sobre:
                return <SobreMi/>
            case ROUTES.habilidades:
                return <Habilidades/>
            case ROUTES.contacto:
                return <Contacto/>
            default:
                return <Inicio/>
        }
    }, [route])

    return (
        <div className="app">
            {/* Header con navegación y botón de tema */}
            <Head onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme}/>
            {/* Contenedor de página + animación de entrada/salida */}
            <div className={`page fade-container ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
                {Page}
            </div>
        </div>
    )
}
