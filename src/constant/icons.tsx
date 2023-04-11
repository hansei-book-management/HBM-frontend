import { FaTwitter, FaFacebookF } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';

export interface IconType {
  icon: React.ReactNode;
  href: string;
}

export const ICON_LIST: IconType[] = [
  {
    icon: <FaTwitter size="1.2rem" />,
    href: '/',
  },
  {
    icon: <FaFacebookF size="1.1rem" />,
    href: '/',
  },
  {
    icon: <FiInstagram size="1.4rem" />,
    href: '/',
  },
];
