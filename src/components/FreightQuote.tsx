import React, { useState, useEffect } from "react";
import bannerImage from "../images/requestquotebg.jpg";
import blurBackground from "../images/quote-blur.jpg";
import Select, { components, SingleValue } from 'react-select';
import countryList from 'react-select-country-list';

const CLOUD_NAME = "dqbrtrfft";
const UPLOAD_PRESET = "swiftmab";

// Define the correct type for country data
type CountryData = {
  value: string;
  label: string;
};

// Flag emoji mapping for common countries
const flagMap: { [key: string]: string } = {
  'AD': '🇦🇩', 'AE': '🇦🇪', 'AF': '🇦🇫', 'AG': '🇦🇬', 'AI': '🇦🇮', 'AL': '🇦🇱', 'AM': '🇦🇲',
  'AO': '🇦🇴', 'AQ': '🇦🇶', 'AR': '🇦🇷', 'AS': '🇦🇸', 'AT': '🇦🇹', 'AU': '🇦🇺', 'AW': '🇦🇼',
  'AX': '🇦🇽', 'AZ': '🇦🇿', 'BA': '🇧🇦', 'BB': '🇧🇧', 'BD': '🇧🇩', 'BE': '🇧🇪', 'BF': '🇧🇫',
  'BG': '🇧🇬', 'BH': '🇧🇭', 'BI': '🇧🇮', 'BJ': '🇧🇯', 'BL': '🇧🇱', 'BM': '🇧🇲', 'BN': '🇧🇳',
  'BO': '🇧🇴', 'BQ': '🇧🇶', 'BR': '🇧🇷', 'BS': '🇧🇸', 'BT': '🇧🇹', 'BV': '🇧🇻', 'BW': '🇧🇼',
  'BY': '🇧🇾', 'BZ': '🇧🇿', 'CA': '🇨🇦', 'CC': '🇨🇨', 'CD': '🇨🇩', 'CF': '🇨🇫', 'CG': '🇨🇬',
  'CH': '🇨🇭', 'CI': '🇨🇮', 'CK': '🇨🇰', 'CL': '🇨🇱', 'CM': '🇨🇲', 'CN': '🇨🇳', 'CO': '🇨🇴',
  'CR': '🇨🇷', 'CU': '🇨🇺', 'CV': '🇨🇻', 'CW': '🇨🇼', 'CX': '🇨🇽', 'CY': '🇨🇾', 'CZ': '🇨🇿',
  'DE': '🇩🇪', 'DJ': '🇩🇯', 'DK': '🇩🇰', 'DM': '🇩🇲', 'DO': '🇩🇴', 'DZ': '🇩🇿', 'EC': '🇪🇨',
  'EE': '🇪🇪', 'EG': '🇪🇬', 'EH': '🇪🇭', 'ER': '🇪🇷', 'ES': '🇪🇸', 'ET': '🇪🇹', 'FI': '🇫🇮',
  'FJ': '🇫🇯', 'FK': '🇫🇰', 'FM': '🇫🇲', 'FO': '🇫🇴', 'FR': '🇫🇷', 'GA': '🇬🇦', 'GB': '🇬🇧',
  'GD': '🇬🇩', 'GE': '🇬🇪', 'GF': '🇬🇫', 'GG': '🇬🇬', 'GH': '🇬🇭', 'GI': '🇬🇮', 'GL': '🇬🇱',
  'GM': '🇬🇲', 'GN': '🇬🇳', 'GP': '🇬🇵', 'GQ': '🇬🇶', 'GR': '🇬🇷', 'GS': '🇬🇸', 'GT': '🇬🇹',
  'GU': '🇬🇺', 'GW': '🇬🇼', 'GY': '🇬🇾', 'HK': '🇭🇰', 'HM': '🇭🇲', 'HN': '🇭🇳', 'HR': '🇭🇷',
  'HT': '🇭🇹', 'HU': '🇭🇺', 'ID': '🇮🇩', 'IE': '🇮🇪', 'IL': '🇮🇱', 'IM': '🇮🇲', 'IN': '🇮🇳',
  'IO': '🇮🇴', 'IQ': '🇮🇶', 'IR': '🇮🇷', 'IS': '🇮🇸', 'IT': '🇮🇹', 'JE': '🇯🇪', 'JM': '🇯🇲',
  'JO': '🇯🇴', 'JP': '🇯🇵', 'KE': '🇰🇪', 'KG': '🇰🇬', 'KH': '🇰🇭', 'KI': '🇰🇮', 'KM': '🇰🇲',
  'KN': '🇰🇳', 'KP': '🇰🇵', 'KR': '🇰🇷', 'KW': '🇰🇼', 'KY': '🇰🇾', 'KZ': '🇰🇿', 'LA': '🇱🇦',
  'LB': '🇱🇧', 'LC': '🇱🇨', 'LI': '🇱🇮', 'LK': '🇱🇰', 'LR': '🇱🇷', 'LS': '🇱🇸', 'LT': '🇱🇹',
  'LU': '🇱🇺', 'LV': '🇱🇻', 'LY': '🇱🇾', 'MA': '🇲🇦', 'MC': '🇲🇨', 'MD': '🇲🇩', 'ME': '🇲🇪',
  'MF': '🇲🇫', 'MG': '🇲🇬', 'MH': '🇲🇭', 'MK': '🇲🇰', 'ML': '🇲🇱', 'MM': '🇲🇲', 'MN': '🇲🇳',
  'MO': '🇲🇴', 'MP': '🇲🇵', 'MQ': '🇲🇶', 'MR': '🇲🇷', 'MS': '🇲🇸', 'MT': '🇲🇹', 'MU': '🇲🇺',
  'MV': '🇲🇻', 'MW': '🇲🇼', 'MX': '🇲🇽', 'MY': '🇲🇾', 'MZ': '🇲🇿', 'NA': '🇳🇦', 'NC': '🇳🇨',
  'NE': '🇳🇪', 'NF': '🇳🇫', 'NG': '🇳🇬', 'NI': '🇳🇮', 'NL': '🇳🇱', 'NO': '🇳🇴', 'NP': '🇳🇵',
  'NR': '🇳🇷', 'NU': '🇳🇺', 'NZ': '🇳🇿', 'OM': '🇴🇲', 'PA': '🇵🇦', 'PE': '🇵🇪', 'PF': '🇵🇫',
  'PG': '🇵🇬', 'PH': '🇵🇭', 'PK': '🇵🇰', 'PL': '🇵🇱', 'PM': '🇵🇲', 'PN': '🇵🇳', 'PR': '🇵🇷',
  'PS': '🇵🇸', 'PT': '🇵🇹', 'PW': '🇵🇼', 'PY': '🇵🇾', 'QA': '🇶🇦', 'RE': '🇷🇪', 'RO': '🇷🇴',
  'RS': '🇷🇸', 'RU': '🇷🇺', 'RW': '🇷🇼', 'SA': '🇸🇦', 'SB': '🇸🇧', 'SC': '🇸🇨', 'SD': '🇸🇩',
  'SE': '🇸🇪', 'SG': '🇸🇬', 'SH': '🇸🇭', 'SI': '🇸🇮', 'SJ': '🇸🇯', 'SK': '🇸🇰', 'SL': '🇸🇱',
  'SM': '🇸🇲', 'SN': '🇸🇳', 'SO': '🇸🇴', 'SR': '🇸🇷', 'SS': '🇸🇸', 'ST': '🇸🇹', 'SV': '🇸🇻',
  'SX': '🇸🇽', 'SY': '🇸🇾', 'SZ': '🇸🇿', 'TC': '🇹🇨', 'TD': '🇹🇩', 'TF': '🇹🇫', 'TG': '🇹🇬',
  'TH': '🇹🇭', 'TJ': '🇹🇯', 'TK': '🇹🇰', 'TL': '🇹🇱', 'TM': '🇹🇲', 'TN': '🇹🇳', 'TO': '🇹🇴',
  'TR': '🇹🇷', 'TT': '🇹🇹', 'TV': '🇹🇻', 'TW': '🇹🇼', 'TZ': '🇹🇿', 'UA': '🇺🇦', 'UG': '🇺🇬',
  'UM': '🇺🇲', 'US': '🇺🇸', 'UY': '🇺🇾', 'UZ': '🇺🇿', 'VA': '🇻🇦', 'VC': '🇻🇨', 'VE': '🇻🇪',
  'VG': '🇻🇬', 'VI': '🇻🇮', 'VN': '🇻🇳', 'VU': '🇻🇺', 'WF': '🇼🇫', 'WS': '🇼🇸', 'YE': '🇾🇪',
  'YT': '🇾🇹', 'ZA': '🇿🇦', 'ZM': '🇿🇲', 'ZW': '🇿🇼'
};

