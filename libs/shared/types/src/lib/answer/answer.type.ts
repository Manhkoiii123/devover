export interface AnswerAuthor {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface Answer {
  id: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author: AnswerAuthor;
}

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type AnswerListResponse = {
  data: Answer[];
  meta: PaginationMeta;
};
