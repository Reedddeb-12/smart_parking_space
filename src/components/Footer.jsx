import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="font-bold text-lg mb-3">ParkEase</h3>
            <p className="text-sm text-gray-600">
              AI-powered smart parking solution for modern cities.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#about" className="hover:text-blue-600">About Us</a></li>
              <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
              <li><a href="#privacy" className="hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-blue-600">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Email: contact@parkease.io</li>
              <li>Phone: +91 1234567890</li>
              <li>Address: Chandigarh, India</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-600 pt-6 border-t">
          <p className="mb-2">© 2025 ParkEase - AI-Based Smart Parking Platform</p>
          <p className="text-sm">Powered by LSTM ML Model & YOLOv8 Computer Vision</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
