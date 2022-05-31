import Link from 'next/link';
import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();
  return (
    <div>
      Coffee stores, {router.query.id}
      <Link href='/'>
        <a>Back to home</a>
      </Link>
    </div>
  );
};

export default index;
