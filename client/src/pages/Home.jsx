import React, { useEffect } from "react"
import { Header, Navbar } from "../components/index.js"
import { AppContext } from "../contexts/AppContext.jsx"
import { toast } from "react-toastify"

function Home() {

  const { isLoggedIn } = React.useContext(AppContext)

  const [showedLoggedMessage, setShowedLoggedMessage] = React.useState(true)

  useEffect(() => {
    
    // console.log('isLoggedIn: ' + isLoggedIn)
    // console.log('showedLoggedMessage: ' + showedLoggedMessage)
    if(isLoggedIn && showedLoggedMessage) {
      setShowedLoggedMessage(false)
      toast.success('Logged In Successfully')
    }

  }, [])

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/bg_img.png')] bg-cover bg-center">
        <Header />
        <Navbar />
      </div>
    </>
  )
}

export default Home