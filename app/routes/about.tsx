import type {Route} from './+types/about';
import {Container} from '~/components/Container';
import {SectionHeading} from '~/components/SectionHeading';
import {CTABanner} from '~/components/CTABanner';
import {BRAND} from '~/lib/constants';
import {
  Factory,
  Target,
  Globe,
  Shield,
  Award,
  Clock,
} from 'lucide-react';

export const meta: Route.MetaFunction = () => {
  return [{title: 'About Us — EasyTime'}];
};

export async function loader() {
  return {};
}

export default function About() {
  return (
    <div>
      {/* Hero Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, #002A41 0%, #2C5F8A 100%)',
          padding: '8rem 0 5rem',
          textAlign: 'center',
        }}
      >
        <Container>
          <p
            style={{
              color: '#EAAA00',
              fontSize: '0.875rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '1rem',
            }}
          >
            About Us
          </p>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '1rem',
            }}
          >
            Excellence in Watch Accessories Manufacturing
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '1.125rem',
              maxWidth: 600,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Since {BRAND.foundedYear}, we've been a trusted partner to watch brands
            worldwide, delivering precision, quality, and reliability.
          </p>
        </Container>
      </section>

      {/* Company Story */}
      <section className="section-padding bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div
              className="aspect-[4/3] rounded-lg"
              style={{background: '#F4F7F6', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            >
              <div style={{textAlign: 'center', color: '#757575'}}>
                <Factory size={64} className="mx-auto mb-4 opacity-20" />
                <span style={{fontSize: '0.875rem'}}>Factory Photo</span>
              </div>
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#212121] mb-6 leading-tight">
                Our Story
              </h2>
              <p className="text-[#757575] leading-relaxed mb-4">
                {BRAND.name} was founded in {BRAND.foundedYear} with a simple mission:
                to provide watch brands with manufacturing quality that matches their
                design ambitions. Starting from a small workshop in Shenzhen's precision
                manufacturing district, we've grown into a {BRAND.stats.factorySize}{' '}
                facility with {BRAND.stats.employeeCount} skilled workers.
              </p>
              <p className="text-[#757575] leading-relaxed mb-4">
                Today, we serve over 35 countries across Europe, North America, and
                beyond. Our clients range from boutique watch brands to established
                fashion houses — all of whom trust us to deliver consistent quality at
                competitive prices.
              </p>
              <p className="text-[#757575] leading-relaxed">
                We specialize in mid-to-high-end watch bands (leather, stainless steel,
                silicone, nylon) and precision-engineered watch cases. Every product is
                the result of meticulous craftsmanship combined with modern CNC
                manufacturing technology.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Factory Stats */}
      <section className="section-padding" style={{backgroundColor: '#F4F7F6'}}>
        <Container>
          <SectionHeading title="Our Factory at a Glance" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard icon={<Target size={24} />} value={BRAND.stats.factorySize} label="Factory Size" />
            <StatCard icon={<Globe size={24} />} value={`${BRAND.stats.countriesServed}+`} label="Countries Served" />
            <StatCard icon={<Award size={24} />} value={BRAND.stats.annualCapacity} label="Annual Capacity" />
            <StatCard icon={<Clock size={24} />} value="99.7%" label="Quality Pass Rate" />
          </div>
        </Container>
      </section>

      {/* Milestones */}
      <section className="section-padding bg-white">
        <Container>
          <SectionHeading
            title="Our Journey"
            subtitle="Key milestones that shaped our growth into a global manufacturing partner"
          />
          <div style={{maxWidth: 800, margin: '0 auto'}}>
            {MILESTONES.map((m, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '2rem',
                  paddingBottom: '2rem',
                  position: 'relative',
                }}
              >
                {/* Timeline line */}
                {i < MILESTONES.length - 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      left: 47,
                      top: 48,
                      bottom: 0,
                      width: 2,
                      background: '#E5E5E5',
                    }}
                  />
                )}
                <div
                  style={{
                    width: 96,
                    flexShrink: 0,
                    textAlign: 'right',
                  }}
                >
                  <span
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: '#2C5F8A',
                    }}
                  >
                    {m.year}
                  </span>
                </div>
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: '#2C5F8A',
                    flexShrink: 0,
                    marginTop: 6,
                  }}
                />
                <div>
                  <h3 style={{fontWeight: 600, marginBottom: '0.25rem', fontSize: '1.0625rem'}}>
                    {m.title}
                  </h3>
                  <p style={{color: '#757575', fontSize: '0.9375rem'}}>{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="section-padding" style={{backgroundColor: '#F4F7F6'}}>
        <Container>
          <SectionHeading
            title="Our Values"
            subtitle="The principles that guide every product we manufacture"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {VALUES.map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-8 border border-black/5"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                  style={{backgroundColor: '#EBF1F6'}}
                >
                  <v.icon size={22} className="text-[#2C5F8A]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-[#757575] leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="text-center">
      <div
        className="w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4"
        style={{backgroundColor: '#EBF1F6', color: '#2C5F8A'}}
      >
        {icon}
      </div>
      <div className="text-2xl font-bold text-[#212121]">{value}</div>
      <div className="text-sm text-[#757575] mt-1">{label}</div>
    </div>
  );
}

const MILESTONES = [
  {
    year: '2010',
    title: 'Company Founded',
    description:
      'Started as a small workshop in Shenzhen specializing in leather watch bands for domestic brands.',
  },
  {
    year: '2013',
    title: 'First Export Orders',
    description:
      'Began exporting to European markets. ISO 9001:2015 certification obtained.',
  },
  {
    year: '2016',
    title: 'Factory Expansion',
    description:
      'Moved to a 15,000 sqm facility. Added CNC machining for watch case production.',
  },
  {
    year: '2019',
    title: 'Global Reach',
    description:
      'Expanded to 35+ countries. Launched OEM/ODM services for international fashion brands.',
  },
  {
    year: '2023',
    title: 'Advanced Manufacturing',
    description:
      'Invested in automated production lines. Annual capacity exceeded 2 million units.',
  },
  {
    year: '2026',
    title: 'Looking Ahead',
    description:
      'Expanding into sustainable materials. Building partnerships with luxury watch maisons.',
  },
];

const VALUES = [
  {
    icon: Shield,
    title: 'Quality First',
    description:
      'Multi-stage inspection from raw materials to finished products. Every batch is tested before shipment.',
  },
  {
    icon: Target,
    title: 'Precision Engineering',
    description:
      'State-of-the-art CNC machines with micron-level tolerances. Every dimension is verified.',
  },
  {
    icon: Globe,
    title: 'Global Standards',
    description:
      'Products comply with international standards including REACH, RoHS, and California Proposition 65.',
  },
  {
    icon: Award,
    title: 'Craftsmanship',
    description:
      'Skilled artisans with decades of experience in leather working, metal finishing, and assembly.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description:
      'Proven track record of meeting deadlines. Flexible production scheduling for rush orders.',
  },
  {
    icon: Factory,
    title: 'In-House Production',
    description:
      'Full control over the manufacturing process — from design support to final packaging.',
  },
];
