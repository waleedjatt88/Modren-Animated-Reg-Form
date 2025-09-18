import React, { useState, useEffect } from 'react'; 
import Navbar from './Navbar';
import Footer from './Footer';
import TrackingStatus from './TrackingStatus';
import CustomerDashboard from '../dashboard/CustomerDashboard'; 
import { parcelService } from '../../services/parcelService'; 
import './LandingPage.css';
import { useAuth } from '../../context/AuthContext';
import ParcelsView from '../parcels/ParcelsView'; 



const LandingPage = () => {
  const [view, setView] = useState('landing'); 
  const [trackingId, setTrackingId] = useState('');
  const [parcelStatus, setParcelStatus] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); 

  useEffect(() => {
    if (!user) {
      setView('landing');
    }
  }, [user]);

     const handleTrackParcel = async (e) => {
    e.preventDefault();
    if (!trackingId) {
      setError('Please enter a tracking ID.');
      return;
    }
    setLoading(true);
    setError('');
    setParcelStatus(null);
    try {
        const response = await parcelService.trackParcelById(trackingId);
        if (response.data && response.data.status) {
            setParcelStatus(response.data.status);
        } else {
            setError('Tracking ID not found.');
        }
    } catch (err) {
        setError('Tracking ID not found or an error occurred.');
    } finally {
        setLoading(false);
    }
  };

  if (view === 'profile') {
    return <CustomerDashboard onBack={() => setView('landing')} />;
  }
  if (view === 'parcels') {
    return <ParcelsView onBack={() => setView('landing')} />;
  }
  
  return (
    <div className="landing-container">
<Navbar 
        onViewProfileClick={() => setView('profile')} 
        onViewParcelsClick={() => setView('parcels')}
      />        
 <main className="main-content">

        
        <div className="content-wrapper"> 
          {user && (
            <div className="welcome-message-container">
              <h2 className="welcome-user-heading">
                Hello, {user.fullName }!
              </h2>
              <p className="welcome-user-subtext">Welcome back. Let's track your parcel.</p>
            </div>
          )}
        </div>
         <div className="tracking-container">
          <h1 className="tracking-heading">Track Your Parcel</h1>
          <p className="tracking-subheading">Enter your tracking ID below to see the status of your delivery.</p>
          <form className="tracking-form" onSubmit={handleTrackParcel}>
            <input 
              type="text" 
              className="tracking-input" 
              placeholder="Enter Tracking ID (e.g., PK-XXXXXXXXXXXX)"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Searching...' : 'Track'}
            </button>
          </form>

          {error && <p style={{ color: '#ff4d4d', marginTop: '20px' }}>{error}</p>}
          {parcelStatus && <TrackingStatus status={parcelStatus} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;