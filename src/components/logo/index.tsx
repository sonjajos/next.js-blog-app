import Image from "next/image"
import Link from "next/link";
import paths from "@/paths";

export default function Logo() {
  return (
    <Link
      href={paths.home()}
      className="flex flex-row items-center cursor-pointer"
    >
      <Image src="/logo.svg" width={50} height={50} alt="Logo" />
      <h1>
        braggit
      </h1>
    </Link>
  )
}
