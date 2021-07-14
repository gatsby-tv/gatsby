import { Avatar, AvatarProps } from './components/Avatar';
import { Fields, FieldsProps } from './components/Fields';
import { Header, HeaderProps } from './components/Header';
import { Info, InfoProps } from './components/Info';
import { Layout, LayoutProps } from './components/Layout';

export type {
  AvatarProps as UserSettingsAvatarProps,
  FieldsProps as UserSettingsFieldsProps,
  HeaderProps as UserSettingsHeaderProps,
  InfoProps as UserSettingsInfoProps,
  LayoutProps as UserSettingsLayoutProps,
};

export const Settings = {
  Avatar,
  Fields,
  Header,
  Info,
  Layout,
};
