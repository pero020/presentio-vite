import { useContext } from "react"
import { UserContext } from "./layouts/AppLayout"
import RoleSwitcher from "./RoleSwitcher"
import NewUserButton from "./NewUserButton"

const AppHeader = () => {
  const userContext = useContext(UserContext)
  return (
    <header className="flex mt-2 items-baseline justify-between w-full">
    {!userContext?.currentPresentationId && (
      <>
        <div className="w-1/3 pl-4 flex justify-start">

        </div>
        <div className="w-1/3 flex justify-center">
          { userContext?.clientName && <RoleSwitcher /> }
        </div>
        <div className="w-1/3 pr-4 flex justify-end">
          { userContext?.clientName && <NewUserButton />}
        </div>
      </>
    )}
  </header>
  )
}

export default AppHeader