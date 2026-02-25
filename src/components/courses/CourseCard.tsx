import Image from "next/image";
import Link from "next/link";
import { BookOpen, Star, Clock, Heart } from "lucide-react";

export interface CourseCardProps {
  id: string;
  title: string;
  instructor: {
    name: string;
    avatar: string;
  };
  thumbnail: string;
  category: string;
  duration: string;
  rating: number;
  students: number;
  price: number;
  originalPrice?: number;
}

export function CourseCard({
  id,
  title,
  instructor,
  thumbnail,
  category,
  duration,
  rating,
  students,
  price,
  originalPrice,
}: CourseCardProps) {
  return (
    <div className="group flex flex-col bg-[#171b26] border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all hover:shadow-2xl hover:shadow-blue-900/10 h-full">
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#11141d]/80 backdrop-blur-md rounded-md text-[10px] font-bold text-slate-300 uppercase tracking-wider border border-slate-700/50">
          {category}
        </div>
        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 p-2 bg-[#11141d]/50 backdrop-blur-md rounded-full text-slate-400 hover:text-red-500 hover:bg-[#11141d]/80 transition-all">
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <Link href={`/courses/${id}`} className="block mb-3">
          <h3 className="font-bold text-white text-base leading-snug line-clamp-2 group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
        </Link>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative w-6 h-6 rounded-full overflow-hidden bg-slate-800 border border-slate-700">
            <Image
              src={instructor.avatar}
              alt={instructor.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xs text-slate-400">{instructor.name}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-6">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="font-medium text-slate-300">{rating}</span>
            <span className="opacity-60">({students})</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Footer: Price & Action */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-800/80">
          <div className="flex flex-col">
            <span className="text-lg font-extrabold text-white">S/ {price}</span>
            {originalPrice && (
              <span className="text-xs text-slate-500 line-through">S/ {originalPrice}</span>
            )}
          </div>
          <Link
            href={`/courses/${id}`}
            className="flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Ver curso
          </Link>
        </div>
      </div>
    </div>
  );
}
