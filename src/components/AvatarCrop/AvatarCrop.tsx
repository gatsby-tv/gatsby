import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import { Button, Icon, Modal, ModalProps } from '@gatsby-tv/components';
import { Spinner } from '@gatsby-tv/icons';
import { classNames, useModal } from '@gatsby-tv/utilities';

import styles from './AvatarCrop.module.scss';

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

export interface AvatarCropProps
  extends Omit<ModalProps, 'active' | 'overlay' | 'zIndex'> {
  file: File | null;
  onSubmit: (blob: Blob) => void;
}

export function AvatarCrop(props: AvatarCropProps): React.ReactElement {
  const { file, onSubmit: onSubmitHandler, onExit } = props;
  const element = useRef<HTMLImageElement>();
  const [image, setImage] = useState('');
  const [avatar, setAvatar] = useState<Blob | null>(null);
  const [crop, setCrop] = useState<Crop>({ unit: '%', width: 100, aspect: 1 });
  const [completed, setCompleted] = useState<Crop | undefined>(undefined);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImage(reader.result as string));
      reader.readAsDataURL(file);
    } else {
      setImage('');
      setAvatar(null);
    }
  }, [file]);

  useEffect(() => {
    if (!file || !completed || !element.current) return;
    GenerateAvatar(
      element.current,
      completed as Record<string, number>,
      file.type
    ).then(setAvatar);
  }, [completed, file]);

  const onImageLoaded = useCallback(
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
    if (avatar) {
      onSubmitHandler(avatar);
    }
  }, [avatar]);

  const LoadingMarkup = !image ? (
    <div className={styles.Loading}>
      <Icon className={styles.Spinner} src={Spinner} />
    </div>
  ) : null;

  return (
    <Modal
      className={styles.Modal}
      active={Boolean(file)}
      overlay
      onExit={onExit}
      {...props}
    >
      {LoadingMarkup}
      <ReactCrop
        src={image}
        className={styles.Image}
        crop={crop}
        circularCrop
        keepSelection
        onImageLoaded={onImageLoaded}
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
}
