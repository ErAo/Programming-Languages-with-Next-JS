import Link from "next/link";
import DeleteBtn from "./DeleteBtn";
import { HiPencilAlt } from 'react-icons/hi';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const getLanguage = async (user_id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/programmingLanguage?user_id=${user_id}`, {
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("Fallo al cargar los lenguajes");
        }

        return res.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

export default async function LanguageList() {
    const session = await getServerSession(authOptions);
    const { language } = await getLanguage(session.user._doc._id);
    return (
        <>
            {language?.map((l) => (
                <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start" key={l._id}>
                    <div>
                        <h2 className="font-blod text-2xl">{l.title}</h2>
                        <p> {l.description} </p>
                    </div>
                    <div className="flex gap-2">
                        <DeleteBtn id={l._id} />
                        <Link className="text-amber-200" href={`/editLanguage/${l._id}`}>
                            <HiPencilAlt size={24} />
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
}