import { appendFile } from 'fs/promises';
import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { Lead } from '../types/common.js';
import { formatDateTime } from '../utils/DateTime.js';

//** Класс для логгирования заявок - записи в CSV файл */
export class CsvLogger {
  private filePath: string;

  constructor(outputDir = 'output') {
    try {
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
      }
    } catch (error) {
      console.error('Failed to create output directory:', error);
    }

    const filename = `log_${formatDateTime(new Date())}.csv`;
    this.filePath = join(outputDir, filename);
  }

  async log(
    lead: Lead,
    datetime: string,
    config: { logLeadData?: boolean } = {},
  ): Promise<void> {
    const { logLeadData = false } = config;
    const { id, category, payload } = lead;

    const leadData = logLeadData ? `,${payload.data}` : '';
    const line = `${id},${category},${datetime}${leadData}\n`;

    try {
      await appendFile(this.filePath, line, 'utf8');
    } catch (error) {
      console.error('Failed to write log:', error);
    }
  }
}
