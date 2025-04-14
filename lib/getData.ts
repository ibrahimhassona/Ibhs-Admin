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

//  -------------- Projects ------------
export const getProjects = async (locale: string) => {
  const { data, error } = await supabase
    .from(`projects-${locale}`)
    .select("*")

  if (error) {
    console.error("Error fetching projects:", error);
    return { projects: null, error };
  }

  return { projects: data, error: null };
};