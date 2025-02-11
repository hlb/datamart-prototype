import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  ChevronRight,
  Database,
  BookOpen,
  Newspaper,
  GraduationCap,
  User,
  LogOut,
  ArrowLeft,
} from 'lucide-react';
import _ from 'lodash';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Dataset Detail Component
const DatasetDetail = ({ dataset, onBack }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    purpose: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDialog(false);
    setShowAlert(true);
  };

  if (!dataset) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex h-16 items-center">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回
            </Button>
            <h1 className="text-xl font-bold text-blue-600 ml-4">資料集詳情</h1>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <Card>
          <CardHeader>
            <CardTitle>{dataset.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">基本資訊</h2>
                <p>提供者：{dataset.provider}</p>
                <p>內容類型：{dataset.contentType}</p>
                <p>最後更新：{dataset.lastUpdate}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">資料統計</h2>
                {dataset.dataStats?.articleCount && (
                  <p>文章數量：{dataset.dataStats.articleCount.toLocaleString()}</p>
                )}
                {dataset.dataStats?.wordCount && (
                  <p>總字數：{dataset.dataStats.wordCount.toLocaleString()}</p>
                )}
                {dataset.dataStats?.timeRange && (
                  <p>
                    資料時間範圍：{dataset.dataStats.timeRange.start} 至{' '}
                    {dataset.dataStats.timeRange.end}
                  </p>
                )}
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">授權資訊</h2>
                <p>授權類型：{dataset.licensing.type}</p>
                <p>允許用途：{dataset.licensing.allowedUsage.join('、')}</p>
                {dataset.licensing.pricing && (
                  <p>價格：NT$ {dataset.licensing.pricing.amount.toLocaleString()}</p>
                )}
              </div>
            </div>
          </CardContent>
          <div className="border-t border-gray-200 p-4 flex justify-center">
            <Button
              onClick={() => setShowDialog(true)}
              className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 font-medium shadow hover:shadow-md transition-all"
            >
              申請使用此資料集
            </Button>
          </div>
        </Card>
      </main>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>申請使用資料集</DialogTitle>
            <DialogDescription>請填寫以下資訊，我們會在5個工作天內完成審核。</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  姓名
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="organization" className="text-right">
                  單位
                </Label>
                <Input
                  id="organization"
                  className="col-span-3"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="col-span-3"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="purpose" className="text-right">
                  用途說明
                </Label>
                <Textarea
                  id="purpose"
                  className="col-span-3"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">送出申請</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>申請已送出</AlertDialogTitle>
            <AlertDialogDescription>
              感謝您的申請！我們會在5個工作天內完成審核，並以Email通知您審核結果。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowAlert(false)}>確定</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

