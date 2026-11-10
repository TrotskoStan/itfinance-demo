import { Lead } from '../types/common.js';

/**
 * Base abstract class for lead generators.
 * I'm not sure if this class is necessary, but the task requires
 * using OOP with an abstract class.
 */

export abstract class LeadGeneratorBase {
  abstract generate(): Lead;
}
