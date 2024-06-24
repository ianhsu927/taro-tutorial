import { request, showModal } from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { View, RichText, Image } from "@tarojs/components";
import Thread from "../../components/thread";
import { Loading } from "../../components/loading";
import api from "../../utils/api";
import { timeagoInst, GlobalState } from "../../utils";

import "./index.css";

function prettyHTML(str) {
  const lines = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];

  lines.forEach((line) => {
    const regex = new RegExp(`<${line}`, "gi");

    str = str.replace(regex, `<${line} class="line"`);
  });

  return str.replace(/<img/gi, '<img class="img"');
}

function ThreadDetail() {
  const [loading, setLoading] = useState(true);
  const [replies, setReplies] = useState([{}]);
  const [content, setContent] = useState("");
  const thread = GlobalState.thread;
  useEffect(() => {
    async function fetchData() {
      const id = GlobalState.thread.tid;
      try {
        const [
          { data },
          {
            data: [{ content_rendered }],
          },
        ] = await Promise.all([
          request({
            url: api.getReplies({
              topic_id: id,
            }),
          }),
          request({
            url: api.getTopics({ id }),
          }),
        ]);
        setLoading(false);
        setReplies(data);
        setContent(prettyHTML(content_rendered));
      } catch (e) {
        showModal({
          title: "错误",
          content: e.message,
        });
      }
    }
    fetchData();
  });

  const replieEl = replies.map((reply, index) => {
    const time = timeagoInst.format(reply.last_modified * 1000, "zh");
    return (
      <View className='reply' key={reply.id}>
        <Image src={reply.member.avatar_large} className='avatar' />
        <View className='main'>
          <View className='author'>{reply.member.username}</View>
          <View className='time'>{time}</View>
          <RichText nodes={reply.content} className='content' />
          <View className='floor'>{index + 1} 楼</View>
        </View>
      </View>
    );
  });

  const contentEl = loading ? (
    <Loading />
  ) : (
    <View>
      <View className='main-content'>
        <RichText nodes={content} />
      </View>
      <View className='replies'>{replieEl}</View>
    </View>
  );

  return (
    <View className='detail'>
      <Thread not_navi={true} {...thread} />
      {contentEl}
    </View>
  );
}

export default ThreadDetail;
