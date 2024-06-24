import React from "react";
import { View } from "@tarojs/components";
import Thread from "./thread";
import { Loding } from "./loading";

// 这是注释
const ThreadList = ({ threads, loading }) => {
  const element = threads.map((thread) => <Thread key={thread.id} {...thread} />);

  return loading ? <Loding /> : <View className='thread-list'>{element}</View>;
};

export default ThreadList;
