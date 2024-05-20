"use client";
/* eslint-disable */
// eslint-disable

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "../ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { auth } from "@clerk/nextjs/server";

export const stp_revisionColour: string[] = [
  "WHITE",
  "BLUE",
  "PINK",
  "YELLOW",
  "GREEN",
  "GOLDENROD",
  "BUFF",
  "SALMON",
  "CHERRY",
];

export type ProjectInput = {
  project_name: string;
  project_description: string;
  user_id: string;
};

export type ProjectInputData = ProjectInput & { eventType?: string };

export default function ProjectAdd({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProjectInput>();

  const registerForm = useForm<ProjectInput>();

  const router = useRouter();

  const onSubmit: SubmitHandler<ProjectInput> = async (data) => {
    const newData: ProjectInputData = {
      ...data,
      user_id: userId,
      eventType: "project.new",
    };
    const postNewProject = await fetch(`/api/db`, {
      method: "POST",
      body: JSON.stringify(newData),
    }).then((res: Response) => res.json());

    console.log(postNewProject);
    router.push(`/dashboard/${postNewProject.new_id}`);
  };

  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(onSubmit)}
        className="flex max-w-xl flex-col gap-4"
      >
        <FormField
          control={registerForm.control}
          name="project_name"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Screenplay Name</FormLabel> */}
              <FormControl>
                <Input placeholder="Project Name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of the project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="project_description"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>
                Describe your project
              </FormLabel> */}
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Add Project Description here."
                  {...field}
                />
              </FormControl>
              <FormDescription>Describe your project.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
