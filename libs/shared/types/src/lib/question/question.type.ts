export type CreateQuestionBody = {
  title: string;
  content: string;
  tags?: string[];
};

export type Tag = {
  name: string;
};

export type Author = {
  id: number;
  email: string;
  username: string;
  phoneNumber: string | null;
  avatar: string | null;
  bio: string | null;
  location: string | null;
  reputation: number;
  status: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string | null;
};

export type QuestionResponse = {
  id: string;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  viewsCount: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  author: Author;
  answersCount: number;
  bookmarksCount: number;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type QuestionListResponse = {
  data: QuestionResponse[];
  meta: PaginationMeta;
};