// Function to get flag emoji from country code
const getFlagEmoji = (countryCode: string) => {
  if (!countryCode) return '';
  return flagMap[countryCode.toUpperCase()] || '';
};

// Custom Option component with flag
const CustomOption = (props: any) => {
  const { data } = props;
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{getFlagEmoji(data.value)}</span>
        <span>{data.label}</span>
      </div>
    </components.Option>
  );
};

// Custom SingleValue component with flag (shows selected value)
const CustomSingleValue = (props: any) => {
  const { data } = props;
  return (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{getFlagEmoji(data.value)}</span>
        <span>{data.label}</span>
      </div>
    </components.SingleValue>
  );
};

const CountryDropdown = ({ name, required = false }: { name: string; required?: boolean }) => {
  const [value, setValue] = useState<CountryData | null>(null);
  const options = countryList().getData();

  const handleChange = (selectedOption: SingleValue<CountryData>) => {
    setValue(selectedOption);
  };

  return (
    <>
      <Select
        options={options}
        value={value}
        onChange={handleChange}
        className="text-black"
        placeholder="Select a country..."
        components={{
          Option: CustomOption,
          SingleValue: CustomSingleValue,
        }}
        styles={{
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#f3f4f6' : 'white',
            color: 'black',
            cursor: 'pointer',
          }),
          control: (provided) => ({
            ...provided,
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            minHeight: '42px',
            '&:hover': {
              borderColor: '#9ca3af',
            },
          }),
        }}
      />
      {/* Hidden input to send the selected country value with the form */}
      <input
        type="hidden"
        name={name}
        value={value?.value || ''}
        required={required}
      />
    </>
  );
};

