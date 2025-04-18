'use client';
import type { ReactNode } from 'react';
import { initWebTracerWithZone } from 'opentelemetry-launcher';
import { createContext, useEffect, useState } from 'react';
import { Tracer } from '@opentelemetry/sdk-trace-base';
import { APP_SETTINGS } from '../../../../appsettings';
interface Props {
  readonly children: ReactNode;
}
export const OpentelemetryContext = createContext<Tracer | undefined>(
  undefined,
);

export const OpentelemetryProvider = ({ children }: Props) => {
  const [webTracerWithZone, setWebTracerWithZone] = useState<Tracer>();
  useEffect(() => {
    const _webTracerWithZone = initWebTracerWithZone(
      APP_SETTINGS.openTelemetry,
    );
    setWebTracerWithZone(_webTracerWithZone);
    console.log('getWebTracerWithZone done');
  }, []);

  return (
    <OpentelemetryContext.Provider value={webTracerWithZone}>
      {children}
    </OpentelemetryContext.Provider>
  );
};
