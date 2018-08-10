export interface Member {
    name: string;
    image: string;
    isOnline: boolean;
  }

export const members: Member[] = [
    {
      name: "Echo Bot",
      image: "https://pets2.me/media/res/5/0/7/3/5073.oxajko.300.jpg",
      isOnline: true
    },
    {
      name: "Reverse Bot",
      image:
        "https://i.pinimg.com/originals/dd/ea/bd/ddeabd100741d2be203d97ff36ef9824.jpg",
      isOnline: true
    },
    {
      name: "Spam Bot",
      image:
        "https://pbs.twimg.com/profile_images/915160732836225025/NKHdiEdN_400x400.jpg",
      isOnline: true
    },
    {
      name: "Ignore Bot",
      image: "http://s02.yapfiles.ru/files/1723212/_spit.jpg",
      isOnline: true
    }
  ];
  