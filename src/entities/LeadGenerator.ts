import { Category, Lead, Payload } from '../types/common.js';
import { LeadGeneratorBase } from './LeadGeneratorBase.js';
import { randomUUID } from 'crypto';

//** Класс для генерации отдельной заявки - Lead
//   Категория заявки и данные назначаются случайным образом
//  */
export class LeadGenerator extends LeadGeneratorBase {
  private categories: Category[];
  private idCounter: number;

  constructor(categories: Category[]) {
    super();
    this.categories = categories;
    this.idCounter = 0;
  }

  private getRandomCategory(): Category {
    const index = Math.floor(Math.random() * this.categories.length);
    return this.categories[index];
  }

  generate(): Lead {
    const id = ++this.idCounter;
    const category = this.getRandomCategory();
    const payload: Payload = {
      data: randomUUID(),
    };
    return { id, category, payload };
  }
}
