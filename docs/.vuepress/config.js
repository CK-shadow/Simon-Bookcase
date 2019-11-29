module.exports = {
  title: 'Chen\'s blog',
  description: '�ҵĸ�����վ',
  head: [ // ע�뵽��ǰҳ��� HTML <head> �еı�ǩ
    ['link', { rel: 'icon', href: '/logo.jpg' }], // ����һ���Զ���� favicon(��ҳ��ǩ��ͼ��)
  ],
  base: '/', // ���ǲ���github��ص�����
  markdown: {
    lineNumbers: false // �������ʾ�к�
  },
  themeConfig: {
    nav:[ // ����������
      {text: 'ǰ�˻���', link: '/accumulate/' },
      {text: '�㷨���', link: '/algorithm/'},
      {text: '΢��', link: 'https://baidu.com'}      
    ],
    sidebar: 'auto', // ���������
    sidebarDepth: 2, // �������ʾ2��
  },
  head: [ // ע�뵽��ǰҳ��� HTML <head> �еı�ǩ
  ['link', { rel: 'manifest', href: '/photo.jpg' }],
  ['link', { rel: 'apple-touch-icon', href: '/photo.jpg' }],
  ],
  serviceWorker: true // �Ƿ��� PWA
};