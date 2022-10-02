import { NextPage } from "next";
import { ReactNode } from "react";
import MyHead from '../components/myHead';
import Header from '../components/header';
import Footer from '../components/footer';

interface Props {
  children: ReactNode;
}

const Layout: NextPage<Props> = ({ children }: Props) => {
  return (
    <div className='is-flex is-flex-direction-column' style={{ minHeight: '100vh' }}>
      <MyHead />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout