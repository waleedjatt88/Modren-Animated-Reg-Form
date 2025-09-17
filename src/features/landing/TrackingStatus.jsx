import React from 'react';

const STATUS_MAP = {
  order_placed: { label: "Order Placed", icon: "bx bx-package" },
  scheduled: { label: "Order Placed", icon: "bx bx-package" }, 
  picked_up: { label: "Picked Up", icon: "bx bxs-truck" },
  in_transit: { label: "In Transit", icon: "bx bx-trip" },
  out_for_delivery: { label: "Out for Delivery", icon: "bx bxs-box" },
  delivered: { label: "Delivered", icon: "bx bxs-check-shield" },
  cancelled: { label: "Cancelled", icon: "bx bxs-x-circle" },
};

const TrackingStatus = ({ status }) => {
  const allStatuses = Object.keys(STATUS_MAP).filter(s => s !== 'scheduled' && s !== 'cancelled');
  const currentIndex = allStatuses.indexOf(status === 'scheduled' ? 'order_placed' : status);

  if (status === 'cancelled') {
    return (
      <ul className="status-timeline">
        <li className="timeline-item cancelled">
          <div className="timeline-content">
            <i className={`timeline-icon ${STATUS_MAP.cancelled.icon}`}></i>
            <div className="timeline-details">
              <h4>{STATUS_MAP.cancelled.label}</h4>
              <p>This parcel has been cancelled.</p>
            </div>
          </div>
        </li>
      </ul>
    );
  }

  return (
    <ul className="status-timeline">
      {allStatuses.map((s, index) => (
        <li 
          key={s} 
          className={`timeline-item ${index <= currentIndex ? 'completed' : ''}`}
        >
          <div className="timeline-content">
            <i className={`timeline-icon ${STATUS_MAP[s].icon}`}></i>
            <div className="timeline-details">
              <h4>{STATUS_MAP[s].label}</h4>
              <p>Your parcel is at this stage.</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TrackingStatus;