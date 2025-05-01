import { BrowserRouter as Router } from "react-router-dom"
import Header from "./3_widgets/ui/Header.tsx"
import Footer from "./3_widgets/ui/Footer.tsx"
import PostsManagerPage from "./2_pages/PostsManagerPage.tsx"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./6_shared/lib/query-client"
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostsManagerPage />
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