const RequestQuote = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoaded(true);
  }, []);

  const uploadToCloudinary = async (file: File) => {
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.secure_url; // Cloudinary file URL
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitted(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // 1. Handle file upload (if file exists)
      const att1 = form.querySelector<HTMLInputElement>("input[name='Attachment1']");
      if (att1?.files?.length) {
        const file = att1.files[0];
        const uploadedUrl = await uploadToCloudinary(file);
        formData.delete("Attachment1");
        formData.append("Attachment1", uploadedUrl); // send URL instead of file
      }

      const att2 = form.querySelector<HTMLInputElement>("input[name='Attachment2']");
      if (att2?.files?.length) {
        const file = att2.files[0];
        const uploadedUrl = await uploadToCloudinary(file);
        formData.delete("Attachment2");
        formData.append("Attachment2", uploadedUrl); // send URL instead of file
      }

      // 2. Send to Formspree
      const res = await fetch("https://formspree.io/f/xrbagzyq", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSubmitted(true);
        form.reset();
      }
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-0">
      {/* Banner */}
      <div
        className="w-full h-64 bg-cover bg-center flex items-center justify-center pt-20"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <h1
          className={`text-2xl md:text-5xl font-bold mb-4 text-center transition-all duration-1000 delay-100 transform ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
            }`}
          style={{ fontFamily: '"Dela Gothic One", cursive' }}
        >
          <span className="text-[#FFD700]">Request a Quote</span>
        </h1>
      </div>

      {/* Blurred Background */}
      <div
        className="bg-cover bg-center bg-fixed bg-no-repeat w-full"
        style={{ backgroundImage: `url(${blurBackground})` }}
      >
        <div className="backdrop-blur-sm bg-white/80 w-full px-4 py-16">
          {/* Intro */}
          <div
            className={`max-w-3xl mx-auto mt-10 text-center text-gray-700 px-4 transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <p className="mb-4">
              Thank you for considering Swiftmab! Please fill out the form below
              to get a quote for your shipping requirements. After reviewing
              your request, our team will get back to you with a competitive
              quote as soon as possible.
            </p>
            <p>
              We offer personalized solutions that match your unique needs and
              budget, so please provide us with as much information as possible
              to ensure an accurate quote. We are grateful for the opportunity to
              serve you and look forward to helping you with your shipping needs.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={`mt-12 max-w-3xl mx-auto bg-[#F0F6FF]/90 rounded-lg shadow-md p-6 space-y-6 transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <input type="hidden" name="_redirect" value="false" />

            {/* Name */}
            <div>
              <label className="block font-medium mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                placeholder="Your full name"
                required
                className="w-full border rounded-md px-4 py-2"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                className="w-full border rounded-md px-4 py-2"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block font-medium mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                name="phone"
                type="tel"
                placeholder="0551234567"
                required
                className="w-full border rounded-md px-4 py-2"
              />
            </div>

            {/* National ID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-1">
                  National ID Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="idType"
                  required
                  className="w-full border rounded-md px-4 py-2 bg-white"
                >
                  <option value="">Select ID Type</option>
                  <option value="Ghana Card">Ghana Card</option>
                  <option value="Voter's ID">Voter's ID</option>
                  <option value="Passport">Passport</option>
                  <option value="Driver's License">Driver's License</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">
                  ID Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="idNumber"
                  required
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
            </div>

            {/* Weight + Packages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-1">
                  Estimated Weight or Volume{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  name="weight"
                  required
                  placeholder="e.g. 500 kg or 2 cbm"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Total Packages <span className="text-red-500">*</span>
                </label>
                <input
                  name="packages"
                  required
                  placeholder="e.g. 10 cartons"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
            </div>

            {/* Origin + Destination Structured */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Departure Section */}
              <div className="bg-white/70 p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-3 text-[#002366]">Departure</h3>

                {/* Country */}
                <div className="mb-4">
                  <label className="block font-medium mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <CountryDropdown name="originCountry" required={true} />
                </div>

                {/* City */}
                <div className="mb-4">
                  <label className="block font-medium mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="originCity"
                    required
                    placeholder="e.g. Johannesburg"
                    className="w-full border rounded-md px-4 py-2"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block font-medium mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="originAddress"
                    required
                    placeholder="Departure address"
                    className="w-full border rounded-md px-4 py-2"
                  />
                </div>
              </div>

              {/* Destination Section */}
              <div className="bg-white/70 p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-3 text-[#002366]">Destination</h3>

                {/* Country */}
                <div className="mb-4">
                  <label className="block font-medium mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <CountryDropdown name="destinationCountry" required={true} />
                </div>

                {/* City */}
                <div className="mb-4">
                  <label className="block font-medium mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="destinationCity"
                    required
                    placeholder="e.g. Accra"
                    className="w-full border rounded-md px-4 py-2"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block font-medium mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="destinationAddress"
                    required
                    placeholder="Destination address"
                    className="w-full border rounded-md px-4 py-2"
                  />
                </div>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block font-medium mb-1">
                Preferred Shipment Date <span className="text-red-500">*</span>
              </label>
              <p className="py-2 text-gray-700">Please provide your move date:</p>
              <input
                name="date"
                type="date"
                required
                className="w-full border rounded-md px-4 py-2"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block font-medium mb-1">
                Special Requirements <span className="text-red-500">*</span>
              </label>
              <textarea
                name="notes"
                rows={4}
                required
                placeholder="Your Message Query here"
                className="w-full border rounded-md px-4 py-2"
              />
            </div>

            {/* File upload */}
            <div>
              <label className="block font-medium mb-1">
                Upload Supporting Files (Images/ Documents)
              </label>
              <input
                type="file"
                name="Attachment1"
                accept="image/*,.pdf"
                className="w-full border rounded-md px-4 py-2"
              />
              <p className="text-sm text-gray-500 mt-1">
                JPG, PNG, or PDF (max 10MB)
              </p>
            </div>

            <div className="mt-4">
              <input
                type="file"
                name="Attachment2"
                accept="image/*,.pdf"
                className="w-full border rounded-md px-4 py-2"
              />
              <p className="text-sm text-gray-500 mt-1">
                JPG, PNG, or PDF (max 10MB)
              </p>
            </div>

            {/* Submit */}
            <div className="text-right">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#002366] text-white px-6 py-2 rounded-md font-bold hover:bg-[#FFD700] hover:text-[#002366] transition flex items-center justify-center"
              >
                {isSubmitting ? (
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                  "Submit Quote Request"
                )}
              </button>
            </div>

            {/* Confirmation */}
            {submitted && (
              <p className="text-green-600 text-center font-semibold mt-4">
                Thank you! Your request has been submitted successfully.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestQuote;