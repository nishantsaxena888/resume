/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import GenericFormV2 from "@/components/admin/generic-form-v2";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from "@/hooks/use-session";
import { saveSession } from "@/lib/auth";
import { toast } from "sonner";

type AuthTemplateProps = {
  logo?: string;
  className?: string;
};

const AuthTemplate: React.FC<AuthTemplateProps> = ({ logo, className }) => {
  const { login, session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, []);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setSubmitting(true);

      const res: any = await login({
        username: data?.username,
        password: data?.password,
      });

      if (res?.data) {
        await saveSession(res.data);
        toast.success("Login successful");
        console.log("test");
        router.push("/admin/item");
        return res;
      }

      toast.error(res?.error?.message || "Login failed");
      return res;
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
      return { error: err };
    } finally {
      setSubmitting(false);
    }
    // try {
    //   setSubmitting(true);
    //   const res: any = await login({
    //     username: data?.username,
    //     password: data?.password,
    //   });

    //   if (res?.data) {
    //     await saveSession(res.data);
    //     toast.success("Login successful");
    //     router.push("/admin/item");
    //     return res;
    //   }

    //   const msg = res?.error?.message || "Login failed";
    //   toast.error(msg);
    //   return res;
    // } catch (err: any) {
    //   toast.error(err?.message || "Something went wrong");
    //   return { error: err };
    // } finally {
    //   setSubmitting(false);
    // }
  };

  return (
    <div
      className={cn(
        "bg-muted relative flex min-h-svh items-center justify-center p-6 md:p-10",
        className,
      )}
    >
      <div className="absolute inset-0 auth-bg" />
      <div className="relative z-10 flex w-full max-w-md flex-col gap-6">
        {logo ? (
          <img src={logo} alt="logo" className="h-8 w-auto object-contain" />
        ) : null}

        <Card>
          <CardContent className="pt-6">
            <h4 className="mb-5 text-center">Sign In</h4>
            <GenericFormV2
              entity="login"
              isAuth
              onSaved={onSubmit}
              // submitDisabled={submitting}
            />
          </CardContent>
        </Card>

        <Link
          href="/"
          className="text-center flex items-center justify-center gap-1"
        >
          <ArrowLeftIcon size={16} /> Back to home
        </Link>
      </div>
    </div>
  );
};

export default AuthTemplate;
