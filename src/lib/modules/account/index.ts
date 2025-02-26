import type { InferSelectModel } from 'drizzle-orm';
import type { accounts } from './drizzle-schema.sqlite';

export type AccountEntity = InferSelectModel<typeof accounts>;
