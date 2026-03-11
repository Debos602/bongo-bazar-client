import BlogCard from "@/components/modules/Blogs/BlogCard";
import Hero from "@/components/modules/Home/Hero";
import { Post } from "@/types";

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
    next: {
      tags: ["BLOGS"]
    }
  });
  const { data: blogs } = await res.json();
  // console.log(blogs);
  return (

    <div>
      <Hero />
      <h2 className="text-center my-5 text-4xl">Featured Posts</h2>
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {
            blogs?.slice(0, 3).map((blog: Post) =>
              <BlogCard key={blog?.id} post={blog}></BlogCard>
            )
          }
        </div>
      </div>
    </div>
  );
} 
