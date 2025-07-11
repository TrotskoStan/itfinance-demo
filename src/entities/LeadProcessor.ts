import pLimit from 'p-limit';
import type { Lead } from '../types/common.js';
import { CsvLogger } from '../logger/CsvLogger.js';
import { formatDateTime } from '../utils/DateTime.js';

//** Класс обработки заявок.
// Имееет метод processLeads котрый принимает массив заявок на обрабоку.
// Выполняет параллельно несколько заявок, ограниченный параметром limit.
// Если какая то из задач завершается с ощибкой то результат не пишется в лог,
// но другие заявки продолжают выполняться.
//  */

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

          //Тестировал если какие то заявки упадут
          //
          // if (id === 20 || id === 21 || id === 24 || id === 50 ) {
          //   await Promise.reject(id)
          // } else {
          // await new Promise((resolve) => setTimeout(resolve, 2000));
          // }

          // «засыпаем» на 2 секунды (эмуляция тяжёлой операции)
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
