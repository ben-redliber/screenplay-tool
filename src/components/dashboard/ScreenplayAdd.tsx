"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Screenplay } from "~/app/(user)/dashboard/[project]/screenplays/columns";

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <label>Name </label>
          <input {...register("screenplay_name", { required: true })} />
          {errors.screenplay_name && <span>This field is required</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label>Description</label>
          <input {...register("screenplay_description", { required: true })} />
          {errors.screenplay_description && <span>This field is required</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label>Revision</label>
          <input {...register("screenplay_revision", { required: true })} />
          {errors.screenplay_revision && <span>This field is required</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label>Draft</label>
          <input {...register("screenplay_draft", { required: true })} />
          {errors.screenplay_draft && <span>This field is required</span>}
        </div>
        <div className="flex flex-col items-start gap-3">
          <label
            htmlFor="file-upload"
            className="relative flex cursor-pointer flex-col rounded-md"
          >
            <input
              type="file"
              accept=".fdx"
              id="file-upload"
              name="file-upload"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div>
          <input type="submit" />
        </div>
      </div>
    </form>
  );
}
