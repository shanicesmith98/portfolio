type Dated = {
  startDate: string;
  endDate: string | null;
};

/**
 * Most recent first. `null` endDate means "present", which sorts above
 * everything finished. Ties break on startDate, also descending.
 *
 * Shared by `Timeline` and `Education` because array order in `profile.ts` is
 * not a source of truth - that file gets rewritten wholesale when you import a
 * resume, and nothing guarantees the order survives.
 */
export function sortByDate<T extends Dated>(entries: T[]): T[] {
  return [...entries].sort((a, b) => {
    if (a.endDate === null && b.endDate !== null) return -1;
    if (b.endDate === null && a.endDate !== null) return 1;
    if (a.endDate !== null && b.endDate !== null && a.endDate !== b.endDate) {
      return a.endDate < b.endDate ? 1 : -1;
    }
    if (a.startDate === b.startDate) return 0;
    return a.startDate < b.startDate ? 1 : -1;
  });
}
