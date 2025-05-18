import { ChatBubbleLeftRightIcon } from "@heroicons/react/20/solid";

interface EmptyStateProps {
  heading: string;
  paragraph: string;
}

export default async function EmptyState({
  heading,
  paragraph,
}: EmptyStateProps) {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center mt-[20%]">
      <ChatBubbleLeftRightIcon width={100} />
      <h2>{heading}</h2>
      <p>{paragraph}</p>
    </div>
  )
}
