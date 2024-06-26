import LanguageList from "./components/LanguageList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    session?.user ? 
        <LanguageList />
    :
        <> </>
  );
}
