export type CreateQuestionBody = {
  title: string;
  content: string;
  tags?: string[];
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
};
