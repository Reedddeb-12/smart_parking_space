import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import SearchParking from './components/SearchParking';
import BookingPage from './components/BookingPage';
import MyBookings from './components/MyBookings';
import { predictAvailability, updateHistory } from './utils/mlModel';
import { simulateCV } from './utils/cvSimulation';

const App = () => {
  const [userRole, setUserRole] = useState('public');
  const [activeTab, setActiveTab] = useState('home');
  const [parkingLots, setParkingLots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [mlPredictions, setMlPredictions] = useState({});
  const [occupancyHistory, setOccupancyHistory] = useState({});
  const [cvDetections, setCvDetections] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // ML Prediction Engine - Updates every 30 seconds
  useEffect(() => {
    if (parkingLots.length === 0) return;

    const updatePredictions = () => {
      const newPredictions = {};
      const newCV = {};
      let newHistory = { ...occupancyHistory };
      
      parkingLots.forEach(lot => {
        const prediction = predictAvailability(
          lot.id,
          currentTime,
          currentTime.getDay(),
          occupancyHistory
        );
        
        newPredictions[lot.id] = prediction;
        newCV[lot.id] = simulateCV(lot.id, lot.total, prediction);
        newHistory = updateHistory(newHistory, lot.id, prediction);
      });
      
      setMlPredictions(newPredictions);
      setCvDetections(newCV);
      setOccupancyHistory(newHistory);
      
      setParkingLots(prev => prev.map(lot => ({
        ...lot,
        available: Math.floor(lot.total * (newPredictions[lot.id] || 0.5))
      })));
    };

    updatePredictions();
    const interval = setInterval(updatePredictions, 30000);
    return () => clearInterval(interval);
  }, [currentTime, parkingLots.length]);

  const addNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev].slice(0, 5));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header 
        userRole={userRole}
        setUserRole={setUserRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {userRole === 'admin' ? (
          <AdminDashboard
            parkingLots={parkingLots}
            setParkingLots={setParkingLots}
            bookings={bookings}
            mlPredictions={mlPredictions}
            cvDetections={cvDetections}
            addNotification={addNotification}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <Home
                parkingLots={parkingLots}
                notifications={notifications}
                currentTime={currentTime}
                setActiveTab={setActiveTab}
              />
            )}
            {activeTab === 'search' && (
              <SearchParking
                parkingLots={parkingLots}
                mlPredictions={mlPredictions}
                cvDetections={cvDetections}
                currentTime={currentTime}
                setActiveTab={setActiveTab}
              />
            )}
            {activeTab === 'book' && (
              <BookingPage
                parkingLots={parkingLots}
                mlPredictions={mlPredictions}
                cvDetections={cvDetections}
                currentTime={currentTime}
                setBookings={setBookings}
                setActiveTab={setActiveTab}
                addNotification={addNotification}
              />
            )}
            {activeTab === 'bookings' && (
              <MyBookings
                bookings={bookings}
                setActiveTab={setActiveTab}
              />
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
