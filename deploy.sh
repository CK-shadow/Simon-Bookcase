# ȷ���ű��׳������Ĵ���
set -e

# ���ɾ�̬�ļ�
npm run build

# �������ɵ��ļ���
cd docs/.vuepress/dist

git init
git add -A
git commit -m '���Ŀ�Ǽ�'

# �������Ҫ���� https://USERNAME.github.io
git push -f git@github.com:CK-shadow/CK-shadow.github.io.git master

# ��������� https://USERNAME.github.io/<REPO>  REPO=github�ϵ���Ŀ
# git push -f git@github.com:USERNAME/<REPO>.git master:gh-pages

cd -