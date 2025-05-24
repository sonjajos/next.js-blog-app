import { ChatBubbleLeftRightIcon } from "@heroicons/react/20/solid";
import { JSX } from "react";
import { HeroButton } from "../hero-components";
import paths from "@/paths";
import Link from "next/link";

interface EmptyStateProps {
  heading: string;
  paragraph: string;
  showButton?: boolean;
  icon?: JSX.Element;
}

export default async function EmptyState({
  heading,
  paragraph,
  showButton = false,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center mt-[20%] text-center gap-4">
      {icon ?? <ChatBubbleLeftRightIcon width={100} />}
      <h2>{heading}</h2>
      <p>{paragraph}</p>
      <Link href={paths.home()}>
        {showButton && (
          <HeroButton
            className="bg-transparent border-[1px] border-blue-600 text-blue-600"
          >
            Back to home
          </HeroButton>
        )}
      </Link>
      
    </div>
  )
}
