interface PaginationItem {
  slug?: { current?: string } | null;
}

interface PaginationResult {
  prevSlug: string | null;
  nextSlug: string | null;
}

/**
 * Gets previous and next slugs for pagination with looping support
 *
 * @param items Array of items with slug property (like posts or projects)
 * @param currentSlug The slug of the current item
 * @returns Object with prevSlug and nextSlug
 */
export function getPaginationSlugs<T extends PaginationItem>(
  items: T[],
  currentSlug: string
): PaginationResult {
  let prevSlug: string | null = null;
  let nextSlug: string | null = null;

  if (items && items.length > 0) {
    const currentIndex = items.findIndex(
      (item) => item.slug?.current === currentSlug
    );

    if (currentIndex !== -1) {
      // Current item found
      if (items.length > 1) {
        // Only enable looping if there's more than one item
        // Previous item
        if (currentIndex === 0) {
          // Current is the first item
          prevSlug = items[items.length - 1].slug?.current ?? null; // Loop to the last item
        } else {
          prevSlug = items[currentIndex - 1].slug?.current ?? null;
        }

        // Next item
        if (currentIndex === items.length - 1) {
          // Current is the last item
          nextSlug = items[0].slug?.current ?? null; // Loop to the first item
        } else {
          nextSlug = items[currentIndex + 1].slug?.current ?? null;
        }
      }
    }
  }

  return { prevSlug, nextSlug };
}
