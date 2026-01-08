'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@common/ui/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@common/ui/components/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnswerSchema } from '@common/validations/answer.validation';
import dynamic from 'next/dynamic';
import { MDXEditorMethods } from '@mdxeditor/editor';
import { z } from 'zod';
import { useCreateAnswer } from '@common/api/endpoints/answer.api';

const Editor = dynamic(() => import('@common/ui/components/editor'), {
  ssr: false,
});

const AnswerForm = ({ questionId }: { questionId: string }) => {
  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: '',
    },
  });

  const { mutate: createAnswer, isPending } = useCreateAnswer(questionId);

  const handleSubmit = async (values: z.infer<typeof AnswerSchema>) => {
    const data = {
      questionId,
      content: values.content,
    };
    createAnswer(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h3 className="paragraph-semibold text-dark400_light800">
          Write your answer here{' '}
        </h3>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-6 flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl>
                  <Editor
                    value={field.value}
                    editorRef={editorRef}
                    fieldChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              disabled={isPending}
              type="submit"
              className="primary-gradient w-fit"
            >
              Post Answer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;
