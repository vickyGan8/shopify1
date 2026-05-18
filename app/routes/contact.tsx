import {useState} from 'react';
import type {Route} from './+types/contact';
import {Container} from '~/components/Container';
import {SectionHeading} from '~/components/SectionHeading';
import {BRAND} from '~/lib/constants';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Upload,
} from 'lucide-react';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Request a Quote — EasyTime'}];
};

export async function action({request}: Route.ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Server-side validation
  const errors: Record<string, string> = {};
  if (!data.company_name) errors.company_name = 'Company name is required';
  if (!data.contact_person) errors.contact_person = 'Contact person is required';
  if (!data.email) errors.email = 'Email is required';
  if (!data.message) errors.message = 'Please describe your requirements';

  if (Object.keys(errors).length > 0) {
    return {success: false, errors, values: data};
  }

  // In production: send email via Resend/SendGrid here
  // For now, simulate success
  return {success: true, errors: null};
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #002A41 0%, #2C5F8A 100%)',
          padding: '6rem 0 4rem',
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
            Get in Touch
          </p>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '1rem',
            }}
          >
            Request a Quote
          </h1>
          <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '1.125rem', maxWidth: 600, margin: '0 auto'}}>
            Tell us about your requirements and our team will respond within 24 hours
          </p>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16">
            {/* Contact Info */}
            <div>
              <h2
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  marginBottom: '1.5rem',
                }}
              >
                Contact Information
              </h2>

              <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem'}}>
                <ContactItem
                  icon={<Mail size={20} />}
                  title="Email"
                  content={BRAND.email}
                  href={`mailto:${BRAND.email}`}
                />
                <ContactItem
                  icon={<Phone size={20} />}
                  title="Phone"
                  content={BRAND.phone}
                  href={`tel:${BRAND.phone}`}
                />
                <ContactItem
                  icon={<MapPin size={20} />}
                  title="Address"
                  content={BRAND.address}
                />
                <ContactItem
                  icon={<Clock size={20} />}
                  title="Office Hours"
                  content="Monday – Friday, 9:00 AM – 6:00 PM (GMT+8)"
                />
              </div>

              {/* Quick response promise */}
              <div
                style={{
                  background: '#F4F7F6',
                  borderRadius: 8,
                  padding: '1.25rem',
                  border: '1px solid rgba(0,0,0,0.05)',
                }}
              >
                <div style={{display: 'flex', gap: '0.75rem', alignItems: 'flex-start'}}>
                  <CheckCircle size={20} style={{color: '#2C5F8A', flexShrink: 0, marginTop: 2}} />
                  <div>
                    <p style={{fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.25rem'}}>
                      Quick Response Guaranteed
                    </p>
                    <p style={{fontSize: '0.8125rem', color: '#757575'}}>
                      We typically respond within 24 hours. For urgent inquiries,
                      please call us directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RFQ Form */}
            <div>
              {submitted ? (
                <SuccessMessage onNewInquiry={() => setSubmitted(false)} />
              ) : (
                <RFQForm onSubmitSuccess={() => setSubmitted(true)} />
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

function ContactItem({
  icon,
  title,
  content,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  href?: string;
}) {
  return (
    <div style={{display: 'flex', gap: '1rem', alignItems: 'flex-start'}}>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          backgroundColor: '#EBF1F6',
          color: '#2C5F8A',
        }}
      >
        {icon}
      </div>
      <div>
        <p style={{fontSize: '0.8125rem', color: '#757575', marginBottom: '0.125rem'}}>
          {title}
        </p>
        {href ? (
          <a
            href={href}
            style={{
              fontWeight: 600,
              color: '#212121',
              textDecoration: 'none',
              fontSize: '0.9375rem',
            }}
          >
            {content}
          </a>
        ) : (
          <p style={{fontWeight: 500, color: '#212121', fontSize: '0.9375rem', margin: 0}}>
            {content}
          </p>
        )}
      </div>
    </div>
  );
}

function RFQForm({onSubmitSuccess}: {onSubmitSuccess: () => void}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Basic client-side validation
    const newErrors: Record<string, string> = {};
    if (!formData.get('company_name')) newErrors.company_name = 'Required';
    if (!formData.get('contact_person')) newErrors.contact_person = 'Required';
    if (!formData.get('email')) newErrors.email = 'Required';
    if (!formData.get('message')) newErrors.message = 'Required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitting(false);
      return;
    }

    // Simulate submission
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    onSubmitSuccess();
  };

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: 6,
    fontSize: '0.9375rem',
    fontFamily: 'inherit',
    color: '#212121',
    background: '#FFFFFF',
  };

  return (
    <form onSubmit={handleSubmit} method="post">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">
            Company Name <span className="required">*</span>
          </label>
          <input
            name="company_name"
            type="text"
            className="form-input"
            style={errors.company_name ? {borderColor: '#d32f2f'} : undefined}
          />
          {errors.company_name && <p className="form-error">{errors.company_name}</p>}
        </div>
        <div>
          <label className="form-label">
            Contact Person <span className="required">*</span>
          </label>
          <input
            name="contact_person"
            type="text"
            className="form-input"
            style={errors.contact_person ? {borderColor: '#d32f2f'} : undefined}
          />
          {errors.contact_person && <p className="form-error">{errors.contact_person}</p>}
        </div>
        <div>
          <label className="form-label">
            Email <span className="required">*</span>
          </label>
          <input
            name="email"
            type="email"
            className="form-input"
            style={errors.email ? {borderColor: '#d32f2f'} : undefined}
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>
        <div>
          <label className="form-label">Phone</label>
          <input name="phone" type="tel" className="form-input" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4" style={{marginTop: '1rem'}}>
        <div>
          <label className="form-label">Product Interest</label>
          <select name="product_interest" className="form-select">
            <option value="">Select a category</option>
            <option value="watch-bands">Watch Bands</option>
            <option value="watch-cases">Watch Cases</option>
            <option value="both">Both</option>
            <option value="other">Other / Not Sure</option>
          </select>
        </div>
        <div>
          <label className="form-label">Estimated Quantity</label>
          <select name="quantity" className="form-select">
            <option value="">Select range</option>
            <option value="under-100">Under 100</option>
            <option value="100-500">100 – 500</option>
            <option value="500-2000">500 – 2,000</option>
            <option value="2000+">2,000+</option>
          </select>
        </div>
      </div>

      <div style={{marginTop: '1rem'}}>
        <label className="form-label">
          Your Requirements <span className="required">*</span>
        </label>
        <textarea
          name="message"
          rows={6}
          className="form-textarea"
          placeholder="Please describe the products you're interested in, including any specific materials, dimensions, colors, or customization requirements..."
          style={errors.message ? {borderColor: '#d32f2f'} : undefined}
        />
        {errors.message && <p className="form-error">{errors.message}</p>}
      </div>

      <div style={{marginTop: '1rem'}}>
        <label className="form-label">Upload Files (optional)</label>
        <div
          style={{
            border: '2px dashed #d1d5db',
            borderRadius: 6,
            padding: '2rem',
            textAlign: 'center',
            color: '#757575',
            cursor: 'pointer',
          }}
        >
          <Upload size={24} style={{margin: '0 auto 0.5rem', opacity: 0.4}} />
          <p style={{fontSize: '0.875rem'}}>
            Drag & drop reference images, spec sheets, or design files here
          </p>
          <p style={{fontSize: '0.75rem', marginTop: '0.25rem'}}>
            Max 10MB per file (PDF, JPG, PNG, DWG)
          </p>
        </div>
      </div>

      <div style={{marginTop: '1.5rem'}}>
        <button type="submit" className="btn btn-accent btn-lg" disabled={submitting}>
          {submitting ? (
            'Sending...'
          ) : (
            <>
              <Send size={18} />
              Submit Inquiry
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function SuccessMessage({onNewInquiry}: {onNewInquiry: () => void}) {
  return (
    <div style={{textAlign: 'center', padding: '4rem 2rem'}}>
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: '#EBF1F6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
        }}
      >
        <CheckCircle size={40} style={{color: '#2C5F8A'}} />
      </div>
      <h2
        style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          marginBottom: '0.75rem',
        }}
      >
        Inquiry Submitted!
      </h2>
      <p style={{color: '#757575', lineHeight: 1.7, marginBottom: '2rem', maxWidth: 450, margin: '0 auto 2rem'}}>
        Thank you for your inquiry. Our team will review your requirements and
        get back to you within 24 hours. For urgent matters, please call us
        directly at {BRAND.phone}.
      </p>
      <button onClick={onNewInquiry} className="btn btn-outline">
        Submit Another Inquiry
      </button>
    </div>
  );
}
