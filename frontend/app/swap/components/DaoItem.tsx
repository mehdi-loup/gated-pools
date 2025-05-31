import { DAO } from "@/hooks/vlayer/daoMapping"

export const DAOItem = ({ dao }: { dao: DAO }) => (
  <div className="flex items-center gap-3 w-full">
    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
      <img
        src={dao.iconURL || "/placeholder.svg"}
        alt={dao.name}
        className="w-full h-full object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.style.display = "none"
          const parent = target.parentElement
          if (parent) {
            parent.innerHTML = `<div class="w-full h-full bg-muted rounded-full flex items-center justify-center"><svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></div>`
          }
        }}
      />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-black text-start font-medium text-sm truncate">{dao.name}</div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-xs font-medium">{dao.token}</span>
        <span className="truncate">@{dao.emailDomain}</span>
      </div>
    </div>
  </div>
)