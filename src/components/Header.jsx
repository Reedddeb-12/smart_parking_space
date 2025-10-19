import React, { useState } from 'react';
import { Car, Menu, X, Settings } from 'lucide-react';

const Header = ({ userRole, setUserRole, activeTab, setActiveTab }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Car className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ParkEase
          </span>
        </div>
        
        {userRole === 'public' ? (
          <>
            <nav className="hidden md:flex gap-6">
              {['home', 'search', 'book', 'bookings'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`font-semibold transition capitalize ${
                    activeTab === tab ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {tab === 'bookings' ? 'My Bookings' : tab}
                </button>
              ))}
            </nav>

            <button
              onClick={() => {
                setUserRole('admin');
                setActiveTab('admin');
              }}
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              <Settings size={18} /> Admin
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setUserRole('public');
              setActiveTab('home');
            }}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Public View
          </button>
        )}

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && userRole === 'public' && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-2">
          {['home', 'search', 'book', 'bookings'].map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setMenuOpen(false); }}
              className="block w-full text-left py-2 font-semibold text-gray-600 hover:text-blue-600 capitalize"
            >
              {tab === 'bookings' ? 'My Bookings' : tab}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
