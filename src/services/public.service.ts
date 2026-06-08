export const publicService = {
  async getFeaturedProfessors() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/featured-professors`, { next: { revalidate: 3600 } });
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data.map((t: any) => ({
        name: t.name,
        specialty: t.specialization,
        image: t.image_url,
      })) : [];
    } catch (error) {
      console.error("Failed to fetch teachers", error);
      return [];
    }
  },

  async getTestimonials() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/testimonials`, { next: { revalidate: 3600 } });
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data.map((t: any) => ({
        quote: t.text,
        name: t.user_name,
        role: "", 
        image: t.user_image_url,
        rating: t.rating || 5,
      })) : [];
    } catch (error) {
      console.error("Failed to fetch testimonials", error);
      return [];
    }
  }
};


