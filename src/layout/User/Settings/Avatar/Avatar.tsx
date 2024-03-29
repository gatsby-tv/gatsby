import { useRef, useState, useEffect, useCallback, ReactElement } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import {
  Activatable,
  Avatar as Image,
  Button,
  Icon,
  Form,
  Modal,
} from '@gatsby-tv/components';
import { Image as ImageIcon, Spinner } from '@gatsby-tv/icons';
import {
  Class,
  useUniqueId,
  useSnackBar,
  FormError,
} from '@gatsby-tv/utilities';
import { User, PutUserAvatarResponse } from '@gatsby-tv/types';

import { Response } from '@src/components/Response';
import { Snack } from '@src/components/Snack';
import { fetcher } from '@src/utilities/fetcher';

import styles from './Avatar.module.scss';

function GenerateAvatar(
  image: HTMLImageElement,
  crop: Record<string, any>,
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

export function Avatar(props: AvatarProps): ReactElement {
  const { user, token } = props;
  const id = useUniqueId('avatar');
  const element = useRef<HTMLImageElement>();
  const [, setSnack] = useSnackBar();
  const [error, setError] = useState<FormError | undefined>(undefined);
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
    GenerateAvatar(element.current, completed, file.type).then(setAvatar);
  }, [completed, file]);

  useEffect(() => {
    if (!error) return;
    setSnack({
      content: <Snack.Reject message={error.message} />,
      duration: 2000,
    });
  }, [error]);

  const onLoad = useCallback(
    (image: HTMLImageElement) => {
      element.current = image;

      const width =
        image.width < image.height
          ? image.width
          : (image.height / image.width) * image.width;

      const height =
        image.width > image.height
          ? image.height
          : (image.width / image.height) * image.height;

      const crop: Crop = {
        unit: 'px',
        width,
        height,
        x: (image.width - width) / 2,
        y: (image.height - height) / 2,
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

    const promise = fetcher<PutUserAvatarResponse>(`/user/${user._id}/avatar`, {
      method: 'PUT',
      token,
      body,
    })
      .catch((resp) => resp)
      .then(Response({ success: 'Avatar updated' }));

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
      active={!error && Boolean(file)}
      overlay
      onExit={onExit}
    >
      {LoadingMarkup}
      <ReactCrop
        className={styles.Image}
        imageStyle={{ maxHeight: '50vh' }}
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
          className={Class(styles.Button, styles.Submit)}
          type="submit"
          onClick={onSubmit}
        >
          Submit
        </Button>
        <Button
          className={Class(styles.Button, styles.Cancel)}
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
      <Form id={id} onError={setError}>
        <Form.File
          id="avatar"
          value={file}
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={setFile}
        >
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
