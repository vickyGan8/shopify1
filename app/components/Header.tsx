import {useState} from 'react';
import {NavLink} from 'react-router';
import {Menu, X} from 'lucide-react';
import {BRAND, NAV_ITEMS} from '~/lib/constants';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="header">
        <NavLink to="/" className="header-logo" end>
          {BRAND.name}
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="header-menu-desktop" role="navigation">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({isActive}) =>
                `header-menu-item${isActive ? ' !text-[#2C5F8A] !border-b-[#EAAA00]' : ''}`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <div className="header-ctas">
          <NavLink to="/contact" className="btn btn-accent" style={{padding: '0.5rem 1.25rem', fontSize: '0.875rem'}}>
            Request Quote
          </NavLink>
          <button
            className="header-menu-mobile-toggle reset"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {mobileOpen && (
        <div className="overlay expanded">
          <button
            className="close-outside"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          />
          <aside>
            <header>
              <strong style={{color: '#2C5F8A', fontSize: '1.25rem'}}>{BRAND.name}</strong>
              <button className="close" onClick={() => setMobileOpen(false)}>
                <X size={24} />
              </button>
            </header>
            <nav className="header-menu-mobile" role="navigation">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({isActive}) =>
                    `header-menu-item text-lg${isActive ? ' !text-[#2C5F8A]' : ''}`
                  }
                >
                  {item.title}
                </NavLink>
              ))}
              <NavLink
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn btn-accent"
                style={{marginTop: '0.5rem', textAlign: 'center'}}
              >
                Request Quote
              </NavLink>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
