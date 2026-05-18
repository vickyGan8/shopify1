import {Container} from '~/components/Container';
import {SectionHeading} from '~/components/SectionHeading';
import {BRAND} from '~/lib/constants';

export function BrandStory() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg bg-[#F4F7F6] overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-[#757575]">
                <div className="text-center">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="mx-auto mb-3 opacity-30"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span className="text-sm opacity-50">Factory Image</span>
                </div>
              </div>
            </div>
            {/* Decorative accent element */}
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-lg z-[-1]"
              style={{backgroundColor: '#EAAA00', opacity: 0.15}}
            />
          </div>

          {/* Content */}
          <div>
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{color: '#2C5F8A'}}
            >
              Our Story
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#212121] leading-tight mb-6">
              Manufacturing Excellence
              <br />
              Since {BRAND.foundedYear}
            </h2>
            <p className="text-[#757575] text-base leading-relaxed mb-4">
              Founded in {BRAND.foundedYear} in Shenzhen, China — the global hub of watch
              manufacturing — {BRAND.name} has grown from a small workshop into a
              world-class manufacturer of premium watch bands and cases.
            </p>
            <p className="text-[#757575] text-base leading-relaxed mb-6">
              We combine traditional craftsmanship with modern CNC precision to
              produce watch accessories that meet the exacting standards of
              European and American brands. Every product undergoes rigorous
              quality control to ensure consistency across every order.
            </p>
            <a href="/about" className="btn btn-outline">
              Learn More About Us
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
