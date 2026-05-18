import {Link} from 'react-router';
import {ArrowRight} from 'lucide-react';
import {Container} from '~/components/Container';
import {SectionHeading} from '~/components/SectionHeading';

const CATEGORIES = [
  {
    title: 'Watch Bands',
    subtitle: 'Premium Straps & Bracelets',
    description: 'Leather, stainless steel, silicone, nylon, and exotic materials',
    to: '/collections/watch-bands',
    gradient: 'linear-gradient(135deg, #2C5F8A, #1A1A2E)',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="16" width="40" height="16" rx="4" stroke="white" strokeWidth="1.5" opacity="0.5" />
        <rect x="12" y="12" width="24" height="24" rx="6" stroke="white" strokeWidth="1.5" opacity="0.8" />
        <circle cx="24" cy="24" r="4" stroke="white" strokeWidth="1.5" opacity="0.6" />
      </svg>
    ),
  },
  {
    title: 'Watch Cases',
    subtitle: 'Precision-Engineered Housings',
    description: 'Stainless steel, titanium, bronze, and custom alloys',
    to: '/collections/watch-cases',
    gradient: 'linear-gradient(135deg, #005A8A, #001520)',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="16" stroke="white" strokeWidth="1.5" opacity="0.8" />
        <circle cx="24" cy="24" r="10" stroke="white" strokeWidth="1.5" opacity="0.5" />
        <circle cx="24" cy="24" r="3" fill="white" opacity="0.3" />
      </svg>
    ),
  },
];

export function CategoryShowcase() {
  return (
    <section
      className="section-padding"
      style={{backgroundColor: '#F4F7F6'}}
    >
      <Container>
        <SectionHeading
          title="Our Product Categories"
          subtitle="Specialized in two core product lines, each with extensive customization options"
        />
        <div className="grid md:grid-cols-2 gap-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.to}
              to={cat.to}
              className="group relative rounded-xl overflow-hidden aspect-[3/2] flex items-end"
              style={{background: cat.gradient, textDecoration: 'none'}}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                {cat.icon}
              </div>
              <div className="relative z-10 p-8 lg:p-10 w-full">
                <p className="text-white/60 text-sm font-medium mb-1">{cat.subtitle}</p>
                <h3 className="text-white text-3xl lg:text-4xl font-bold mb-2 group-hover:translate-x-1 transition-transform">
                  {cat.title}
                </h3>
                <p className="text-white/60 text-sm mb-4">{cat.description}</p>
                <span className="inline-flex items-center gap-2 text-[#EAAA00] font-semibold text-sm">
                  View Collection <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
