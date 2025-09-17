// src/features/parcels/ParcelsView.jsx
import React, { useState, useEffect } from 'react';
import { parcelService } from '../../services/parcelService';
import './Parcels.css';

// Zone ID ko naam mein badalne ke liye helper object
const ZONE_MAP = {
  1: "Punjab",
  2: "Sindh",
  3: "KPK",
  4: "Balochistan",
};

const ParcelsView = ({ onBack }) => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParcels = async () => {
      setLoading(true); 
      try {
        const response = await parcelService.getMyParcels();
        const parcelsData = response.data.parcels;

        if (Array.isArray(parcelsData)) {
          setParcels(parcelsData);
        } else {
          console.error("The 'parcels' property in the API response is not an array:", parcelsData);
          setParcels([]); 
        }

      } catch (error) {
        console.error("Failed to fetch parcels:", error);
        setParcels([]); 
      } finally {
        setLoading(false); 
      }
    };
    fetchParcels();
  }, []);

  if (loading) {
    return (
      <div className="parcels-container">
        <div className="parcels-card">
          <h1>Loading Parcels...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="parcels-container">
      <div className="parcels-card">
        <div className="parcels-header">
          <h1>My Parcels</h1>
          <i className="bx bx-arrow-back back-icon" onClick={onBack} title="Back to Home"></i>
        </div>
        
        <div className="table-wrapper">
          {parcels.filter(p => p.status !== 'unconfirmed').length > 0 ? (
            <table className="parcels-table">
              <thead>
                <tr>
                  <th>Tracking #</th>
                  <th>Pickup Address</th>
                  <th>Delivery Address</th>
                  <th>Pickup Zone</th>
                  <th>Delivery Zone</th>
                  <th>Contents</th>
                  <th>Payment</th>
                  <th>Charge</th>
                </tr>
              </thead>
              <tbody>
                {parcels
                  .filter(parcel => parcel.status !== 'unconfirmed') 
                  .map(parcel => ( 
                    <tr key={parcel.id}>
                      <td>{parcel.trackingNumber}</td>
                      <td>{parcel.pickupAddress}</td>
                      <td>{parcel.deliveryAddress}</td>
                      <td>{ZONE_MAP[parcel.pickupZoneId] || 'N/A'}</td>
                      <td>{ZONE_MAP[parcel.deliveryZoneId] || 'N/A'}</td>
                      <td>{parcel.packageContent}</td>
                      <td>{parcel.paymentMethod || 'Not specified'}</td>
                      <td>{parcel.deliveryCharge}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          ) : (
            <div className="no-parcels-message">You have no parcels yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParcelsView;