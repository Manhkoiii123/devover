import { apiClient } from '@common/api/client';
import { QUESTION_QUERY_KEYS } from '@common/api/endpoints/question.api';
import {
  AnalyticsQuestionResponse,
  HadSavedVotedQuestionResponse,
} from '@common/types/question/question.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const voteApi = {
  vote: async (id: string, type: 'question' | 'answer') => {
    return apiClient
      .post<string>(`/questions/${id}/vote`, { type })
      .then((res) => res.data);
  },
};

export const VOTE_QUERY_KEYS = {
  votes: ['votes'] as const,
};

export const useVoteQuestionOrAnswer = (
  id: string,
  type: 'question' | 'answer'
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => voteApi.vote(id, type),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: [QUESTION_QUERY_KEYS.questions, id, 'analytics'],
      });
      await queryClient.cancelQueries({
        queryKey: [QUESTION_QUERY_KEYS.questions, id, 'votedSavedQuestion'],
      });

      const previousAnalytics =
        queryClient.getQueryData<AnalyticsQuestionResponse>([
          QUESTION_QUERY_KEYS.questions,
          id,
          'analytics',
        ]);
      const previousVotedSaved =
        queryClient.getQueryData<HadSavedVotedQuestionResponse>([
          QUESTION_QUERY_KEYS.questions,
          id,
          'votedSavedQuestion',
        ]);

      if (previousAnalytics && previousVotedSaved) {
        let upvoteDelta = 0;
        let newIsUpvoted = previousVotedSaved.isUpvoted;

        if (previousVotedSaved.isUpvoted) {
          upvoteDelta = -1;
          newIsUpvoted = false;
        } else {
          upvoteDelta = 1;
          newIsUpvoted = true;
        }

        queryClient.setQueryData<AnalyticsQuestionResponse>(
          [QUESTION_QUERY_KEYS.questions, id, 'analytics'],
          {
            ...previousAnalytics,
            upvotes: previousAnalytics.upvotes + upvoteDelta,
          }
        );

        queryClient.setQueryData<HadSavedVotedQuestionResponse>(
          [QUESTION_QUERY_KEYS.questions, id, 'votedSavedQuestion'],
          {
            ...previousVotedSaved,
            isUpvoted: newIsUpvoted,
          }
        );
      }

      return { previousAnalytics, previousVotedSaved };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousAnalytics) {
        queryClient.setQueryData(
          [QUESTION_QUERY_KEYS.questions, id, 'analytics'],
          context.previousAnalytics
        );
      }
      if (context?.previousVotedSaved) {
        queryClient.setQueryData(
          [QUESTION_QUERY_KEYS.questions, id, 'votedSavedQuestion'],
          context.previousVotedSaved
        );
      }
    },
    onSettled: () => {
      // Refetch to ensure data consistency
      queryClient.invalidateQueries({
        queryKey: [QUESTION_QUERY_KEYS.questions, id, 'analytics'],
      });
      queryClient.invalidateQueries({
        queryKey: [QUESTION_QUERY_KEYS.questions, id, 'votedSavedQuestion'],
      });
    },
  });
};
