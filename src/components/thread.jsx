import Taro, { eventCenter } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import {} from "../utils/api";
import {} from "../utils";

const Thread = ({
  title,
  node,
  last_modified,
  replies,
  tid,
  member,
  not_navi,
}) => {
  const time = last_modified;
  const usernameCls = `author ${not_navi ? "bold" : ""}`;

  return (
    <View
      className='thread'
      onClick={() => {
        if (not_navi) {
          return;
        }
        eventCenter.trigger("thread-click", { tid });
        Taro.navigateTo({
          url: "/pages/thread_detail/thread_detail",
        });
      }}
    >
      <View className='info'>
        <View>
          <Image src={member.avatar_large} className='avatar' />
        </View>
        <View className='middle'>
          <View className={usernameCls}>{member.username}</View>
          <View className='replies'>
            <Text className='mr10'>{time}</Text>
            <Text>评论 {replies}</Text>
          </View>
        </View>
        <View className='node'>
          <Text className='tag'>{title}</Text>
        </View>
      </View>
    </View>
  );
};

export { Thread };
