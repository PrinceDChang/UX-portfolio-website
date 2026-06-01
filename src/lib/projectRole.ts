export const PIN_PURPLE = { base: '#9970FF', active: '#b894ff' } as const
export const PIN_GREEN = { base: '#4ade80', active: '#c4f542' } as const
export const PIN_GREY = { base: '#9ca3af', active: '#d1d5db' } as const

export function isResearchRole(role: string) {
  return role.toLowerCase().includes('research')
}

export function pinColorsForRole(role: string, comingSoon = false) {
  if (comingSoon) return PIN_GREY
  return isResearchRole(role) ? PIN_GREEN : PIN_PURPLE
}

const roleBadgeBaseClass =
  'inline-flex rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white ring-1 ring-black/20'

export function roleBadgeClassName(
  role: string,
  className = '',
  comingSoon = false,
) {
  const colorClass = comingSoon
    ? 'bg-zinc-500 shadow-none'
    : isResearchRole(role)
      ? 'bg-[#4ade80] shadow-[0_2px_14px_rgba(74,222,128,0.4)]'
      : 'bg-accent shadow-[0_2px_14px_rgba(0,0,0,0.45)]'

  return `${roleBadgeBaseClass} ${colorClass} ${className}`.trim()
}
