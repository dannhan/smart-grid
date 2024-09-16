import { NextPage } from "next";

import LoginForm from "@/components/LoginForm";
import GlowingBackdrop from "@/components/Common/GlowingBackdrop";
import CenteredLayout from "@/layouts/Centered";

const LoginPage: NextPage = () => {
  return (
    <CenteredLayout>
      <GlowingBackdrop />

      <main className="flex w-full max-w-screen-xl flex-col items-center justify-around gap-8 text-secondary-foreground lg:flex-row">
        <section className="flex flex-col justify-center">
          <img
            src="/logo.png"
            className="w-full max-w-[380px] lg:max-w-[500px]"
          />
          <div className="-mt-2 hidden space-y-2 pl-28 font-medium lg:block">
            <p>
              Selamat Datang di Dashboard Smart
              <span className="text-[#F2DF0F]">Grid</span> Anda
            </p>
            <p>
              Kontrol dan pantau bangunan <br />
              <strong>mudah aman</strong> dan <strong>pintar</strong>!
            </p>
          </div>
        </section>

        <section className="flex w-full justify-center sm:w-auto">
          <LoginForm />
        </section>
      </main>
    </CenteredLayout>
  );
};

export default LoginPage;
