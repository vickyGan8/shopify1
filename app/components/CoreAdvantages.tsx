import {Container} from '~/components/Container';
import {SectionHeading} from '~/components/SectionHeading';
import {CORE_ADVANTAGES} from '~/lib/constants';
import {CheckCircle, Settings, Shield, Truck} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  CheckCircle,
  Settings,
  Shield,
  Truck,
};

export function CoreAdvantages() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeading
          title="Why Partner With Us"
          subtitle="We provide end-to-end manufacturing solutions designed for international procurement professionals"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CORE_ADVANTAGES.map((adv, i) => {
            const IconComponent = ICON_MAP[adv.icon] || CheckCircle;
            return (
              <div key={i} className="group">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-5 transition-colors group-hover:bg-[#2C5F8A]"
                  style={{backgroundColor: '#EBF1F6'}}
                >
                  <IconComponent
                    size={24}
                    className="text-[#2C5F8A] group-hover:text-white transition-colors"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#212121] mb-2">
                  {adv.title}
                </h3>
                <p className="text-sm text-[#757575] leading-relaxed">
                  {adv.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
