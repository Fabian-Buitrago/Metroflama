export const playNotificationSound = () => {
  const audio = new Audio("/notification.wav");
  audio.play();
};
