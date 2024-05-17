"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Screenplay } from "~/app/(user)/dashboard/[project]/screenplays/columns";
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

export type ScreenplayInput = Omit<
  Screenplay,
  "screenplay_id" | "created_at" | "project_id" | "screenplay_r2_key"
>;

export type ScreenplayInputData = Omit<
  Screenplay,
  "screenplay_id" | "created_at"
>;

export default function ScreenplayAdd() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ScreenplayInput>();

  const registerForm = useForm<ScreenplayInput>();

  const project_id = usePathname().split("/")[2];

  const router = useRouter();
  const [useFile, setFile] = useState<File>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const currentFile = event.target.files[0];
      setFile(currentFile);
    }
  };

  const handleUpload = async () => {
    if (!useFile) return;

    const formData = new FormData();
    formData.append("file", useFile);

    const response = await fetch(`/api/r2?key=${useFile.name}`, {
      method: "POST",
    });
    // eslint-disable-next-line
    const { url } = await response.json();
    await fetch(String(url), {
      method: "PUT",
      body: formData,
    });
  };

  const onSubmit: SubmitHandler<ScreenplayInput> = async (data) => {
    const newData: ScreenplayInputData = {
      ...data,
      project_id: Number(project_id),
      screenplay_r2_key: String(useFile?.name),
    };
    const postNewScreenplay = await fetch(`/api/db`, {
      method: "POST",
      body: JSON.stringify(newData),
    }).then((res: Response) => res.json());

    const returnedId = postNewScreenplay["new_id"];
    await handleUpload();

    router.replace(`/dashboard/${project_id}/screenplays/`);
  };

  const revisionColour: string[] = [
    "white",
    "blue",
    "pink",
    "yellow",
    "green",
    "goldenrod",
    "buff",
    "salmon",
    "cherry",
  ];

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <div className="flex flex-col gap-6">
    //     <div className="flex flex-col gap-1">
    //       <label>Name </label>
    //       <input {...register("screenplay_name", { required: true })} />
    //       {errors.screenplay_name && <span>This field is required</span>}
    //     </div>
    //     <div className="flex flex-col gap-1">
    //       <label>Description</label>
    //       <input {...register("screenplay_description", { required: true })} />
    //       {errors.screenplay_description && <span>This field is required</span>}
    //     </div>
    //     <div className="flex flex-col gap-1">
    //       <label>Revision</label>
    //       <input {...register("screenplay_revision", { required: true })} />
    //       {errors.screenplay_revision && <span>This field is required</span>}
    //     </div>
    //     <div className="flex flex-col gap-1">
    //       <label>Draft</label>
    //       <input {...register("screenplay_draft", { required: true })} />
    //       {errors.screenplay_draft && <span>This field is required</span>}
    //     </div>
    //     <div className="flex flex-col items-start gap-3">
    //       <label
    //         htmlFor="file-upload"
    //         className="relative flex cursor-pointer flex-col rounded-md"
    //       >
    //         <input
    //           type="file"
    //           accept=".fdx"
    //           id="file-upload"
    //           name="file-upload"
    //           onChange={handleFileChange}
    //         />
    //       </label>
    //     </div>
    //     <div>
    //       <input type="submit" />
    //     </div>
    //   </div>
    // </form>
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(onSubmit)}
        className="flex max-w-xl flex-col gap-4"
      >
        <FormField
          control={registerForm.control}
          name="screenplay_name"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Screenplay Name</FormLabel> */}
              <FormControl>
                <Input placeholder="Screenplay Name" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full flex-row gap-2">
          <FormField
            control={registerForm.control}
            name="screenplay_draft"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Screenplay Name</FormLabel> */}
                <FormControl>
                  <Input placeholder="Draft Number" {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="screenplay_revision"
            render={({ field }) => (
              <FormItem className="flex-grow">
                {/* <FormLabel>Screenplay Name</FormLabel> */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a revision colour" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {revisionColour.map((rev, idx) => (
                      <SelectItem key={idx} value={rev}>
                        {rev}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={registerForm.control}
          name="screenplay_description"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Screenplay Name</FormLabel> */}
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Add Screenplay Description here."
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Input
          id="file-upload"
          accept=".fdx"
          name="file-upload"
          type="file"
          onChange={handleFileChange}
          className="hover:bg-primary-foreground"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
