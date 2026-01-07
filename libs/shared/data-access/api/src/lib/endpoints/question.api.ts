import { apiClient } from '@common/api/client';
import {
  CreateQuestionBody,
  QuestionListResponse,
  QuestionResponse,
} from '@common/types/question/question.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const questionApi = {
  createQuestion: async (data: CreateQuestionBody) => {
    return apiClient
      .post<QuestionResponse>('/questions', data)
      .then((res) => res.data);
  },
  getQuestion: async (id: string) => {
    return apiClient
      .get<QuestionResponse>(`/questions/${id}`)
      .then((res) => res.data);
  },
  getQuestions: async (
    query?: string,
    filter?: string
  ): Promise<QuestionListResponse> => {
    return apiClient
      .get('/questions', { params: { query, filter } })
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

export const useGetQuestion = (id: string) => {
  return useQuery({
    queryKey: QUESTION_QUERY_KEYS.question(id),
    queryFn: () => questionApi.getQuestion(id),
    enabled: !!id,
  });
};

export const useGetQuestions = (query?: string, filter?: string) => {
  return useQuery({
    queryKey: QUESTION_QUERY_KEYS.questions,
    queryFn: () => questionApi.getQuestions(query, filter),
  });
};
