import TopicModal from "@/components/topic/topic-modal";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import AddPostModal from "../post/add-post-modal";

interface TopicDrawerProps {
  slug: string;
  description: string;
  isAdmin?: boolean;
}

export default async function TopicDrawer({
  slug,
  description,
  isAdmin = false,
}: TopicDrawerProps) {
  return (
    <>
      <div className="w-[400px] right-0 mr-[-80px] top-0 h-[200px] hidden md:flex" />
      <div className="flex flex-0 h-auto flex-col items-start justify-start gap-4 w-[400px] p-8 border-l-1 border-l-white/20 h-full max-h-full fixed right-0 top-0 pt-[84px] overflow-scroll hidden md:flex">
        <div className="flex flex-row gap-4 w-full justify-between items-center">
          <div className="text-2xl font-bold">
            {slug}
          </div>
          
          {isAdmin && (
            <TopicModal
              slug={slug}
              defaultValues={{
                title: slug ?? '',
                description: description ?? '',
              }}
              button={
                <div className="cursor-pointer px-2">
                  <PencilSquareIcon color="white" width={24} />
                </div>
              }
            />
          )}
          
        </div>
        <p>
          {description}
        </p>
        <AddPostModal slug={slug} />
      </div>
    </>
  )
}
