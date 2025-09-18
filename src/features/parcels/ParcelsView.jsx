import React, { useState, useEffect } from "react";
import { parcelService } from "../../services/parcelService";
import { handleApiCall } from "../../helpers/toast.helper";
import "./Parcels.css";

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
        const response = await handleApiCall(
          () => parcelService.getMyParcels(), // ✅ function, not direct call
          {
            pending: "Loading parcels...",
            success: "Parcels loaded!",
            error: "Failed to load parcels.",
          }
        );

        const parcelsData = response.data.parcels;
        setParcels(Array.isArray(parcelsData) ? parcelsData : []);
      } catch (error) {
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
          <i
            className="bx bx-arrow-back back-icon"
            onClick={onBack}
            title="Back to Home"
          ></i>
        </div>

        <div className="table-wrapper">
          {parcels.filter((p) => p.status !== "unconfirmed").length > 0 ? (
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
                  .filter((parcel) => parcel.status !== "unconfirmed")
                  .map((parcel) => (
                    <tr key={parcel.id}>
                      <td>{parcel.trackingNumber}</td>
                      <td>{parcel.pickupAddress}</td>
                      <td>{parcel.deliveryAddress}</td>
                      <td>{ZONE_MAP[parcel.pickupZoneId] || "N/A"}</td>
                      <td>{ZONE_MAP[parcel.deliveryZoneId] || "N/A"}</td>
                      <td>{parcel.packageContent}</td>
                      <td>{parcel.paymentMethod || "Not specified"}</td>
                      <td>{parcel.deliveryCharge}</td>
                    </tr>
                  ))}
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
