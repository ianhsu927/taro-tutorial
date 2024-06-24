import { useState, useEffect } from "react";
import { View } from "@tarojs/components";
import { useLoad, request, showToast } from "@tarojs/taro";
import { ThreadList } from "../../components/thread_list";
import api from "../../utils/api";
import "./index.css";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });
  const [loading, setLoading] = useState(true);
  const [threads, setThreads] = useState([]);
  useEffect(() => {
    // 加载数据
    async function fetchLatestTopic() {
      try {
        const res = await request({
          url: api.getLatestTopic(),
        });
        setThreads(res.data);
        setLoading(false);
      } catch (err) {
        showToast({
          title: "载入远程数据错误",
        });
      }
    }
    fetchLatestTopic();
  });

  return (
    <View className='index'>
      <ThreadList loading={loading} threads={threads} />
    </View>
  );
}
