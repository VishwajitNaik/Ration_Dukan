import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getRationCardsApi,
  getRationCardApi,
  createRationCardApi,
  updateRationCardApi,
  addMemberApi,
  updateMemberApi,
  deleteMemberApi,
} from "./ration-card.api";

/**
 * List
 */
export const useRationCards = (params) =>
  useQuery({
    queryKey: ["ration-cards", params],
    queryFn: () => getRationCardsApi(params),
  });

/**
 * Single Card
 */
export const useRationCard = (id) =>
  useQuery({
    queryKey: ["ration-card", id],
    queryFn: () => getRationCardApi(id),
    enabled: !!id,
  });

/**
 * Create Card
 */
export const useCreateRationCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRationCardApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ration-cards"],
      });
    },
  });
};

/**
 * Update Card
 */
export const useUpdateRationCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) =>
      updateRationCardApi(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["ration-cards"],
      });

      queryClient.invalidateQueries({
        queryKey: ["ration-card", variables.id],
      });
    },
  });
};

/**
 * Add Member
 */
export const useAddMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cardId, payload }) =>
      addMemberApi(cardId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["ration-card", variables.cardId],
      });
    },
  });
};

/**
 * Update Member
 */
export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cardId,
      memberId,
      payload,
    }) =>
      updateMemberApi(
        cardId,
        memberId,
        payload
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["ration-card", variables.cardId],
      });
    },
  });
};

/**
 * Delete Member
 */
export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cardId, memberId }) =>
      deleteMemberApi(cardId, memberId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["ration-card", variables.cardId],
      });
    },
  });
};