import { readFile, writeFile, appendFile } from 'fs/promises';
import { access } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
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
    fields: (string | number | boolean)[],
    options: { addToTop?: boolean } = {},
  ): Promise<void> {
    const { addToTop = false } = options;

    const line =
      fields
        .map((field) => {
          const str = String(field);
          return str.includes(',') || str.includes('"')
            ? `"${str.replace(/"/g, '""')}"`
            : str;
        })
        .join(',') + '\n';

    try {
      if (addToTop) {
        let existing = '';
        try {
          await access(this.filePath);
          existing = await readFile(this.filePath, 'utf8');
        } catch {}
        await writeFile(this.filePath, line + existing, 'utf8');
      } else {
        await appendFile(this.filePath, line, 'utf8');
      }
    } catch (error) {
      console.error('Failed to write log:', error);
    }
  }
}
