import HomeIcon from '@common/assets/icons/home.svg';
import UsersIcon from '@common/assets/icons/users.svg';
import StarIcon from '@common/assets/icons/star.svg';
import SuitcaseIcon from '@common/assets/icons/suitcase.svg';
import TagIcon from '@common/assets/icons/tag.svg';
import UserIcon from '@common/assets/icons/user.svg';
import QuestionIcon from '@common/assets/icons/question.svg';

export const sidebarLinks = [
  {
    imgURL: HomeIcon,
    route: '/',
    lable: 'Home',
  },
  {
    imgURL: UsersIcon,
    route: '/community',
    lable: 'Community',
  },
  {
    imgURL: StarIcon,
    route: '/collection',
    lable: 'Collection',
  },
  {
    imgURL: SuitcaseIcon,
    route: '/jobs',
    lable: 'Find Jobs',
  },
  {
    imgURL: TagIcon,
    route: '/tags',
    lable: 'Tags',
  },
  {
    imgURL: UserIcon,
    route: '/profile',
    lable: 'Profile',
  },
  {
    imgURL: QuestionIcon,
    route: '/ask-question',
    lable: 'Ask a Question',
  },
];
