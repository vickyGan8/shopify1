import {Container} from '~/components/Container';
import {FOOTER} from '~/lib/constants';

export function PartnerLogos() {
  return (
    <section
      className="section-padding"
      style={{backgroundColor: '#F4F7F6'}}
    >
      <Container>
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-[#757575] mb-10">
          Trusted by Brands Worldwide
        </p>

        {/* Certification badges in a row */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {FOOTER.certifications.map((cert, i) => (
            <div
              key={i}
              className="px-5 py-3 bg-white rounded-lg border border-black/5 flex items-center gap-3"
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{backgroundColor: i % 2 === 0 ? '#2C5F8A' : '#EAAA00'}}
              />
              <span className="text-sm font-medium text-[#212121]">{cert}</span>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-10 border-t border-black/5">
          {[
            {label: 'Years in Business', value: '15+'},
            {label: 'Export Countries', value: '35+'},
            {label: 'Annual Capacity', value: '2M+'},
            {label: 'Quality Pass Rate', value: '99.7%'},
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#2C5F8A]">
                {stat.value}
              </div>
              <div className="text-sm text-[#757575] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
