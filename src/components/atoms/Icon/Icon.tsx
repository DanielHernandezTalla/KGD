import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICON } from '@/interface/types';
import { ICONS } from './rawIcons';

export interface IconProps {
  icon: ICON;
  className?: string;
}

const Icon = ({ icon, className }: IconProps) => (
  <FontAwesomeIcon className={className} icon={ICONS[icon]} />
);

export default Icon;
