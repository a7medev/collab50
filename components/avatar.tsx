import Image from 'next/image';

interface AvatarProps {
  username: string;
}

const Avatar: React.FC<AvatarProps> = ({ username }) => {
  return (
    <div className="rounded-full w-16 h-16 bg-green-100 inline-flex items-center justify-center">
      <Image
        src={`https://avatars.dicebear.com/4.9/api/bottts/${username}.svg`}
        alt="Avatar"
        width={50}
        height={50}
      />
    </div>
  );
};

export default Avatar;
