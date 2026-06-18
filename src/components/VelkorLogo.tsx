import { cn } from '@/lib/utils'

export function VelkorLogo({
  className,
  variant = 'light',
}: {
  className?: string
  variant?: 'light' | 'dark'
}) {
  const mainColor = variant === 'light' ? '#FFFFFF' : 'hsl(var(--petrol))'
  const accentColor = 'hsl(var(--cyan))'

  return (
    <svg
      viewBox="0 0 600 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-full w-auto', className)}
      role="img"
      aria-label="VELKOR Soluções Imobiliárias"
    >
      <title>VELKOR Soluções Imobiliárias</title>

      {/* Stylized V Icon */}
      <g transform="translate(15, 15)">
        {/* Left Arm - Main Color */}
        <path d="M 0 0 H 42 L 85 115 L 85 160 Z" fill={mainColor} />
        {/* Right Arm - Cyan Accent */}
        <path d="M 170 0 H 128 L 85 115 L 85 160 Z" fill={accentColor} />
      </g>

      {/* VELKOR Text */}
      <text
        x="195"
        y="110"
        fontFamily="Sora, system-ui, sans-serif"
        fontWeight="800"
        fontSize="115"
        fill={mainColor}
        letterSpacing="-0.02em"
      >
        VELKOR
      </text>

      {/* Subtitle */}
      <text
        x="200"
        y="152"
        fontFamily="Manrope, system-ui, sans-serif"
        fontWeight="500"
        fontSize="28"
        fill={mainColor}
        letterSpacing="0.06em"
      >
        Soluções Imobiliárias
      </text>
    </svg>
  )
}
