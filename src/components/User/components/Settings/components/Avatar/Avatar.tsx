import React, { useRef, useState, useEffect, useCallback } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import {
  Activatable,
  Avatar as Image,
  Button,
  Icon,
  Form,
  Modal,
  TextDisplay,
} from '@gatsby-tv/components';
import { Image as ImageIcon, Spinner } from '@gatsby-tv/icons';
import {
  classNames,
  useUniqueId,
  useModal,
  useSnackBar,
} from '@gatsby-tv/utilities';
import { User, PutUserAvatarResponse } from '@gatsby-tv/types';

import { ResponseSnack } from '@src/components/ResponseSnack';
import { fetcher } from '@src/utilities/fetcher';

import styles from './Avatar.module.scss';

function GenerateAvatar(
  image: HTMLImageElement,
  crop: Record<string, number>,
  type: string
): Promise<Blob | null> {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;

  canvas
    .getContext('2d')
    ?.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

  return new Promise((resolve) => canvas.toBlob(resolve, type, 1));
}

export interface AvatarProps {
  user: User;
  token: string;
}

export function Avatar(props: AvatarProps): React.ReactElement {
  const { user, token } = props;
  const id = useUniqueId('avatar');
  const element = useRef<HTMLImageElement>();
  const [, setSnack] = useSnackBar();
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState('');
  const [avatar, setAvatar] = useState<Blob | null>(null);
  const [crop, setCrop] = useState<Crop>({ unit: '%', width: 100, aspect: 1 });
  const [completed, setCompleted] = useState<Crop | undefined>(undefined);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener('load', () => setImage(reader.result as string));
    reader.readAsDataURL(file);
  }, [file]);

  useEffect(() => {
    if (file) return;
    setImage('');
    setAvatar(null);
  }, [file]);

  useEffect(() => {
    if (!file || !completed || !element.current) return;
    GenerateAvatar(
      element.current,
      completed as Record<string, number>,
      file.type
    ).then(setAvatar);
  }, [completed, file]);

  const onLoad = useCallback(
    (image: HTMLImageElement) => {
      element.current = image;

      const width =
        image.width < image.height ? 100 : (image.height / image.width) * 100;

      const height =
        image.width > image.height ? 100 : (image.width / image.height) * 100;

      const crop = {
        width,
        height,
        x: (100 - width) / 2,
        y: (100 - height) / 2,
      };

      setCrop((current) => ({ ...current, ...crop }));
      setCompleted((current) => (current ? { ...current, ...crop } : current));
      GenerateAvatar(image, crop, (file as File).type).then(setAvatar);
      return false;
    },
    [file]
  );

  const onSubmit = useCallback(() => {
    if (!avatar) return;

    setFile(null);
    const body = new FormData();
    body.append('avatar', avatar);

    const promise = fetcher<PutUserAvatarResponse>(
      `/user/${user._id}/avatar`,
      token,
      {
        method: 'PUT',
        body,
      }
    ).then(ResponseSnack({ success: 'Avatar updated' }));

    setSnack({ content: promise, duration: 2000 });
  }, [user, token, avatar]);

  const onExit = useCallback(() => setFile(null), []);

  const LoadingMarkup = !image ? (
    <div className={styles.Loading}>
      <Icon className={styles.Spinner} src={Spinner} />
    </div>
  ) : null;

  const CropMarkup = (
    <Modal
      className={styles.Modal}
      active={Boolean(file)}
      overlay
      onExit={onExit}
    >
      {LoadingMarkup}
      <ReactCrop
        className={styles.Image}
        src={image}
        crop={crop}
        circularCrop
        keepSelection
        onImageLoaded={onLoad}
        onChange={setCrop}
        onComplete={setCompleted}
      />
      <div className={styles.Controls}>
        <Button
          className={classNames(styles.Button, styles.Submit)}
          onClick={onSubmit}
        >
          Submit
        </Button>
        <Button
          className={classNames(styles.Button, styles.Cancel)}
          onClick={onExit}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );

  const OverlayMarkup = (
    <>
      <Activatable
        className={styles.Tint}
        active={hover}
        duration="fastest"
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
      >
        <h3 className={styles.Text}>Change Avatar</h3>
      </Activatable>
      <Icon className={styles.Icon} src={ImageIcon} size="small" />
    </>
  );

  return (
    <>
      <Form id={id}>
        <Form.File id="avatar" value={file} onChange={setFile}>
          <Image
            className={styles.Avatar}
            src={user.avatar}
            overlay={OverlayMarkup}
          />
        </Form.File>
      </Form>
      {CropMarkup}
    </>
  );
}
