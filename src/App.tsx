import { BrowserRouter as Router } from "react-router-dom"
import Header from "./3_widgets/ui/Header.tsx"
import Footer from "./3_widgets/ui/Footer.tsx"
import PostsManagerPage from "./2_pages/PostsManagerPage.tsx"

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <PostsManagerPage />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
