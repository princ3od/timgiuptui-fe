import Link from 'next/link';

import logo from '@assets/logo.png';

import ShimmerImage from '../ShimmerImage';

interface Props {
  size?: number;
  width?: number;
  height?: number;
}

const Logo: React.FC<Props> = (props) => {
  const { size = 64, width = 189, height = 90 } = props;
  return (
    <Link href="/" legacyBehavior>
      <a>
        <ShimmerImage
          src={logo}
          alt="Sherdtrip Logo"
          width={width || size * 2}
          height={height || size}
          priority
          cursor="pointer"
          objectFit="cover"
        />
      </a>
    </Link>
  );
};

export default Logo;
