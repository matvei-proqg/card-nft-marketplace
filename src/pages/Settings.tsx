
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Lock, Bell, Palette, User } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Switch } from '@/components/ui/switch';
import { useCardContext } from '@/contexts/CardContext';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { theme, accentColor, language, setTheme, setAccentColor, setLanguage } = useTheme();
  const { currentUser } = useCardContext();
  const { toast } = useToast();
  
  const [username, setUsername] = useState(currentUser.name);
  const [email, setEmail] = useState("user@example.com");
  const [userDescription, setUserDescription] = useState(currentUser.description);
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [notifications, setNotifications] = useState({
    trades: true,
    gifts: true,
    sales: true
  });

  const handleSaveProfile = () => {
    // In a real app, this would update the user profile in the database
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
      duration: 3000,
    });
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "The new password and confirmation do not match.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    if (!currentPassword) {
      toast({
        title: "Current password required",
        description: "Please enter your current password.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // In a real app, this would verify the current password and update it
    toast({
      title: "Password changed",
      description: "Your password has been updated successfully.",
      duration: 3000,
    });
    
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleToggleNotification = (type: 'trades' | 'gifts' | 'sales') => {
    setNotifications({
      ...notifications,
      [type]: !notifications[type]
    });
    
    toast({
      title: "Notification settings updated",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} notifications ${notifications[type] ? 'disabled' : 'enabled'}.`,
      duration: 2000,
    });
  };

  const translations = {
    ru: {
      settings: 'Настройки',
      settingsDesc: 'Управляйте настройками вашего аккаунта и приложения',
      general: 'Общие',
      security: 'Безопасность',
      notifications: 'Уведомления',
      appearance: 'Внешний вид',
      profile: 'Профиль',
      language: 'Язык',
      russian: 'Русский',
      english: 'English',
      accountSettings: 'Настройки аккаунта',
      email: 'Email',
      username: 'Имя пользователя',
      description: 'Описание профиля',
      save: 'Сохранить изменения',
      changePassword: 'Смена пароля',
      currentPassword: 'Текущий пароль',
      newPassword: 'Новый пароль',
      confirmPassword: 'Подтвердите новый пароль',
      changePasswordBtn: 'Изменить пароль',
      notificationSettings: 'Настройки уведомлений',
      tradeRequests: 'Запросы на обмен',
      gifts: 'Подарки',
      marketSales: 'Продажи на рынке',
      theme: 'Тема',
      darkTheme: 'Тёмная тема',
      accentColor: 'Акцентный цвет'
    },
    en: {
      settings: 'Settings',
      settingsDesc: 'Manage your account and application settings',
      general: 'General',
      security: 'Security',
      notifications: 'Notifications',
      appearance: 'Appearance',
      profile: 'Profile',
      language: 'Language',
      russian: 'Русский',
      english: 'English',
      accountSettings: 'Account Settings',
      email: 'Email',
      username: 'Username',
      description: 'Profile Description',
      save: 'Save Changes',
      changePassword: 'Change Password',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm New Password',
      changePasswordBtn: 'Change Password',
      notificationSettings: 'Notification Settings',
      tradeRequests: 'Trade Requests',
      gifts: 'Gifts',
      marketSales: 'Market Sales',
      theme: 'Theme',
      darkTheme: 'Dark Theme',
      accentColor: 'Accent Color'
    }
  };

  const t = translations[language];

  return (
    <div className="page-container page-transition pt-20">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gradient mb-4">
            {t.settings}
          </h1>
          <p className="text-gray-300">
            {t.settingsDesc}
          </p>
        </div>
        
        <div className="glass-card rounded-xl p-6">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User size={16} />
                <span className="hidden sm:inline">
                  {t.profile}
                </span>
              </TabsTrigger>
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Globe size={16} />
                <span className="hidden sm:inline">
                  {t.general}
                </span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock size={16} />
                <span className="hidden sm:inline">
                  {t.security}
                </span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell size={16} />
                <span className="hidden sm:inline">
                  {t.notifications}
                </span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette size={16} />
                <span className="hidden sm:inline">
                  {t.appearance}
                </span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="animate-fade-in space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">{t.accountSettings}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      {t.email}
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      {t.username}
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      {t.description}
                    </label>
                    <textarea
                      className="w-full px-3 py-2 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] min-h-[100px]"
                      value={userDescription}
                      onChange={(e) => setUserDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSaveProfile}>{t.save}</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="general" className="animate-fade-in space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">
                  {t.language}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="lang-ru" 
                      name="language" 
                      className="w-4 h-4" 
                      checked={language === 'ru'}
                      onChange={() => setLanguage('ru')}
                    />
                    <label htmlFor="lang-ru" className="text-white">{t.russian}</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="lang-en" 
                      name="language" 
                      className="w-4 h-4"
                      checked={language === 'en'}
                      onChange={() => setLanguage('en')}
                    />
                    <label htmlFor="lang-en" className="text-white">{t.english}</label>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="animate-fade-in">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">{t.changePassword}</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        {t.currentPassword}
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        {t.newPassword}
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        {t.confirmPassword}
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleChangePassword}>{t.changePasswordBtn}</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="animate-fade-in">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white mb-4">{t.notificationSettings}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-white">{t.tradeRequests}</label>
                    <Switch 
                      checked={notifications.trades}
                      onCheckedChange={() => handleToggleNotification('trades')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-white">{t.gifts}</label>
                    <Switch 
                      checked={notifications.gifts}
                      onCheckedChange={() => handleToggleNotification('gifts')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-white">{t.marketSales}</label>
                    <Switch 
                      checked={notifications.sales}
                      onCheckedChange={() => handleToggleNotification('sales')}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="appearance" className="animate-fade-in">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">
                    {t.theme}
                  </h3>
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={theme === 'dark'}
                      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                    />
                    <span className="text-white">
                      {t.darkTheme}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">
                    {t.accentColor}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setAccentColor('purple')}
                      className={`w-8 h-8 rounded-full bg-purple-500 transition-all duration-300 ${
                        accentColor === 'purple' ? 'ring-2 ring-white ring-offset-2 ring-offset-dark' : ''
                      }`}
                    />
                    <button
                      onClick={() => setAccentColor('blue')}
                      className={`w-8 h-8 rounded-full bg-blue-500 transition-all duration-300 ${
                        accentColor === 'blue' ? 'ring-2 ring-white ring-offset-2 ring-offset-dark' : ''
                      }`}
                    />
                    <button
                      onClick={() => setAccentColor('green')}
                      className={`w-8 h-8 rounded-full bg-green-500 transition-all duration-300 ${
                        accentColor === 'green' ? 'ring-2 ring-white ring-offset-2 ring-offset-dark' : ''
                      }`}
                    />
                    <button
                      onClick={() => setAccentColor('red')}
                      className={`w-8 h-8 rounded-full bg-red-500 transition-all duration-300 ${
                        accentColor === 'red' ? 'ring-2 ring-white ring-offset-2 ring-offset-dark' : ''
                      }`}
                    />
                    <button
                      onClick={() => setAccentColor('yellow')}
                      className={`w-8 h-8 rounded-full bg-yellow-500 transition-all duration-300 ${
                        accentColor === 'yellow' ? 'ring-2 ring-white ring-offset-2 ring-offset-dark' : ''
                      }`}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
