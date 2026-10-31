import { ModeToggle } from "@/components/mode-toggle";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper"

export default function Home() {
  return (
    <MaxWidthWrapper
      className="flex flex-col items-center justify-center h-screen space-y-4"
    >
      <h1 className="text-4xl font-bold">Hello World</h1>
      <ModeToggle />
    </MaxWidthWrapper>
  );
}
