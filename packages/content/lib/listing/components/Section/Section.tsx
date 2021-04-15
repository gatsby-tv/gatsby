import React from "react";
import { Rule, TextDisplay, Injection } from "@gatsby-tv/components";
import Preview from "@gatsby-tv/preview";
import { Browsable } from "@gatsby-tv/types";
import { useUniqueId } from "@gatsby-tv/utilities";

import { Info } from "@lib/video/Info";
import { useListing } from "@lib/utilities/listing";

import styles from "./Section.scss";

export interface SectionProps {
  index: number;
  title: string;
  content: Browsable[];
}

export function Section(props: SectionProps): React.ReactElement | null {
  const { index, title, content } = props;
  const sectionId = useUniqueId("subscriptions-section");
  const { id, preview, info, avatar, link: Link } = useListing();

  const PreviewsMarkup = content.map((item, index) => (
    <Preview
      key={`${item._id}.${index}`}
      content={item}
      format={preview}
      info={<Info content={item} format={info} avatar={avatar} link={Link} />}
      link={Link && <Link content={item} />}
      aria-posinset={index + 1}
      aria-setsize={-1}
    />
  ));

  const TargetMarkup = id ? <Injection.Target id={id} index={index} /> : null;

  return content.length ? (
    <>
      <Rule spacing="none" />
      {TargetMarkup}
      <TextDisplay id={sectionId}>
        {title}
      </TextDisplay>
      <article
        className={styles.Section}
        role="feed"
        aria-labelledby={sectionId}
      >
        {PreviewsMarkup}
      </article>
    </>
  ) : null;
}
