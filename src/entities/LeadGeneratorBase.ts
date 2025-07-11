import { Lead } from '../types/common.js';

//** Базовый абстрактный класс генератора заявок.
// Не уверен если этот класс нам нужен но в задании требуется
// использовать ООП с абстрактным классом
//  */

export abstract class LeadGeneratorBase {
  abstract generate(): Lead;
}
