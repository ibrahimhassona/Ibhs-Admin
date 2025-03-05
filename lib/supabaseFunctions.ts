
// // ----- Upload Image -------
// export const uploadImage = async (file: File, bucket: "portfolio" | "techlogos"): Promise<string | null> =>{
//     if (!file) throw new Error("يجب تحديد ملف للرفع");
  
//     const fileName = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
//     const { data, error } = await supabase.storage.from(bucket).upload(fileName, file);
//     if (error) {
//       console.error("⚠️ فشل رفع الصورة:", error.message);
//       return null;
//     }
  
//     // توليد رابط توقيعي صالح لفترة طويلة
//     const { data: signedUrlData } = await supabase.storage.from(bucket).createSignedUrl(fileName, 60 * 60 * 24 * 365); // صلاحية سنة كاملة
  
//     return signedUrlData?.signedUrl ?? null;
//   }