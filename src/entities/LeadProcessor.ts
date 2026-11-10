import pLimit from 'p-limit';
import type { Lead } from '../types/common.js';
import { CsvLogger } from '../logger/CsvLogger.js';
import { formatDateTime } from '../utils/DateTime.js';

/**
 * Class for processing leads.
 * Provides a processLeads method that accepts an array of leads to process.
 * Processes multiple leads in parallel, with concurrency limited by the `limit` parameter.
 * If any task fails, its result is not logged, but the other leads continue processing.
 */

export class LeadProcessor {
  private logger: CsvLogger;
  private limit: number;

  constructor(logger: CsvLogger, limit = 10) {
    this.logger = logger;
    this.limit = limit;
  }

  async processLeads(leads: Lead[]): Promise<void> {
    const runningLimit = pLimit(this.limit);

    const tasks = leads.map((lead) =>
      runningLimit(async () => {
        try {
          const datetime = formatDateTime(new Date());
          const { id, category } = lead;

          // Tested what happens when some leads fail.
          //
          // if (id === 20 || id === 21 || id === 24 || id === 50) {
          //   await Promise.reject(id);
          // } else {
          //   await new Promise((resolve) => setTimeout(resolve, 2000));
          // }

          // Wait for 2 seconds (simulating a long-running operation).
          await new Promise((resolve) => setTimeout(resolve, 2000));
          await this.logger.log([id, category, datetime]);
        } catch (e) {
          console.error(`Lead cannot be processed. Id:`, e);
        }
      }),
    );

    await Promise.all(tasks);
  }
}
