import { aggregateExecutionTime } from 'opentelemetry-launcher';
export class ExampleService {
  @aggregateExecutionTime
  syncMethod() {
    for (let i = 0; i < 1e6; i++) {} // Simulate workload
    return 'Sync result';
  }

  @aggregateExecutionTime
  async asyncMethod() {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async workload
    return 'Async result';
  }
}
