'use client';
import { toast } from 'sonner';
import Image from 'next/image';
import React, { use, useState } from 'react';
import { formatNumber } from '@common/utils/number.utils';
import Upvoted from '@common/assets/icons/upvoted.svg';
import Downvoted from '@common/assets/icons/downvoted.svg';
import Upvote from '@common/assets/icons/upvote.svg';
import Downvote from '@common/assets/icons/downvote.svg';

interface Params {
  targetType: 'question' | 'answer';
  targetId: string;
  upvotes: number;
  downvotes: number;
  isUpvoted: boolean;
  isDownvoted: boolean;
}

const Votes = ({
  upvotes,
  downvotes,
  targetType,
  targetId,
  isUpvoted,
  isDownvoted,
}: Params) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleVote = async (voteType: 'upvote' | 'downvote') => {};

  return (
    <div className="flex-center gap-2.5">
      <div className="flex-center gap-1.5">
        <Image
          src={isUpvoted ? Upvoted : Upvote}
          width={18}
          height={18}
          alt="upvote"
          className={`cursor-pointer ${isLoading && 'opacity-50'}`}
          aria-label="Upvote"
          onClick={() => !isLoading && handleVote('upvote')}
        />

        <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
          <p className="suble-medium text-dark400_light900">
            {formatNumber(upvotes)}
          </p>
        </div>
      </div>

      <div className="flex-center gap-1.5">
        <Image
          src={isDownvoted ? Downvoted : Downvote}
          width={18}
          height={18}
          alt="downvote"
          className={`cursor-pointer ${isLoading && 'opacity-50'}`}
          aria-label="Downvote"
          onClick={() => !isLoading && handleVote('downvote')}
        />

        <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
          <p className="suble-medium text-dark400_light900">
            {formatNumber(downvotes)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Votes;
