import {Link} from 'react-router';
import {ArrowRight, MessageSquare} from 'lucide-react';
import {Container} from '~/components/Container';

export function CTABanner({
  title = "Ready to Discuss Your Requirements?",
  subtitle = "Our team is ready to provide competitive quotes for your watch accessory needs. Send us your specifications and we'll respond within 24 hours.",
  ctaText = 'Request a Quote',
  ctaTo = '/contact',
}: {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaTo?: string;
}) {
  return (
    <section
      className="section-padding"
      style={{
        background: 'linear-gradient(135deg, #005A8A 0%, #2C5F8A 50%, #002A41 100%)',
      }}
    >
      <div className="relative">
        {/* Background icon */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <MessageSquare size={200} color="white" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {title}
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              {subtitle}
            </p>
            <Link to={ctaTo} className="btn btn-accent btn-lg">
              {ctaText}
              <ArrowRight size={20} />
            </Link>
          </div>
        </Container>
      </div>
    </section>
  );
}
