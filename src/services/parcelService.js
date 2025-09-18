import api from "./api";

const getMyParcels = () => {
  return api.get('/parcels/my'); 
};

const trackParcelById = (trackingId) => {
  return api.get(`/track/${trackingId}`);
};


export const parcelService = {
  getMyParcels,
  trackParcelById, 
};