import { LeadGenerator } from './entities/LeadGenerator.js';
import { CsvLogger } from './logger/CsvLogger.js';
import { CATEGORY_LIST } from './types/common.js';
import { formatDateTime } from './utils/DateTime.js';

const generator = new LeadGenerator(CATEGORY_LIST);
const logger = new CsvLogger();

(async () => {
  const leads = Array.from({ length: 10 }, () => generator.generate());

  for (const lead of leads) {
    const datetime = formatDateTime(new Date());

    await logger.log(lead, datetime, { logLeadData: true });
  }

  console.log(leads);
})();
