import { cn } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/config'

export function VelkorLogo({
  className,
  variant = 'light',
}: {
  className?: string
  variant?: 'light' | 'dark'
}) {
  return (
    <img
      src={SITE_CONFIG.logoUrl}
      alt="Grupo VELKOR"
      className={cn(
        'h-full w-auto object-contain',
        variant === 'light' && 'brightness-0 invert',
        className,
      )}
      role="img"
    />
  )
}
