import { CSRFTokenProvider } from '@/app/demos/api-all-in-one/author/csrfTokenProvider';

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <CSRFTokenProvider>{children}</CSRFTokenProvider>;
}
