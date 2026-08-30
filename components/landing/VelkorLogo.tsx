import Image from 'next/image'

/**
 * Logo oficial (public/brand/velkor-logo.png, 1230x350, ~3.5:1). Altura fixa,
 * largura automática — nunca esticar nem achatar a proporção original.
 */
export function VelkorLogo({ heightClassName = 'h-9' }: { heightClassName?: string }) {
  return (
    <Image
      src="/brand/velkor-logo.png"
      alt="Velkor Soluções Imobiliárias"
      width={1230}
      height={350}
      priority
      className={`w-auto ${heightClassName}`}
    />
  )
}
