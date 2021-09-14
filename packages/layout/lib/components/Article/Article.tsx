import { ReactElement } from 'react';
import { Injection } from '@gatsby-tv/components';
import { Browsable } from '@gatsby-tv/types';
import Preview from '@gatsby-tv/preview';

import { Info } from '@lib/layout/Video/Info';
import { useListing } from '@lib/utilities/listing';

import styles from './Article.scss';

export interface ArticleProps {
  content: Browsable;
  index: number;
}

export function Article(props: ArticleProps): ReactElement {
  const { content, index } = props;
  const { id, preview, info, avatar, link: Link } = useListing();

  const LinkMarkup = Link ? <Link content={content} /> : null;
  const InfoMarkup = (
    <Info content={content} format={info} avatar={avatar} link={Link} />
  );

  return (
    <>
      <Injection.Target id={id} className={styles.Target} index={index} />
      <Preview
        content={content}
        format={preview}
        link={LinkMarkup}
        info={InfoMarkup}
        aria-posinset={index + 1}
        aria-setsize={-1}
      />
    </>
  );
}
