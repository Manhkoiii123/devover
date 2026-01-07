'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useState } from 'react';
import rehypeHighlight from 'rehype-highlight';

const Preview = ({ content }: { content: string }) => {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const formattedContent = content.replace(/\\/g, '').replace(/&#x20;/g, '');

    serialize(formattedContent, {
      mdxOptions: {
        rehypePlugins: [rehypeHighlight],
      },
    })
      .then(setMdxSource)
      .catch((err) => setError(err.message));
  }, [content]);

  if (error) {
    return (
      <section className="markdown !max-w-full prose grid break-words">
        <div className="text-red-500">Error parsing content: {error}</div>
      </section>
    );
  }

  if (!mdxSource) {
    return (
      <section className="markdown !max-w-full prose grid break-words">
        <div>Loading...</div>
      </section>
    );
  }

  return (
    <section className="markdown !max-w-full prose grid break-words w-full">
      <MDXRemote
        {...mdxSource}
        components={{
          pre: (props) => (
            <pre
              {...props}
              className="shadow-light-200 dark:shadow-dark-200 overflow-x-auto rounded-lg p-4"
            />
          ),
        }}
      />
    </section>
  );
};

export default Preview;
