import supabase from "./supabase";

export const getPersonalInformation = async (locale: string) => {
  const { data, error } = await supabase
    .from("Personal_information")
    .select("*")
    .eq("language", locale);

  if (error) {
    console.error("Error fetching personal information:", error);
    return { Personal_information: null, error };
  }

  return { Personal_information: data, error: null };
};
