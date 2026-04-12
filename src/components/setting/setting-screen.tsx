import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  ChevronRight,
  User,
  Lock,
  BadgeCheck,
  Bell,
  Mail,
  UserPlus,
  Heart,
  ShieldCheck,
  Clock,
  Ban,
  Sun,
  Languages,
  HelpCircle,
  MessageSquare,
  Info,
  Trash2,
  LogOut,
} from 'lucide-react-native';
import { IUser } from '@/src/types/user/user.types';
import { navigationRouter } from '@/src/navigation';
import { router } from 'expo-router';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SettingScreenProps {
  user: IUser;
  onLogout: () => void;
}

interface NotificationState {
  push: boolean;
  email: boolean;
  newFollowers: boolean;
  promptLikes: boolean;
}

interface PrivacyState {
  privateAccount: boolean;
  activityStatus: boolean;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionLabel = ({ label }: { label: string }) => (
  <Text className="px-4 pt-6 pb-2 text-xs font-semibold tracking-widest text-gray-400 uppercase">
    {label}
  </Text>
);

const RowItem = ({
  icon,
  iconBg,
  label,
  sublabel,
  onPress,
  danger = false,
  right,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  sublabel?: string;
  onPress?: () => void;
  danger?: boolean;
  right?: React.ReactNode;
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    className="flex-row items-center px-4 py-3 bg-white"
  >
    <View
      className="items-center justify-center mr-3 w-9 h-9 rounded-xl"
      style={{ backgroundColor: iconBg }}
    >
      {icon}
    </View>

    <View className="flex-1">
      <Text className={`text-sm font-medium ${danger ? 'text-red-600' : 'text-gray-900'}`}>
        {label}
      </Text>
      {sublabel && (
        <Text className="mt-0.5 text-xs text-gray-400">{sublabel}</Text>
      )}
    </View>

    {right ?? <ChevronRight size={16} color="#D1D5DB" />}
  </TouchableOpacity>
);

const Divider = () => (
  <View className="ml-16 border-b border-gray-100" />
);

const SettingGroup = ({ children }: { children: React.ReactNode }) => (
  <View className="mx-4 overflow-hidden bg-white border border-gray-100 rounded-2xl">
    {children}
  </View>
);



export default function SettingScreen({ user, onLogout }: SettingScreenProps) {
  const [notifications, setNotifications] = useState<NotificationState>({
    push: true,
    email: false,
    newFollowers: true,
    promptLikes: false,
  });

  const [privacy, setPrivacy] = useState<PrivacyState>({
    privateAccount: false,
    activityStatus: true,
  });
  

  const toggleNotification = (key: keyof NotificationState) => {
    setNotifications(prev => {
      // if push is turned off, disable all sub-toggles
      if (key === 'push' && prev.push) {
        return { push: false, email: false, newFollowers: false, promptLikes: false };
      }
      return { ...prev, [key]: !prev[key] };
    });
  };

  const togglePrivacy = (key: keyof PrivacyState) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete account',
      'This action is permanent and cannot be undone. All your prompts and data will be removed.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // call your delete account API here
          },
        },
      ],
    );
  };

  const handleLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: onLogout },
    ]);
  };

  const ToggleSwitch = ({
    value,
    onToggle,
    disabled = false,
  }: {
    value: boolean;
    onToggle: () => void;
    disabled?: boolean;
  }) => (
    <Switch
      value={value}
      onValueChange={onToggle}
      disabled={disabled}
      trackColor={{ false: '#E5E7EB', true: '#111827' }}
      thumbColor="#ffffff"
      ios_backgroundColor="#E5E7EB"
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">

      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-3 bg-white border-b border-gray-100">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="p-2 bg-gray-100 rounded-full"
        >
          <ArrowLeft size={20} color="#374151" />
        </TouchableOpacity>
        <Text className="text-base font-bold text-gray-900">Settings</Text>
        <View className="w-9" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* User card */}
        <TouchableOpacity
          onPress={() => navigationRouter.goEditProfile()}
          activeOpacity={0.8}
          className="flex-row items-center gap-4 p-4 mx-4 mt-6 bg-white border border-gray-100 rounded-2xl"
        >
          <Image
            source={{ uri: user?.avatar || 'https://via.placeholder.com/150' }}
            className="bg-gray-200 rounded-full w-14 h-14"
          />
          <View className="flex-1">
            <Text className="text-base font-bold text-gray-900">{user?.name}</Text>
            <Text className="mt-0.5 text-sm text-gray-400">{user?.email}</Text>
          </View>
          <View className="items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
            <ChevronRight size={16} color="#6B7280" />
          </View>
        </TouchableOpacity>

        {/* ── Account ── */}
        <SectionLabel label="Account" />
        <SettingGroup>
          <RowItem
            icon={<User size={17} color="#185FA5" />}
            iconBg="#E6F1FB"
            label="Edit profile"
            
          />
          <Divider />
          <RowItem
          onPress={()=> navigationRouter.goChangePassword()}
            icon={<Lock size={17} color="#3B6D11" />}
            iconBg="#EAF3DE"
            label="Change password"
            
          />
          <Divider />
          {!user?.isVerify && (
            <RowItem
              icon={<BadgeCheck size={17} color="#534AB7" />}
              iconBg="#EEEDFE"
              label="Request verified badge"
              sublabel="Get a blue checkmark on your profile"
             
            />
          )}
        </SettingGroup>

        {/* ── Notifications ── */}
        <SectionLabel label="Notifications" />
        <SettingGroup>
          <RowItem
            icon={<Bell size={17} color="#854F0B" />}
            iconBg="#FAEEDA"
            label="Push notifications"
            right={
              <ToggleSwitch
                value={notifications.push}
                onToggle={() => toggleNotification('push')}
              />
            }
          />
          <Divider />
          <RowItem
            icon={<Mail size={17} color="#854F0B" />}
            iconBg="#FAEEDA"
            label="Email notifications"
            right={
              <ToggleSwitch
                value={notifications.email}
                onToggle={() => toggleNotification('email')}
                disabled={!notifications.push}
              />
            }
          />
          <Divider />
          <RowItem
            icon={<UserPlus size={17} color="#854F0B" />}
            iconBg="#FAEEDA"
            label="New followers"
            sublabel="Notify when someone follows you"
            right={
              <ToggleSwitch
                value={notifications.newFollowers}
                onToggle={() => toggleNotification('newFollowers')}
                disabled={!notifications.push}
              />
            }
          />
          <Divider />
          <RowItem
            icon={<Heart size={17} color="#854F0B" />}
            iconBg="#FAEEDA"
            label="Prompt likes"
            sublabel="When someone likes your prompt"
            right={
              <ToggleSwitch
                value={notifications.promptLikes}
                onToggle={() => toggleNotification('promptLikes')}
                disabled={!notifications.push}
              />
            }
          />
        </SettingGroup>

        {/* ── Privacy ── */}
        <SectionLabel label="Privacy" />
        <SettingGroup>
          <RowItem
            icon={<ShieldCheck size={17} color="#0F6E56" />}
            iconBg="#E1F5EE"
            label="Private account"
            sublabel="Only followers can see your prompts"
            right={
              <ToggleSwitch
                value={privacy.privateAccount}
                onToggle={() => togglePrivacy('privateAccount')}
              />
            }
          />
          <Divider />
          <RowItem
            icon={<Clock size={17} color="#0F6E56" />}
            iconBg="#E1F5EE"
            label="Activity status"
            sublabel="Show when you're active"
            right={
              <ToggleSwitch
                value={privacy.activityStatus}
                onToggle={() => togglePrivacy('activityStatus')}
              />
            }
          />
          <Divider />
          <RowItem
            icon={<Ban size={17} color="#0F6E56" />}
            iconBg="#E1F5EE"
            label="Blocked users"
          
          />
        </SettingGroup>

        {/* ── Appearance ── */}
        <SectionLabel label="Appearance" />
        <SettingGroup>
          <RowItem
            icon={<Sun size={17} color="#444441" />}
            iconBg="#F1EFE8"
            label="Theme"
            sublabel="System default"
          
          />
          <Divider />
          <RowItem
            icon={<Languages size={17} color="#444441" />}
            iconBg="#F1EFE8"
            label="Language"
            sublabel="English"
           
          />
        </SettingGroup>

        {/* ── Support ── */}
        <SectionLabel label="Support" />
        <SettingGroup>
          <RowItem
            icon={<HelpCircle size={17} color="#185FA5" />}
            iconBg="#E6F1FB"
            label="Help & FAQ"
          
          />
          <Divider />
          <RowItem
            icon={<MessageSquare size={17} color="#185FA5" />}
            iconBg="#E6F1FB"
            label="Send feedback"
          
          />
          <Divider />
          <RowItem
            icon={<Info size={17} color="#185FA5" />}
            iconBg="#E6F1FB"
            label="About"
            sublabel="v1.0.0"
           
          />
        </SettingGroup>

        {/* ── Danger zone ── */}
        <SectionLabel label="Danger zone" />
        <SettingGroup>
          <RowItem
            icon={<Trash2 size={17} color="#A32D2D" />}
            iconBg="#FCEBEB"
            label="Delete account"
            danger
            onPress={handleDeleteAccount}
          />
          <Divider />
          <RowItem
            icon={<LogOut size={17} color="#A32D2D" />}
            iconBg="#FCEBEB"
            label="Log out"
            danger
            onPress={handleLogout}
          />
        </SettingGroup>

      </ScrollView>
    </SafeAreaView>
  );
}