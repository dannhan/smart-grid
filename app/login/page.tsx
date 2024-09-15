import GlowingBackdrop from "@/components/Common/GlowingBackdrop";
import CenteredLayout from "@/layouts/Centered";

export default function LoginPage() {
  return (
    <CenteredLayout>
      <GlowingBackdrop />

      <main className="items-center justify-center flex gap-8 md:flex-row md:gap-14 xl:gap-28 2xl:gap-32">Hello World!!!</main>
    </CenteredLayout>
  );
}
