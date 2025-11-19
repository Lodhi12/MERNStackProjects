import { useEffect, useState } from "react";
import { dummyPostsData, type PostsDataType } from "../assets/assets";
import Loading from "../components/Loading";
import StoriesBar from "../components/StoriesBar";

const Feed = () => {
  const [feeds, setFeeds] = useState<PostsDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchFeeds = async () => {
    setFeeds(dummyPostsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);
  return !loading ? (
    <div className="h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-center justify-center xl:gap-8">
      {/* Stories and post list */}
      <div>
        <StoriesBar />
        <div className="p-4 space-y-6">List of post</div>
      </div>
      {/* Right Sidebar */}
      <div>
        <div>
          <h1>Sponsored</h1>
        </div>
        <h1>Recent Messages</h1>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
