import React from 'react';
import {StyleSheet, View} from 'react-native';
import rpx from '@/utils/rpx';

import Loading from '@/components/base/loading';
import Header from './header';
import MusicList from '@/components/musicList';
import Config from '@/core/config';
import MusicQueue from '@/core/musicQueue';

interface IMusicListProps {
    topListDetail: IMusic.IMusicTopListItem | null;
    musicList?: IMusic.IMusicItem[] | null;
}
export default function TopListMusicList(props: IMusicListProps) {
    const {topListDetail, musicList} = props;

    return (
        <View style={style.wrapper}>
            {!musicList ? (
                <Loading />
            ) : (
                <MusicList
                    showIndex
                    Header={
                        <Header
                            topListDetail={topListDetail}
                            musicList={musicList}
                        />
                    }
                    musicList={musicList}
                    onItemPress={(musicItem, musicList) => {
                        if (
                            Config.get('setting.basic.clickMusicInAlbum') ===
                            '播放单曲'
                        ) {
                            MusicQueue.play(musicItem);
                        } else {
                            MusicQueue.playWithReplaceQueue(
                                musicItem,
                                musicList ?? [musicItem],
                            );
                        }
                    }}
                />
            )}
        </View>
    );
}

const style = StyleSheet.create({
    wrapper: {
        width: rpx(750),
        flex: 1,
    },
    topBtn: {
        width: rpx(750),
        height: rpx(80),
    },
});
