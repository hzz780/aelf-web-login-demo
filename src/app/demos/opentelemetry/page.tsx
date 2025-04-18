'use client';
// import { useContext } from 'react';
// const { context, trace } = require('@opentelemetry/api');
import { context, trace } from '@opentelemetry/api';
import { Button } from 'aelf-design';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { ExceptionCaptureInstrumentation } from '@/app/demos/opentelemetry/exceptionCaptureInstrumentation';
import { useOpentelemetry } from '@/hooks/useOpentelemetry';
// import { aggregateExecutionTime } from 'opentelemetry-launcher';
import { ExampleService } from '@/app/demos/opentelemetry/decoraterDemo';

const getData = (url: string) =>
  new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('Accept', 'application/json');
    req.onload = () => {
      resolve(null);
    };
    req.onerror = () => {
      reject();
    };
    req.send();
  });
// const URL_TEST = 'https://httpbin.org/get?trace=233333';
// const URL_TEST = '/v1/api/app/book';
const URL_TEST = 'https://gcptest-indexer-api.aefinder.io/api/apps';
export default function Page() {
  // Solution1: use useContext
  // const webTracerWithZone = useContext(OpentelemetryContext);
  // Solution2: use useOpentelemetry
  const webTracerWithZone = useOpentelemetry();

  return (
    <>
      <Button
        onClick={() => {
          getData(URL_TEST).then(
            (_data) => {
              // trace.getSpan(context.active()).addEvent('fetching-span1-completed');
              // span1.end();
            },
            () => {
              // trace.getSpan(context.active()).addEvent('fetching-error');
              // span1.end();
            },
          );
        }}
      >
        Test
      </Button>
      <Button
        onClick={() => {
          if (!webTracerWithZone) {
            return;
          }
          for (let i = 0, j = 1; i < j; i += 1) {
            const span1 = webTracerWithZone.startSpan(
              `cad-files-series-info-${i}`,
            );
            context.with(trace.setSpan(context.active(), span1), () => {
              getData(URL_TEST).then(
                (_data) => {
                  // @ts-ignore
                  trace
                    .getSpan(context.active())
                    .addEvent('cad-fetching-span1-completed');
                  span1.end();
                },
                () => {
                  // @ts-ignore
                  trace
                    .getSpan(context.active())
                    .addEvent('cad-fetching-error');
                  span1.end();
                },
              );
            });
          }
        }}
      >
        Test With Event
      </Button>
      <Button
        onClick={async () => {
          const res = await fetch(URL_TEST);
          console.log('fetch response: ', res);
        }}
      >
        Fetch
      </Button>
      <Button
        onClick={async () => {
          registerInstrumentations({
            instrumentations: [
              new ExceptionCaptureInstrumentation({
                enabled: true,
                captureUnhandledRejections: true,
              }),
            ],
          });

          const res = await fetch('/api/demos/sentry-example-api');
          if (!res.ok) {
            throw new Error('Sentry Example Frontend Error');
          }
        }}
      >
        Request Failed
      </Button>
      <Button
        onClick={async () => {
          const service = new ExampleService();
          service.syncMethod();
          await service.asyncMethod();
        }}
      >
        aggregateExecutionTime
      </Button>
    </>
  );
}
