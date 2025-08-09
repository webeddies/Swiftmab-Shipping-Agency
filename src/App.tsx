import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

 
 
import ScrollManager from './utils/ScrollManager';

// Your other imports...
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
 
import Contact from './components/Contact';
import Footer from './components/Footer';
import ImportExport from './components/ImportExport';
import FreightForwarding from './components/FreightForwarding';
import CourierServices from './components/CourierServices';
import FreightQuote from './components/FreightQuote';
import About from './components/About';
import CustomsClearance from './components/CustomsClearance';


const HomePage = () => (
  <>
     
    <Hero />
    <Services />
    <WhyChooseUs />
     
    <Contact />
  </>
);



function App() {
  return (
    <Router>
      <ScrollManager />
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/import-export" element={<ImportExport />} />
          <Route path="/services/freight-forwarding" element={<FreightForwarding />} />
          <Route path="/services/courier" element={<CourierServices />} />
          <Route path="/quote/freight" element={<FreightQuote />} />
          <Route path="/about" element={<About />} />
          <Route path="/services/customs-clearance" element={<CustomsClearance />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
