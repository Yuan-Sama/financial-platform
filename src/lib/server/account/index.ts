import type { InferSelectModel } from 'drizzle-orm';
import type { accounts } from './drizzle-schema';

export type Account = InferSelectModel<typeof accounts>;
