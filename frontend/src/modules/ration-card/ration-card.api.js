import api from "@/lib/api";

export const getRationCardsApi = async (params) => {
  const response = await api.get("/ration-cards", { params });
  return response.data;
};

export const getRationCardApi = async (id) => {
  const response = await api.get(`/ration-cards/${id}`);
  return response.data;
};

export const createRationCardApi = async (payload) => {
  const response = await api.post("/ration-cards", payload);
  return response.data;
};

export const updateRationCardApi = async (id, payload) => {
  const response = await api.put(`/ration-cards/${id}`, payload);
  return response.data;
};

export const addMemberApi = async (cardId, payload) => {
  const response = await api.post(
    `/ration-cards/${cardId}/member`,
    payload
  );
  return response.data;
};

export const updateMemberApi = async (
  cardId,
  memberId,
  payload
) => {
  const response = await api.put(
    `/ration-cards/${cardId}/member/${memberId}`,
    payload
  );
  return response.data;
};

export const deleteMemberApi = async (
  cardId,
  memberId
) => {
  const response = await api.delete(
    `/ration-cards/${cardId}/member/${memberId}`
  );
  return response.data;
};

// import api from "@/lib/api";

// export const getRationCardsApi = async (params) => {
//   const response = await api.get("/ration-cards", {
//     params,
//   });

//   return response.data;
// };

// export const getRationCardApi = async (id) => {
//   const response = await api.get(`/ration-cards/${id}`);
//   return response.data;
// };

// export const createRationCardApi = async (payload) => {
//   const response = await api.post(
//     "/ration-cards",
//     payload
//   );

//   return response.data;
// };

// export const updateRationCardApi = async (
//   id,
//   payload
// ) => {
//   const response = await api.put(
//     `/ration-cards/${id}`,
//     payload
//   );

//   return response.data;
// };