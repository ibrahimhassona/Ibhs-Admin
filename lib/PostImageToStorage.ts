import supabase from "./supabase";

export const uploadImageToStorage = async (image: File, path: string): Promise<string | null> => {
  try {
    // -------- Upload the image to Supabase storage ----------
    const { error } = await supabase.storage
      .from("projects")
      .upload(path, image);

    if (error) {
      console.error("Error uploading image:", error.message);
      return null;
    }

    // ---------- Get the public URL of the uploaded image ----------
    const { data } = supabase.storage.from("projects").getPublicUrl(path);
    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