// Dataset List Component
const DatasetList = ({ category, datasets, onBack, onViewDetails }) => {
  const categoryMap = {
    新聞內容: '新聞',
    期刊內容: '雜誌',
    圖書內容: '圖書',
    教育內容: '教育',
  };

  const filteredDatasets = datasets.filter(
    (dataset) => dataset.contentType === categoryMap[category]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex h-16 items-center">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回
            </Button>
            <h1 className="text-xl font-bold text-blue-600 ml-4">{category}</h1>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {category} ({filteredDatasets.length})
        </h2>

        {filteredDatasets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">此分類目前沒有資料集</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredDatasets.map((dataset) => (
              <Card key={dataset.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{dataset.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">提供者：{dataset.provider}</p>
                    <p className="text-sm text-gray-500">
                      {dataset.dataStats?.articleCount
                        ? `文章數：${dataset.dataStats.articleCount.toLocaleString()}`
                        : dataset.dataStats?.bookCount
                          ? `書籍數：${dataset.dataStats.bookCount.toLocaleString()}`
                          : `字數：${dataset.dataStats?.wordCount?.toLocaleString() || '未提供'}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      授權類型：{dataset.licensing?.type || '未指定'}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm font-medium text-blue-600">
                        {dataset.contentType}
                      </span>
                      <Button
                        onClick={() => onViewDetails(dataset)}
                        className="bg-white text-blue-600 hover:bg-blue-50 border border-blue-200 hover:border-blue-300 shadow-sm hover:shadow transition-all px-4 py-1.5 rounded-full font-medium flex items-center gap-1"
                      >
                        查看詳情
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

// Home Component
const Home = ({ isLoggedIn, username, onLogin, onLogout, onViewDetails, onCategoryClick }) => {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await import('./sample-data.json');
        setDatasets(data.default.datasets || []);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const categoryCounts = _.countBy(datasets, 'contentType');

  const popularDatasets = _.chain(datasets)
    .orderBy(['dataStats.articleCount'], ['desc'])
    .take(3)
    .value();

  const categories = [
    { icon: Newspaper, title: '新聞內容', count: `${categoryCounts['新聞'] || 0} 個資料集` },
    { icon: BookOpen, title: '期刊內容', count: `${categoryCounts['雜誌'] || 0} 個資料集` },
    { icon: Database, title: '圖書內容', count: `${categoryCounts['圖書'] || 0} 個資料集` },
    { icon: GraduationCap, title: '教育內容', count: `${categoryCounts['教育'] || 0} 個資料集` },
  ];

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">載入中...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">台灣中文語料資料市集</span>
            </div>
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{username}</span>
                  </div>
                  <Button variant="ghost" onClick={onLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    登出
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={onLogin}>
                    登入
                  </Button>
                  <Button onClick={onLogin}>註冊</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <section className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900">高品質中文訓練資料的最佳來源</h1>
          <p className="mt-4 text-xl text-gray-600">
            整合台灣各類型內容提供者的數位內容，為AI訓練專案提供完整解決方案
          </p>
        </section>

        <section className="py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">資料集分類</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onCategoryClick(category.title)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <category.icon className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{category.title}</h3>
                      <p className="text-sm text-gray-500">{category.count}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">熱門資料集</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularDatasets.map((dataset) => (
              <Card key={dataset.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{dataset.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">提供者：{dataset.provider}</p>
                    <p className="text-sm text-gray-500">
                      數量：{dataset.dataStats?.articleCount?.toLocaleString() || '未提供'} 篇
                    </p>
                    <p className="text-sm text-gray-500">
                      授權類型：{dataset.licensing?.type || '未指定'}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm font-medium text-blue-600">
                        {dataset.contentType}
                      </span>
                      <Button
                        onClick={() => onViewDetails(dataset)}
                        className="bg-white text-blue-600 hover:bg-blue-50 border border-blue-200 hover:border-blue-300 shadow-sm hover:shadow transition-all px-4 py-1.5 rounded-full font-medium flex items-center gap-1"
                      >
                        查看詳情
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-12 px-4">
          <p className="text-center text-gray-500">
            © 2024 台灣中文語料資料市集. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Main App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentDataset, setCurrentDataset] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await import('./sample-data.json');
        setDatasets(data.default.datasets || []);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleViewDetails = (dataset) => {
    setCurrentDataset(dataset);
    setSelectedCategory(null);
  };

  const handleBack = () => {
    setCurrentDataset(null);
    setSelectedCategory(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentDataset(null);
  };

  if (currentDataset) {
    return <DatasetDetail dataset={currentDataset} onBack={handleBack} />;
  }

  if (selectedCategory) {
    return (
      <DatasetList
        category={selectedCategory}
        datasets={datasets}
        onBack={handleBack}
        onViewDetails={handleViewDetails}
      />
    );
  }

  return (
    <Home
      isLoggedIn={isLoggedIn}
      username="布丁"
      onLogin={handleLogin}
      onLogout={handleLogout}
      onViewDetails={handleViewDetails}
      onCategoryClick={handleCategoryClick}
    />
  );
};

export default App;
