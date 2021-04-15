import React, { useState } from "react";
import DOMPurify from "dompurify";
import { Button, Injection, TextBox, Icon } from "@gatsby-tv/components";
import { ExtendDown, ExtendUp } from "@gatsby-tv/icons";
import {
  ifExists,
  useMobileDetector,
  useStabilizedCallback,
} from "@gatsby-tv/utilities";
import { Browsable } from "@gatsby-tv/types";

import { Skeleton } from "./Description.skeleton";
import styles from "./Description.scss";

export interface DescriptionProps {
  id?: string;
  content?: Browsable;
}

export function Description(
  props: DescriptionProps
): React.ReactElement | null {
  const { id, content } = props;
  const isMobile = useMobileDetector();
  const [clamp, setClamp] = useState(true);

  const toggleClamp = useStabilizedCallback(
    () => setClamp((current) => !current),
    []
  );

  if (isMobile === undefined) return null;
  if (!content) return <Skeleton />;

  const TextMarkup = DOMPurify.sanitize(content.description, {
    USE_PROFILES: { html: true },
  });

  return !isMobile ? (
    <>
      <TextBox
        className={styles.Description}
        clamp={ifExists(clamp, 3)}
        dangerouslySetInnerHTML={{ __html: TextMarkup }}
      />
      {id && <Injection.Target id={id} />}
      <Button className={styles.ShowMoreButton} onClick={toggleClamp}>
        {clamp ? "Show More" : "Show Less"}
      </Button>
    </>
  ) : (
    <Button unstyled onClick={toggleClamp}>
      <TextBox
        className={styles.Description}
        clamp={ifExists(clamp, 3)}
        dangerouslySetInnerHTML={{ __html: TextMarkup }}
      />
      {id && <Injection.Target id={id} />}
      <Icon
        className={styles.ShowMoreIcon}
        src={clamp ? ExtendDown : ExtendUp}
        size="smallest"
      />
    </Button>
  );
}
