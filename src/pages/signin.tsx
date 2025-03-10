import { FormEvent, useRef } from "react";
import Image from "next/image";
import logoCircle from "../public/circle.png";
import logo from "../public/logo.png";
import Input from "@components/Input";
import Checkbox from "@components/Checkbox";
import { Button } from "@components/Button";
import { FcGoogle } from "react-icons/fc";
import { GrLinkedinOption } from "react-icons/gr";
import { useMutation } from "@apollo/client";
import { SIGN_IN_USER } from "services/apollo/mutations";
import Link from "next/link";

const SignIn = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleStrategyLogin = async (route: string) => {
    window.location.href = `http://localhost:3030${route}`;
  };

  const [signInUser] = useMutation(SIGN_IN_USER);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const { email, password, rememberMe } = Object.fromEntries(
      formData.entries()
    );
    const isValid = formRef.current?.checkValidity();

    if (isValid) {
      try {
        await signInUser({
          variables: { email, password, rememberMe },
        });
        formRef.current?.reset();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <main className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
      <div className="relative bg-gradient-to-r from-primary-04 to-primary-02 py-16 col-span-1 md:col-span-6 md:py-0 md:pl-12 lg:pl-32 md:pr-2">
        <Image
          alt="Mentor Cycle Logo"
          src={logo}
          width={96}
          height={88}
          className="mx-auto md:mx-0 md:mt-22"
        />
        <div className="flex flex-col justify-center max-w-[357px] 2xl:max-w-[500px] m-auto md:m-0 lg:mt-32 3xl:mt-96 3xl:m-auto">
          <h2 className="text-neutral-01 text-3xl sm:text-4.5xl p-2 sm:p-0 sm:leading-11 font-bold text-center md:text-left md:mt-0 md:pt-40 2xl:text-6xl 3xl:pt-0 3xl:text-7xl ">
            Comece o seu aprendizado por aqui!
          </h2>
          <p className="text-neutral-01 mt-2 text-sm sm:text-base text-center md:text-left p-2 sm:p-0 2xl:text-xl">
            Tire suas dúvidas de forma rápida e prática. Construa seu futuro sem
            dúvidas.
          </p>
        </div>
        <div className="absolute hidden md:block md:bottom-3 md:-right-11">
          <Image
            alt="logo mentor cycle -circle"
            src={logoCircle}
            width={100}
            height={100}
          />
        </div>
      </div>
      <div className="bg-neutral-01 col-span-1 md:col-span-6 py-16 md:px-8">
        <div className="max-w-sm sm:max-w-md mx-auto px-4 sm:px-0 3xl:h-full 3xl:flex 3xl:flex-col 3xl:justify-center 3xl:max-w-[600px]">
          <h1 className="mt-0 mb-4 text-primary-05 text-5xl text-center md:text-left dark:text-neutral-01">
            Bem-Vindo ao Mentor Cycle!
          </h1>
          <p className="mt-2 text-center md:text-left max-w-[415px]">
            Já possui uma conta? Preencha os campos para entrar na plataforma
          </p>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col max-w-[557px] mx-auto md:mx-0 3xl:max-w-[800px]"
          >
            <div className="mt-8">
              <Input
                name="email"
                type="email"
                placeholder="user1@gmail.com"
                label="Email"
                required
              />
              <Input
                name="password"
                type="password"
                placeholder="******************"
                label="Senha"
                required
              />
              <Checkbox
                id="savedPassword"
                label="Lembrar minha senha"
                className="mt-2 mb-4 md:mb-12"
                name="rememberMe"
              />
            </div>
            <Button size="small" className="mb-4 md:mb-12">
              Entrar
            </Button>
          </form>
          <div className="flex flex-col max-w-[557px] mx-auto md:mx-0 3xl:max-w-[700px]">
            <Button
              onClick={() => handleStrategyLogin("/auth/google")}
              size="small"
              variant="secondary"
              className="mb-4"
            >
              <Button.Icon icon={FcGoogle} />
              Entrar com Google
            </Button>
            <Button
              onClick={() => handleStrategyLogin("/auth/linkedin")}
              size="small"
              variant="secondary"
            >
              <Button.Icon icon={GrLinkedinOption} className="text-[#0e76a8]" />
              Entrar com Linkedin
            </Button>
            <p className="text-primary-05 mt-6 md:mt-14 md:ml-4 text-center md:text-left">
              Não tem uma conta?{" "}
              <Link
                href="/signup"
                className="text-primary-03 hover:text-primary-02"
              >
                Se registre aqui!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
export default SignIn;
