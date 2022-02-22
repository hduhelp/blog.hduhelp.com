export interface FriendProps {
  id: string
  link: string
  avatar: string
  bgColor: string
}

export const friends: FriendProps[] = [
  {
    id: '@FDKevin',
    link: 'https://github.com/FDKevin0/',
    avatar: 'https://avatars3.githubusercontent.com/u/25277753',
    bgColor: '#473922',
  },

  {
    id: '@Esonhugh',
    link: 'https://eson.ninja/',
    avatar: 'https://eson.ninja/img/reol.png',
    bgColor: '#225BC6',  // light blue
  },
  
  {
    id: '@ek1ng',
    link: 'https://ek1ng.com/',
    avatar: 'https://ek1ng.com/img/avatar.jpg',
    bgColor: '#70887D',
  },

  {
    id: '@NX',
    link: 'https://www.nickxu.top/',
    avatar: 'https://www.nickxu.top/img/favicon.jpg',
    bgColor: '#00FF00',  
  }
]
