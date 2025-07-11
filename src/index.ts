import { LeadGenerator } from './entities/LeadGenerator.js';
import { LeadProcessor } from './entities/LeadProcessor.js';
import { CsvLogger } from './logger/CsvLogger.js';
import { CATEGORY_LIST } from './types/common.js';
import { formatDuration } from './utils/DateTime.js';

const TOTAL_LEADS = 10000;
const ASYNC_LIMIT = 34;

const generator = new LeadGenerator(CATEGORY_LIST);
const logger = new CsvLogger();
const leadProcessor = new LeadProcessor(logger, ASYNC_LIMIT);

(async () => {
  const leads = Array.from({ length: TOTAL_LEADS }, () => generator.generate());

  const start = Date.now();

  await leadProcessor.processLeads(leads);

  const end = Date.now();
  const duration = formatDuration(end - start);

  await logger.log(
    [
      `Records: ${TOTAL_LEADS}`,
      `AsyncLimit: ${ASYNC_LIMIT}`,
      `TimeTotal: ${duration}`,
    ],
    { addToTop: true },
  );
})();
