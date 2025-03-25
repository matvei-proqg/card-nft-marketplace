
import React from 'react';
import Button from '@/components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Lock, Bell, Palette } from 'lucide-react';

const Settings = () => {
  return (
    <div className="page-container page-transition pt-20">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gradient mb-4">Настройки</h1>
          <p className="text-gray-300">
            Управляйте настройками вашего аккаунта и приложения
          </p>
        </div>
        
        <div className="glass-card rounded-xl p-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Globe size={16} />
                <span className="hidden sm:inline">Общие</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock size={16} />
                <span className="hidden sm:inline">Безопасность</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell size={16} />
                <span className="hidden sm:inline">Уведомления</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette size={16} />
                <span className="hidden sm:inline">Внешний вид</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="animate-fade-in space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Язык</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="lang-ru" 
                      name="language" 
                      className="w-4 h-4 text-purple" 
                      defaultChecked 
                    />
                    <label htmlFor="lang-ru" className="text-white">Русский</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="lang-en" 
                      name="language" 
                      className="w-4 h-4 text-purple" 
                    />
                    <label htmlFor="lang-en" className="text-white">English</label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Настройки аккаунта</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple"
                      placeholder="example@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Имя пользователя
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple"
                      defaultValue="тест"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button>Сохранить изменения</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="animate-fade-in">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Смена пароля</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Текущий пароль
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Новый пароль
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Подтвердите новый пароль
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button>Изменить пароль</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="animate-fade-in">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white mb-4">Настройки уведомлений</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="notify-trades" className="text-white">Запросы на обмен</label>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input 
                        type="checkbox" 
                        id="notify-trades" 
                        className="sr-only" 
                        defaultChecked
                      />
                      <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
                      <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label htmlFor="notify-gifts" className="text-white">Подарки</label>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input 
                        type="checkbox" 
                        id="notify-gifts" 
                        className="sr-only" 
                        defaultChecked
                      />
                      <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
                      <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label htmlFor="notify-sales" className="text-white">Продажи на рынке</label>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input 
                        type="checkbox" 
                        id="notify-sales" 
                        className="sr-only" 
                        defaultChecked
                      />
                      <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
                      <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="appearance" className="animate-fade-in">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Тема</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-dark-lighter p-4 rounded-lg border-2 border-purple cursor-pointer">
                      <div className="h-20 bg-dark rounded-md mb-2"></div>
                      <p className="text-white text-center">Тёмная (по умолчанию)</p>
                    </div>
                    <div className="bg-gray-200 p-4 rounded-lg border-2 border-transparent cursor-pointer">
                      <div className="h-20 bg-white rounded-md mb-2"></div>
                      <p className="text-gray-800 text-center">Светлая</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Акцентный цвет</h3>
                  <div className="flex flex-wrap gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple ring-2 ring-white ring-offset-2 ring-offset-dark cursor-pointer"></div>
                    <div className="w-8 h-8 rounded-full bg-blue-500 cursor-pointer"></div>
                    <div className="w-8 h-8 rounded-full bg-green-500 cursor-pointer"></div>
                    <div className="w-8 h-8 rounded-full bg-red-500 cursor-pointer"></div>
                    <div className="w-8 h-8 rounded-full bg-yellow-500 cursor-pointer"></div>
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
