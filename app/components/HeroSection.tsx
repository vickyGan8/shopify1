import {Link} from 'react-router';
import {ArrowRight} from 'lucide-react';
import {BRAND} from '~/lib/constants';

export function HeroSection() {
  return (
    <section
      className="relative min-h-[85vh] flex items-center"
      style={{
        background: `linear-gradient(135deg, #002A41 0%, #2C5F8A 40%, #005A8A 100%)`,
      }}
    >
      {/* Subtle geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container relative z-10 py-20 lg:py-32">
        <div className="max-w-3xl">
          {/* Overline */}
          <p
            className="text-[#EAAA00] text-sm font-semibold uppercase tracking-[0.2em] mb-4"
            style={{letterSpacing: '0.2em'}}
          >
            Premium Watch Accessories Manufacturer
          </p>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
            Precision Crafted{' '}
            <span style={{color: '#EAAA00'}}>Watch Components</span>
            <br />
            for Global Brands
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-xl">
            {BRAND.tagline}. From premium watch bands to precision-engineered cases,
            we deliver manufacturing excellence to brands across 35+ countries.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link to="/products" className="btn btn-accent btn-lg">
              Explore Products
              <ArrowRight size={20} />
            </Link>
            <Link to="/contact" className="btn btn-outline-light btn-lg">
              Request Quote
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-white/15">
            <StatItem value="15+" label="Years Experience" />
            <StatItem value="35+" label="Countries Served" />
            <StatItem value="50M+" label="Units Shipped" />
            <StatItem value="500+" label="Skilled Workers" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({value, label}: {value: string; label: string}) {
  return (
    <div>
      <div className="text-2xl md:text-3xl font-bold text-white">{value}</div>
      <div className="text-sm text-white/50 mt-1">{label}</div>
    </div>
  );
}
