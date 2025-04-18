import { Menu } from 'antd';
import Link from 'next/link';
// import type { MenuProps } from 'antd';

// type MenuItem = Required<MenuProps>['items'][number];

const items: { label: JSX.Element; key: string }[] = [
  { key: '1', label: <Link href="/demos/api-all-in-one/fetch">Fetch</Link> },
  {
    key: '2',
    label: <Link href="/demos/api-all-in-one/graphql">Graphql</Link>,
  },
  { key: '3', label: <Link href="/demos/api-all-in-one/socket">Socket</Link> },
  { key: '4', label: <Link href="/demos/api-all-in-one/stream">Stream</Link> },
  { key: '5', label: <Link href="/demos/api-all-in-one/author">Author</Link> },
];
export default function APIAllInOneLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Menu mode="horizontal" items={items} />
      <div>{children}</div>
    </>
  );
}
