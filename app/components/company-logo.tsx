import Image from 'next/image'

export function CompanyLogo({
  company,
  logo,
  size = 20,
}: {
  company: string
  logo?: string
  size?: number
}) {
  if (!logo) {
    return (
      <span
        aria-hidden
        className="inline-flex items-center justify-center shrink-0 rounded-[5px] border border-[var(--rule)] text-[10px] font-semibold"
        style={{ width: size, height: size }}
      >
        {company[0]}
      </span>
    )
  }

  return (
    <Image
      src={logo}
      alt=""
      width={size}
      height={size}
      className="shrink-0 rounded-[5px]"
      style={{ width: size, height: size }}
    />
  )
}
