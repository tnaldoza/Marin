import type { Temporal } from "@js-temporal/polyfill";

export type Priority = 1 | 2 | 3 | 4 | 5;

export interface Todo {
	id: number;
	title: string;
	notes?: string;
	priority: Priority;
	dateAdded: Temporal.Instant;
	dateDue?: Temporal.PlainDateTime;
	dateCompleted?: Temporal.Instant;
	dateDeleted?: Temporal.Instant;
}

export interface TodoFormData {
	title: string;
	notes: string;
	priority: Priority;
	dateDue: string;
}
