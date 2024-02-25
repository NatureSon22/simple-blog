import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Root from "./components/Root"
import BlogList from "./pages/BlogList"
import Login from "./pages/Login"
import CreateBlog from "./pages/CreateBlog"
import UserBlogs from "./pages/UserBlogs"
import Blog from "./pages/Blog"
import UserProvider from "./components/UserProvider"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
        {
          path: "/main",
          element: <BlogList></BlogList>
        },
        {
          path: "/login",
          element: <Login></Login>
        }, 
        {
          path: "/create-blog",
          element: <CreateBlog></CreateBlog>
        },
        {
          path: "/my-blogs",
          element: <UserBlogs></UserBlogs>
        },
        {
          path: "/blog/:id",
          element: <Blog></Blog>
        },
        {
          path: "/update-blog/:id",
          element: <CreateBlog></CreateBlog>
        }
      ]
    }
  ])

  return (
    <UserProvider>
       <RouterProvider router={router} ></RouterProvider>
    </UserProvider>
  )
}

export default App
