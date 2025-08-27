// ImportExport.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Truck, Globe, CheckCircle, X } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bgImage from '../images/importbg.jpg';

const CLOUD_NAME = "dqbrtrfft";
const UPLOAD_PRESET = "swiftmab";

const ImportExport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [requestType, setRequestType] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
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
    // basic required fields (note: National ID handled separately)
    const requiredFields = [
      'Full Name',
      'Phone',
      'Location',
      'Request Type',
      'Goods Description'
    ];
    requiredFields.forEach((field) => {
      if (!formData.get(field) || String(formData.get(field)).trim() === '') {
        newErrors[field] = 'This field is required.';
      }
    });

    // National ID must have both type and number
    const idType = formData.get('NationalIDType');
    const idNumber = formData.get('NationalIDNumber');
    if (!idType || String(idType).trim() === '' || !idNumber || String(idNumber).trim() === '') {
      newErrors['NationalID'] = 'Please select an ID type and enter the ID number.';
    }

    // conditional import/export fields
    if (requestType === 'import' || requestType === 'both') {
      if (!formData.get('Import Country') || String(formData.get('Import Country')).trim() === '') {
        newErrors['Import Country'] = 'This field is required.';
      }
      if (!formData.get('Import Date') || String(formData.get('Import Date')).trim() === '') {
        newErrors['Import Date'] = 'This field is required.';
      }
    }
    if (requestType === 'export' || requestType === 'both') {
      if (!formData.get('Export Country') || String(formData.get('Export Country')).trim() === '') {
        newErrors['Export Country'] = 'This field is required.';
      }
      if (!formData.get('Export Date') || String(formData.get('Export Date')).trim() === '') {
        newErrors['Export Date'] = 'This field is required.';
      }
    }

    return newErrors;
  };

  const uploadToCloudinary = async (file: File) => {
    setUploading(true);
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(url, { method: "POST", body: data });
      const cloudData = await res.json();
      return cloudData.secure_url as string | undefined;
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      toast.error("File upload failed.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setErrors({});
    const form = e.currentTarget;
    const data = new FormData(form);

    // validation
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSending(false);
      return;
    }

    // handle file uploads for Attachment1 and Attachment2 (if present)
    try {
      const att1 = form.querySelector<HTMLInputElement>("input[name='Attachment1']");
      if (att1?.files?.length) {
        const uploadedUrl = await uploadToCloudinary(att1.files[0]);
        if (uploadedUrl) {
          data.delete('Attachment1');
          data.append('Attachment1', uploadedUrl);
        }
      }
      const att2 = form.querySelector<HTMLInputElement>("input[name='Attachment2']");
      if (att2?.files?.length) {
        const uploadedUrl2 = await uploadToCloudinary(att2.files[0]);
        if (uploadedUrl2) {
          data.delete('Attachment2');
          data.append('Attachment2', uploadedUrl2);
        }
      }

      // submit to Formspree (FormData)
      const res = await fetch("https://formspree.io/f/mwpqnkna", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });

      if (res.ok) {
        setSent(true);
        form.reset();
        setRequestType('');
        toast.success("Request sent successfully!");
        setTimeout(() => setSent(false), 3000);
      } else {
        console.error("Formspree response not ok:", res.status);
        toast.error("Failed to send request. Try again.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to send request. Try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="relative pt-40 pb-20 text-white overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Background */}
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
            className="text-2xl md:text-5xl font-bold mb-4"
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

        {/* Features */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {[
            { icon: Truck, title: 'Customs Clearance Support', desc: 'We assist with documents to clear goods faster.' },
            { icon: Globe, title: 'Partnered Shipping Lines', desc: 'We move goods safely between continents.' },
            { icon: CheckCircle, title: 'Flexible Packages', desc: 'We adapt to your cargo type and timeline.' },
          ].map((item, index) => (
            <div key={index} className="bg-white/80 text-[#002366] p-6 rounded-lg shadow-md">
              <item.icon size={32} className="text-[#FFD700] mb-4" />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-block bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-[#FFD700] hover:text-[#002366] hover:border-transparent"
          >
            Request Import/Export Support
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div ref={modalRef} className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl p-8 relative text-[#002366] shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6">Import/Export Request Form</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="_redirect" value="false" />

              {/* existing fields */}
              {[
                { name: 'Full Name', type: 'text', placeholder: 'e.g. Daniel K. Mensah' },
                { name: 'Phone', type: 'tel', placeholder: 'e.g. 0551234567' },
                { name: 'Email', type: 'text', placeholder: 'your@email.com' },
                { name: 'Location', type: 'text', placeholder: 'e.g. Dansoman, Accra' }
              ].map(field => (
                <div key={field.name}>
                  <label className="block mb-1 font-medium">
                    {field.name} <span className="text-red-500">*</span>
                  </label>
                  <input
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full border rounded-md px-4 py-2"
                    required
                  />
                </div>
              ))}

              {/* National ID section (Dropdown + Input) */}
              <div>
                <label className="block mb-1 font-medium">
                  National ID <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    name="NationalIDType"
                    className="border rounded-md px-4 py-2 w-1/2"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>-- Select ID Type --</option>
                    <option value="Ghana Card">Ghana Card</option>
                    <option value="Voter's ID">Voter's ID</option>
                    <option value="Passport">Passport</option>
                    <option value="Driver's License">Driver's License</option>
                  </select>
                  <input
                    name="NationalIDNumber"
                    type="text"
                    placeholder="Enter ID Number"
                    className="border rounded-md px-4 py-2 w-1/2"
                    required
                  />
                </div>
              </div>

              {/* Request Type */}
              <div>
                <label className="block mb-1 font-medium">
                  Type of Request <span className="text-red-500">*</span>
                </label>
                <select
                  name="Request Type"
                  value={requestType}
                  onChange={e => setRequestType(e.target.value)}
                  className="w-full border rounded-md px-4 py-2"
                  required
                >
                  <option value="">-- Select --</option>
                  <option value="import">Import</option>
                  <option value="export">Export</option>
                  <option value="both">Both</option>
                </select>
              </div>

              {/* conditional fields */}
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
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">
                      Preferred Import Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="Import Date"
                      className="w-full border rounded-md px-4 py-2"
                      required
                    />
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
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">
                      Preferred Export Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="Export Date"
                      className="w-full border rounded-md px-4 py-2"
                      required
                    />
                  </div>
                </>
              )}

              {/* Goods */}
              <div>
                <label className="block mb-1 font-medium">
                  Brief Description of Goods <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="Goods Description"
                  rows={4}
                  className="w-full border rounded-md px-4 py-2"
                  placeholder="e.g. 200 boxes of electronics"
                  required
                />
              </div>

              {/* File Upload (two containers) */}
              <div>
                <label className="block mb-1 font-medium">Attach Supporting File (Images/ Documents)</label>
                <input
                  type="file"
                  name="Attachment1"
                  accept="image/*,.pdf"
                  className="w-full border rounded-md px-4 py-2"
                />
                {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
              </div>

              <div className="mt-4">
                 <input
                  type="file"
                  name="Attachment2"
                  accept="image/*,.pdf"
                  className="w-full border rounded-md px-4 py-2"
                />
                {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
              </div>

              {/* Submit */}
              <div className="text-right">
                <button
                  type="submit"
                  disabled={sending || uploading}
                  className="bg-[#002366] text-white px-6 py-2 rounded-md hover:bg-[#FFD700] hover:text-[#002366] transition disabled:opacity-50"
                >
                  {sending ? "Sending..." : sent ? "Sent! ✅" : "Submit Request"}
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