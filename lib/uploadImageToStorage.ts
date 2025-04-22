// src/lib/services/supabaseService.ts
import supabase from "./supabase"; 
import { Project } from "./types";

/**
 * ترفع صورة إلى خدمة التخزين أو تعيد الرابط إذا كانت موجودة
 * @param image ملف الصورة
 * @param path المسار في التخزين
 * @returns رابط الصورة العامة أو null
 */

export const uploadOrGetImageUrl = async (image: File | null, path: string): Promise<string | null> => {
  if (!image) return null;
  
  try {
    // تحقق إذا كانت الصورة موجودة مسبقًا
    const folderPath = path.split("/").slice(0, -1).join("/");
    const { data: existingFile, error: checkError } = await supabase
      .storage
      .from("projects")
      .list(folderPath);
    
    if (checkError) {
      console.error("Error checking image:", checkError.message);
      return null;
    }
    
    const fileName = path.split("/").pop();
    const fileAlreadyExists = existingFile?.some(file => file.name === fileName);
    
    if (fileAlreadyExists) {
      const { data } = supabase.storage.from("projects").getPublicUrl(path);
      return data?.publicUrl ?? null;
    }
    
    // إذا لم تكن موجودة، ارفعها
    const { error: uploadError } = await supabase
      .storage
      .from("projects")
      .upload(path, image, { upsert: true }); // نستخدم upsert: true للسماح بالاستبدال
    
    if (uploadError) {
      console.error("Error uploading image:", uploadError.message);
      return null;
    }
    
    const { data } = supabase.storage.from("projects").getPublicUrl(path);
    return data?.publicUrl ?? null;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};


export const insertRow = async (table: string, rowData:Project) => {
  try {
    const { data, error } = await supabase.from(table).insert(rowData);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error inserting row in ${table}:`, error);
    return null;
  }
};

export const updateRow = async (table: string, id: string, rowData:Project ) => {
  try {
    const { data, error } = await supabase.from(table).update(rowData).eq("id", id);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating row in ${table}:`, error);
    return null;
  }
};


export const handleRowOperation = async (
  image: File | null,
  path: string,
  rowData: Partial<Project>,
  isEdit: boolean,
  table: string,
  rowId?: string
): Promise<boolean> => {
  try {
    let imageUrl = null;
    
    if (image) {
      imageUrl = await uploadOrGetImageUrl(image, path);
      if (!imageUrl) {
        console.error("Image URL not retrieved.");
        return false;
      }
    }
    
    const fullRow = {
      ...rowData,
      ...(imageUrl && { image: imageUrl }), // أضف حقل الصورة فقط إذا كان لدينا رابط
    };
    
    if (isEdit && rowId) {
      await updateRow(table, rowId, fullRow as Project);
    } else {
      await insertRow(table, fullRow as Project);
    }
    
    return true;
  } catch (error) {
    console.error("Error in handleRowOperation:", error);
    return false;
  }
};