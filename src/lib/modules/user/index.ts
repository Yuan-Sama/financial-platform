import type { InferSelectModel } from 'drizzle-orm';
import type { users } from './drizzle-schema.sqlite';

export type UserEntity = InferSelectModel<typeof users>;
