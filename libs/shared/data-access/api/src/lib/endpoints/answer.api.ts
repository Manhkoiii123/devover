import { apiClient } from '@common/api/client';
import { QUESTION_QUERY_KEYS } from '@common/api/endpoints/question.api';
import { AnswerListResponse } from '@common/types/answer/answer.type';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

export const answerApi = {
  getAnswerByQuestionId: (data: { questionId: string; page: number }) =>
    apiClient
      .get<AnswerListResponse>(
        `/questions/${data.questionId}/answers?page=${data.page}`
      )
      .then((res) => res.data),

  createAnswer: (data: { questionId: string; content: string }) =>
    apiClient.post(`/answers`, data),
};

export const ANSWER_QUERY_KEYS = {
  answers: ['answers'] as const,
};

export const useGetAnswerByQuestionId = (id: string) => {
  return useInfiniteQuery({
    queryKey: [ANSWER_QUERY_KEYS.answers, id],
    queryFn: ({ pageParam = 1 }) =>
      answerApi.getAnswerByQuestionId({ questionId: id, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    enabled: !!id,
  });
};

export const useCreateAnswer = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: answerApi.createAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ANSWER_QUERY_KEYS.answers, id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUESTION_QUERY_KEYS.questions, id, 'analytics'],
      });
      toast.success('Answer created successfully!');
    },
  });
};
