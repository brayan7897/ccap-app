export const publicService = {
  async getFeaturedProfessors() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/featured-professors`, {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(8000)
      });
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/testimonials`, {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(8000)
      });
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
  },

  async getCategories() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/?skip=0&limit=50`, {
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(8000)
      });
      if (!res.ok) return [];
      return await res.json();
    } catch (error) {
      console.error("Failed to fetch categories", error);
      return [];
    }
  },

  async getCourses(skip = 0, limit = 8) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/?skip=${skip}&limit=${limit}`, {
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(8000)
      });
      if (!res.ok) return [];
      const raw = await res.json();
      if (Array.isArray(raw)) return raw;
      if (raw && typeof raw === "object") {
        if (Array.isArray(raw.items)) return raw.items;
        if (Array.isArray(raw.data)) return raw.data;
      }
      return [];
    } catch (error) {
      console.error("Failed to fetch courses", error);
      return [];
    }
  }
};
