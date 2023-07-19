/**
 * Utility function to join class names
 *
 * @param classes
 * @returns {string}
 */
export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
