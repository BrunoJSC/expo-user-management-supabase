import { useState, useEffect } from "react";
import { StyleSheet, View, Alert, Image, Button } from "react-native";
import DocumentPicker, {
  isCancel,
  isInProgress,
  types,
} from "react-native-document-picker";
import { supabse } from "../lib/supabase";

interface Props {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
}

export function Avatar({ size, url, onUpload }: Props) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const avatarSize = { height: size, width: size };

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabse.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      }
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true);
      const file = await DocumentPicker.pickSingle({
        presentationStyle: "fullScreen",
        copyTo: "cachesDirectory",
        type: types.images,
        mode: "open",
      });

      const photo = {
        uri: file.fileCopyUri,
        type: file.type,
        name: file.name,
      } as unknown as Blob;

      const formData = new FormData();
      formData.append("file", photo);

      const fileExt = file.name?.split(".").pop();
      const filePath = `${Math.random()}.${fileExt}`;

      let { error } = await supabse.storage
        .from("avatars")
        .upload(filePath, formData);
      if (error) {
        throw error;
      }

      onUpload(filePath);
    } catch (error) {
      if (isCancel(error)) {
        console.warn("cancelled");
      } else if (isInProgress(error)) {
        console.warn(
          "multiple pickers were opened, only the last will be considered"
        );
      } else if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        throw error;
      }
    } finally {
      setUploading(false);
    }
  }
}
