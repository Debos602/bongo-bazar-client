import BlogCard from "@/components/modules/Blogs/BlogCard";
import { Post } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Blogs | Next Blog",
  description: "Brows all blogs posts on web development, Next.js, React, and more. Stay updated with the latest tutorial and article"
};
const AllBlogsPage = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
    cache: "no-store"
  });
  const { data: blogs } = await res.json();
  // console.log(blogs);
  return (
    <div className="py-30 px-4 max-w-7xl mx-auto my-5">
      <h2 className="text-center text-4xl">All Blogs</h2>
      <div className="grid grid-cols-3 gap-5  max-w-6xl  mx-auto my-5">
        {
          Array.isArray(blogs) && blogs.length > 0 ? (
            blogs.map((blog: Post) => (
              <BlogCard key={blog.id} post={blog} />
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">No blogs found.</p>
          )
        }
      </div>
    </div>
  );
};

export default AllBlogsPage;
