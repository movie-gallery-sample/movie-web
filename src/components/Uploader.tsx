"use client";

import { uploadApi } from "@/features/file/uploadApi";
import { cn } from "@/lib/utils";
import { FileUpload, UploadPayload, UploadResult } from "@/types/file";
import { convertPathToUrl } from "@/utils/uploadfile.utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Download, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

type Props = {
  placeholder?: string;
  file: FileUpload | null;
  setFile: (data: FileUpload | null) => void;
  disabled: boolean;
};

function Uploader(props: Props) {
  const { placeholder = "Drop an image here", setFile, file, disabled } = props;
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [originalFilePath, setOriginalFilePath]= useState<string | undefined>();

  useEffect(() => {
    setOriginalFilePath(file?.path);
  }, []);

  const { mutate: uploadSingle } = useMutation<
    UploadResult,
    Error,
    UploadPayload
  >({
    mutationFn: async ({ data }) => {
      const response = await uploadApi.singleUpload(data);
      return response.data;
    },
    onSuccess: (data) => {
      setTimeout(() => {
        // const urlSegments = data?.path?.split("/");
        // const imageUrl = urlSegments
        //   ? process.env.NEXT_PUBLIC_API_IMAGE +
        //     urlSegments[urlSegments.length - 1]
        //   : "";

        setFile({
          ...data,
          // path: imageUrl,
        });
        toast.success("File uploaded successfully");
      }, 1000);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message);
      }
    },
  });

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
        }
        return prevProgress + 10;
      });
    }, 100);

    return interval;
  };

  const onDrop = useCallback(
    async (files: File[]) => {
      setIsUploading(true);
      const progressInterval = startSimulatedProgress();

      const formData = new FormData();
      formData.append("file", files[0]);
      uploadSingle({ data: formData });

      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(100);
        clearInterval(progressInterval);
      }, 1000);
    },
    [uploadSingle]
  );

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
  });

  useEffect(() => {
    if (fileRejections.length > 1) {
      toast.error(
        "Multiple image files detected. Only one image file is allowed!"
      );
    } else if (fileRejections.length > 0) {
      toast.error(
        "Please select a valid image file. Type must be 'image/jpeg' or 'image/png"
      );
    }
  }, [fileRejections]);

  const onRemovedPoster = () => {
    if (!originalFilePath || file?.path && file.path !== originalFilePath) {
      uploadApi.removedFile({ file: file?.path as string });
    }
    setFile(null);
  }

  return (
    <div className="w-[380px] max-xs:w-full lg:w-[472px] m-auto">
      {!file?.path ? (
        <div
          {...getRootProps()}
          className="relative h-[372px] md:h-[500px] flex flex-col items-center justify-center gap-2 bg-inputColor border-2 rounded-[10px] border-white border-dashed text-center"
        >
          <input
            {...getInputProps()}
            disabled={isUploading || disabled}
            accept="image/png, image/gif, image/jpeg"
          />
          <Download />
          <p className="text-sm ">{placeholder}</p>
          {isUploading && (
            <div className="w-1/2 absolute rounded-lg h-[5px] bg-cardColor mt-2 translate-y-10">
              <div
                className={cn("rounded-lg h-full bg-primary")}
                style={{ width: isUploading ? `${uploadProgress}%` : 0 }}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="relative m-auto w-fit h-fit">
          <button
            onClick={onRemovedPoster}
            className="absolute rounded-full top-0 right-0 p-2 m-2 text-cardColor hover:shadow-lg hover:bg-[#e3f5da]"
          >
            <X />
          </button>
          <Image
            src={convertPathToUrl(file?.path)}
            alt="poster"
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-lg object-cover"
            style={{ width: "auto", height: "100%" }}
          />
        </div>
      )}
    </div>
  );
}

export default Uploader;
