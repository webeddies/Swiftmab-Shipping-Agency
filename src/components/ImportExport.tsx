// ImportExport.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Truck, Globe, CheckCircle, X } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bgImage from '../images/importbg.jpg';

const ImportExport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [requestType, setRequestType] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    // Trigger animations after component mounts
    setIsLoaded(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isModalOpen]);

  const validateForm = (formData: FormData) => {
    const newErrors: { [key: string]: string } = {};
    const requiredFields = ['Full Name', 'Phone', 'National ID', 'Location', 'Request Type', 'Goods Description'];
    requiredFields.forEach((field) => {
      if (!formData.get(field)) newErrors[field] = 'This field is required.';
    });

    if (requestType === 'import' || requestType === 'both') {
      if (!formData.get('Import Country')) newErrors['Import Country'] = 'This field is required.';
      if (!formData.get('Import Date')) newErrors['Import Date'] = 'This field is required.';
    }
    if (requestType === 'export' || requestType === 'both') {
      if (!formData.get('Export Country')) newErrors['Export Country'] = 'This field is required.';
      if (!formData.get('Export Date')) newErrors['Export Date'] = 'This field is required.';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const validationErrors = validateForm(data);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSending(false);
      return;
    }

    setErrors({});
    try {
      await fetch('https://formspree.io/f/mwpqnkna', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      setSent(true);
      setSending(false);
      form.reset();
      setRequestType('');
      toast.success('Request sent successfully!');
      setTimeout(() => setSent(false), 3000);
    } catch (error) {
      setSending(false);
      toast.error('Failed to send request. Try again.');
    }
  };

  return (
    <section className="relative pt-40 pb-20 text-white overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Background with fade-in animation */}
      <div
        className={`absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className={`absolute inset-0 z-10 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} />

      {/* Main content with staggered animations */}
      <div className="relative z-20 container mx-auto px-4">
        {/* Title section - slide up */}
        <div className={`text-center mb-12 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: '"Dela Gothic One", cursive', color: '#002366' }}
          >
            Import & Export <span style={{ color: '#FFD700' }}>Services</span>
          </h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Trust us to handle your shipping and logistics requirements with ease.
          </p>
        </div>

        {/* Description section - slide up with delay */}
        <div className={`max-w-4xl mx-auto mb-12 text-white/90 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-lg mb-6">
            At Swiftmab, we understand how challenging international trade can be for growing businesses.
            That's why we've simplified the process; experience hassle-free import and export.
          </p>
          <p className="text-lg">
            Whether you're importing machinery or exporting local goods, our team guides you with the right documentation and steps.
          </p>
        </div>

        {/* Features grid - staggered animations */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {[
            { icon: Truck, title: 'Customs Clearance Support', desc: 'We assist with documents to clear goods faster.' },
            { icon: Globe, title: 'Partnered Shipping Lines', desc: 'We move goods safely between continents.' },
            { icon: CheckCircle, title: 'Flexible Packages', desc: 'We adapt to your cargo type and timeline.' },
          ].map((item, index) => (
            <div
              key={index}
              className={`bg-white/80 text-[#002366] p-6 rounded-lg shadow-md transition-all duration-500 delay-${400 + (index * 100)} ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <item.icon size={32} className="text-[#FFD700] mb-4" />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Button - fade in with delay */}
        <div className={`text-center transition-opacity duration-700 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#FFD700] text-[#002366] px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:scale-105 transition-all"
          >
            Request Import/Export Support
          </button>
        </div>
      </div>


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-0 backdrop-blur-0 flex items-center justify-center px-4 transition-all duration-300 ease-out"
          style={{
            animation: `${isModalOpen ? 'fadeIn' : 'fadeOut'} 300ms ease-out forwards`
          }}
        >
          <div
            ref={modalRef}
            className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl p-8 relative text-[#002366] shadow-2xl transform transition-all duration-300 ease-out"
            style={{
              opacity: 0,
              transform: 'scale(0.95) translateY(20px)',
              animation: `${isModalOpen ? 'modalEnter' : 'modalExit'} 300ms ease-out forwards`
            }}
          >
            {/* Modal content remains the same */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors duration-200"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6">Import/Export Request Form</h2>

            <form onSubmit={handleSubmit} method="POST" className="space-y-4">
              <input type="hidden" name="_redirect" value="false" />

              {[
                { name: 'Full Name', type: 'text', placeholder: 'e.g. Daniel K. Mensah' },
                { name: 'Phone', type: 'tel', placeholder: 'e.g. 0551234567' },
                { name: 'National ID', type: 'text', placeholder: 'e.g. GHA-123456789-0' },
                { name: 'Location', type: 'text', placeholder: 'e.g. Dansoman, Accra' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block mb-1 font-medium">
                    {field.name} <span className="text-red-500">*</span>
                  </label>
                  <input
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full border rounded-md px-4 py-2"
                  />
                  {errors[field.name] && <p className="text-sm text-red-500">{errors[field.name]}</p>}
                </div>
              ))}

              <div>
                <label className="block mb-1 font-medium">
                  Type of Request <span className="text-red-500">*</span>
                </label>
                <select
                  name="Request Type"
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="w-full border rounded-md px-4 py-2"
                  required
                >
                  <option value="">-- Select --</option>
                  <option value="import">Import</option>
                  <option value="export">Export</option>
                  <option value="both">Both</option>
                </select>
                {errors['Request Type'] && <p className="text-sm text-red-500">{errors['Request Type']}</p>}
              </div>

              {(requestType === 'import' || requestType === 'both') && (
                <>
                  <div>
                    <label className="block mb-1 font-medium">
                      Country Importing From <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="Import Country"
                      placeholder="e.g. China, UK, Dubai"
                      className="w-full border rounded-md px-4 py-2"
                    />
                    {errors['Import Country'] && <p className="text-sm text-red-500">{errors['Import Country']}</p>}
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">
                      Preferred Import Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="Import Date"
                      className="w-full border rounded-md px-4 py-2"
                    />
                    {errors['Import Date'] && <p className="text-sm text-red-500">{errors['Import Date']}</p>}
                  </div>
                </>
              )}

              {(requestType === 'export' || requestType === 'both') && (
                <>
                  <div>
                    <label className="block mb-1 font-medium">
                      Country Exporting To <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="Export Country"
                      placeholder="e.g. USA, Nigeria, France"
                      className="w-full border rounded-md px-4 py-2"
                    />
                    {errors['Export Country'] && <p className="text-sm text-red-500">{errors['Export Country']}</p>}
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">
                      Preferred Export Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="Export Date"
                      className="w-full border rounded-md px-4 py-2"
                    />
                    {errors['Export Date'] && <p className="text-sm text-red-500">{errors['Export Date']}</p>}
                  </div>
                </>
              )}


              <div>
                <label className="block mb-1 font-medium">
                  Brief Description of Goods <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="Goods Description"
                  rows={4}
                  className="w-full border rounded-md px-4 py-2"
                  placeholder="e.g. 200 boxes of electronics from Dubai"
                />
                {errors['Goods Description'] && <p className="text-sm text-red-500">{errors['Goods Description']}</p>}
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  disabled={sending}
                  className="bg-[#002366] text-white px-6 py-2 rounded-md hover:bg-[#FFD700] hover:text-[#002366] transition disabled:opacity-50"
                >
                  {sending ? 'Sending...' : sent ? 'Sent! ✅' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ImportExport;
