import ChatWrapper from "@/components/Chat/chat-wrapper";
import PdfRenderer from "@/components/PdfRenderer";
import { prismadb } from "@/lib/prismadb";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";

const page = async ({ params }: { params: { fileId: string } }) => {
  const { fileId } = params;
  const { getUser } = getKindeServerSession();
  const user = getUser();
  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fileId}`);

  //make databse call
  const file = await prismadb.file.findFirst({
    where: {
      id: fileId,
      userId: user.id,
    },
  });
  if (!file) notFound();

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        {/* Left Side */}
        <div className="flex-1  xl:flex ">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PdfRenderer url={`https://utfs.io/f/${file.key}`} />
          </div>
        </div>
        {/* Right Side */}
        <div className="shrink-0 flex-[0.7] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0  ">
          <ChatWrapper fileId={fileId} />
        </div>
      </div>
    </div>
  );
};

export default page;
