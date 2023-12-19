import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import 'styles/stats.css'
import React from 'react'; // This line is necessary for JSX to work
export default function App({Component, pageProps: { session, ...pageProps }})
{
  return (
      <SessionProvider session={session}>
          <Component {...pageProps}/>
      </SessionProvider>
  )
}


