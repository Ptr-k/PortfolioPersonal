import '../css/Head.css'

/*
  Cabecera de la app con navegación y botón para alternar el tema
  Props:
  - onNavigate(ruta): función para cambiar de ruta (hash router)
  - theme: 'dark' | 'light' para mostrar el icono adecuado
  - onToggleTheme(): alterna entre tema claro/oscuro
*/
function Head({ onNavigate, theme = 'dark', onToggleTheme }) {
  // Maneja los clics de los enlaces evitando la navegación por defecto
  const handleClick = (e, target) => {
    e.preventDefault()
    if (typeof onNavigate === 'function') onNavigate(target)
  }

  return (
      <div className="head">
          {/* Navegación principal de la app */}
          <nav className="head-nav" aria-label="Navegación principal">
              <p><a href="#/inicio" onClick={(e) => handleClick(e, 'inicio')}>Inicio</a></p>
              <p><a href="#/sobre-mi" onClick={(e) => handleClick(e, 'sobre-mi')}>Sobre mi</a></p>
              <p><a href="#/habilidades" onClick={(e) => handleClick(e, 'habilidades')}>Habilidades</a></p>
              <p><a href="#/contacto" onClick={(e) => handleClick(e, 'contacto')}>Contacto</a></p>
          </nav>
          {/* Botón que alterna entre tema claro y oscuro */}
          <button
              className="theme-toggle"
              type="button"
              onClick={onToggleTheme}
              aria-label="Cambiar tema"
              title={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
          >
              {theme === 'dark' ? '🌙' : '☀️'}
          </button>
      </div>
  )
}

export default Head
