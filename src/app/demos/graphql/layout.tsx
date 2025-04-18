import { Menu } from 'antd';
import Link from 'next/link';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '1', label: <Link href="/demos/graphql/server">Server</Link> },
  { key: '2', label: <Link href="/demos/graphql/client">Client</Link> },
];
export default function GraphqlLayout({
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
