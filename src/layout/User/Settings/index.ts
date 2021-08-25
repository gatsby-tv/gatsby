import { Layout, LayoutProps } from './Layout';
import { Avatar, AvatarProps } from './Avatar';
import { Fields, FieldsProps } from './Fields';
import { Header, HeaderProps } from './Header';
import { Info, InfoProps } from './Info';

export type {
  LayoutProps as UserSettingsLayoutProps,
  AvatarProps as UserSettingsAvatarProps,
  FieldsProps as UserSettingsFieldsProps,
  HeaderProps as UserSettingsHeaderProps,
  InfoProps as UserSettingsInfoProps,
};

export const Settings = {
  Layout,
  Avatar,
  Fields,
  Header,
  Info,
};
