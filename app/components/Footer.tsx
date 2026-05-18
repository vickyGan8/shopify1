import {NavLink} from 'react-router';
import {BRAND, FOOTER} from '~/lib/constants';
import {Mail, Phone, MapPin} from 'lucide-react';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Company Info */}
        <div>
          <h4 style={{fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', color: '#FFFFFF'}}>
            {BRAND.name}
          </h4>
          <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '1.25rem'}}>
            {BRAND.description}
          </p>
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.625rem'}}>
            <a href={`mailto:${BRAND.email}`} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <Mail size={16} />
              {BRAND.email}
            </a>
            <a href={`tel:${BRAND.phone}`} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <Phone size={16} />
              {BRAND.phone}
            </a>
            <span style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem'}}>
              <MapPin size={16} />
              {BRAND.address}
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4>Quick Links</h4>
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
            {FOOTER.quickLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'}>
                {link.title}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Policies */}
        <div>
          <h4>Policies</h4>
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
            {FOOTER.policies.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.title}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h4>Certifications</h4>
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            {FOOTER.certifications.map((cert) => (
              <span key={cert} style={{color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem'}}>
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
        <span>Powered by Shopify</span>
      </div>
    </footer>
  );
}
