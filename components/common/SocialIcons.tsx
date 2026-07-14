import { cn } from "@/lib/utils";

type IconProps = { className?: string };

export function IconFacebook({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-4 fill-current", className)} aria-hidden>
      <path d="M14 8h2.5V5.5H14c-1.93 0-3.5 1.57-3.5 3.5V11H8v2.5h2.5V19H13v-5.5h2.3l.45-2.5H13V9c0-.55.45-1 1-1z" />
    </svg>
  );
}

export function IconGithub({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-4 fill-current", className)} aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .26.18.58.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

export function IconLinkedin({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-4 fill-current", className)} aria-hidden>
      <path d="M6.94 8.5H4.25V19h2.69V8.5zM5.6 7.27a1.56 1.56 0 1 0 0-3.12 1.56 1.56 0 0 0 0 3.12zM19.75 19h-2.68v-5.6c0-1.34-.02-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95V19H10.4V8.5h2.57v1.43h.04c.36-.68 1.24-1.4 2.55-1.4 2.73 0 3.23 1.8 3.23 4.14V19z" />
    </svg>
  );
}

export function IconYoutube({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-4 fill-current", className)} aria-hidden>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.2 5 12 5 12 5s-6.2 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26.1 26.1 0 0 0 2 12a26.1 26.1 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.8 19 12 19 12 19s6.2 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26.1 26.1 0 0 0 22 12a26.1 26.1 0 0 0-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
    </svg>
  );
}
