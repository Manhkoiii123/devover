import { apiClient } from '@common/api/client';
import {
  CreateQuestionBody,
  QuestionResponse,
} from '@common/types/question/question.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const questionApi = {
  createQuestion: async (data: CreateQuestionBody) => {
    return apiClient
      .post<QuestionResponse>('/questions', data)
      .then((res) => res.data);
  },
};

export const QUESTION_QUERY_KEYS = {
  questions: ['questions'] as const,
  question: (id: string) => ['questions', id] as const,
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: questionApi.createQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUESTION_QUERY_KEYS.questions,
      });
      toast.success('Question created successfully!');
    },
  });
};
