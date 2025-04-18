import {
  InstrumentationBase,
  InstrumentationConfig,
} from '@opentelemetry/instrumentation';
import { Span, trace } from '@opentelemetry/api';

interface ExceptionCaptureConfig extends InstrumentationConfig {
  captureUnhandledRejections?: boolean;
}

class ExceptionCaptureInstrumentation extends InstrumentationBase<ExceptionCaptureConfig> {
  constructor(config: ExceptionCaptureConfig = {}) {
    super('exception-capture-instrumentation', '1.0.0', config);
  }

  init() {
    return [];
  }

  override enable() {
    this._initializeGlobalErrorHandler();
  }

  override disable() {
    this._resetGlobalErrorHandler();
  }

  private _initializeGlobalErrorHandler() {
    window.onerror = (message, source, lineno, colno, error) => {
      const span: Span = this.tracer.startSpan('window.onerror');
      span.setAttribute('error.message', message as any);
      span.setAttribute('error.source', source as any);
      span.setAttribute('error.lineno', lineno as any);
      span.setAttribute('error.colno', colno as any);
      if (error) {
        span.recordException(error);
      }
      span.end();
    };

    if (this._config.captureUnhandledRejections) {
      window.onunhandledrejection = (event) => {
        const span: Span = this.tracer.startSpan('window.onunhandledrejection');
        span.setAttribute('error.reason', event.reason);
        span.recordException(event.reason);
        span.end();
      };
    }
  }

  private _resetGlobalErrorHandler() {
    window.onerror = null;
    window.onunhandledrejection = null;
  }
}

export { ExceptionCaptureInstrumentation };
