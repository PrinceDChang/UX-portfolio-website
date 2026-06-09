import type { Project } from '../data/content'

const cityCodes: Record<string, string> = {
  Seattle: 'SEA',
  Tokyo: 'TYO',
  Paris: 'PAR',
}

export function getProjectAirportCode(project: Project): string {
  const code = cityCodes[project.city]
  if (code) return code
  return project.city.slice(0, 3).toUpperCase()
}

export function getTicketSerial(projectId: string, index: number): string {
  const hash = projectId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return String((hash + index * 7) % 900 + 100)
}
