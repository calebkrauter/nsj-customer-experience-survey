import Image from 'next/image';

export function Hero() {
  return (
    <Image
      src='/nsj-logo.jpg'
      width={125}
      height={125}
      alt='North Star Jet Logo'
      className='logo'
    ></Image>
  );
}
