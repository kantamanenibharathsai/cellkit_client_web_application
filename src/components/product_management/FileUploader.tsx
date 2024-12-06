import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { colors } from "../../config/theme";
import "./styles.css";
import { useState } from "react";

interface MyFile {
  remove(): void;
  meta: {
    name: string;
    size: number;
    type: string;
  };
  file: File;
}

const FileUploader = ({
  classes,
  setImages,
}: {
  classes: any;
  setImages?: (file: File[]) => void;
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const getUploadParams = ({}) => {
    return { url: "https://httpbin.org/post" };
  };
  const handleChangeStatus = (
    { meta, file }: MyFile,
    status: string,
    allFiles: MyFile[]
  ) => {
    if (status === "done") {
      const fileExists = uploadedFiles.some(
        (uploadedFile) => uploadedFile.name === file.name
      );
      if (!fileExists) {
        const newFiles = [...uploadedFiles, file];
        setUploadedFiles(newFiles);
        if (setImages) {
          setImages(newFiles);
        }
      }
    } else if (status === "removed") {
      const updatedFiles = uploadedFiles.filter(
        (uploadedFile) => uploadedFile.name !== file.name
      );
      setUploadedFiles(updatedFiles);
      if (setImages) {
        setImages(updatedFiles);
      }
    }
  };

  const handleSubmit = (files: MyFile[], allFiles: MyFile[]) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
    const newFiles = files.map((f) => f.file);
    const updatedFiles = [...uploadedFiles, ...newFiles];
    const lastFile = files[files.length - 1].file;
    setUploadedFiles(updatedFiles);
    setImages!(updatedFiles);
  };

  return (
    <Dropzone
      styles={{
        dropzone: {
          border: "1px solid #DFEAF2",
          borderRadius: "15px",
          marginTop: "15px",
          width: "80%",
          marginRight: "auto",
          marginLeft: 0,
          color: colors.primaryGreen,
        },
        submitButton: {
          backgroundColor: colors.primaryGreen,
        },

        inputLabelWithFiles: {
          color: colors.white,
          backgroundColor: colors.primaryGreen,
        },
        dropzoneActive: { backgroundColor: colors.primaryGreen },
        input: { backgroundColor: colors.primaryGreen },
        inputLabel: {
          color: "#222222",
          fontSize: "14px",
          fontWeight: "500",
          opacity: 0.5,
        },
      }}
      classNames={classes.fileUploadContainer}
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*,audio/*,video/*"
    />
  );
};

export default FileUploader;
