import Request from '@/utils/request';

interface IInfo {
  name: string
}

export const TestAPI = data => Request<IInfo>({
  url: '/wx/user/info',
  method: 'POST',
  data,
});

