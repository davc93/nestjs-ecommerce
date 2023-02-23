import { Navbar } from '../Navbar'

export const Layout = ({children}:any) => {
  return (
    <div>
        <Navbar />
        {children}
    </div>
  )
}
