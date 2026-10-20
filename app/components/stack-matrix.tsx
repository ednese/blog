import { roles, stackRows } from 'app/data/profile'
import { CompanyLogo } from 'app/components/company-logo'
import { TechIcon } from 'app/components/tech-icon'

// "Nuxt 4" -> "Nuxt", "Expo / React Native" -> ["Expo", "React Native"]
function normalize(stack: string[]) {
  return stack.flatMap((t) => t.split(' / ')).map((t) => t.replace(/ \d+$/, ''))
}

export function StackMatrix() {
  let used = roles.map((role) => new Set(normalize(role.stack)))

  return (
    <figure className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs faint">
            <th className="text-left font-normal pb-2 pr-2 align-top leading-5">Tool</th>
            {roles.map((role) => (
              <th
                key={role.company}
                className="font-normal pb-2 px-1 text-center align-top leading-tight w-[13%]"
                title={role.company}
              >
                <span className="flex flex-col items-center gap-1">
                  <CompanyLogo company={role.company} logo={role.logo} size={20} />
                  <span className="hidden sm:block">{role.company}</span>
                  <span className="sr-only sm:hidden">{role.company}</span>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stackRows.map((tech, row) => (
            <tr key={tech.name} className="matrix-row border-t border-[var(--rule)]">
              <th scope="row" className="text-left font-normal py-1.5 pr-2 whitespace-nowrap">
                <span className="flex items-center gap-2">
                  <TechIcon tech={tech} />
                  {tech.name}
                </span>
              </th>
              {roles.map((role, col) => {
                let has = used[col].has(tech.name)
                let label = `${tech.name} ${has ? 'used' : 'not listed'} at ${role.company}`
                return (
                  <td key={role.company} className="text-center py-1.5" title={label}>
                    <span
                      aria-label={label}
                      role="img"
                      className={
                        has
                          ? 'dot brand-fill anim-pop inline-block w-2.5 h-2.5 rounded-full'
                          : 'inline-block w-1 h-1 rounded-full bg-[var(--rule)]'
                      }
                      style={
                        has
                          ? {
                              ['--i' as string]: row + col,
                              ['--brand' as string]: tech.color === 'ink' ? 'var(--ink)' : tech.color,
                            }
                          : undefined
                      }
                    />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}
