import { Topic, fetchTopics } from '@utils';
import { useState, useEffect } from 'react';
import { PostersRail } from '../PostersRail';
import { config } from '@config';

export const RailsView = () => {
  const [data, setData] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTopics({ count: config.topics });
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <>
      {/* {data.length === 0 && <div>Loading...</div>} */}
      {data.map((topic) => (
        <PostersRail key={topic.id} topic={topic} fromPage={0} />
      ))}
    </>
  );
};
