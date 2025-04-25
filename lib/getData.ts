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
  const { data, error } = await supabase.from(`projects-${locale}`).select("*");

  if (error) {
    console.error("Error fetching projects:", error);
    return { projects: null, error };
  }

  return { projects: data, error: null };
};
//  ============= Skills ==============
//  ------- Tech -------
export const getTech = async (locale: string) => {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('dataTech')
      .eq('language', locale)
      .single();

    if (error) {
      throw new Error(`Error fetching skills: ${error.message}`);
    }

    if (!data) {
      return { skills: [] };
    }

    if (typeof data.dataTech === 'string') {
      try {
        return { skills: JSON.parse(data.dataTech) };
      } catch (e) {
        console.error('Error parsing dataTech:', e);
        return { skills: [] };
      }
    }

    return { skills: data.dataTech || [] };
  } catch (error) {
    console.error('Error in getTech:', error);
    throw error;
  }
};
//  ------- Soft -------
export const getSoft = async (locale: string) => {
  const { data, error } = await supabase
    .from("skills")
    .select("dataSoft")
    .eq("language", locale)
    .single();

  if (error) {
    return { skills: null, error };
  }
  return { skills: data?.dataSoft, error: null };
};
