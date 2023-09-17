import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const {data: session } = useSession();
  return (
      <div className={"bg-amber-200 w-screen h-screen"}>
        <div className="text-center w-full">
          <button className={"bg-white p-2 px-4 items-center rounded-md"}>Login with Google</button>
        </div>
      </div>
  )
}
