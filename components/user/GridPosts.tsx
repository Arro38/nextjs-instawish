"use client";

import { useCallback, useState } from "react";
import ImageViewer from "react-simple-image-viewer";

export default function GridPosts({ posts }: { posts: Post[] }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = posts?.map(
    (post) => process.env.NEXT_PUBLIC_BASE_URL + post.imageUrl
  );

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  return (
    <>
      <div className="flex flex-wrap -m-6 ">
        {posts?.map((post, i) => (
          <div key={i} className="border border-white  w-1/3">
            {/* JSX content */}
            <img
              className="  object-cover cursor-pointer"
              src={process.env.NEXT_PUBLIC_BASE_URL + post.imageUrl}
              alt={post.description}
              onClick={() => openImageViewer(i)}
            />
          </div>
        ))}
      </div>
      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </>
  );
}
