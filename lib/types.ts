export interface Project {
    id?: string;
    image: string;
    title: string;
    slug: string;
    status: string;
    technologies:string[];
    description: string;
    date: string;
    isFeature: string;
    video: string;
    links: {
      live: string;
      repo: string;
    };
  }