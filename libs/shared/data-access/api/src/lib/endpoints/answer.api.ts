import { apiClient } from '@common/api/client';
import { AnswerListResponse } from '@common/types/answer/answer.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const answerApi = {
  getAnswerByQuestionId: (data: { questionId: string }) =>
    apiClient
      .get<AnswerListResponse>(`/questions/${data.questionId}/answers`)
      .then((res) => res.data),

  createAnswer: (data: { questionId: string; content: string }) =>
    apiClient.post(`/answers`, data),
};

export const ANSWER_QUERY_KEYS = {
  answers: ['answers'] as const,
};

export const useGetAnswerByQuestionId = (id: string) => {
  return useQuery({
    queryKey: [ANSWER_QUERY_KEYS.answers, id],
    queryFn: () => answerApi.getAnswerByQuestionId({ questionId: id }),
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
      toast.success('Answer created successfully!');
    },
  });
};
