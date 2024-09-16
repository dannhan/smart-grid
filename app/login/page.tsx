import { NextPage } from "next";

import LoginForm from "@/components/LoginForm";
import GlowingBackdrop from "@/components/Common/GlowingBackdrop";
import CenteredLayout from "@/layouts/Centered";

const LoginPage: NextPage = () => {
  return (
    <CenteredLayout>
      <GlowingBackdrop />

      <main className="flex w-full items-center justify-center gap-7 md:flex-row md:gap-14 xl:gap-28 2xl:gap-32">
        <section className="flex-1">
          <h1 className="text-4xl font-bold">
            <span>Smart</span>
            <span>Grid</span>
          </h1>
        </section>

        <section className="flex-1">
          <LoginForm />
        </section>
      </main>
    </CenteredLayout>
  );
};

export default LoginPage;
