export type CreateQuestionBody = {
  title: string;
  content: string;
  tags?: string[];
};

export type Tag = {
  id?: string;
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

export type AnswerAuthor = {
  id: number;
  name: string;
  avatar: string;
  email: string;
};

export type Answer = {
  id: string;
  content: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: AnswerAuthor;
};

export type QuestionResponse = {
  id: string;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  viewsCount: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  author: Author;
  answers: Answer[];
  answersCount?: number;
  bookmarksCount?: number;
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

export type AnalyticsQuestionResponse = {
  viewsCount: number;
  upvotes: number;
  downvotes: number;
  answersCount: number;
};

export type HadSavedVotedQuestionResponse = {
  isUpvoted: boolean;
  isSaved: boolean;
  isDownvoted: boolean;
};
