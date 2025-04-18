import { OpentelemetryProvider } from '@/app/demos/opentelemetry/OpentelemetryProvider';

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <OpentelemetryProvider>
      <div>{children}</div>
    </OpentelemetryProvider>
  );
}
