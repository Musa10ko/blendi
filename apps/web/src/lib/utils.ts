// apps/mini-app/src/lib/utils.ts

export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function classNames(...args: any[]): string {
  return args.filter(Boolean).join(' ')
}