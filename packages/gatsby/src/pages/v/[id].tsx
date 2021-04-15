import React, { useEffect, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Rule } from "@gatsby-tv/components";
import { Video, useVideo } from "@gatsby-tv/content";
import Player from "@gatsby-tv/player";
import { useScroll, useFrame, useIPFSVideoStream } from "@gatsby-tv/utilities";

import { PageBody } from "@src/components/PageBody";
import { Link } from "@src/components/Link";
import styles from "@src/styles/Video.module.scss";

export default function VideoPage(): React.ReactElement {
  const router = useRouter();
  const id = [router.query.id].flat()[0];
  const {
    fullscreen,
    setFullscreen: setFullscreenBase,
    setSidebar,
    setTopbar,
  } = useFrame();
  const { setScroll } = useScroll();
  const { video } = useVideo(id);
  const player = useIPFSVideoStream(video?.content);

  const setFullscreen = useCallback(
    (value) =>
      setFullscreenBase((current) => {
        const update = typeof value === "function" ? value(current) : value;
        setTopbar(!update);
        return update;
      }),
    []
  );

  useEffect(() => {
    setSidebar(false);
    setScroll(0);
  }, []);

  useEffect(() => {
    if (fullscreen) {
      setScroll(0);
    }
  }, [fullscreen]);

  const HeaderMarkup = (
    <Head>
      <title>{video ? `${video.title} - Gatsby` : null}</title>
    </Head>
  );

  return (
    <>
      {HeaderMarkup}
      <Player
        ref={player}
        muted
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
      />
      <PageBody tight>
        <div className={styles.Container}>
          <div className={styles.Info}>
            <Video.Title content={video} />
            <Rule className={styles.Rule} />
            <div className={styles.Container}>
              <div className={styles.Description}>
                <Video.Description id="description" content={video} />
              </div>
              <div className={styles.Credits}>
                <Video.Credits content={video} link={Link.Content} />
              </div>
            </div>
          </div>
          <div className={styles.Related}>
            <Video.Related video={video} link={Link.Content} />
          </div>
        </div>
      </PageBody>
    </>
  );
}
