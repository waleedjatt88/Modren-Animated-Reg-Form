import api from "./api";

const getMyParcels = () => {
  return api.get('/parcels/my'); 
};

export const parcelService = {
  getMyParcels,
};