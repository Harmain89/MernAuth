import { Header, Navbar } from "../components/index.js"

function Home() {
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